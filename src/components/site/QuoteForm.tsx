import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CtaButton } from "./CtaButton";
import { services } from "@/lib/site-data";
import { quoteSchema, sanitiseNameInput, type QuoteValues } from "@/lib/quote-schema";
import { sanitiseAuPhoneInput, AU_PHONE_LENGTH } from "@/lib/phone";
import { submitLead } from "@/lib/lead.functions";
import { captureTracking, getTracking } from "@/lib/tracking";

const inputClass =
  "w-full rounded-md border border-black/10 bg-white px-5 py-4 text-base text-charcoal placeholder:text-muted-foreground/70 transition-all duration-300 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30 focus:outline-none hover:border-black/20 shadow-sm";

const SERVICE_OPTIONS = [
  ...services.map((s) => ({ slug: s.slug, title: s.title })),
  { slug: "other", title: "Something else" },
];

/**
 * Multi-select for the service field. A native <select multiple> needs
 * ctrl-click to pick more than one, which visitors don't discover and which
 * barely works on touch — so this is a dropdown of real checkboxes instead.
 */
function ServicePicker({
  value,
  onChange,
  onBlur,
  invalid,
}: Readonly<{
  value: string[];
  onChange: (next: string[]) => void;
  onBlur: () => void;
  invalid: boolean;
}>) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape, and only validate once the visitor has
  // actually finished with the field.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onBlur();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onBlur]);

  const toggle = (slug: string) =>
    onChange(value.includes(slug) ? value.filter((s) => s !== slug) : [...value, slug]);

  const titleOf = (slug: string) => SERVICE_OPTIONS.find((o) => o.slug === slug)?.title ?? slug;

  let summary: string;
  if (value.length === 0) summary = "Select services…";
  else if (value.length === 1) summary = titleOf(value[0]);
  else summary = `${value.length} services selected`;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="q-service-options"
        className={`${inputClass} flex items-center justify-between text-left ${
          invalid ? "border-destructive" : ""
        } ${value.length === 0 ? "text-muted-foreground/70" : ""}`}
      >
        <span className="truncate">{summary}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`ml-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <fieldset
          id="q-service-options"
          // Lenis hijacks wheel events site-wide; without this the panel won't scroll.
          data-lenis-prevent
          className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto overscroll-contain rounded-md border border-black/10 bg-white p-1 shadow-xl"
        >
          <legend className="sr-only">Services required</legend>
          {SERVICE_OPTIONS.map((o) => (
            <label
              key={o.slug}
              className="flex cursor-pointer items-center gap-3 rounded px-4 py-3 text-base text-charcoal transition-colors hover:bg-black/5"
            >
              <input
                type="checkbox"
                checked={value.includes(o.slug)}
                onChange={() => toggle(o.slug)}
                className="h-4 w-4 shrink-0 accent-primary"
              />
              <span>{o.title}</span>
            </label>
          ))}
        </fieldset>
      )}

      {/* Selected services stay visible after the panel closes. */}
      {value.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((slug) => (
            <span
              key={slug}
              className="inline-flex items-center gap-1.5 rounded-full bg-charcoal/5 px-3 py-1 text-xs text-charcoal"
            >
              {titleOf(slug)}
              <button
                type="button"
                onClick={() => toggle(slug)}
                aria-label={`Remove ${titleOf(slug)}`}
                className="text-charcoal/50 transition-colors hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: [] },
    // Validate when a field loses focus, not only on submit — otherwise a bad
    // phone number stays silently accepted until the visitor hits the button.
    mode: "onTouched",
  });

  // Record first-touch ad/campaign attribution as soon as the form mounts.
  useEffect(() => {
    captureTracking();
  }, []);

  // Filter keystrokes so invalid characters can't be typed at all, rather than
  // being rejected afterwards. Mutating the event's value before handing it to
  // react-hook-form keeps the field uncontrolled and the caret stable.
  const filtered = (field: "phone" | "name" | "suburb", clean: (v: string) => string) => {
    const reg = register(field);
    return {
      ...reg,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = clean(e.target.value);
        return reg.onChange(e);
      },
    };
  };

  const onSubmit = async (values: QuoteValues) => {
    setErrorMsg(null);
    try {
      await submitLead({
        data: {
          ...values,
          website: honeypotRef.current?.value ?? "",
          page: window.location.pathname,
          pageUrl: window.location.href,
          referrer: document.referrer,
          tracking: getTracking(),
        },
      });
      setSubmitted(true);
    } catch {
      setErrorMsg(
        "Something went wrong sending your request. Please try again — or call us on 1800 960 625 and we'll sort it straight away.",
      );
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            // Colours set explicitly, not inherited: this panel renders both inside
            // the light bone cards on /quote and /contact and inside the dark card
            // on service pages. Without text-foreground the heading inherits
            // text-charcoal and goes dark-on-dark.
            className="flex flex-col items-center rounded-lg border border-border bg-card px-6 text-center text-foreground sm:px-8 py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-primary"
            >
              <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
                <motion.path
                  d="M2 13 12 23 32 3"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                />
              </svg>
            </motion.div>
            <h3 className="font-heading mt-8 text-2xl">Quote request received</h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Thanks — one of the Bros will be in touch within one business day with your fixed
              quote.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            exit={{ opacity: 0, y: -12 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {/* Honeypot: hidden from real users; bots that fill it are dropped server-side. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
            >
              <label htmlFor="q-website">Website</label>
              <input
                id="q-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                ref={honeypotRef}
              />
            </div>
            <div>
              <label htmlFor="q-name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="q-name"
                placeholder="Your full name"
                maxLength={100}
                autoComplete="name"
                className={inputClass}
                {...filtered("name", sanitiseNameInput)}
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="q-phone" className="mb-2 block text-sm font-medium">
                Phone
              </label>
              <input
                id="q-phone"
                type="tel"
                inputMode="numeric"
                placeholder="04xx xxx xxx"
                maxLength={AU_PHONE_LENGTH}
                autoComplete="tel"
                className={inputClass}
                {...filtered("phone", sanitiseAuPhoneInput)}
              />
              {errors.phone && (
                <p className="mt-1.5 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="q-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="q-email"
                type="email"
                inputMode="email"
                placeholder="you@email.com"
                maxLength={255}
                autoComplete="email"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="q-suburb" className="mb-2 block text-sm font-medium">
                Suburb
              </label>
              <input
                id="q-suburb"
                placeholder="e.g. Paddington"
                maxLength={100}
                autoComplete="address-level2"
                className={inputClass}
                {...filtered("suburb", sanitiseNameInput)}
              />
              {errors.suburb && (
                <p className="mt-1.5 text-sm text-destructive">{errors.suburb.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <span className="mb-2 block text-sm font-medium">
                Services required{" "}
                <span className="text-muted-foreground">(pick as many as apply)</span>
              </span>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <ServicePicker
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    invalid={!!errors.service}
                  />
                )}
              />
              {errors.service && (
                <p className="mt-1.5 text-sm text-destructive">{errors.service.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="q-details" className="mb-2 block text-sm font-medium">
                Project details <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                id="q-details"
                rows={5}
                placeholder="Tell us about the space, timing and access…"
                maxLength={2000}
                className={inputClass}
                {...register("details")}
              />
              {errors.details && (
                <p className="mt-1.5 text-sm text-destructive">{errors.details.message}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <CtaButton
                type="submit"
                disabled={isSubmitting}
                fullWidth
                icon={!isSubmitting}
                className="sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Request My Fixed Quote"}
              </CtaButton>
              {errorMsg && (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {errorMsg}
                </p>
              )}
              <p className="mt-4 text-xs text-muted-foreground">
                Fixed quotes within 24 hours. No obligation. Your details are never shared.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
