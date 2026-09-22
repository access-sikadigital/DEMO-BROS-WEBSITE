import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaButton } from "@/components/site/CtaButton";
import { SITE } from "@/lib/site-data";

// Conversion landing page. Google Tag Manager (GTM-M9642CM, installed site-wide in
// __root.tsx) fires the GA4 / Google Ads / Meta lead conversions off a page view on a
// URL containing "/thank-you". QuoteForm sends the visitor here after a successful
// submit — changing this path breaks lead conversion tracking.
export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thanks — your quote request is in | Demo Bros" },
      {
        name: "description",
        content:
          "Your demolition quote request has been received. One of the Bros will be in touch within one business day with your fixed quote.",
      },
      // Kept out of search results: it's a conversion endpoint, not a landing page.
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:url", content: "/thank-you" },
    ],
    links: [{ rel: "canonical", href: "/thank-you" }],
  }),
  component: ThankYouPage,
});

const nextSteps: [string, string][] = [
  [
    "We read it today",
    "Your request lands straight with the team. If anything's unclear about the scope, we'll call you before quoting.",
  ],
  [
    "You get a fixed number",
    "A written, fixed-price quote within one business day — with our demolition licence, $20M public liability certificate and workers comp attached.",
  ],
  [
    "You pick the date",
    "Happy with the number? We lock in a start date and handle the permits, protection and disposal from there.",
  ],
];

function ThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Request received"
        title="Thanks — we've got it."
        description="One of the Bros will be in touch within one business day with your fixed quote."
      />
      <section className="border-t border-black/10 bg-white py-20 text-charcoal lg:py-32">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="eyebrow text-primary">What happens next</p>
          </Reveal>
          <div className="mt-10 space-y-12">
            {nextSteps.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="border-t border-black/10 pt-8">
                  <span className="font-heading text-sm tracking-[0.25em] text-primary">
                    0{i + 1}
                  </span>
                  <h2 className="font-heading mt-4 text-2xl uppercase tracking-tight text-charcoal lg:text-3xl">
                    {title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-charcoal/70">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-14 rounded-3xl border border-black/10 bg-light p-6 shadow-lg lg:p-10">
              <p className="text-base text-charcoal/70 sm:text-lg">Need it moving sooner?</p>
              <a
                href={SITE.phoneHref}
                className="font-heading mt-4 block text-2xl text-primary transition-colors hover:text-primary/80 sm:text-3xl lg:text-4xl"
              >
                Call {SITE.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap gap-4">
              <CtaButton to="/" size="md">
                Back to home
              </CtaButton>
              <CtaButton to="/projects" variant="outline" size="md">
                See recent jobs
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
