import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./quote-schema";
import { services } from "./site-data";
import { sendToWebhook } from "./ghl";
import { toE164Au } from "./phone";

// GHL custom fields are flat text, so a multi-select arrives as a readable list.
function serviceLabels(slugs: string[]): string {
  return slugs.map(serviceLabel).join(", ");
}

function serviceLabel(slug: string): string {
  if (slug === "other") return "Something else";
  return services.find((s) => s.slug === slug)?.title ?? slug;
}

function splitName(full: string): { first_name: string; last_name: string } {
  const parts = full.trim().split(/\s+/);
  const first_name = parts.shift() ?? "";
  return { first_name, last_name: parts.join(" ") };
}

// Receives a validated quote submission and forwards it to the GoHighLevel
// inbound webhook. Runs only on the server, so GHL_WEBHOOK_URL never reaches the
// browser and the cross-origin POST to GHL isn't blocked by CORS.
export const submitLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    // Honeypot: a real person never sees or fills `website`. If it's filled,
    // it's a bot — pretend success and quietly drop it.
    if (data.website && data.website.trim() !== "") {
      return { ok: true as const };
    }

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      // Backstop: log the full lead so it's recoverable from the platform logs
      // even before the webhook URL is configured.
      console.error(
        "[submitLead] GHL_WEBHOOK_URL is not set — lead NOT forwarded:",
        JSON.stringify(data),
      );
      throw new Error("Lead destination is not configured.");
    }

    const { first_name, last_name } = splitName(data.name);
    const payload: Record<string, string> = {
      first_name,
      last_name,
      full_name: data.name,
      email: data.email,
      phone: toE164Au(data.phone),
      suburb: data.suburb,
      service: serviceLabels(data.service),
      service_slug: data.service.join(","),
      details: data.details ?? "",
      source: "Website — Quote Form",
      page: data.page || "",
      page_url: data.pageUrl || "",
      referrer: data.referrer || "",
      submitted_at: new Date().toISOString(),
      // UTM / click-id attribution (utm_source, gclid, fbclid, ...) if present.
      ...data.tracking,
    };

    const result = await sendToWebhook(webhookUrl, payload);
    if (!result.ok) {
      console.error(
        `[submitLead] GHL webhook failed (${result.status}): ${result.detail} — Lead:`,
        JSON.stringify(payload),
      );
      throw new Error("Failed to send lead.");
    }

    return { ok: true as const };
  });
