import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";

export const metadata: Metadata = {
  title: "Weatherhaven Case Study",
  description:
    "How Nexraft rebuilt Weatherhaven's web presence as two coordinated sites — weatherhaven.com and weatherhavenusa.com — with a product catalog and deploy map covering operations in 95 countries, on managed edge infrastructure.",
  openGraph: {
    title: "Case study: Weatherhaven",
    description:
      "Enterprise rebuild, twice over. Two coordinated sites and a 95-country deploy catalog.",
  },
};

const buildItems = [
  {
    title: "Catalog architecture",
    detail:
      "Product families, variants, and spec data modeled in a custom CMS. Editors update content without touching code.",
  },
  {
    title: "Global deploy map",
    detail:
      "Interactive map of deployments across 95 countries. Built as a first-class proof asset, not a static graphic.",
  },
  {
    title: "Performance budget",
    detail:
      "Static-first rendering with edge delivery. Budgets enforced from the first sprint, not patched at the end.",
  },
  {
    title: "Managed operations",
    detail:
      "We run the stack we shipped: DNS, SSL, monitoring, and backups under a hosting retainer.",
  },
] as const;

const numbers = [
  { value: "95", label: "Countries on the deploy map" },
  { value: "2", label: "Full sites on one shared content system" },
  { value: "99.9%", label: "Uptime target on stacks we operate" },
] as const;

export default function WeatherhavenCaseStudy() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          Case study
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
          Weatherhaven. A 95-country deploy catalog.
        </h1>

        <p className="prose-measure mt-6 text-base leading-relaxed text-mute">
          Weatherhaven engineers rapidly deployable shelter systems used in
          defense, medical, and remote operations worldwide. Their web
          presence had to carry the same weight as their hardware.
        </p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-line">
          <Image
            src="/case-studies/weatherhaven.png"
            alt="Weatherhaven corporate website rebuilt by Nexraft"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <p className="mt-3 text-sm text-faint">
          <a
            href="https://weatherhaven.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft transition-colors hover:text-bone"
          >
            weatherhaven.com
          </a>
          {" \u00b7 "}
          <a
            href="https://weatherhavenusa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft transition-colors hover:text-bone"
          >
            weatherhavenusa.com
          </a>
          {" \u00b7 "} live production
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            The brief
          </h2>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-mute">
            A complex, engineered product line spread across formats that
            buyers could not navigate. The mandate: rebuild the corporate site
            as a structured catalog, make global reach visible, and put
            publishing in the hands of the internal team.
          </p>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            Two sites, one system
          </h2>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-mute">
            Weatherhaven sells globally but contracts regionally. The US
            entity needed its own presence — separate domain, separate
            compliance language, its own contract vehicles — without forking
            the brand or doubling the editorial workload. We shipped
            weatherhavenusa.com as a second front end on the same content
            system: shared catalog data, region-specific pages, one place to
            publish.
          </p>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-line">
            <Image
              src="/case-studies/weatherhavenusa-com.png"
              alt="weatherhavenusa.com — the US-entity site built by Nexraft on the shared Weatherhaven content system"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <p className="mt-3 text-sm text-faint">
            weatherhavenusa.com {"\u00b7"} same catalog, US-specific contract
            and compliance content
          </p>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            The build
          </h2>
          <ul className="mt-6 space-y-6">
            {buildItems.map((item) => (
              <li
                key={item.title}
                className="border-b border-line pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            The numbers
          </h2>
          <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label} className="bg-ink2 p-5">
                <p className="font-display text-3xl font-semibold text-bone">
                  {n.value}
                </p>
                <p className="mt-2 text-sm text-mute">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-line bg-ink2 p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
            Want a build like this?
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
            We scope enterprise rebuilds on a discovery call and quote a fixed
            monthly rate in writing before any work starts.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <BookCallButton label="Book a call" variant="primary" />
            <Link
              href="https://weatherhaven.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-mute"
            >
              weatherhaven.com
            </Link>
            <Link
              href="https://weatherhavenusa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-mute"
            >
              weatherhavenusa.com
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <Link
            href="/"
            className="text-sm text-soft transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
