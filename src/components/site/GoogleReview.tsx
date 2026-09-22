import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/site-data";

/**
 * Google Business Profile review UI. Deliberately mirrors the conventions people
 * recognise from Maps — the four-colour G, gold stars, an initial avatar, the
 * reviewer's own profile count and a relative age — on the site's dark card.
 */

/** Google's brand palette, used for initial avatars the way the Maps UI does. */
const AVATAR_COLORS = [
  "#4285F4",
  "#DB4437",
  "#F4B400",
  "#0F9D58",
  "#AB47BC",
  "#00ACC1",
  "#FF7043",
  "#9E9D24",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/**
 * Google labels reviews by age, not date. Recomputed at render from the approximate
 * month stored in site-data so the cards never drift out of date.
 */
function relativeAge(postedAt: string, now = new Date()) {
  const [year, month] = postedAt.split("-").map(Number);
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  if (months < 1) return "this month";
  if (months < 2) return "a month ago";
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(months / 12);
  return years < 2 ? "a year ago" : `${years} years ago`;
}

export function GoogleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

const STAR_PATH = "m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

/** Gold star row. Fractional values (a 4.9 average) clip the last star, as Google does. */
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const row = (fill: string) => (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={fill} className="shrink-0" aria-hidden="true">
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );

  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className="relative inline-flex">
      {row("rgba(255,255,255,0.16)")}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${Math.max(0, Math.min(1, value / 5)) * 100}%` }}
      >
        {row("#FBBC04")}
      </span>
    </span>
  );
}

export function GoogleReviewCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex flex-col rounded-lg border border-border bg-card p-6", className)}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-base font-semibold text-white"
          style={{ backgroundColor: avatarColor(t.name) }}
        >
          {t.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <figcaption className="truncate font-semibold leading-tight">{t.name}</figcaption>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {t.localGuide ? "Local Guide · " : ""}
            {t.profileReviews} {t.profileReviews === 1 ? "review" : "reviews"}
          </p>
        </div>
        <GoogleGlyph className="h-5 w-5 shrink-0" />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Stars value={t.rating} />
        <span className="text-xs text-muted-foreground">{relativeAge(t.postedAt)}</span>
      </div>

      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/85">{t.quote}</blockquote>

      <p className="mt-auto pt-5 text-[0.7rem] uppercase tracking-[0.14em] text-primary/70">{t.role}</p>
    </figure>
  );
}

/** The rating summary bar that sits above a review strip. */
export function GoogleRatingSummary({
  value,
  count,
  url,
  className,
}: {
  value: number;
  count: number;
  url: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-5 gap-y-4 rounded-lg border border-border bg-card px-6 py-5 sm:gap-x-6",
        className,
      )}
    >
      <GoogleGlyph className="h-8 w-8 shrink-0" />
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="text-2xl font-semibold leading-none">{value}</span>
          <Stars value={value} size={18} />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">Based on {count} Google reviews</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary/60 hover:text-primary"
      >
        Read them on Google
      </a>
    </div>
  );
}
