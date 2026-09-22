import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { projects } from "@/lib/site-data";

const heroVideo =
  "https://res.cloudinary.com/eksopivw/video/upload/v1783693990/Dandy_Demo_landscape_V2_z7zr5e.mp4";

const dandenong = projects.find((p) => p.slug === "dandenong-warehouse-demolition");

export const Route = createFileRoute("/commercial-demolition")({
  head: () => ({
    meta: [
      { title: "Commercial Demolition Melbourne | Factory & Warehouse — Demo Bros" },
      {
        name: "description",
        content:
          "Controlled commercial demolition in Melbourne — factories, warehouses, offices and retail. Engineered methodology, full compliance, clean site. Get a quote.",
      },
      { property: "og:title", content: "Commercial Demolition Melbourne | Demo Bros" },
      { property: "og:description", content: "Industrial-scale demolition, controlled and compliant." },
      { property: "og:url", content: "/commercial-demolition" },
    ],
    links: [{ rel: "canonical", href: "/commercial-demolition" }],
  }),
  component: CommercialDemolitionPage,
});

const capabilities: [string, string][] = [
  ["Structural steel & mezzanines", "Cutting, dismantling and removal of steel frames, racking and mezzanine floors."],
  ["Machine + labour crews", "Mini-excavators and skilled hands working together for speed and control."],
  ["Compliant & documented", "SWMS, VBA registration, $20M insurance and photographed handover reports."],
  ["Recycling-first waste", "Concrete, steel and timber separated and diverted — as much as possible kept out of landfill."],
];

const gallery = [
  "/images/internal-demolition/gallery-01.jpg",
  "/images/internal-demolition/gallery-02.jpg",
  "/images/projects/warehouse-conversion.jpg",
];

function CommercialDemolitionPage() {
  return (
    <>
      <PageHero
        eyebrow="Commercial · Demolition"
        title="Commercial demolition in Melbourne"
        description="Controlled demolition for factories, warehouses, offices and commercial buildings — planned, engineered and delivered with the compliance and documentation major projects demand."
        video={heroVideo}
        image="/images/projects/warehouse-conversion.jpg"
      />

      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Commercial demolition is a different discipline to a home knock-down: structural steel, concrete, live
              neighbours, traffic management, hazardous materials and a compliance trail that has to stand up to
              scrutiny. Demo Bros delivers controlled commercial demolition across Melbourne — partial or full — for
              factories, warehouses, offices, retail and mixed-use buildings.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              We plan the methodology, coordinate engineering and hazardous-material clearances, manage traffic and
              neighbour notifications, and separate materials for recycling. Every project runs on a documented safety
              system with SWMS, and finishes with a clean, cleared site ready for the next stage. Fixed scope, clear
              program, full compliance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Capability" title="Built for industrial scale." />
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            {capabilities.map(([t, b], i) => (
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
          <SectionHeading light eyebrow="Recent work" title="Dandenong warehouse demolition." />
          {dandenong ? (
            <p className="mt-4 max-w-2xl leading-relaxed text-light-foreground/70">{dandenong.description}</p>
          ) : null}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={i * 0.06}>
                <div className="overflow-hidden rounded-lg bg-charcoal">
                  <img
                    src={src}
                    alt="Dandenong warehouse demolition"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              See all projects →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection title="Commercial site to clear? Let's scope it." />
    </>
  );
}
