import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { PageHero } from "@/components/site/PageHero";
import { CtaSection } from "@/components/site/CtaSection";
import { projects } from "@/lib/site-data";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Our Projects | Demolition & Strip Outs Melbourne — Demo Bros" },
      {
        name: "description",
        content:
          "See recent Demo Bros demolition and strip-out projects across Melbourne — from inner-city kitchen strip outs to commercial make-goods. Proof, not promises.",
      },
      { property: "og:title", content: "Demolition Projects Melbourne | Demo Bros" },
      { property: "og:description", content: "Proof, not promises — selected demolition projects across Melbourne." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="The work speaks. We just document it."
        description="A selection of recent strip outs, defits and demolitions across greater Melbourne."
        // Local video: "/Videos/Demo%20Bros%20video%201%20ACMI%20horizontal%20V1.mp4"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783693988/Demo_Bros_video_1_ACMI_horizontal_V1_xjirhk.mp4"
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
      />

      <section className="py-16 lg:py-24 border-t border-border">
        <div className="container-wide">

          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  filter === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-16 grid gap-12 sm:grid-cols-2 lg:gap-16">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.slug} p={p} i={i} />
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <CtaSection title="Your project belongs on this page." />
    </>
  );
}

function ProjectCard({ p, i }: { p: typeof projects[0], i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col ${i % 2 !== 0 ? "lg:mt-32" : ""}`}
    >
      <Link to="/projects/$slug" params={{ slug: p.slug }} className="flex flex-col">
        <div ref={ref} className="overflow-hidden rounded-lg bg-border">
          <motion.img
            style={{ y, scale: 1.15 }}
            src={p.image}
            alt={p.title}
            width={1280}
            height={1024}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.2]"
          />
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            {p.category} · {p.location}
          </p>
          <h2 className="mt-3 font-heading text-2xl tracking-tight transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
            {p.title}
          </h2>
          <p className="mt-2 text-sm font-semibold text-foreground/70">{p.stat}</p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{p.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View project
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
