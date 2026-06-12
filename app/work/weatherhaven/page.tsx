import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";

export const metadata: Metadata = {
  title: "Weatherhaven Case Study",
  description:
    "How Nexraft rebuilt Weatherhaven's corporate web presence: a Next.js product catalog and deploy map covering operations in 95 countries, on managed edge infrastructure.",
  openGraph: {
    title: "Case study: Weatherhaven",
    description:
      "Enterprise marketing rebuild. A 95-country deploy catalog on a custom CMS.",
  },
};

const numbers = [
  { value: "95", label: "Countries covered by the deploy map" },
  { value: "1", label: "Unified product catalog and CMS" },
  { value: "99.9%", label: "Uptime target on stacks we operate" },
] as const;

const buildRows = [
  {
    index: "01",
    title: "Catalog architecture",
    detail:
      "Product families, variants, and spec data modeled in a custom CMS. Editors update content without touching code.",
  },
  {
    index: "02",
    title: "Global deploy map",
    detail:
      "Interactive map of deployments across 95 countries. Built as a first-class proof asset, not a static graphic.",
  },
  {
    index: "03",
    title: "Performance budget",
    detail:
      "Static-first rendering with edge delivery. Budgets enforced from the first sprint, not patched at the end.",
  },
  {
    index: "04",
    title: "Managed operations",
    detail:
      "We run the stack we shipped: DNS, SSL, monitoring, and backups under a hosting retainer.",
  },
] as const;

export default function WeatherhavenCaseStudy() {
  return (
    <section className="section-pad-tight border-b border-border bg-surface-deep">
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Record / 01
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Case study
          </p>
          <h1 className="mt-3 text-display-section font-display font-semibold text-foreground">
            Weatherhaven. A 95-country deploy catalog.
          </h1>

          <p className="prose-measure mt-6 text-body text-muted">
            Weatherhaven engineers rapidly deployable shelter systems used in
            defense, medical, and remote operations worldwide. Their web
            presence had to carry the same weight as their hardware.
          </p>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-border">
            <Image
              src="/case-studies/weatherhaven.png"
              alt="Weatherhaven corporate website rebuilt by Nexraft"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            weatherhavenusa.com {"\u00b7"} live production
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              The brief
            </p>
            <p className="prose-measure mt-4 text-body-sm text-muted">
              A complex, engineered product line spread across formats that
              buyers could not navigate. The mandate: rebuild the corporate
              site as a structured catalog, make global reach visible, and
              put publishing in the hands of the internal team.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              The build
            </p>
            <div className="mt-4 border-t border-border">
              {buildRows.map((row) => (
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
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              Next.js {"\u00b7"} TypeScript {"\u00b7"} Custom CMS {"\u00b7"} Edge
              delivery
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              The numbers
            </p>
            <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
              {numbers.map((n) => (
                <div key={n.label} className="bg-surface-deep p-4 md:p-5">
                  <p className="font-display text-3xl font-bold tracking-tight text-foreground">
                    {n.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-border bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Want a build like this?
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              We scope enterprise rebuilds on a discovery call and quote a
              fixed monthly rate in writing before any work starts.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <BookCallButton label="Book a call" variant="primary" />
              <Link
                href="https://weatherhavenusa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                data-cursor-hover
              >
                View the live site
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <Link
              href="/"
              className="link-underline inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
              data-cursor-hover
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
