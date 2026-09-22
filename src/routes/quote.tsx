import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { QuoteForm } from "@/components/site/QuoteForm";
import { SITE } from "@/lib/site-data";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Demolition Quote Melbourne | 24 Hours — Demo Bros" },
      {
        name: "description",
        content:
          "Get a fixed demolition or strip-out quote in Melbourne within 24 hours. Tell us your job type and suburb — licensed, insured to $20M, no obligation.",
      },
      { property: "og:title", content: "Get a Demolition Quote Melbourne | Demo Bros" },
      { property: "og:description", content: "Fixed demolition quotes within 24 hours. No obligation." },
      { property: "og:url", content: "/quote" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

const promises = [
  ["Fixed price", "The number we quote is the number you pay. Scope changes are priced before they happen — never after."],
  ["24-hour turnaround", "Quotes land within one business day of inspection. Simple strip outs are often quoted same-day from photos."],
  ["Licences attached", "Every quote ships with our demolition licence, $20M public liability certificate and workers comp."],
];

function QuotePage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Left column parallax
  const yLeft = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["-2%", "5%"]);

  return (
    <>
      <PageHero
        eyebrow="Free · No obligation"
        title="A fixed number. In writing. Tomorrow."
        description="Tell us what's coming out. We'll tell you exactly what it costs and exactly when it's done."
        image={heroImg}
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783752840/Seddon_Before_and_after_hype_Reel_Landscape_k7id8s.mov"
      />
      <section className="bg-white text-charcoal py-20 lg:py-32 overflow-hidden border-t border-black/10" ref={ref}>
        <div className="container-wide grid gap-16 lg:grid-cols-12 lg:gap-24 items-start">
          <motion.div style={{ y: yLeft }} className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="space-y-12 lg:space-y-16">
              {promises.map(([title, body], i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <div className="border-t border-black/10 pt-8">
                    <span className="text-sm font-heading tracking-[0.25em] text-primary">0{i + 1}</span>
                    <h2 className="mt-4 font-heading text-3xl uppercase tracking-tight lg:text-4xl text-charcoal">{title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-charcoal/70">{body}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <div className="rounded-3xl border border-black/10 bg-light p-6 lg:p-10 shadow-lg mt-12">
                  <p className="text-base sm:text-lg text-charcoal/70">Prefer to talk it through?</p>
                  <a href={SITE.phoneHref} className="mt-4 block font-heading text-2xl text-primary hover:text-primary/80 transition-colors sm:text-3xl lg:text-4xl">
                    Call {SITE.phone}
                  </a>
                </div>
              </Reveal>
            </div>
          </motion.div>
          
          <motion.div style={{ y: yRight }} className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-black/10 bg-light p-6 shadow-xl transition-colors duration-500 hover:border-primary/50 sm:p-10 lg:p-14">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <h2 className="relative z-10 font-heading text-2xl sm:text-3xl uppercase tracking-tight text-charcoal lg:text-4xl">Request your quote</h2>
                <p className="relative z-10 mt-4 mb-10 text-lg text-charcoal/70">Takes under a minute. No obligation.</p>
                <div className="relative z-10">
                  <QuoteForm />
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>
    </>
  );
}
