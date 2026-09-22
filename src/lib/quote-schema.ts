import { z } from "zod";
import { isValidAuPhone } from "./phone";
import { services } from "./site-data";

// The only values the service picker can legitimately produce. Derived from
// site-data so adding a service can't silently break validation.
const SERVICE_SLUGS = new Set<string>([...services.map((s) => s.slug), "other"]);

// Letters (any script — Melbourne is not monolingual), plus the punctuation that
// genuinely appears in names and place names: spaces, hyphens, apostrophes and
// full stops. Digits are absent from the class, which is what rejects
// "123122312123" and "we12311232131".
const NAME_LIKE = /^\p{L}[\p{L}\p{M}\s'’.-]*$/u;

/**
 * Keystroke filter for name/suburb inputs: removes anything NAME_LIKE would
 * reject, so the visitor simply can't type a digit rather than being told off
 * after the fact. Leading non-letters are dropped too.
 */
export function sanitiseNameInput(raw: string): string {
  return raw.replace(/[^\p{L}\p{M}\s'’.-]/gu, "").replace(/^[^\p{L}]+/u, "");
}

// Visible quote-form fields. Used by the QuoteForm's client-side resolver AND
// re-validated server-side inside the submitLead server function, so the browser
// and the server agree on exactly what a valid submission looks like.
export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "That name is too long")
    .regex(NAME_LIKE, "Please enter a real name — letters only"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email")
    .max(255, "That email is too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine(isValidAuPhone, "Enter a valid 10-digit Australian number, e.g. 0412 345 678"),
  suburb: z
    .string()
    .trim()
    .min(2, "Please enter your suburb")
    .max(100, "That suburb name is too long")
    .regex(NAME_LIKE, "Please enter a real suburb name — letters only"),
  // Multi-select: a strip-out job routinely covers kitchen AND bathroom AND
  // office defit, so forcing one choice lost information the estimator needs.
  service: z
    .array(z.string())
    .min(1, "Please select at least one service")
    .max(SERVICE_SLUGS.size, "Too many services selected")
    .refine((v) => v.every((s) => SERVICE_SLUGS.has(s)), "Please select a valid service"),
  details: z.string().trim().max(2000, "Please keep details under 2000 characters").optional(),
});

export type QuoteValues = z.infer<typeof quoteSchema>;

// Full payload the browser sends to the server: the visible fields plus a spam
// honeypot and marketing attribution captured from the page/URL. Every extra
// field is optional so older cached clients never fail validation.
export const leadSchema = quoteSchema.extend({
  // Honeypot — hidden from real users; only bots fill it. Handled server-side.
  website: z.string().max(500).optional().default(""),
  page: z.string().max(300).optional().default(""),
  pageUrl: z.string().max(1000).optional().default(""),
  referrer: z.string().max(1000).optional().default(""),
  tracking: z.record(z.string(), z.string()).optional().default({}),
});

export type LeadInput = z.infer<typeof leadSchema>;
