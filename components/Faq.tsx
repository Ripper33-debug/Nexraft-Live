import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { FAQ_ITEMS } from "@/lib/faq";

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Faq() {
  return (
    <SectionShell id="faq" ariaLabelledBy="faq-heading">
      <Reveal>
        <SectionHeader
          specLabel="07 / FAQ"
          titleId="faq-heading"
          title="Questions, answered."
          subtitle="Straight answers to what teams ask before they hire us."
        />
      </Reveal>

      <div className="mt-12 border-t border-border">
        {FAQ_ITEMS.map((item, index) => (
          <Reveal key={item.q} delay={index * 0.03}>
            <details className="faq-item border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-body text-sm font-medium text-text-primary md:text-base">
                  {item.q}
                </span>
                <span
                  className="faq-icon font-jetbrains text-lg leading-none text-accent"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 font-body text-sm leading-relaxed text-text-secondary md:text-base">
                {item.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>

      <FaqJsonLd />
    </SectionShell>
  );
}
