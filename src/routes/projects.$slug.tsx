import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaSection } from "@/components/site/CtaSection";
import { CtaButton } from "@/components/site/CtaButton";
import { ProjectGallery } from "@/components/site/ProjectGallery";
import { projects, projectDetails, SITE } from "@/lib/site-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project, details: projectDetails[params.slug] };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found | Demo Bros" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} | Demolition Project — Demo Bros` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.title} | Demo Bros` },
        { property: "og:description", content: project.description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: project.image },
        { property: "og:url", content: `/projects/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            about: project.category,
            description: project.description,
            image: project.image,
            locationCreated: { "@type": "Place", name: project.location },
            creator: { "@type": "LocalBusiness", name: "Demo Bros" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
              { "@type": "ListItem", position: 3, name: project.title, item: `/projects/${params.slug}` },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectPage,
});

function ProjectNotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="eyebrow">Not found</p>
      <h1 className="font-heading mt-4 text-4xl">That project doesn't exist.</h1>
      <Link to="/projects" className="mt-8 text-primary hover:underline">
        View all projects →
      </Link>
    </div>
  );
}

function ProjectPage() {
  const { project, details } = Route.useLoaderData();

  // Related: same-category first, then fill with others.
  const related = [
    ...projects.filter((p) => p.slug !== project.slug && p.category === project.category),
    ...projects.filter((p) => p.slug !== project.slug && p.category !== project.category),
  ].slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        image={project.image}
        imageAlt={project.title}
        video={details?.video}
        allowAudio={Boolean(details?.video)}
      />

      <nav aria-label="Breadcrumb" className="container-wide pt-8">
        <ol className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <li>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/projects" className="hover:text-foreground">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {project.title}
          </li>
        </ol>
      </nav>

      {/* Media gallery with lightbox */}
      <section className="pt-10 lg:pt-14">
        <div className="container-wide">
          <ProjectGallery
            title={project.title}
            images={[project.image, ...(details?.gallery ?? [])]}
            videos={details?.videos}
          />
        </div>
      </section>

      {/* Overview + facts */}
      <section className="py-16 lg:py-24">
        <div className="container-wide grid gap-14 lg:grid-cols-3 lg:gap-20">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="The project" title="What the job involved." />

            {details?.outcome && (
              <Reveal>
                <p className="mt-8 text-xl leading-relaxed text-foreground/90">{details.outcome}</p>
              </Reveal>
            )}

            {details?.scope && details.scope.length > 0 && (
              <ul className="mt-10 space-y-4">
                {details.scope.map((item, i) => (
                  <Reveal key={item} delay={i * 0.05}>
                    <li className="flex items-start gap-4 border-b border-border pb-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
                      >
                        ✓
                      </span>
                      <span className="text-foreground/85">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>

          {/* Facts card */}
          <div>
            <Reveal>
              <div className="rounded-lg border border-border bg-card p-8">
                <h2 className="font-heading text-xl">Project details</h2>
                <dl className="mt-6 space-y-5 text-sm">
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                      Category
                    </dt>
                    <dd className="mt-1 text-foreground/90">{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                      Location
                    </dt>
                    <dd className="mt-1 text-foreground/90">{project.location}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                      Scope
                    </dt>
                    <dd className="mt-1 text-foreground/90">{project.stat}</dd>
                  </div>
                  {details?.services && details.services.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                        Services
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {details.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80"
                          >
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <CtaButton to="/quote" size="md" fullWidth>
                    Start a project like this
                  </CtaButton>
                  <CtaButton href={SITE.phoneHref} variant="outline" size="md" fullWidth icon={false}>
                    Call {SITE.phone}
                  </CtaButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="border-t border-border py-16 lg:py-24">
          <div className="container-wide">
            <SectionHeading eyebrow="More work" title="Related projects" />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.07}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group block overflow-hidden rounded-lg border border-border bg-card"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                        {p.category}
                      </p>
                      <h3 className="mt-2 font-bold group-hover:text-primary">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection title="Your project belongs on this page." />
    </>
  );
}
