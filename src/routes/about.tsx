import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import { CtaSection } from "@/components/site/CtaSection";
import { stats } from "@/lib/site-data";
import aboutTeam from "@/assets/about-team.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Demo Bros | Demolition Company Melbourne — Since 2013" },
      {
        name: "description",
        content:
          "Demo Bros is an Australian family-owned demolition and strip-out company in Melbourne, operating since 2013. VBA registered, insured to $20M, 4.9★ rated.",
      },
      { property: "og:title", content: "About Demo Bros | Demolition Company Melbourne" },
      { property: "og:description", content: "An Australian family-owned demolition and strip-out company in Melbourne, operating since 2013." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  ["Precision over force", "The best demolition is invisible — you only see what's left, never what it took to get there."],
  ["Family standards", "We're brothers. Our name is on every job, so every job is done as if it were our own home."],
  ["Safety without exception", "No deadline is worth a shortcut. SWMS on every job — residential included — and a safety-first crew that protects your site and ours."],
  ["Straight talk", "Fixed quotes, honest timelines, and a phone that gets answered. Radical, apparently."],
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Two brothers. One obsession: the perfect strip out."
        description="Demo Bros started with a single ute, a sledgehammer and a belief that demolition could be done better — cleaner, safer, smarter. Since 2013, that belief has grown into one of Melbourne's most trusted strip-out crews."
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783752870/Mira_Said_-_Demo_Bros_Talking_Head_Captions_uirzqj.mp4"
        allowAudio={true}
      />

      <section className="pt-16 lg:pt-24">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/80">
              Demo Bros has been stripping out and demolishing across Melbourne since 2013. We started with a simple
              frustration: too much of the demolition trade was chaotic, cavalier and vague on price. So we built the
              opposite — a crew that treats demolition as engineering in reverse, quotes a fixed price, holds the
              program, and hands back a broom-swept site your trades can start on the next morning.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              Today we're the strip-out and partial-demolition specialists for Melbourne homeowners, renovators,
              builders and commercial clients — with full demolition offered alongside. We're VBA registered, insured
              to $20 million, and rated 4.9 stars across 54 Google reviews. Family-owned still means something here:
              you deal with people who take the work personally.
            </p>
          </Reveal>
        </div>
      </section>

      <StorySection />
      <ValuesSection />
      <StatsSection />

      <CtaSection title="Work with a crew that gives a damn." />
    </>
  );
}

function ScrollRevealText({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const words = text.split(" ");
  
  return (
    <p ref={ref} className="flex flex-wrap gap-x-[0.25em] gap-y-2 lg:gap-y-4 font-heading text-3xl uppercase leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}

function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className="py-24 lg:py-40">
      <div className="container-wide">
        <div className="max-w-6xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-6 bg-primary/70" />
              <p className="eyebrow !text-primary/90">Our Story</p>
            </div>
          </Reveal>
          
          <ScrollRevealText text="Most demolition companies chase the big knock-downs. We went the other way — mastering the delicate work nobody else wanted." />
        </div>

        <div className="mt-20 grid items-center gap-16 lg:mt-32 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-7">
            <div ref={ref} className="overflow-hidden rounded-2xl bg-border">
              <motion.img
                style={{ y, scale: 1.2 }}
                src={aboutTeam}
                alt="The Demo Bros founders in front of their excavator"
                width={1280}
                height={1024}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-[1.25]"
              />
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="font-heading text-3xl uppercase tracking-tight lg:text-4xl">
                The Hard Work Became Our Reputation.
              </h3>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Strip outs inside occupied homes, defits above trading shops, partial demolitions against heritage walls. We built our crews for the hardest environments in Melbourne. 
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Today, Demo Bros runs dedicated residential and commercial crews backed by our own fleet, licensed asbestos partners and a recycling-first waste operation. Still family owned. Still answering our own phones.
              </p>
              <Link to="/projects" className="mt-10 inline-flex items-center gap-2 font-heading text-lg text-primary transition-colors hover:text-primary/80 hover:underline uppercase tracking-wider">
                See the work →
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({ title, body, index, total }: { title: string; body: string; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // As the wrapper scrolls up, scale down and fade the sticky card to create depth
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div 
      ref={ref} 
      className="relative w-full" 
      style={{ 
        minHeight: index === total - 1 ? 'auto' : '100vh',
      }}
    >
      <motion.div
        className="sticky w-full"
        style={{
          top: `calc(10rem + ${index * 1.5}rem)`,
          scale,
          opacity,
          zIndex: index, // Ensure cards stack correctly
          transformOrigin: 'top center',
        }}
      >
        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111] p-10 shadow-2xl transition-colors duration-500 hover:border-primary/50 sm:p-14 lg:p-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="font-heading text-4xl text-primary/80 lg:text-6xl">0{index + 1}</span>
          <h3 className="mt-6 font-heading text-3xl uppercase tracking-tight sm:text-4xl lg:mt-10 lg:text-6xl">{title}</h3>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mt-8 lg:text-2xl lg:leading-relaxed">{body}</p>
        </div>
      </motion.div>
    </div>
  );
}

function ValuesSection() {
  return (
    <section className="relative bg-charcoal pb-32 pt-24 lg:pt-32">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col items-center text-center pb-16 lg:pb-32">
            <p className="eyebrow text-primary">What We Stand For</p>
            <h2 className="mt-6 font-heading text-5xl uppercase tracking-tight sm:text-6xl lg:text-8xl">
              The standards behind the name.
            </h2>
          </div>
        </Reveal>
        
        <div className="relative mx-auto flex max-w-4xl flex-col pb-20">
          {values.map(([title, body], i) => (
            <ValueCard key={title} title={title} body={body} index={i} total={values.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const content = stats.map(s => `${s.value}${s.suffix} ${s.label}`).join("  •  ") + "  •  ";
  
  return (
    <section className="overflow-hidden border-y border-border bg-[#0a0a0a] py-16 lg:py-24 flex items-center">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }} 
        transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
        className="flex w-fit whitespace-nowrap"
      >
        <div className="flex">
          <span className="mx-8 font-heading text-4xl uppercase tracking-widest text-primary/90 lg:text-7xl">
            {content}
          </span>
        </div>
        <div className="flex">
          <span className="mx-8 font-heading text-4xl uppercase tracking-widest text-primary/90 lg:text-7xl">
            {content}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
