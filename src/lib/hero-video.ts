/**
 * Helpers for fast, instant-start hero background videos.
 *
 * - optimizeHeroVideo(): rewrites a Cloudinary delivery URL so the clip is
 *   small and buffers quickly (auto format + quality, capped to 1280px wide,
 *   which is ample for a darkened, full-bleed background).
 * - heroPoster(): builds a still of the video's FIRST FRAME, so the <video>
 *   poster matches the footage exactly and there is no visible poster -> video
 *   swap when playback starts.
 */

/** Optimize a Cloudinary video URL for fast hero-background delivery. */
export function optimizeHeroVideo(url?: string): string | undefined {
  if (!url || !url.includes("res.cloudinary.com/") || !url.includes("/upload/")) return url;
  const [head, tail] = url.split("/upload/");
  const slash = tail.indexOf("/");
  const firstSeg = slash === -1 ? tail : tail.slice(0, slash);
  const transform = "f_auto,q_auto,w_1280";
  // A version segment (e.g. "v1783693990") means no transform is present yet.
  if (/^v\d+$/.test(firstSeg)) return `${head}/upload/${transform}/${tail}`;
  // Otherwise swap the existing transform segment for our fast one.
  return `${head}/upload/${transform}/${tail.slice(slash + 1)}`;
}

/** First-frame still of the video, used as the poster so there is no poster->video flash. */
export function heroPoster(url?: string, fallback?: string): string | undefined {
  const v = optimizeHeroVideo(url);
  if (!v || !v.includes("res.cloudinary.com/")) return fallback;
  return v
    .replace("/upload/", "/upload/so_0/")
    .replace(/\.(mp4|mov|webm|m4v)(\?.*)?$/i, ".jpg");
}
