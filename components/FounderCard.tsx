"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FounderAvatar } from "@/components/FounderAvatar";
import { FOUNDERS } from "@/lib/site";

export function FounderCard() {
  return (
    <ScrollReveal className="founder-card mt-6 border border-border bg-surface-deep/80 p-4 md:p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        Founders
      </p>
      <p className="mt-3 max-w-xl font-mono text-sm leading-relaxed text-muted">
        You work directly with us on the discovery call and every sprint after
        {" \u2014 "}no account managers, no handoffs. We scope in writing, then
        ship demos you can click.
      </p>

      <div className="mt-6 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:gap-8">
        {FOUNDERS.map((founder) => (
          <div key={founder.email} className="flex items-start gap-4">
            <div className="founder-portrait relative shrink-0">
              <span className="founder-portrait-corner founder-portrait-corner-tl" />
              <span className="founder-portrait-corner founder-portrait-corner-tr" />
              <span className="founder-portrait-corner founder-portrait-corner-bl" />
              <span className="founder-portrait-corner founder-portrait-corner-br" />
              <div className="founder-portrait-frame relative h-20 w-20 overflow-hidden bg-surface-deep md:h-24 md:w-24">
                <FounderAvatar initials={founder.initials} />
              </div>
            </div>
            <div className="min-w-0 pt-1">
              <p className="font-display text-base font-semibold text-foreground md:text-lg">
                {founder.name}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                Co-founder
              </p>
              <Link
                href={`mailto:${founder.email}`}
                className="link-underline mt-2 inline-block font-mono text-xs text-foreground/90 hover:text-foreground"
              >
                {founder.email}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
