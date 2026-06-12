import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { PRICES, formatUsd } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Squarespace Migration",
  description:
    "Migrate from Squarespace or Wix to a faster, custom-built site on managed edge infrastructure. Migration included with hosting from $350/mo. Zero-downtime cutover.",
  openGraph: {
    title: "Squarespace migration, done by engineers",
    description:
      "We move your site off Squarespace or Wix and run it on managed edge infrastructure. Migration included.",
  },
};

const pains = [
  {
    index: "01",
    title: "Template ceiling",
    detail:
      "Layout and feature limits you cannot code around. Every workaround is another plugin or another monthly fee.",
  },
  {
    index: "02",
    title: "Page speed",
    detail:
      "Builder sites ship heavy scripts you cannot remove. Slow pages cost rankings and conversions.",
  },
  {
    index: "03",
    title: "Lock-in",
    detail:
      "Your content lives in their system, on their terms, at their next price increase.",
  },
] as const;

const steps = [
  {
    index: "01",
    title: "Audit",
    detail: "We review your current site, content, SEO state, and DNS.",
  },
  {
    index: "02",
    title: "Rebuild",
    detail:
      "Custom build with a CMS tailored to your content workflow. You approve a clickable demo first.",
  },
  {
    index: "03",
    title: "Migrate",
    detail:
      "Content, redirects, and DNS moved with a zero-downtime cutover. Rankings preserved with 1:1 redirects.",
  },
  {
    index: "04",
    title: "Run",
    detail:
      "We operate the stack: SSL, backups, monitoring, and updates. 99.9% uptime on stacks we operate.",
  },
] as const;

export default function SquarespaceMigrationPage() {
  return (
    <section className="section-pad-tight border-b border-border bg-surface-deep">
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Migration / Squarespace
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h1 className="text-display-section font-display font-semibold text-foreground">
            Move off Squarespace without losing your content.
          </h1>

          <p className="prose-measure mt-6 text-body text-muted">
            We migrate Squarespace and Wix sites to custom-built,
            engineer-grade stacks on managed edge infrastructure. Migration is
            included with hosting. Your content, your domain, your rankings
            come with you.
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Why teams leave builders
            </p>
            <div className="mt-4 border-t border-border">
              {pains.map((row) => (
                <div
                  key={row.index}
                  className="grid grid-cols-12 gap-4 border-b border-border py-5 md:gap-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {row.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h2 className="font-display text-base font-semibold text-foreground">
                      {row.title}
                    </h2>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-8 md:col-start-auto">
                    <p className="font-mono text-xs leading-relaxed text-muted">
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              How the migration works
            </p>
            <div className="mt-4 border-t border-border">
              {steps.map((row) => (
                <div
                  key={row.index}
                  className="grid grid-cols-12 gap-4 border-b border-border py-5 md:gap-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-xs tabular-nums text-muted">
                      {row.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h2 className="font-display text-base font-semibold text-foreground">
                      {row.title}
                    </h2>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-8 md:col-start-auto">
                    <p className="font-mono text-xs leading-relaxed text-muted">
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-border bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Hosting rescue
            </p>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {formatUsd(PRICES.hosting.managed)}/mo
            </p>
            <p className="mt-2 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Managed hosting with the migration included. Site rebuilds are
              quoted as a fixed rate on a discovery call. No quotes by
              surprise, no hourly creep. Web retainers include managed hosting
              at no extra charge.
            </p>
            <div className="mt-5">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Recent delivery
              </p>
              <Link
                href="/work/weatherhaven"
                className="link-underline mt-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                data-cursor-hover
              >
                Weatherhaven case study
              </Link>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Direct line
              </p>
              <div className="mt-3">
                <ContactEmails stacked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
