import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";

export const metadata: Metadata = {
  title: "Outfyre Case Study",
  description:
    "How Nexraft built a retainer funnel and growth site for Outfyre, an AI studio, on managed edge infrastructure.",
  openGraph: {
    title: "Case study: Outfyre",
    description:
      "Retainer funnel and growth site for an AI studio. Fast launches without a dev bottleneck.",
  },
};

const buildItems = [
  {
    title: "Retainer funnel",
    detail:
      "Discovery-to-subscribe path aligned with how Outfyre sells services. Clear CTAs, pricing context, and contact paths without a bloated CMS.",
  },
  {
    title: "Growth pages",
    detail:
      "Landing pages built to ship quickly as offers evolve. Component-driven layout so marketing updates do not require full redeploys for every copy change.",
  },
  {
    title: "Performance baseline",
    detail:
      "Static-first Next.js delivery with edge caching. Core pages stay fast under campaign traffic.",
  },
  {
    title: "Managed hosting",
    detail:
      "DNS, SSL, monitoring, and deploy pipeline under Nexraft hosting retainer. Outfyre focuses on product, not server patches.",
  },
] as const;

const numbers = [
  { value: "1", label: "Unified growth site and funnel" },
  { value: "48h", label: "Typical content turnaround on retainer" },
  { value: "99.9%", label: "Uptime target on managed stack" },
] as const;

export default function OutfyreCaseStudy() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-signal-dim">
          Case study
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
          Outfyre. Retainer funnel for an AI studio.
        </h1>

        <p className="prose-measure mt-6 text-base leading-relaxed text-mute">
          Outfyre builds AI-powered products and needed a web presence that
          could keep pace with launches. The site had to convert interest,
          support campaigns, and stay maintainable without a full-time dev hire.
        </p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-line">
          <Image
            src="/case-studies/outfyre.png"
            alt="Outfyre growth site built by Nexraft"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <p className="mt-3 text-sm text-faint">
          outfyre.com {"\u00b7"} live production
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            The brief
          </h2>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-mute">
            Ship a credible studio site fast, then iterate under retainer as
            offers and campaigns change. No WordPress plugin stack. No agency
            handoffs. Direct founder access for scope and delivery.
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
            Need a site that ships and stays fast?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
            We scope growth sites and retainers on a discovery call. Fixed
            monthly rate, one invoice for web and hosting.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BookCallButton label="Book a call" variant="primary" />
            <Link
              href="https://outfyre.com"
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
