import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqList({ faqs, light }: { faqs: { q: string; a: string }[]; light?: boolean }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((f, i) => (
        <AccordionItem
          key={f.q}
          value={`faq-${i}`}
          className={light ? "border-light-foreground/15" : "border-border"}
        >
          <AccordionTrigger
            className={`py-6 text-left text-base font-semibold hover:no-underline sm:text-lg ${
              light ? "text-light-foreground hover:text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            {f.q}
          </AccordionTrigger>
          <AccordionContent
            className={`pb-6 text-base leading-relaxed ${light ? "text-light-foreground/70" : "text-muted-foreground"}`}
          >
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
