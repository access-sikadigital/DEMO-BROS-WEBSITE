import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { services } from "@/lib/site-data";
const projectOffice = "/images/office-defits/hero.jpg";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Demolition & Defits Melbourne — Demo Bros" },
      {
        name: "description",
        content:
          "Melbourne's commercial strip-out, office defit and demolition specialists. Make-good deadlines met, after-hours delivery, fully documented. Get a fixed quote.",
      },
      { property: "og:title", content: "Commercial Demolition & Defits Melbourne | Demo Bros" },
      { property: "og:description", content: "Make-good deadlines, made good. Commercial strip outs, defits and demolition done right." },
      { property: "og:url", content: "/commercial" },
    ],
    links: [{ rel: "canonical", href: "/commercial" }],
  }),
  component: CommercialPage,
});

const commercialServices = services.filter((s) =>
  ["commercial-strip-outs", "office-defits", "internal-demolition", "partial-demolition"].includes(s.slug),
);

const capabilities = [
  ["After-hours as standard", "Nights, weekends and staged programs that keep buildings trading and tenants happy."],
  ["Documentation that closes leases", "SWMS, insurances, waste dockets and photographed handover reports — make-good sign-off without friction."],
  ["Building management fluency", "Loading dock bookings, lift protection, noise windows, ESM isolations. We speak facilities."],
  ["Program certainty", "A committed schedule before mobilisation. Penalty-conscious defits are our home ground."],
];

function CommercialPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial"
        title="Commercial demolition, strip outs & defits in Melbourne"
        description="Make-good deadlines, made good. Office defits, retail strip outs, base-building make-goods and controlled commercial demolition — delivered after-hours, fully documented, with building management kept in the loop at every stage."
        image={projectOffice}
        imageAlt="Corporate office floor mid-defit at dusk"
      />

      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Demo Bros is the single commercial partner for Melbourne businesses, fit-out firms, property managers and
              developers. Whether you're handing back a leased office, refitting a retail space, or demolishing a
              building for redevelopment, you get one disciplined crew, a fixed price and a program that holds — plus
              the SWMS, insurances and documentation commercial work demands.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Capability" title="Why property professionals keep our number." />
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {capabilities.map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold tracking-[0.25em] text-primary">0{i + 1}</span>
                  <h2 className="mt-3 text-xl font-bold">{title}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-16 text-light-foreground lg:py-24">
        <div className="container-wide">
          <SectionHeading light eyebrow="Commercial Services" title="The commercial line-up." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {commercialServices.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group block overflow-hidden rounded-lg bg-charcoal"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-lg text-secondary group-hover:text-primary">{s.title}</h3>
                    <span className="mt-2 inline-block text-sm font-semibold text-primary">Explore →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              to="/commercial-demolition"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Commercial &amp; warehouse demolition →
            </Link>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Industries we serve →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection title="Lease ending? Program starting? Let's talk." />
    </>
  );
}
