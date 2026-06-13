"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    index: "01",
    title: "Scope",
    detail:
      "Discovery call, a fixed monthly rate, and a written spec before anyone builds.",
  },
  {
    index: "02",
    title: "Build in sprints",
    detail:
      "Short cycles with clickable demos, tickets, and measurable checkpoints.",
  },
  {
    index: "03",
    title: "Ship",
    detail:
      "Production deploy, DNS, monitoring, handoff docs. Zero-downtime cutover.",
  },
  {
    index: "04",
    title: "Iterate",
    detail:
      "Retainer hours for features, hosting care, and 3D as the roadmap grows.",
  },
] as const;

function ProcessStep({
  step,
  delay,
}: {
  step: (typeof steps)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal delay={delay} className="h-full">
      <div ref={ref} className="relative h-full border-t border-line pt-6">
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 block h-px bg-signal transition-[width] duration-[800ms] ease-[cubic-bezier(.16,1,.3,1)] ${
            active ? "w-[42px]" : "w-0"
          }`}
        />
        <p className="font-jetbrains text-[11px] tabular-nums text-faint">
          {step.index}
        </p>
        <h3 className="mt-3 font-grotesk text-lg font-semibold text-bone">
          {step.title}
        </h3>
        <p className="mt-2 font-jetbrains text-xs leading-relaxed text-mute">
          {step.detail}
        </p>
      </div>
    </Reveal>
  );
}

export function Process() {
  return (
    <SectionShell id="process" ariaLabelledBy="process-heading">
      <Reveal>
        <SectionHeader
          titleId="process-heading"
          title="How we work."
          tag="04 / PROCESS"
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
        {steps.map((step, i) => (
          <ProcessStep key={step.index} step={step} delay={i * 0.08} />
        ))}
      </div>
    </SectionShell>
  );
}
