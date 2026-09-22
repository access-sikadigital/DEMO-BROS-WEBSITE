import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { serviceAreas } from "@/lib/site-data";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Service Areas | Demolition & Strip Outs Across Melbourne — Demo Bros" },
      {
        name: "description",
        content:
          "Demo Bros services demolition and strip outs across metropolitan Melbourne — every suburb within ~30km of the CBD. Find your area and get a fixed quote.",
      },
      { property: "og:title", content: "Service Areas | Demolition Across Melbourne — Demo Bros" },
      { property: "og:description", content: "Demolition and strip out crews across metropolitan Melbourne, every day." },
      { property: "og:url", content: "/locations" },
    ],
    links: [{ rel: "canonical", href: "/locations" }],
  }),
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Service areas"
        title="On the road across Melbourne, every day."
        description="Our crews cover metropolitan Melbourne — every suburb within roughly 30 km of the CBD. Find your area below, or just tell us your suburb when you request a quote."
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
      />
      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              From inner-city apartment strip outs to knock-down rebuilds in the leafy east and commercial defits in
              the CBD, Demo Bros works right across Melbourne. We know the access challenges of tight inner-north
              laneways, the heritage overlays of the inner suburbs, and the larger renovation and rebuild jobs common
              in the east and bayside. Choose your area for local detail, or request a quote and we'll confirm we
              cover you.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-charcoal py-20 lg:py-32 overflow-hidden border-t border-border">
        <div className="container-wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {serviceAreas.map((area, i) => (
              <Reveal key={area.slug} delay={i * 0.05}>
                <Link
                  to="/locations/$slug"
                  params={{ slug: area.slug }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-10 shadow-2xl transition-all duration-700 hover:border-primary/50 sm:p-12"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <h2 className="font-heading text-3xl uppercase tracking-tight text-foreground sm:text-4xl">
                      {area.name}
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground text-lg">
                      {area.detail}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-12 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary/80">
                      View Projects
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection title="Outside these areas? Ask anyway." />
    </>
  );
}
