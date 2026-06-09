import { ScrollReveal } from "@/components/ScrollReveal";

const comparisons = [
  {
    index: "01",
    versus: "Freelancer",
    detail:
      "One invoice for web, hosting, and 3D \u2014 not three vendors to coordinate.",
  },
  {
    index: "02",
    versus: "Agency",
    detail:
      "No account layers. You work directly with the engineers shipping your build.",
  },
  {
    index: "03",
    versus: "In-house hire",
    detail:
      "Retainer flex without recruiting lag \u2014 scale hours up or down monthly.",
  },
] as const;

export function WhyNexraft() {
  return (
    <section
      className="section-pad-tight scroll-mt-20 border-b border-border"
      aria-labelledby="why-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Why Nexraft
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="why-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            One studio. Three disciplines. No&nbsp;coordination tax.
          </ScrollReveal>

          <div className="mt-6 divide-y divide-border border-t border-border">
            {comparisons.map((item) => (
              <ScrollReveal
                key={item.index}
                className="grid grid-cols-12 gap-4 py-5 md:gap-6 md:py-6"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {item.index}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    vs {item.versus}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-8 md:col-start-5">
                  <p className="text-sm leading-relaxed text-muted md:text-base">
                    {item.detail}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
