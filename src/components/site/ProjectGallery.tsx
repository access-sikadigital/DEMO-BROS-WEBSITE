import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Maximize2 } from "lucide-react";
import { Reveal } from "./Reveal";

type MediaItem = { type: "image" | "video"; src: string };

/**
 * Rotating aspect ratios so the masonry visibly staggers even when every source
 * image shares the same dimensions. Cycle length (5) is coprime with the column
 * counts (2 / 3) so the pattern doesn't line up into neat rows. Thumbnails are
 * cropped to these ratios; the lightbox always shows the full, uncropped media.
 */
const MASONRY_RATIOS = [
  "aspect-[4/5]",
  "aspect-[1/1]",
  "aspect-[3/4]",
  "aspect-[2/3]",
  "aspect-[5/6]",
];

/**
 * Project media gallery with a full-screen lightbox.
 * Thumbnails (images + videos) open into an overlay with prev/next,
 * keyboard navigation (←/→/Esc) and click-outside to close.
 */
export function ProjectGallery({
  title,
  images,
  videos = [],
}: {
  title: string;
  images: string[];
  videos?: string[];
}) {
  const items: MediaItem[] = [
    ...images.map((src) => ({ type: "image" as const, src })),
    ...videos.map((src) => ({ type: "video" as const, src })),
  ];

  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, close, next, prev]);

  if (items.length === 0) return null;

  const feature = items[0];
  const rest = items.slice(1);

  return (
    <>
      {/* Feature */}
      <Reveal>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-border"
          aria-label={`Open ${title} gallery`}
        >
          {feature.type === "video" ? (
            <>
              <video
                src={`${feature.src}#t=0.5`}
                preload="metadata"
                muted
                playsInline
                className="aspect-video w-full object-cover"
              />
              <PlayBadge />
            </>
          ) : (
            <img
              src={feature.src}
              alt={`${title} — 1`}
              width={1600}
              height={900}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/70 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <Maximize2 className="h-4 w-4" />
          </span>
        </button>
      </Reveal>

      {/* Thumbnail grid — masonry (equal-width columns, natural aspect ratios) */}
      {rest.length > 0 && (
        <div className="mt-4 columns-2 gap-4 sm:columns-3 lg:mt-6 lg:gap-6 [&>*]:mb-4 lg:[&>*]:mb-6">
          {rest.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 0.05} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i + 1)}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-lg border border-border bg-border"
                aria-label={`Open ${title} media ${i + 2}`}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={`${item.src}#t=0.5`}
                      preload="metadata"
                      muted
                      playsInline
                      className={`block w-full object-cover ${MASONRY_RATIOS[i % MASONRY_RATIOS.length]}`}
                    />
                    <PlayBadge small />
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={`${title} — ${i + 2}`}
                    loading="lazy"
                    className={`block w-full object-cover transition-transform duration-700 group-hover:scale-105 ${MASONRY_RATIOS[i % MASONRY_RATIOS.length]}`}
                  />
                )}
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && index !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
          >
            {/* Top bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 lg:p-7">
              <span className="text-sm font-medium tracking-wide text-foreground/70">
                {index + 1} / {items.length}
              </span>
              <button
                onClick={close}
                aria-label="Close gallery"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-charcoal/60 text-foreground transition-colors hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous"
                className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-charcoal/60 text-foreground transition-colors hover:bg-accent lg:left-6"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <motion.div
              key={index}
              className="relative flex max-h-[82vh] max-w-[92vw] items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {items[index].type === "video" ? (
                <video
                  src={items[index].src}
                  controls
                  playsInline
                  preload="metadata"
                  className="max-h-[82vh] max-w-[92vw] rounded-lg"
                />
              ) : (
                <img
                  src={items[index].src}
                  alt={`${title} — ${index + 1}`}
                  className="max-h-[82vh] max-w-[92vw] rounded-lg object-contain"
                />
              )}
            </motion.div>

            {items.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next"
                className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-charcoal/60 text-foreground transition-colors hover:bg-accent lg:right-6"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PlayBadge({ small }: { small?: boolean }) {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span
        className={`flex items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110 ${
          small ? "h-11 w-11" : "h-16 w-16"
        }`}
      >
        <Play className={small ? "h-4 w-4" : "h-6 w-6"} fill="currentColor" />
      </span>
    </span>
  );
}
