import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Demo Bros" },
      { name: "description", content: "How Demo Bros collects, uses and protects your personal information." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: [string, string][] = [
  [
    "Information we collect",
    "When you request a quote or contact us, we collect the details you provide — typically your name, contact details, property address and project description. We also collect standard website analytics data.",
  ],
  [
    "How we use it",
    "Your information is used solely to respond to your enquiry, prepare quotes, deliver our services and meet our legal obligations. We do not sell or rent personal information to anyone.",
  ],
  [
    "Storage and security",
    "Personal information is stored securely and accessed only by team members who need it to serve you. We retain project records for the period required by Australian law and insurance obligations.",
  ],
  [
    "Third parties",
    "We share information only with parties essential to your project — for example licensed asbestos assessors or your nominated builder — and only with your knowledge.",
  ],
  [
    "Your rights",
    "You may request access to, correction of, or deletion of your personal information at any time by emailing info@demobros.com.au. We respond to all privacy requests within 30 days.",
  ],
];

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated July 2026." />
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
