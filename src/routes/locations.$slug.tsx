import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { serviceAreas, services } from "@/lib/site-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Route = createFileRoute("/locations/$slug")({
  loader: ({ params }) => {
    const area = serviceAreas.find((a) => a.slug === params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Location not found | Demo Bros" }, { name: "robots", content: "noindex" }] };
    }
    const { area } = loaderData;
    return {
      meta: [
        { title: `Demolition & Strip Outs in ${area.name} | Demo Bros` },
        { name: "description", content: `Demolition and strip-out specialists in ${area.name}, Melbourne. Kitchen, bathroom, internal and commercial strip outs. Fixed quotes, $20M insured.` },
        { property: "og:title", content: `Demolition & Strip Outs in ${area.name} | Demo Bros` },
        { property: "og:description", content: area.detail },
        { property: "og:url", content: `/locations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/locations/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Demo Bros",
            description: `Demolition and strip-out specialists servicing ${area.name}, Melbourne.`,
            areaServed: area.name,
            telephone: "1800 960 625",
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: 54, bestRating: "5" },
          }),
        },
      ],
    };
  },
  notFoundComponent: LocationNotFound,
  component: LocationPage,
});

function LocationNotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="eyebrow">Not found</p>
      <h1 className="font-heading mt-4 text-4xl">That service area doesn't exist.</h1>
      <Link to="/locations" className="mt-8 text-primary hover:underline">
        View all service areas →
      </Link>
    </div>
  );
}

function LocationPage() {
  const { area } = Route.useLoaderData();
  const textRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 80%", "end 50%"],
  });

  // Parallax the services grid
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  
  const y1 = useTransform(gridProgress, [0, 1], [0, -100]);
  const y2 = useTransform(gridProgress, [0, 1], [100, -200]);

  // Split words for kinetic typography reveal
  const words = area.detail.split(" ");

  return (
    <>
      <PageHero
        eyebrow={`Service area · ${area.name}`}
        title={`Demolition & strip outs in ${area.name}`}
        description={`Precision strip outs, partial and full demolition in ${area.name} — fixed price, structure protected, and a clean, builder-ready handover.`}
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783752840/Seddon_Before_and_after_hype_Reel_Landscape_k7id8s.mov"
      />

      <section className="pt-14 lg:pt-20">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Demo Bros services {area.name} and the surrounding suburbs, within roughly 30 km of the Melbourne CBD.
              Whether it's a kitchen or bathroom strip out, opening up a floor plan, a partial demolition before an
              extension, or a commercial defit, you get the same disciplined crew — VBA registered, insured to $20
              million, fixed price, and a clean, broom-swept handover.
            </p>
          </Reveal>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="container-wide pt-8">
        <ol className="flex gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <li>
            <Link to="/" className="hover:text-foreground">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/locations" className="hover:text-foreground">Locations</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-primary font-semibold">{area.name}</li>
        </ol>
      </nav>

      {/* Kinetic Typography Detail Section */}
      <section className="py-24 lg:py-40 bg-background overflow-hidden border-b border-border">
        <div className="container-wide">
          <div className="max-w-4xl" ref={textRef}>
            <p className="font-heading text-4xl leading-tight sm:text-5xl lg:text-7xl lg:leading-tight">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
                );
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Parallax Services Grid */}
      <section className="py-24 lg:py-32 bg-charcoal overflow-hidden" ref={gridRef}>
        <div className="container-wide">
          <Reveal>
            <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow text-primary">Services</p>
                <h2 className="mt-4 font-heading text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
                  What we do in {area.name}
                </h2>
              </div>
              <Link to="/services" className="text-sm font-semibold uppercase tracking-widest text-primary hover:underline">
                View all services →
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-10">
            <motion.div style={{ y: y1 }} className="flex flex-col gap-6 lg:gap-10">
              {services.filter((_, i) => i % 2 === 0).map((service) => (
                <ServiceGlassCard key={service.slug} service={service} areaName={area.name} />
              ))}
            </motion.div>
            <motion.div style={{ y: y2 }} className="flex flex-col gap-6 lg:gap-10 mt-12 sm:mt-24">
              {services.filter((_, i) => i % 2 !== 0).map((service) => (
                <ServiceGlassCard key={service.slug} service={service} areaName={area.name} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CtaSection title={`Ready to start your project in ${area.name}?`} />
    </>
  );
}

function ServiceGlassCard({ service, areaName }: { service: typeof services[0]; areaName: string }) {
  return (
    <Link to="/services/$slug" params={{ slug: service.slug }} className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-10 shadow-2xl transition-all duration-700 hover:border-primary/50 sm:p-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative z-10 flex flex-col h-full justify-between gap-12">
        <div>
          <h3 className="font-heading text-2xl uppercase tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {service.title}
          </h3>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {service.short}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            {areaName} Focus
          </span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="inline-block mr-[0.25em]">
      <motion.span style={{ opacity }} className="inline-block text-foreground">
        {word}
      </motion.span>
    </span>
  );
}
