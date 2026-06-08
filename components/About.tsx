import { ScrollReveal } from "@/components/ScrollReveal";
import { ProofStrip } from "@/components/ProofStrip";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border bg-surface-deep py-24 md:py-32"
      aria-labelledby="about-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 mb-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            02 / About
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="about-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Built like infrastructure, not marketing.
          </ScrollReveal>

          <div className="mt-12 space-y-6 border-t border-border pt-12">
            <ScrollReveal
              as="p"
              className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            >
              Nexraft is an engineering studio — not a product company. We ship
              web applications, run the hosting underneath them, and produce 3D
              assets when the brief demands it.
            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            >
              Every engagement is scoped, documented, and delivered with the
              same rigor you&apos;d expect from a technical spec: clear
              timelines, measurable performance targets, and no hand-waving.
            </ScrollReveal>

            <ScrollReveal
              as="p"
              className="max-w-2xl font-mono text-sm leading-relaxed text-muted"
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
