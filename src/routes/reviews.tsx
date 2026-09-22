import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaSection } from "@/components/site/CtaSection";
import { testimonials } from "@/lib/site-data";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews | Demolition & Strip Outs Melbourne — Demo Bros" },
      {
        name: "description",
        content:
          "Rated 4.9★ across 54 Google reviews. See why Melbourne homeowners, builders and businesses trust Demo Bros for strip outs and demolition.",
      },
      { property: "og:title", content: "Demolition Reviews Melbourne | Demo Bros" },
      { property: "og:description", content: "Rated 4.9★ across 54 Google reviews — see why Melbourne trusts Demo Bros." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Demo Bros",
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: 54, bestRating: "5" },
        }),
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Judged by the people who hired us."
        description="Rated 4.9★ across 54 Google reviews — from homeowners and renovators to builders, fit-out firms and property managers across Melbourne."
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783752870/Mira_Said_-_Demo_Bros_Talking_Head_Captions_uirzqj.mp4"
        allowAudio={true}
      />
      <ReviewsSection />
      <CtaSection title="Add your project to the list." />
    </>
  );
}

import { useIsMobile } from "@/hooks/use-mobile";

function ReviewCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <Reveal>
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-6 sm:p-10 lg:p-14 shadow-2xl transition-colors duration-500 hover:border-primary/50">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        
        <span className="absolute -top-10 -right-6 font-heading text-[8rem] sm:text-[12rem] leading-none text-white/5 transition-colors duration-700 group-hover:text-primary/10 select-none">
          "
        </span>

        <div aria-label={`${t.rating} out of 5 stars`} className="relative z-10 flex gap-1 text-primary">
          {Array.from({ length: t.rating }).map((_, s) => (
            <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="drop-shadow-sm sm:w-6 sm:h-6">
              <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <blockquote className="relative z-10 mt-6 sm:mt-8 text-lg sm:text-xl leading-relaxed text-foreground/90 lg:text-2xl lg:leading-relaxed">
          "{t.quote}"
        </blockquote>
        <figcaption className="relative z-10 mt-8 sm:mt-10 flex flex-col gap-2 border-t border-white/10 pt-6">
          <span className="font-heading text-lg sm:text-xl uppercase tracking-tight lg:text-2xl">{t.name}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-primary/80">{t.role}</span>
        </figcaption>
      </div>
    </Reveal>
  );
}

function ReviewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Left column moves up slightly faster
  const y1 = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  // Right column moves up slightly slower
  const y2 = useTransform(scrollYProgress, [0, 1], ["-5%", "15%"]);

  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <section className="bg-charcoal overflow-hidden py-16 sm:py-24 lg:py-40" ref={ref}>
      <div className="container-wide">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start">
          <motion.div style={isMobile ? {} : { y: y1 }} className="flex flex-col gap-6 sm:gap-8 lg:gap-16">
            {col1.map((t, i) => (
              <ReviewCard key={i} t={t} />
            ))}
          </motion.div>
          
          <motion.div style={isMobile ? {} : { y: y2 }} className="flex flex-col gap-6 sm:gap-8 lg:gap-16 mt-2 sm:mt-8 md:mt-32">
            {col2.map((t, i) => (
              <ReviewCard key={i} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
