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
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="">
          <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
            Record / 01
          </p>
        </div>

        <div className="">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal-dim">
            Case study
          </p>
          <h1 className="mt-3 font-grotesk text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            Weatherhaven. A 95-country deploy catalog.
          </h1>

          <p className="prose-measure mt-6 text-sm text-mute">
            Weatherhaven engineers rapidly deployable shelter systems used in
            defense, medical, and remote operations worldwide. Their web
            presence had to carry the same weight as their hardware.
          </p>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-line">
            <Image
              src="/case-studies/weatherhaven.png"
              alt="Weatherhaven corporate website rebuilt by Nexraft"
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
            weatherhavenusa.com {"\u00b7"} live production
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              The brief
            </p>
            <p className="prose-measure mt-4 text-sm text-mute">
              A complex, engineered product line spread across formats that
              buyers could not navigate. The mandate: rebuild the corporate
              site as a structured catalog, make global reach visible, and
              put publishing in the hands of the internal team.
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              The build
            </p>
            <div className="mt-4 border-t border-line">
              {buildRows.map((row) => (
                <div
                  key={row.index}
                  className="grid grid-cols-12 gap-4 border-b border-line py-5 md:gap-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-jetbrains text-xs tabular-nums text-mute">
                      {row.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h2 className="font-display text-base font-semibold text-bone">
                      {row.title}
                    </h2>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-8 md:col-start-auto">
                    <p className="font-jetbrains text-xs leading-relaxed text-mute">
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
              Next.js {"\u00b7"} TypeScript {"\u00b7"} Custom CMS {"\u00b7"} Edge
              delivery
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              The numbers
            </p>
            <div className="mt-4 grid gap-px border border-line bg-border sm:grid-cols-3">
              {numbers.map((n) => (
                <div key={n.label} className="bg-surface-deep p-4 md:p-5">
                  <p className="font-display text-3xl font-bold tracking-tight text-bone">
                    {n.value}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
                    {n.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-line bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              Want a build like this?
            </p>
            <p className="mt-3 max-w-lg font-jetbrains text-xs leading-relaxed text-mute">
              We scope enterprise rebuilds on a discovery call and quote a
              fixed monthly rate in writing before any work starts.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <BookCallButton label="Book a call" variant="primary" />
              <Link
                href="https://weatherhavenusa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-jetbrains text-xs uppercase tracking-[0.2em] text-bone"
                data-cursor-hover
              >
                View the live site
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-8">
            <Link
              href="/"
              className="link-underline inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-bone"
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
