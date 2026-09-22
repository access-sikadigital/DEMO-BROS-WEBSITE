import { ReactNode, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useRouterState } from "@tanstack/react-router";
import "lenis/dist/lenis.css";

/**
 * On client-side navigation, Lenis keeps its own scroll offset and animates
 * back to it — so a new page can open scrolled to where the previous one was.
 * Reset Lenis (and native scroll as a fallback) to the top on every path change.
 */
function ScrollReset() {
  const lenis = useLenis();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.12, smoothWheel: true }}>
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
