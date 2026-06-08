import { ScrollReveal } from "@/components/ScrollReveal";
import { ProofStrip } from "@/components/ProofStrip";

export function About() {
  return (
    <section
      id="about"
      className="section-pad scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="about-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            02 / About
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="about-heading"
            className="text-display-section font-display font-semibold text-foreground"
          >
            Built like infrastructure, not marketing.
          </ScrollReveal>

          <div className="mt-8 space-y-5 border-t border-border pt-8">
            <ScrollReveal as="p" className="prose-measure text-body text-muted">
              Nexraft is an engineering studio — not a product company. We ship
              web applications, run the hosting underneath them, and produce 3D
              assets when the brief demands it.
            </ScrollReveal>

            <ScrollReveal as="p" className="prose-measure text-body text-muted">
              Every engagement is scoped, documented, and delivered with the
              same rigor you&apos;d expect from a technical spec: clear
              timelines, measurable performance targets, and no hand-waving.
            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="font-mono text-xs leading-relaxed text-muted"
            >
              Based remote · Working globally · Est. 2024
            </ScrollReveal>
          </div>

          <ProofStrip />
        </div>
      </div>
    </section>
  );
}
