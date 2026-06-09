import { FounderCard } from "@/components/FounderCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProofStrip } from "@/components/ProofStrip";
import { sectionLabel } from "@/lib/sections";

export function About() {
  return (
    <section
      id="about"
      className="section-pad-tight scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="about-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {sectionLabel("about")}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="about-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            Built like infrastructure, not&nbsp;marketing.
          </ScrollReveal>

          <div className="mt-6 space-y-4 border-t border-border pt-6">
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

            <FounderCard />

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
