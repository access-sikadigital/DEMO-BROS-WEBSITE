import { CtaButton } from "./CtaButton";
import { SITE } from "@/lib/site-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CtaSection({ title = "Ready to make way for what's next?" }: { title?: string }) {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress while this section is in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Move the massive background text from right to left
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);

  // Stagger animation for the main content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  // Split title into words for individual staggering
  const words = title.split(" ");

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-primary py-32 lg:py-48">
      {/* Massive Scroll-Linked Background Marquee */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none overflow-hidden select-none">
        <motion.div 
          style={{ x: marqueeX }} 
          className="whitespace-nowrap font-heading text-[18vw] leading-none text-black mix-blend-overlay"
        >
          LET'S TALK DEMOLITION • LET'S TALK DEMOLITION • LET'S TALK DEMOLITION
        </motion.div>
      </div>

      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent to-black/30 pointer-events-none" />

      {/* Foreground Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container-wide relative z-10 text-center"
      >
        <h2 className="font-heading mx-auto max-w-4xl text-4xl text-balance text-primary-foreground sm:text-5xl lg:text-7xl">
          {words.map((word, i) => (
            <motion.span key={i} variants={itemVariants} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
        </h2>
        
        <motion.p variants={itemVariants} className="mx-auto mt-8 max-w-xl text-lg md:text-xl text-primary-foreground/90 font-medium">
          Fixed quotes within 24 hours. Licensed, insured, and obsessed with clean handovers.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <CtaButton to="/quote" variant="solidLight" size="lg">
            Get a fixed quote
          </CtaButton>
          <CtaButton href={SITE.phoneHref} variant="outlineLight" icon={false} size="lg">
            Call {SITE.phone}
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
