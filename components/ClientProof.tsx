"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { BOOK_CALL_URL } from "@/lib/site";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]";

const REFERENCES = [
  {
    company: "Weatherhaven",
    outcome:
      "We helped turn a complex physical product into a web-based sales and product experience.",
    href: "/work/weatherhaven",
    live: "https://weatherhavenusa.com",
  },
  {
    company: "Outfyre",
    outcome: "Custom site and funnel built for a complex product launch.",
    href: "/work/outfyre",
    live: "https://outfyre.com",
  },
] as const;

export function ClientProof() {
  return (
    <SectionShell id="proof" ariaLabelledBy="proof-heading">
      <Reveal>
        <SectionHeader
          specLabel="05 / PROOF"
          titleId="proof-heading"
          title="Complex products, shipped."
          subtitle="Named references and live tools for teams that needed more than a brochure site."
        />
      </Reveal>

      <Reveal delay={0.04}>
        <figure className="mt-10 border border-border bg-bg-secondary p-6 md:mt-12 md:p-8">
          <blockquote className="font-body text-lg leading-relaxed text-text-primary md:text-xl">
            &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 border-t border-border pt-5">
            <p className="font-body text-sm font-semibold text-text-primary">
              {FEATURED_TESTIMONIAL.name}
            </p>
            <p className="mt-1 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-text-muted">
              {FEATURED_TESTIMONIAL.role} · {FEATURED_TESTIMONIAL.company}
            </p>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {REFERENCES.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.05}>
            <article className="flex h-full flex-col bg-bg-primary p-6 md:p-7">
              <p className="font-jetbrains text-[10px] uppercase leading-none tracking-[0.14em] text-text-muted">
                Case study
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                {item.company}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                {item.outcome}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-5">
                <Link
                  href={item.href}
                  className={`text-sm text-text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent ${focusRing}`}
                >
                  Read case study
                </Link>
                <a
                  href={item.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-text-tertiary underline decoration-border underline-offset-4 transition-colors hover:text-text-primary ${focusRing}`}
                >
                  Live site →
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-8 border border-border bg-bg-secondary p-6 md:p-7">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
            Need a named reference?
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
            We share additional client contacts and approved quotes once we know
            your tool scope.
          </p>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-block text-sm text-text-primary underline decoration-border underline-offset-4 transition-colors hover:text-accent ${focusRing}`}
          >
            Book a discovery call
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
