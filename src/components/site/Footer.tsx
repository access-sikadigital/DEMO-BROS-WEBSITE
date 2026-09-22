import { Link } from "@tanstack/react-router";
import logoLight from "@/assets/logo-light.svg";
import { CtaButton } from "./CtaButton";
import { SITE, serviceGroups } from "@/lib/site-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  // Track scroll over the footer element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Parallax on the decorative wordmark only. It used to transform the whole
  // footer, which shifted the content up 15% and scaled it to 0.92 inside an
  // overflow-hidden box — so the top was clipped until you scrolled right to
  // the bottom. Links and contact details must never move out of reach.
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["18%", "0%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="border-t border-border bg-charcoal relative overflow-hidden"
    >
      <div className="relative flex w-full flex-col justify-between pt-16 lg:pt-24">
        <div className="container-wide">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <img
                src={logoLight}
                alt="Demo Bros"
                className="h-28 w-auto"
                width={334}
                height={330}
                loading="lazy"
              />
              <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
                Melbourne's precision demolition specialists. Strip outs, defits and controlled
                demolition — delivered with the discipline of engineering and the care of an
                Australian family business.
              </p>
              <div className="mt-8 flex flex-col gap-2 text-sm">
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {SITE.phone}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {SITE.email}
                </a>
                <span className="text-muted-foreground">{SITE.address}</span>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Company
              </h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-1">
                {(
                  [
                    ["About", "/about"],
                    ["Projects", "/projects"],
                    ["Industries", "/industries"],
                    ["Reviews", "/reviews"],
                    ["Locations", "/locations"],
                    ["FAQ", "/faq"],
                    ["Contact", "/contact"],
                    ["Get a Quote", "/quote"],
                  ] as const
                ).map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-foreground/80 transition-colors hover:text-primary relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Grouped to match the header menu, three groups side by side. */}
            <div className="lg:col-span-6">
              <h3 className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
                Services
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
                {serviceGroups.map((g) => (
                  <div key={g.label}>
                    <h4 className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                      {g.label}
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {g.items.map((s) => (
                        <li key={s.label}>
                          <Link
                            to={s.to}
                            params={s.params}
                            className="text-sm text-foreground/80 transition-colors hover:text-primary relative inline-block after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Massive Branding at the bottom */}
        <div className="mt-8 flex w-full select-none flex-col items-center justify-end overflow-hidden px-4 pointer-events-none">
          {/* nowrap + a size that fits the viewport: at 12.5vw the wordmark was
              wider than the screen, wrapped to two lines and got clipped by the
              parent's overflow-hidden. */}
          <motion.h2
            style={isMobile ? {} : { y: wordmarkY, opacity: wordmarkOpacity }}
            className="font-heading text-center text-[10vw] leading-none font-black tracking-tighter whitespace-nowrap text-white/5"
          >
            DEMO BROS
          </motion.h2>
        </div>

        {/* Copyright Bar */}
        <div className="container-wide pb-8 pt-4 relative z-10 bg-charcoal/50 backdrop-blur-sm border-t border-white/5 mt-auto">
          <div className="flex flex-col items-start justify-between gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Demo Bros Pty Ltd · ABN {SITE.abn} · VBA Compliant · $20M
              Insured
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
