import { ScrollReveal } from "@/components/ScrollReveal";
import { sectionLabel } from "@/lib/sections";

const steps = [
  {
    index: "01",
    title: "Scope",
    detail: "Discovery call, fixed monthly rate, and a written spec before build.",
  },
  {
    index: "02",
    title: "Build in sprints",
    detail: "Short cycles with demos, tickets, and measurable checkpoints.",
  },
  {
    index: "03",
    title: "Ship",
    detail: "Vercel deploy, DNS, monitoring, and handoff docs. Production-ready.",
  },
  {
    index: "04",
    title: "Iterate",
    detail: "Retainer hours for features, hosting care, and 3D as the roadmap evolves.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="section-pad-tight scroll-mt-20 border-b border-border"
      aria-labelledby="process-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {sectionLabel("process")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="process-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            How we work.
          </ScrollReveal>

          <ol className="mt-6 divide-y divide-border border-t border-border" role="list">
            {steps.map((step) => (
              <li
                key={step.index}
                className="process-step grid grid-cols-12 gap-3 py-5 md:gap-5 md:py-6"
              >
                <ScrollReveal className="contents">
                  <span className="col-span-2 font-mono text-xs tabular-nums text-accent md:col-span-1">
                    {step.index}
                  </span>
                  <div className="col-span-10 md:col-span-11 md:grid md:grid-cols-11 md:gap-6">
                    <p className="font-display text-base font-medium text-foreground md:col-span-3">
                      {step.title}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-muted md:col-span-8 md:mt-0">
                      {step.detail}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
