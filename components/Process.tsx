"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { DeployTerminal } from "@/components/DeployTerminal";

const steps = [
  {
    title: "Scope",
    detail:
      "Discovery call, written spec, and fixed quote before anyone builds.",
  },
  {
    title: "Build in sprints",
    detail:
      "Short cycles with clickable demos, tickets, and measurable checkpoints.",
  },
  {
    title: "Ship",
    detail:
      "Production deploy, integrations live, handoff docs. Zero-downtime cutover when needed.",
  },
  {
    title: "Iterate",
    detail:
      "Managed partner hours for new tool features, integrations, and site updates as the roadmap grows.",
  },
] as const;

export function Process() {
  return (
    <SectionShell id="process" ariaLabelledBy="process-heading">
      <Reveal>
        <SectionHeader
          specLabel="06 / PROCESS"
          titleId="process-heading"
          title="How we work."
          subtitle="Short cycles, written specs, and production deploys you can watch land."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {steps.map((step) => (
          <div key={step.title} className="border-t border-line pt-6">
            <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mute">
              {step.detail}
            </p>
          </div>
        ))}
      </div>

      <DeployTerminal />
    </SectionShell>
  );
}
