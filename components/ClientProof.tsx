"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const REFERENCES = [
  {
    company: "Weatherhaven",
    outcome:
      "95-country deploy map, unified product catalog, and a live rebuild at weatherhavenusa.com.",
    href: "/work/weatherhaven",
    live: "https://weatherhavenusa.com",
  },
  {
    company: "Outfyre",
    outcome: "Retainer funnel and growth site for product launches.",
    href: "/work/outfyre",
    live: "https://outfyre.com",
  },
] as const;

export function ClientProof() {
  return (
    <SectionShell id="proof" ariaLabelledBy="proof-heading">
      <Reveal>
        <SectionHeader
          specLabel="04 / PROOF"
          titleId="proof-heading"
          title="Client delivery."
          subtitle="Named references and attributed quotes are available on a discovery call. Published work speaks for itself."
        />
      </Reveal>

      {/* TODO: replace with real, client-approved quote + attribution */}
      <Reveal delay={0.04}>
        <figure className="mt-10 border border-line bg-ink2 p-6 md:mt-12 md:p-8">
          <blockquote className="font-display text-lg leading-relaxed text-bone md:text-xl">
            &ldquo;[Client-approved quote goes here.]&rdquo;
          </blockquote>
          <figcaption className="mt-6 border-t border-line pt-5">
            <p className="font-display text-sm font-semibold text-bone">
              [Full name]
            </p>
            <p className="mt-1 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">
              [Title] {"\u00b7"} [Company]
            </p>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
        {REFERENCES.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.05}>
            <article className="flex h-full flex-col bg-ink2 p-6 md:p-7">
              <p className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint">
                Case study
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-bone">
                {item.company}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                {item.outcome}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5">
                <Link
                  href={item.href}
                  className={`text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal ${focusRing}`}
                >
                  Read case study
                </Link>
                <a
                  href={item.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm text-mute underline decoration-line underline-offset-4 transition-colors hover:text-bone ${focusRing}`}
                >
                  Live site {"\u2197"}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-8 border border-line bg-ink2 p-6 md:p-7">
          <p className="font-display text-lg font-semibold text-bone">
            Need a named reference?
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
            We share client contacts and approved quotes once we know your
            project scope. No anonymous placeholders on this site.
          </p>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-5 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal ${focusRing}`}
          >
            Book a discovery call
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
