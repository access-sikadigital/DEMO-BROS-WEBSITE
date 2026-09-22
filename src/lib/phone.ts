// Australian phone handling, shared by form validation, the input's keystroke
// filter and the GHL payload so all three can't drift apart. Pure functions —
// safe on both client and server.

/** Every Australian number we accept is exactly this many national digits. */
export const AU_PHONE_LENGTH = 10;

function auDigits(raw: string): string {
  let digits = raw.replace(/\D/g, "");

  // A pasted international number: drop the 61 country code and restore the
  // trunk zero. Guarded on length so a Sydney landline (0261...) is untouched.
  if (digits.startsWith("61") && digits.length > AU_PHONE_LENGTH) {
    digits = "0" + digits.slice(2);
  }

  // A subscriber number pasted without its trunk zero, e.g. "412345678".
  if (digits.length === AU_PHONE_LENGTH - 1 && /^[2-578]/.test(digits)) {
    digits = "0" + digits;
  }

  return digits;
}

/**
 * Reduces whatever the visitor typed or pasted to Australian national digits,
 * capped at 10. Used as the input's keystroke filter, so it has to be forgiving
 * about partial input — "04" on the way to "0412345678" must survive.
 *
 *   "0412 345 678"    → "0412345678"
 *   "+61 412 345 678" → "0412345678"
 *   "(03) 9123 4567"  → "0391234567"
 *   "abc"             → ""
 */
export function sanitiseAuPhoneInput(raw: string): string {
  return auDigits(raw).slice(0, AU_PHONE_LENGTH);
}

/**
 * True only for a complete, dialable Australian number:
 *   02/03/07/08 + 8 digits   landline
 *   04/05 + 8 digits         mobile
 *   1300/1800 + 6 digits     inbound
 */
export function isValidAuPhone(raw: string): boolean {
  // Deliberately reads the untruncated digits: an 11-digit number must be
  // rejected, not quietly shortened into a valid-looking different number.
  const d = auDigits(raw);
  if (d.length !== AU_PHONE_LENGTH) return false;
  return /^0[2-578]\d{8}$/.test(d) || /^1[38]00\d{6}$/.test(d);
}

/**
 * Formats for GoHighLevel, which needs E.164 to recognise an AU number — SMS
 * delivery and phone-based contact dedupe both depend on it. Only ever called
 * with a value the schema already accepted.
 */
export function toE164Au(raw: string): string {
  const d = sanitiseAuPhoneInput(raw);
  if (d.startsWith("0")) return "+61" + d.slice(1);
  if (/^1[38]/.test(d)) return "+61" + d;
  return d;
}
