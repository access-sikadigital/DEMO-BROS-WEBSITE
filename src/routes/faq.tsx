import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FaqList, faqJsonLd } from "@/components/site/FaqList";
import { CtaSection } from "@/components/site/CtaSection";
import { generalFaqs } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Demolition & Strip Out FAQs Melbourne — Demo Bros" },
      {
        name: "description",
        content:
          "Answers on demolition and strip outs in Melbourne — permits, cost, timing, asbestos, dust and make good. Fixed quotes in 24 hours from Demo Bros.",
      },
      { property: "og:title", content: "Demolition & Strip Out FAQs Melbourne | Demo Bros" },
      { property: "og:description", content: "Straight answers to every demolition question." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(generalFaqs)) }],
  }),
  component: FaqPage,
});

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimatedFaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        
        return (
          <motion.div
            key={faq.q}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative overflow-hidden rounded-3xl border transition-colors duration-500 cursor-pointer ${
              isOpen 
                ? "border-primary/50 bg-[#111] shadow-2xl" 
                : "border-white/5 bg-charcoal/40 hover:border-white/20 hover:bg-[#111]"
            }`}
            onClick={() => setOpenIndex(isOpen ? null : i)}
          >
            {/* Liquid Glow */}
            <div 
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent transition-opacity duration-700 ${
                isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              }`} 
            />
            
            <motion.div layout className="relative z-10 flex items-center justify-between p-8 sm:p-10 lg:p-12">
              <h3 className={`font-heading text-xl uppercase tracking-tight sm:text-2xl lg:text-3xl pr-8 transition-colors duration-500 ${isOpen ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}>
                {faq.q}
              </h3>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isOpen ? 'border-primary text-primary bg-primary/10 rotate-45 scale-110' : 'border-white/10 text-white/40 group-hover:border-primary/50 group-hover:text-primary'}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </motion.div>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10"
                >
                  <div className="px-8 pb-8 pt-0 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12 text-lg leading-relaxed text-muted-foreground lg:text-xl lg:leading-loose">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Ask us anything. We've heard it all."
        description="Licences, asbestos, waste, cost, timing — the answers most people need before their first demolition project."
        image="/images/trend-demobros-acmi-stage3-apr26-12.jpg"
        video="https://res.cloudinary.com/eksopivw/video/upload/q_auto,f_auto,w_1920/v1783693993/Demo_Bros_video_2_ACMI_horizontal_V1_ptmeln.mp4"
      />
      <section className="bg-charcoal py-20 lg:py-32">
        <div className="container-wide">
          <AnimatedFaqList faqs={generalFaqs} />
        </div>
      </section>
      <CtaSection title="Question not answered? Just call." />
    </>
  );
}
