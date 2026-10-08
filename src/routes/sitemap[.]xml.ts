import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services, projects, serviceAreas } from "@/lib/site-data";

const BASE_URL = "https://www.demobros.com.au";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "weekly", priority: "0.9" },
          ...services.map((s) => ({
            path: `/services/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
          { path: "/strip-out-demolition", changefreq: "monthly", priority: "0.8" },
          { path: "/commercial-demolition", changefreq: "monthly", priority: "0.8" },
          { path: "/commercial", changefreq: "monthly", priority: "0.8" },
          { path: "/industries", changefreq: "monthly", priority: "0.7" },
          { path: "/locations", changefreq: "monthly", priority: "0.7" },
          ...serviceAreas.map((a) => ({
            path: `/locations/${a.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          { path: "/projects", changefreq: "weekly", priority: "0.7" },
          ...projects.map((p) => ({
            path: `/projects/${p.slug}`,
            changefreq: "yearly" as const,
            priority: "0.5",
          })),
          { path: "/about", changefreq: "monthly", priority: "0.6" },
          { path: "/reviews", changefreq: "weekly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/quote", changefreq: "yearly", priority: "0.9" },
          { path: "/privacy", changefreq: "yearly", priority: "0.2" },
          { path: "/terms", changefreq: "yearly", priority: "0.2" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
