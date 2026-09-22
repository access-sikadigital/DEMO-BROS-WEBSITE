import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Demo Bros" },
      { name: "description", content: "The terms that govern quotes, bookings and demolition services from Demo Bros." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections: [string, string][] = [
  [
    "Quotes",
    "Quotes are fixed for the scope described and valid for 30 days. Work outside the agreed scope is quoted and approved in writing before it proceeds. Quotes assume reasonable site access as inspected.",
  ],
  [
    "Bookings and scheduling",
    "Confirmed bookings are held with a deposit. Program dates are locked once services are disconnected and approvals are in place. We notify you immediately of any weather or approval-driven changes.",
  ],
  [
    "Hazardous materials",
    "Suspected asbestos or other hazardous materials discovered during works pause the affected area until licensed testing is complete. Removal of confirmed hazardous material is quoted separately as required by law.",
  ],
  [
    "Site condition and handover",
    "Sites are handed over broom-swept and photographed. Any pre-existing damage is documented in a dilapidation record before work begins. Claims must be raised within 7 days of handover.",
  ],
  [
    "Liability",
    "Demo Bros holds $20M public liability insurance and full workers compensation coverage. Our liability is limited to the re-performance of defective work or the cost of re-performing it.",
  ],
];

function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated July 2026." />
      <section className="py-16 lg:py-24">
        <div className="container-wide max-w-3xl space-y-12">
          {sections.map(([title, body]) => (
            <div key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
