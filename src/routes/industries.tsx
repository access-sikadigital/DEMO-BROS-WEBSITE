import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { industries } from "@/lib/site-data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries We Serve | Commercial Strip Outs & Defits — Demo Bros" },
      {
        name: "description",
        content:
          "Commercial strip outs, defits and demolition for offices, retail, hospitality, medical and body corporate across Melbourne. Compliant, after-hours, documented.",
      },
      { property: "og:title", content: "Industries We Serve | Demo Bros" },
      { property: "og:description", content: "Specialist demolition support for every sector we serve." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Different sectors. Same discipline."
        description="Every industry has its own constraints — trading hours, tenants, heritage overlays, procurement rules. We've built crews and processes for all of them."
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783693947/Forefront_Demo_Landscape_gst8nf.mp4"
      />
      <section className="relative border-t border-border">
        <div className="container-wide py-16 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <Reveal>
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-primary/70" />
                  <p className="eyebrow !text-primary/90">Our Focus</p>
                </div>
                <h2 className="mt-6 font-heading text-5xl uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Who we serve.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                  We adapt our methods, schedules, and compliance to fit the precise requirements of your sector. From high-security government facilities to live retail environments, we deliver the same discipline.
                </p>
              </Reveal>
            </div>
            
            <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
              {industries.map((ind, i) => (
                <Reveal key={ind.name} delay={0.05}>
                  <div className="group relative overflow-hidden rounded-xl border border-border bg-charcoal/50 p-8 transition-colors duration-500 hover:border-primary/50 sm:p-12">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    
                    <span className="font-heading text-2xl text-primary/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-heading text-2xl uppercase tracking-tight sm:text-3xl lg:text-4xl">
                      {ind.name}
                    </h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground sm:text-lg">
                      {ind.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container-wide pb-16 lg:pb-24">
          <Reveal>
            <p className="text-muted-foreground">
              Working in a sector we haven't listed?{" "}
              <Link to="/contact" className="font-semibold text-primary hover:underline">
                Talk to us
              </Link>{" "}
              — chances are we've stripped one before.
            </p>
          </Reveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
