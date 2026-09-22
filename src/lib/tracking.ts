// First-touch marketing attribution captured in the browser and forwarded to
// GoHighLevel with each lead. Safe to call anywhere — every access to window /
// localStorage is guarded so it is a no-op during server-side rendering.

const STORAGE_KEY = "db_first_touch";

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid", // Google Ads click id
  "fbclid", // Meta / Facebook click id
  "gbraid", // Google Ads (iOS app -> web)
  "wbraid", // Google Ads (web -> app)
] as const;

type Tracking = Record<string, string>;

function readStored(): Tracking {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Tracking) : {};
  } catch {
    return {};
  }
}

function paramsFromUrl(): Tracking {
  const params = new URLSearchParams(window.location.search);
  const found: Tracking = {};
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 300);
  }
  return found;
}

// Records the first-touch source exactly once and never overwrites it, so the
// original ad/campaign that brought the visitor in survives later navigation.
export function captureTracking(): void {
  if (typeof window === "undefined") return;

  const incoming = paramsFromUrl();
  if (Object.keys(incoming).length === 0) return;
  if (Object.keys(readStored()).length > 0) return; // already recorded

  incoming.first_referrer = document.referrer || "direct";
  incoming.first_landing_page = window.location.pathname;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    /* storage unavailable (private mode, etc.) — non-fatal */
  }
}

// Returns stored first-touch data merged with any tracking params on the current
// URL (current URL wins, giving both first- and last-touch visibility in GHL).
export function getTracking(): Tracking {
  if (typeof window === "undefined") return {};
  return { ...readStored(), ...paramsFromUrl() };
}
