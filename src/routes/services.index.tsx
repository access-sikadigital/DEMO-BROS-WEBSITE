import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { services } from "@/lib/site-data";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Demolition Services Melbourne | Strip Outs & Defits — Demo Bros" },
      {
        name: "description",
        content:
          "Every demolition service in one crew: kitchen & bathroom strip outs, internal & partial demolition, commercial defits and house demolition. Fixed quotes.",
      },
      { property: "og:title", content: "Demolition Services Melbourne | Demo Bros" },
      { property: "og:description", content: "Residential and commercial strip outs, defits and house demolition across Melbourne." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Demolition services across Melbourne"
        description="From a single splashback to a multi-level make-good — the same crew discipline, the same clean handover. Choose the service you need, or tell us the project and we'll scope it for you."
        image={heroImg}
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783693947/Forefront_Demo_Landscape_gst8nf.mp4"
      />

      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Demo Bros is a Melbourne demolition and strip-out company built around one idea: remove exactly what
              needs to go, protect everything that stays, and hand back a clean, builder-ready site. We're VBA
              registered, insured to $20 million, and we quote a fixed price with a locked program — so there are no
              day-rate surprises and no blown deadlines.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Our work splits into three groups:{" "}
              <strong className="text-foreground">residential strip outs</strong> (kitchens, bathrooms, internal and
              partial demolition), <strong className="text-foreground">commercial strip outs and defits</strong>{" "}
              (offices, retail, hospitality and end-of-lease make-goods), and{" "}
              <strong className="text-foreground">full demolition</strong> (house demolition and controlled commercial
              demolition). Whatever the scope, you deal with the same disciplined crew.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-wide flex flex-col">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 * i}>
              <ServiceRow s={s} i={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="container-wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Fixed price, no creep", "A locked quote after inspection — no day-rate surprises."],
                ["On-time programs", "Make-good deadlines and builder start dates hold."],
                ["VBA registered & insured", "$20M public liability, SWMS on every job."],
                ["Clean handover", "Broom-swept, documented and builder-ready."],
              ] as const
            ).map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection title="Not sure which service you need?" />
    </>
  );
}

function ServiceRow({ s, i }: { s: typeof services[0]; i: number }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="group block border-b border-border py-8 transition-colors lg:py-12"
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-6 lg:gap-12">
          <span className="font-heading text-sm text-muted-foreground lg:text-base">
            {String(i + 1).padStart(2, "0")}
          </span>
          {/* Sized off the longest title ("Renovation Preparation") so every row
              stays on one line. The old lg:text-6xl / xl:text-7xl steps were
              wider than the row could hold and wrapped the longer names. */}
          <h2 className="font-heading text-[clamp(1.5rem,4vw,3rem)] uppercase transition-colors group-hover:text-primary">
            {s.title}
          </h2>
        </div>
        <span className="hidden justify-self-end text-4xl text-muted-foreground transition-all duration-500 group-hover:-rotate-45 group-hover:text-primary md:block">
          →
        </span>
      </div>

      <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
        <div className="overflow-hidden">
          <div className="pt-8 lg:pt-12 grid gap-8 md:grid-cols-12 items-end">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:col-span-5 lg:col-span-4 lg:text-xl">
              {s.short}
            </p>
            <div className="overflow-hidden rounded-md md:col-span-7 lg:col-span-8">
              <img
                src={s.image}
                alt={s.title}
                width={1024}
                height={768}
                loading="lazy"
                className="aspect-[21/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
