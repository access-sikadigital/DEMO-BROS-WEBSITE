import { useEffect, useState, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLenis } from "lenis/react";
import logoLight from "@/assets/logo-light.svg";
import { CtaButton } from "./CtaButton";
import { SITE, serviceGroups } from "@/lib/site-data";

const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Reviews", to: "/reviews" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  // Which group's services fill the right pane of the desktop menu.
  const [activeGroup, setActiveGroup] = useState(serviceGroups[0].label);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (latest > 150 && latest > previous + 10) {
      setHidden(true);
    } else if (latest < previous - 10) {
      setHidden(false);
    }
    
    if (latest > 150) {
      timeoutRef.current = setTimeout(() => {
        setHidden(false);
      }, 800);
    }
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on navigation
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const lenis = useLenis();
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
          scrolled ? "border-border bg-charcoal/85 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          }}
          className={`container-wide flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3" : "py-5 lg:py-7"
          }`}
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
          >
            <Link to="/" aria-label="Demo Bros — home" className="shrink-0">
              <img
                src={logoLight}
                alt="Demo Bros"
                className={`w-auto transition-all duration-500 ease-out ${
                  scrolled ? "h-12 lg:h-14" : "h-16 lg:h-24"
                }`}
                width={334}
                height={330}
              />
            </Link>
          </motion.div>

          <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
            {nav.map((item) =>
              item.label === "Services" ? (
                <motion.div
                  key={item.to}
                  variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={item.to}
                    activeProps={{ className: "text-primary" }}
                    inactiveProps={{ className: "text-foreground/75 hover:text-foreground" }}
                    className="flex items-center gap-1 text-sm font-medium tracking-wide transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className={`mt-0.5 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  {/* Two-pane menu: group names on the left, the hovered group's
                      services on the right. Beats a flat list of 13 links, and
                      beats nested flyouts — the right pane never disappears
                      while the pointer travels toward it. */}
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-4 transition-all duration-200 ${
                      servicesOpen ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-xl border border-border bg-charcoal/95 shadow-2xl backdrop-blur-xl">
                      <div className="flex">
                        <div className="w-1/2 border-r border-border/60 p-2">
                          {serviceGroups.map((g) => (
                            <button
                              key={g.label}
                              type="button"
                              onMouseEnter={() => setActiveGroup(g.label)}
                              onFocus={() => setActiveGroup(g.label)}
                              aria-current={activeGroup === g.label}
                              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                                activeGroup === g.label
                                  ? "bg-white/5 text-primary"
                                  : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
                              }`}
                            >
                              {g.label}
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </button>
                          ))}
                        </div>
                        <div className="w-1/2 p-2">
                          {(serviceGroups.find((g) => g.label === activeGroup) ?? serviceGroups[0]).items.map(
                            (s) => (
                              <Link
                                key={s.label}
                                to={s.to}
                                params={s.params}
                                onClick={() => setServicesOpen(false)}
                                className="block rounded-lg px-4 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-white/5 hover:text-primary"
                              >
                                {s.label}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                      <Link
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block border-t border-border/60 px-4 py-3 text-sm font-semibold text-primary"
                      >
                        View all services →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={item.to} variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "text-primary" }}
                    inactiveProps={{ className: "text-foreground/75 hover:text-foreground" }}
                    className="group relative text-sm font-medium tracking-wide transition-colors"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              )
            )}
            <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}>
              <CtaButton to="/quote" size="sm" className="ml-2">
                Get Quote
              </CtaButton>
            </motion.div>
          </nav>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center gap-4 xl:hidden"
          >
            <span className="hidden sm:block">
              <CtaButton to="/quote" size="sm">
                Get Quote
              </CtaButton>
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center"
            >
              <span
                className={`absolute h-px w-7 bg-foreground transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                className={`absolute h-px w-7 bg-foreground transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </motion.div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-charcoal"
          >
            <div className="container-wide flex flex-1 flex-col justify-center pt-24 pb-12">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {nav.map((item, i) =>
                  item.label === "Services" ? (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((v) => !v)}
                        aria-expanded={mobileServicesOpen}
                        className="font-heading flex w-full items-center justify-between py-2 text-3xl text-foreground transition-colors hover:text-primary sm:text-4xl"
                      >
                        Services
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            {/* Groups are laid out flat here rather than behind a
                                hover, which doesn't exist on touch. */}
                            <div className="flex flex-col gap-0.5 border-l border-border/40 pb-3 pl-4">
                              {serviceGroups.map((g) => (
                                <div key={g.label} className="mb-2">
                                  <p className="pt-2 pb-1 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                                    {g.label}
                                  </p>
                                  {g.items.map((s) => (
                                    <Link
                                      key={s.label}
                                      to={s.to}
                                      params={s.params}
                                      onClick={() => setOpen(false)}
                                      className="block py-1.5 text-lg text-foreground/80 transition-colors hover:text-primary"
                                    >
                                      {s.label}
                                    </Link>
                                  ))}
                                </div>
                              ))}
                              <Link
                                to="/services"
                                onClick={() => setOpen(false)}
                                className="block py-1.5 text-lg font-semibold text-primary"
                              >
                                View all services →
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        to={item.to}
                        activeOptions={{ exact: item.to === "/" }}
                        activeProps={{ className: "text-primary" }}
                        inactiveProps={{ className: "text-foreground" }}
                        className="font-heading block py-2 text-3xl transition-colors hover:text-primary sm:text-4xl"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-10 flex flex-col gap-4"
              >
                <CtaButton to="/quote" onClick={() => setOpen(false)} className="w-fit">
                  Get a fixed quote
                </CtaButton>
                <a href={SITE.phoneHref} className="text-lg text-muted-foreground hover:text-foreground">
                  {SITE.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
