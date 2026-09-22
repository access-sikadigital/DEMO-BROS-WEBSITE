import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { services } from "@/lib/site-data";

const heroVideo =
  "https://res.cloudinary.com/eksopivw/video/upload/v1783752840/Seddon_Before_and_after_hype_Reel_Landscape_k7id8s.mp4";

export const Route = createFileRoute("/strip-out-demolition")({
  head: () => ({
    meta: [
      { title: "Strip Out Melbourne | Kitchen, Bathroom & Internal — Demo Bros" },
      {
        name: "description",
        content:
          "Melbourne strip-out specialists. Kitchen, bathroom, internal and partial strip outs taken back to base building — protected structure, clean handover, fixed price.",
      },
      { property: "og:title", content: "Strip Out Melbourne | Demo Bros" },
      { property: "og:description", content: "The strip-out specialists — precision removal, protected structure, clean handover." },
      { property: "og:url", content: "/strip-out-demolition" },
    ],
    links: [{ rel: "canonical", href: "/strip-out-demolition" }],
  }),
  component: StripOutPage,
});

const stripServices = services.filter((s) =>
  [
    "kitchen-demolition",
    "bathroom-strip-outs",
    "internal-demolition",
    "partial-demolition",
    "renovation-preparation",
    "commercial-strip-outs",
  ].includes(s.slug),
);

const included: [string, string][] = [
  ["Protect what stays", "Floor protection, dust barriers and service isolation before a single tool starts."],
  ["Precision removal", "Cabinetry, linings, tiles, fixtures and non-structural walls removed by hand and machine."],
  ["Structural discipline", "Load-bearing checks and engineer coordination so nothing comes down that shouldn't."],
  ["Clean, builder-ready handover", "Broom-swept, documented and photographed — your trades start the next morning."],
];

const why: [string, string][] = [
  ["Fixed price, no creep", "A locked quote after inspection — no day-rate surprises."],
  ["On-time programs", "Make-good deadlines and builder start dates don't move, so neither do we."],
  ["VBA registered & insured", "$20M public liability, full SWMS and Victorian Building Authority registration."],
  ["Recycling-first", "We separate waste streams and divert as much material as possible from landfill."],
];

function StripOutPage() {
  return (
    <>
      <PageHero
        eyebrow="Melbourne · Strip-out specialists"
        title="Strip-out demolition in Melbourne, taken back to base building"
        description="Strip outs are our lead service — the careful work most demolishers avoid. We remove exactly what needs to go, protect everything that stays, and hand back a clean, builder-ready shell on a fixed price and a program that holds."
        video={heroVideo}
        image="/images/internal-demolition/hero.jpg"
      />

      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              A strip out is controlled, selective demolition: the interior comes out — cabinetry, tiles, linings,
              fixtures and non-structural walls — while the building's structure, services and neighbouring finishes
              stay protected. Done badly, it damages what should have stayed and blows out your renovation before it
              starts. Done our way, it's clean, quick and predictable.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Demo Bros strips single rooms and whole interiors across Melbourne — homes, apartments, offices, shops
              and hospitality venues. Every job is VBA compliant, insured to $20 million, quoted at a fixed price, and
              finished with a broom-swept handover so your trades start the next morning.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="What's included" title="Every removal, handled end to end." />
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {included.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold tracking-[0.25em] text-primary">0{i + 1}</span>
                  <h2 className="mt-3 text-xl font-bold">{t}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-16 text-light-foreground lg:py-24">
        <div className="container-wide">
          <SectionHeading light eyebrow="Strip-out services" title="Pick your scope." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stripServices.map((s, i) => (
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
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Why Demo Bros" title="Discipline is the whole business." />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {why.map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="border-t border-border pt-6">
                  <span className="text-xs font-semibold tracking-[0.25em] text-primary">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="Planning a strip out? Get a fixed quote." />
    </>
  );
}
