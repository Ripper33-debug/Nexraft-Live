"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    title: "Scope",
    detail:
      "Discovery call, a fixed monthly rate, and a written spec before anyone builds.",
  },
  {
    title: "Build in sprints",
    detail:
      "Short cycles with clickable demos, tickets, and measurable checkpoints.",
  },
  {
    title: "Ship",
    detail:
      "Production deploy, DNS, monitoring, handoff docs. Zero-downtime cutover.",
  },
  {
    title: "Iterate",
    detail:
      "Retainer hours for features, hosting care, and 3D as the roadmap grows.",
  },
] as const;

export function Process() {
  return (
    <SectionShell id="process" ariaLabelledBy="process-heading">
      <Reveal>
        <SectionHeader titleId="process-heading" title="How we work." />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {steps.map((step) => (
          <div key={step.title} className="border-t border-line pt-6">
            <h3 className="font-display text-lg font-semibold text-bone">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
