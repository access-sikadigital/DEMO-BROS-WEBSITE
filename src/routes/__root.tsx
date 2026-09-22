import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logomarkSvg from "@/assets/logomark.svg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CtaButton } from "@/components/site/CtaButton";
import { captureTracking } from "@/lib/tracking";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-24">
      <div className="max-w-xl text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="font-heading mt-6 text-hero text-foreground">Demolished</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          This page has been stripped out. Unlike our sites, we can't hand this one back — but
          everything else is exactly where it should be.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton to="/" size="md">
            Back to home
          </CtaButton>
          <CtaButton to="/services" variant="outline" size="md">
            View services
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-2xl text-foreground">This page didn't load</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CtaButton
            size="sm"
            icon={false}
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </CtaButton>
          <CtaButton href="/" variant="outline" size="sm" icon={false}>
            Go home
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Demo Bros — Precision Demolition & Strip Outs Melbourne" },
      {
        name: "description",
        content:
          "Melbourne's precision demolition specialists. Strip outs, office defits, kitchen & bathroom demolition and controlled demolition. Licensed, insured, fixed quotes in 24 hours.",
      },
      { name: "author", content: "Demo Bros" },
      { property: "og:title", content: "Demo Bros — Precision Demolition & Strip Outs Melbourne" },
      {
        property: "og:description",
        content:
          "Strip outs, defits and controlled demolition delivered with engineering discipline. Licensed and insured across Melbourne.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Demo Bros" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: logomarkSvg, type: "image/svg+xml" },
    ],
    scripts: [
      // Google Tag Manager — container GTM-M9642CM. Rendered by <HeadContent /> into
      // <head> on every route. All downstream tags (GA4, Google Ads, Meta Pixel) are
      // managed inside the GTM container, not in this codebase.
      {
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M9642CM');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "/#business",
          name: "Demo Bros",
          description:
            "Precision demolition and strip out specialists servicing Melbourne and surrounds. Kitchen and bathroom demolition, commercial strip outs, office defits, internal and partial demolition.",
          telephone: "+61-1800-960-625",
          email: "info@demobros.com.au",
          address: {
            "@type": "PostalAddress",
            streetAddress: "103/181 Rosamond Rd",
            addressLocality: "Maribyrnong",
            addressRegion: "VIC",
            postalCode: "3032",
            addressCountry: "AU",
          },
          areaServed: "Greater Melbourne, Australia",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: 54,
            bestRating: "5",
          },
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) — must stay the first node inside <body>. */}
        {/* @tanstack/devtools-vite stamps a dev-only data-tsd-source="file:line:col"
            attribute on JSX, and computes a different line for this node in the
            server vs client transform — which React reports as a hydration
            mismatch on every page load. The attribute doesn't exist in the
            production build, and the markup here is a static string that can't
            legitimately differ, so suppressing the check on this node is safe. */}
        <noscript
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M9642CM" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Capture first-touch ad/campaign attribution on the visitor's landing page.
  useEffect(() => {
    captureTracking();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll>
        <Header />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main suppressHydrationWarning>
          <Outlet />
        </main>
        <Footer />
      </SmoothScroll>
    </QueryClientProvider>
  );
}
