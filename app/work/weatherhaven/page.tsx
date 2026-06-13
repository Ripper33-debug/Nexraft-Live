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
  { value: "1", label: "Unified product catalog and CMS" },
  { value: "99.9%", label: "Uptime target on stacks we operate" },
] as const;

export default function WeatherhavenCaseStudy() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className="text-sm text-mute">Case study</p>
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
          weatherhavenusa.com {"\u00b7"} live production
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
            The build
          </h2>
          <ul className="mt-6 space-y-6">
            {buildItems.map((item) => (
              <li
                key={item.title}
                className="border-b border-line pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="font-display text-base font-semibold text-bone">
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
          <p className="font-display text-lg font-semibold text-bone">
            Want a build like this?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
            We scope enterprise rebuilds on a discovery call and quote a fixed
            monthly rate in writing before any work starts.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BookCallButton label="Book a call" variant="primary" />
            <Link
              href="https://weatherhavenusa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-mute"
            >
              View the live site
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <Link
            href="/"
            className="text-sm text-mute transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
