import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { optimizeHeroVideo, heroPoster } from "@/lib/hero-video";

import heroImg from "../../src/assets/hero.jpg";
import parallaxBgImg from "../../public/images/trend-demobros-acmi-stage3-apr26-12.jpg";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Counter } from "@/components/site/Counter";
import { FaqList, faqJsonLd } from "@/components/site/FaqList";
import { CtaSection } from "@/components/site/CtaSection";
import { CtaButton } from "@/components/site/CtaButton";
import { GoogleReviewCard, GoogleRatingSummary } from "@/components/site/GoogleReview";
import {
  SITE,
  services,
  projects,
  featuredTestimonials,
  GOOGLE_RATING,
  stats,
  serviceAreas,
  generalFaqs,
  processSteps,
} from "@/lib/site-data";

const serviceCommercialImg = "/images/commercial-strip-outs/hero.jpg";

const homeFaqs = generalFaqs.slice(0, 5);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Demolition Melbourne | Strip Outs & Site Prep — Demo Bros" },
      {
        name: "description",
        content:
          "Melbourne demolition and strip-out specialists. Kitchen, bathroom, internal and commercial strip outs on a fixed price. Get a quote in 24 hours.",
      },
      { property: "og:title", content: "Demolition Melbourne — Strip Outs, Defits & Site Prep | Demo Bros" },
      { property: "og:description", content: "Precision strip outs, defits and controlled demolition across Melbourne — fixed quotes, $20M insured, clean handovers." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(homeFaqs)) }],
  }),
  component: HomePage,
});

/* deterministic dust particles (no Math.random — SSR safe) */
const dust = [
  { left: "8%", d: "16s", x: "60px", o: 0.35, delay: "0s", size: 3 },
  { left: "22%", d: "13s", x: "-40px", o: 0.25, delay: "2s", size: 2 },
  { left: "37%", d: "18s", x: "80px", o: 0.3, delay: "5s", size: 4 },
  { left: "52%", d: "12s", x: "-60px", o: 0.2, delay: "1s", size: 2 },
  { left: "64%", d: "17s", x: "50px", o: 0.35, delay: "7s", size: 3 },
  { left: "78%", d: "14s", x: "-30px", o: 0.25, delay: "3s", size: 2 },
  { left: "90%", d: "19s", x: "40px", o: 0.3, delay: "6s", size: 3 },
];

const trustItems = [
  "Upfront Fixed Pricing",
  "$20M Public Liability",
  "On-Time Completion",
  "VBA Registered",
  "4.9\u2605 from 54 Google Reviews",
  "Australian Family-Owned Since 2013",
];

function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && !videoError) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoError]);

  return (
    <>
      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative flex min-h-svh items-end overflow-hidden">
        <motion.div className="absolute inset-0 bg-black" style={{ y: bgY }}>
          {videoError ? (
            <img src={heroImg} alt="" className="absolute inset-0 h-[115%] w-full object-cover opacity-30" />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={heroPoster("https://res.cloudinary.com/eksopivw/video/upload/v1783693990/Dandy_Demo_landscape_V2_z7zr5e.mp4", heroImg)}
              className="absolute inset-0 h-[115%] w-full object-cover opacity-30"
              src={optimizeHeroVideo("https://res.cloudinary.com/eksopivw/video/upload/v1783693990/Dandy_Demo_landscape_V2_z7zr5e.mp4")}
              onError={() => setVideoError(true)}
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-black/30" />

        {/* dust */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {dust.map((p, i) => (
            <span
              key={i}
              className="animate-dust absolute bottom-0 rounded-full bg-secondary/60"
              style={
                {
                  left: p.left,
                  width: p.size,
                  height: p.size,
                  animationDelay: p.delay,
                  "--dust-d": p.d,
                  "--dust-x": p.x,
                  "--dust-o": p.o,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <motion.div style={{ opacity: fade }} className="container-wide relative z-10 pt-26 sm:pt-48 pb-24 lg:pb-32">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            Precision demolition · Melbourne
          </motion.p>
          {/* Fluid below sm: a fixed 2.6rem was wider than the 320px viewport can
              hold in Akira Expanded, so "SPECIALISTS." wrapped mid-word. */}
          <h1 className="font-heading mt-6 max-w-5xl text-[clamp(1.85rem,8.2vw,3rem)] leading-[1.02] text-balance sm:text-6xl lg:text-8xl">
            {["Melbourne demolition", "& strip-out specialists."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {i === 1 ? (
                    <>
                      & strip-out <span className="text-primary">specialists.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 lg:text-xl"
          >
            Strip outs, defits and controlled demolition across Melbourne — removed with the discipline of engineering
            and the care of an Australian family business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <CtaButton to="/quote">Get a fixed quote</CtaButton>
            <CtaButton to="/projects" variant="outline">
              See our work
            </CtaButton>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <div className="h-14 w-px overflow-hidden bg-foreground/20">
            <motion.div
              className="h-1/2 w-px bg-primary"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section aria-label="Credentials" className="overflow-hidden border-y border-border bg-charcoal py-5">
        <div className="animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]">
          {[...trustItems, ...trustItems].map((item, i) => (
            <span key={i} className="flex items-center gap-12 text-sm font-medium tracking-[0.2em] whitespace-nowrap text-muted-foreground uppercase">
              {item}
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </section>

      {/* ============ WHY DEMO BROS ============ */}
      <section className="py-24 lg:py-36">
        <div className="container-wide grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Why Demo Bros"
            title="Demolition is destruction. Ours is engineering in reverse."
            description="Anyone can swing a hammer. Very few can remove exactly what needs to go — and nothing else — on program, on budget, with a broom-swept handover. That discipline is the entire business."
          />
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["Surgical precision", "We protect what stays as carefully as we remove what goes. Floors covered, dust sealed and services located before a tool starts."],
              ["Fixed price, locked program", "A fixed quote and a fixed timeline. Make-good deadlines and builder start dates don't move, so neither do we."],
              ["Licensed, insured, compliant", "VBA registered with $20 million public liability cover and SWMS on every job — residential included."],
              ["Clean handover", "Waste removed, site swept, handover documented. Your trades start the next morning without a hitch."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="group relative pt-6">
                  {/* Default border */}
                  <div className="absolute left-0 top-0 h-px w-full bg-border transition-colors duration-300 group-hover:bg-transparent" />
                  
                  {/* Hover border (green, sweeps left to right) */}
                  <div className="absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  
                  {/* Subtle hover background glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                  {/* Number (slides right on hover) */}
                  <span className="inline-block text-xs font-semibold tracking-[0.25em] text-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    0{i + 1}
                  </span>
                  
                  <h3 className="mt-3 text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED SERVICES (Mobile Grid) ============ */}
      <section className="bg-light py-24 text-light-foreground lg:hidden">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              light
              eyebrow="What We Do"
              title="Strip outs are the specialty. Precision is the standard."
            />
            <Reveal delay={0.15}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border-b border-light-foreground/30 pb-1 text-sm font-semibold text-light-foreground transition-colors hover:border-primary hover:text-primary"
              >
                All services →
              </Link>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {services
              .filter((s) => s.featured)
              .map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.07}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative block overflow-hidden rounded-lg bg-charcoal"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <h3 className="font-heading text-xl text-secondary">{s.title}</h3>
                      <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-secondary/75 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                        {s.short}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Explore
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED SERVICES (Desktop Horizontal Scroll) ============ */}
      <HorizontalScrollServices />

      {/* ============ PROCESS ============ */}
      <ProcessScrollSpy />

      {/* ============ CORE DISCIPLINE REVEAL ============ */}
      <ScrollRevealSection />

      {/* ============ STICKY PROJECTS STACK ============ */}
      <StickyProjectStack />

      {/* ============ COMMERCIAL ============ */}
      <CommercialRevealSection />

      {/* ============ STATS ============ */}
      <section className="py-24 lg:py-36">
        <div className="container-wide">
          <SectionHeading eyebrow="Track Record" title="The numbers behind the name." align="center" />
          <InteractiveStatsGrid />
        </div>
      </section>

      {/* ============ SERVICE AREAS ============ */}
      <ScrollLinkedServiceAreas />

      {/* ============ TESTIMONIALS ============ */}
      <section className="overflow-hidden py-24 lg:py-36">
        <div className="container-wide">
          <SectionHeading eyebrow="Reviews" title="Word gets around." align="center" />
          <Reveal>
            <GoogleRatingSummary
              value={GOOGLE_RATING.value}
              count={GOOGLE_RATING.count}
              url={GOOGLE_RATING.url}
              className="mx-auto mt-10 w-fit max-w-full"
            />
          </Reveal>
        </div>
        <div className="mt-14">
          {/* Duplicated once so the -50% marquee keyframe loops seamlessly. */}
          <div className="animate-marquee flex w-max gap-6 hover:[animation-play-state:paused]">
            {[...featuredTestimonials, ...featuredTestimonials].map((t, i) => (
              <GoogleReviewCard key={i} t={t} className="w-[22rem] shrink-0 sm:w-[26rem]" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-border py-24 lg:py-36">
        <div className="container-wide grid gap-14 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="FAQ"
              title="Straight answers."
              description="Everything most people ask before their first demolition project."
            />
            <Reveal delay={0.15}>
              <Link to="/faq" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                All questions →
              </Link>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-3" delay={0.1}>
            <FaqList faqs={homeFaqs} />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}

function HorizontalScrollServices() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  
  // Transform vertical scroll to horizontal scroll.
  // Assuming 4 items of ~45vw each, we translate by -55% of the track.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section ref={targetRef} className="hidden lg:block h-[300vh] bg-light text-light-foreground">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-24 pb-12">
        <div className="px-12 md:px-24 lg:px-32 z-10 w-full shrink-0">
          <div className="flex w-full max-w-7xl flex-wrap items-end justify-between gap-6">
            <SectionHeading
              light
              eyebrow="What We Do"
              title="Strip outs are the specialty. Precision is the standard."
            />
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border-b border-light-foreground/30 pb-1 text-sm font-semibold text-light-foreground transition-colors hover:border-primary hover:text-primary"
            >
              All services →
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-8 px-12 md:px-24 lg:px-32 w-max">
            {services
              .filter((s) => s.featured)
              .map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group relative block h-[55vh] w-[45vw] max-w-[40rem] overflow-hidden rounded-lg bg-charcoal shrink-0 shadow-2xl"
                >
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <h3 className="font-heading text-2xl text-secondary">{s.title}</h3>
                  <p className="mt-4 max-h-0 overflow-hidden text-base leading-relaxed text-secondary/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {s.short}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Explore
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}

function ScrollRevealSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Parallax background scale
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 0.6, 0.6, 0.2]);

  const text = "We don't just break things. We engineer their removal.";
  const words = text.split(" ");

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-black text-white">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <img
            src={parallaxBgImg}
            alt="Demolition site"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/80 mix-blend-multiply" />
        </motion.div>

        {/* Text Reveal */}
        <div className="container-wide relative z-10 flex flex-col items-center justify-center text-center">
          <p className="mb-6 text-xs font-bold tracking-[0.3em] text-primary uppercase">
            The Core Discipline
          </p>
          <h2 className="font-heading text-4xl leading-[1.1] md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl">
            {words.map((word, i) => {
              const start = 0.1 + (i / words.length) * 0.5;
              const end = start + 0.15;
              // Each word fades in as you scroll down
              const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
              return (
                <motion.span key={i} style={{ opacity }} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </div>

        {/* Stats Reveal at the end */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.85], [50, 0]),
          }}
          className="absolute bottom-12 left-0 right-0 z-10 mx-auto grid max-w-4xl grid-cols-3 gap-4 px-6 text-center md:gap-8"
        >
          <div>
            <div className="font-heading text-2xl text-primary md:text-4xl">$20M</div>
            <div className="mt-2 text-xs font-semibold tracking-wider text-white/70 uppercase">Public liability</div>
          </div>
          <div>
            <div className="font-heading text-2xl text-primary md:text-4xl">4.9★</div>
            <div className="mt-2 text-xs font-semibold tracking-wider text-white/70 uppercase">54 Google reviews</div>
          </div>
          <div>
            <div className="font-heading text-2xl text-primary md:text-4xl">VBA</div>
            <div className="mt-2 text-xs font-semibold tracking-wider text-white/70 uppercase">Registered</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StickyProjectStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const featuredProjects = projects.slice(0, 3);

  return (
    <section ref={containerRef} className="relative bg-background pt-24 pb-12 lg:pb-0">
      <div className="container-wide mb-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Selected Work" title="Proof, not promises." />
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            All projects →
          </Link>
        </div>
      </div>
      
      {/* Mobile Grid Fallback */}
      <div className="container-wide grid gap-10 lg:hidden">
        {featuredProjects.map((p) => (
          <Link key={p.slug} to="/projects" className="group block">
            <div className="overflow-hidden rounded-lg">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <p className="mt-5 text-xs font-semibold tracking-[0.25em] text-primary uppercase">{p.category}</p>
            <h3 className="mt-2 text-xl font-bold group-hover:text-primary">{p.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.location} · {p.stat}
            </p>
          </Link>
        ))}
      </div>

      {/* Desktop Sticky Stack */}
      <div className="hidden lg:block h-[350vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          <div className="w-full max-w-6xl relative h-[70vh]">
            {featuredProjects.map((p, i) => {
              // Calculate animation range for each card.
              // Card 0: always on screen initially, scales down slightly.
              // Card 1: comes in from bottom from 0 to 0.33, then scales down.
              // Card 2: comes in from bottom from 0.33 to 0.66.
              
              const startIn = Math.max(0, (i - 1) * 0.33);
              const endIn = i * 0.33;
              
              // Move from below screen to center
              const y = useTransform(
                scrollYProgress,
                [startIn, endIn],
                i === 0 ? ["0%", "0%"] : ["120%", "0%"]
              );

              // Scale down slightly as next cards come in
              const scaleStart = endIn;
              const scaleEnd = Math.min(1, scaleStart + 0.33);
              const scale = useTransform(
                scrollYProgress,
                [scaleStart, scaleEnd],
                [1, 0.95 - (i * 0.02)]
              );

              return (
                <motion.div
                  key={p.slug}
                  style={{ y, scale, zIndex: i }}
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-charcoal"
                >
                  <Link to="/projects" className="group block w-full h-full relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-12 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                      <p className="text-sm font-semibold tracking-[0.25em] text-primary uppercase">{p.category}</p>
                      <h3 className="mt-3 text-4xl font-heading text-secondary">{p.title}</h3>
                      <p className="mt-3 text-lg text-secondary/80">
                        {p.location} · {p.stat}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollLinkedServiceAreas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      {/* Mobile Grid Fallback */}
      <section className="bg-light py-24 text-light-foreground lg:hidden">
        <div className="container-wide">
          <SectionHeading
            light
            eyebrow="Service Areas"
            title="Melbourne. Covered."
            description="From CBD tower defits to suburban kitchen strip outs, our crews are on the road across the city every day."
          />
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-x-8 mt-12">
              {serviceAreas.map((area) => (
                <li key={area.slug} className="border-b border-light-foreground/15 py-4 font-semibold text-sm">
                  <Link to="/locations/$slug" params={{ slug: area.slug }} className="hover:text-primary transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/locations"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              All locations →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Desktop Scrub-Linked List */}
      <section ref={containerRef} className="hidden lg:block h-[250vh] bg-light text-light-foreground relative">
        <div className="sticky top-0 flex h-screen items-center w-full overflow-hidden">
          <div className="container-wide grid gap-14 lg:grid-cols-2 lg:gap-24 w-full">
            <div className="flex flex-col justify-center">
              <SectionHeading
                light
                eyebrow="Service Areas"
                title="Melbourne. Covered."
                description="From CBD tower defits to suburban kitchen strip outs, our crews are on the road across the city every day."
              />
              <Link
                to="/locations"
                className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline w-max"
              >
                All locations →
              </Link>
            </div>
            
            <div className="flex flex-col gap-1 sm:gap-2 justify-center">
              {serviceAreas.map((area, i) => {
                // Calculate the segment of scroll progress for this item
                const segment = 1 / serviceAreas.length;
                const start = i * segment;
                const end = start + segment;
                
                // Opacity fades in and out as we scroll past this segment
                const opacity = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.05), start + (segment / 2), Math.min(1, end + 0.05)],
                  [0.15, 1, 0.15]
                );
                
                // Small horizontal slide for the active item
                const x = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.05), start + (segment / 2), Math.min(1, end + 0.05)],
                  [15, 0, 15]
                );
                
                // Optional: scale up slightly when active
                const scale = useTransform(
                  scrollYProgress,
                  [Math.max(0, start - 0.05), start + (segment / 2), Math.min(1, end + 0.05)],
                  [0.95, 1, 0.95]
                );

                return (
                  <motion.div 
                    key={area.slug} 
                    style={{ opacity, x, scale }} 
                    whileHover={{ opacity: 1, x: 0, scale: 1.02 }}
                    className="origin-left"
                  >
                    <Link 
                      to="/locations/$slug"
                      params={{ slug: area.slug }} 
                      className="block text-2xl lg:text-3xl xl:text-4xl font-heading text-charcoal uppercase leading-none py-1 hover:text-primary transition-colors duration-300"
                    >
                      {area.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InteractiveStatsGrid() {
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--x", `${x}px`);
    e.currentTarget.style.setProperty("--y", `${y}px`);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
    >
      {/* Container hover glow (acts as a dynamic spotlight for the borders and background) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(45, 157, 58, 0.4), transparent 40%)`
        }}
      />
      
      {stats.map((s, i) => (
        <div 
          key={s.label} 
          className="relative z-10 bg-background/90 p-10 text-center transition-colors duration-500 hover:bg-background/40"
        >
          <Reveal delay={i * 0.08} className="relative z-20">
            <dd className="font-heading text-5xl text-primary lg:text-6xl transform transition-transform duration-500 group-hover:scale-105 inline-block">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-4 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {s.label}
            </dt>
          </Reveal>
        </div>
      ))}
    </div>
  );
}

function CommercialRevealSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative overflow-hidden border-y border-border h-[80vh] min-h-[600px] flex items-center">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[140%] w-full -top-[20%] z-0"
      >
        <img
          src={serviceCommercialImg}
          alt="Commercial Make-Good"
          className="h-full w-full object-cover"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40 z-0" />
      
      {/* Text Content */}
      <div className="container-wide relative z-10 w-full">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="Commercial"
            title="Make-good deadlines, made good."
            description="Office defits, retail strip outs and base-building make-goods — delivered after-hours, fully documented, with your building manager kept in the loop at every stage."
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4">
              <CtaButton to="/commercial" size="md">
                Commercial solutions
              </CtaButton>
              <CtaButton to="/industries" variant="outline" size="md">
                Industries we serve
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProcessScrollSpy() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    if (latest >= 0.8) index = 4;
    else if (latest >= 0.6) index = 3;
    else if (latest >= 0.4) index = 2;
    else if (latest >= 0.2) index = 1;
    if (activeStep !== index) setActiveStep(index);
  });

  return (
    <section ref={containerRef} className="relative bg-background">
      {/* Mobile Vertical List */}
      <div className="lg:hidden py-24 container-wide">
        <SectionHeading
          eyebrow="The Process"
          title="Five steps. Zero surprises."
          description="Every project — from a single bathroom to a multi-level commercial defit — runs the same disciplined sequence."
        />
        <div className="mt-16 grid gap-4">
          {processSteps.map((step) => (
            <div key={step.n} className="bg-card rounded-xl border border-border p-6 flex flex-col gap-4">
              <span className="font-heading text-3xl text-primary/90">{step.n}</span>
              <div>
                <h3 className="font-heading text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden container-wide flex items-center">
          
          {/* Left: Sticky Number */}
          <div className="w-1/2 h-full flex flex-col justify-center pr-16 relative">
            <div className="absolute top-1/4 left-0">
              <SectionHeading
                eyebrow="The Process"
                title="Five steps. Zero surprises."
                description="Every project — from a single bathroom to a multi-level commercial defit — runs the same disciplined sequence."
              />
            </div>
            <div className="h-[250px] relative overflow-hidden flex items-center mt-24">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-heading text-[15rem] leading-none text-primary/10 select-none absolute"
                >
                  {processSteps[activeStep].n}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Scrolling Content Wrapper */}
          <div className="w-1/2 h-full relative flex flex-col justify-center">
            {/* Vertical Progress Line (Static background) */}
            <div className="absolute left-0 top-[20%] bottom-[20%] w-px bg-border z-0">
              {/* Animated Progress Fill */}
              <motion.div 
                className="w-full bg-primary origin-top"
                style={{ scaleY: scrollYProgress, height: "100%" }}
              />
            </div>
            
            <div className="relative z-10 w-full h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col justify-center pl-16"
                >
                  {/* Indicator Dot */}
                  <div className={cn(
                    "absolute left-[-5px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full transition-colors duration-500",
                    "bg-primary shadow-[0_0_15px_rgba(45,157,58,0.6)]"
                  )} />
                  
                  <span className="font-heading text-xl text-primary">{processSteps[activeStep].n}</span>
                  <h3 className="font-heading text-5xl mt-4">{processSteps[activeStep].title}</h3>
                  <p className="mt-8 text-xl leading-relaxed text-muted-foreground">{processSteps[activeStep].detail}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
