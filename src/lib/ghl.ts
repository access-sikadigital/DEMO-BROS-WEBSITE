// GoHighLevel integration. Server-only — never import this from a component.
//
// Posts each lead to a GHL Inbound Webhook trigger. Note that GHL bills Inbound
// Webhook triggers per execution, and the endpoint returns no detail about why a
// lead was rejected — we log the full payload on failure so nothing is lost.

// Phone formatting lives in ./phone so the form's validator, the input's
// keystroke filter and this payload all share one implementation.

const WEBHOOK_TIMEOUT_MS = 10_000;

export type WebhookResult = { ok: true } | { ok: false; status: number; detail: string };

/**
 * Sends a flat JSON payload to the GHL Inbound Webhook. Flat keys matter: the
 * trigger's field mapper only exposes top-level properties, so nesting anything
 * here makes it unmappable in the workflow builder.
 *
 * Never throws — failures come back as ok:false so the caller can log the lead.
 */
export async function sendToWebhook(
  webhookUrl: string,
  payload: Record<string, string>,
): Promise<WebhookResult> {
  let res: Response;
  try {
    res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      // Without a timeout a hung GHL endpoint holds the request open until the
      // platform kills it, and the visitor watches a spinner the whole time.
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch (error) {
    return { ok: false, status: 0, detail: `Network error: ${String(error)}` };
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "<unreadable body>");
    return { ok: false, status: res.status, detail: detail.slice(0, 1000) };
  }

  return { ok: true };
}
