import { useCallback, useRef, useState } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";

/** Draggable before/after comparison slider. */
export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/2] w-full cursor-ew-resize touch-pan-y overflow-hidden rounded-lg select-none"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(4, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(96, p + 4));
      }}
    >
      <img
        src={afterImg}
        alt="Kitchen space after a complete Demo Bros strip out — bare framing and clean concrete floor"
        className="absolute inset-0 h-full w-full object-cover"
        width={1280}
        height={853}
        loading="lazy"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img
          src={beforeImg}
          alt="Dated kitchen before demolition"
          className="absolute inset-0 h-full w-full object-cover"
          width={1280}
          height={853}
          loading="lazy"
        />
      </div>
      {/* handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-secondary" />
        <div className="absolute top-1/2 -left-6 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-charcoal/80 backdrop-blur">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
            <path d="M6 1 1 6l5 5M14 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
          </svg>
        </div>
      </div>
      <span className="pointer-events-none absolute top-4 left-4 rounded-sm bg-charcoal/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-secondary uppercase backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-sm bg-primary px-3 py-1 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase">
        After
      </span>
    </div>
  );
}
