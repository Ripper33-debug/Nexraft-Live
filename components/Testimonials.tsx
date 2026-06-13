"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <SectionShell id="proof" ariaLabelledBy="testimonials-heading">
      <Reveal>
        <SectionHeader
          specLabel="04 / PROOF"
          titleId="testimonials-heading"
          title="What clients say."
          subtitle="Direct feedback from retainer and project work."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
        {TESTIMONIALS.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <figure className="flex h-full flex-col bg-ink2 p-6 md:p-7">
              <blockquote className="flex-1 text-sm leading-relaxed text-mute">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-5">
                <p className="font-display text-sm font-semibold text-bone">
                  {item.name}
                </p>
                <p className="mt-1 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">
                  {item.role} {"\u00b7"} {item.company}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
