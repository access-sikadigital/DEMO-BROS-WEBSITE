import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { FaqList, faqJsonLd } from "@/components/site/FaqList";
import { CtaSection } from "@/components/site/CtaSection";
import { QuoteForm } from "@/components/site/QuoteForm";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found | Demo Bros" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: service.metaTitle ?? `${service.title} — Fixed Quotes in 24hrs | Demo Bros` },
        { name: "description", content: service.metaDescription ?? service.short },
        { property: "og:title", content: service.metaTitle ?? `${service.title} | Demo Bros` },
        { property: "og:description", content: service.metaDescription ?? service.short },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.short,
            provider: { "@type": "LocalBusiness", name: "Demo Bros" },
            areaServed: "Greater Melbourne, Australia",
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(faqJsonLd(service.faqs)) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
              { "@type": "ListItem", position: 3, name: service.title, item: `/services/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="eyebrow">Not found</p>
      <h1 className="font-heading mt-4 text-4xl">That service doesn't exist.</h1>
      <Link to="/services" className="mt-8 text-primary hover:underline">
        View all services →
      </Link>
    </div>
  );
}

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={service.kicker ?? "Service"} title={service.h1 ?? service.title} description={service.intro} image={service.image} imageAlt={service.title} />

      <nav aria-label="Breadcrumb" className="container-wide pt-8">
        <ol className="flex gap-2 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/services" className="hover:text-foreground">Services</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{service.title}</li>
        </ol>
      </nav>

      {Boolean(service.gallery?.length || service.videos?.length) && (
        <section className="pt-10 lg:pt-14">
          <div className="container-wide">
            <ProjectGallery
              title={service.title}
              images={[service.image, ...(service.gallery ?? [])]}
              videos={service.videos}
            />
          </div>
        </section>
      )}

      {service.body && service.body.length > 0 && (
        <section className="pt-14 lg:pt-20">
          <div className="container-wide max-w-3xl">
            {service.body.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-foreground/80 [&:not(:first-child)]:mt-6">{para}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24">
        <div className="container-wide grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow="What's included" title="Scope, handled end to end." />
            <ul className="mt-10 space-y-4">
              {service.bullets.map((b: string, i: number) => (
                <Reveal key={b} delay={i * 0.05}>
                  <li className="flex items-start gap-4 border-b border-border pb-4">
                    <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                      ✓
                    </span>
                    <span className="text-foreground/85">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <Reveal>
              <div className="rounded-lg border border-border bg-card p-8 lg:p-10">
                <h2 className="font-heading text-2xl">Get your fixed quote</h2>
                <p className="mt-3 mb-8 text-sm text-muted-foreground">
                  Tell us about your {service.title.toLowerCase()} project — we'll respond within one business day.
                </p>
                <QuoteForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="container-wide grid gap-14 lg:grid-cols-5 lg:gap-24">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="FAQ" title={`${service.title}, answered.`} />
          </div>
          <Reveal className="lg:col-span-3">
            <FaqList faqs={service.faqs} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border py-16 lg:py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="Related" title="You might also need" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.07}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="group block overflow-hidden rounded-lg border border-border bg-card">
                  <div className="overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold group-hover:text-primary">{s.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.short}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
