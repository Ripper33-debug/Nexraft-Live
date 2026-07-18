import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";

export const metadata: Metadata = {
  title: "Family Care Pharmacy Case Study",
  description:
    "How Nexraft built a fast, trustworthy web presence for Family Care Pharmacy in Langley, BC - prescriptions, services, and contact paths on managed edge infrastructure.",
  openGraph: {
    title: "Case study: Family Care Pharmacy",
    description:
      "Community pharmacy site with clear service paths, location info, and click-to-call on every screen.",
  },
};

const buildItems = [
  {
    title: "Service-first IA",
    detail:
      "Prescriptions, immunizations, compounding, and consultations each get a clear path. Patients find what they need without hunting through a generic template.",
  },
  {
    title: "Local trust signals",
    detail:
      "Storefront photography, Langley address, hours, and click-to-call CTAs above the fold. Built to feel like the independent pharmacy it is.",
  },
  {
    title: "Performance baseline",
    detail:
      "Static-first Next.js delivery on managed edge infrastructure. Fast loads on mobile - where most prescription and directions lookups happen.",
  },
  {
    title: "Managed operations",
    detail:
      "DNS, SSL, deploys, and monitoring under Nexraft hosting. The pharmacy team focuses on patients, not plugins or server patches.",
  },
] as const;

const numbers = [
  { value: "5", label: "Core patient journeys mapped" },
  { value: "25+", label: "Years serving the Langley community" },
  { value: "99.9%", label: "Uptime target on managed stack" },
] as const;

const LIVE_URL = "https://familycarepharm.vercel.app";

export default function FamilyCarePharmacyCaseStudy() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          Case study
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
          Family Care Pharmacy. Local care, online.
        </h1>

        <p className="prose-measure mt-6 text-base leading-relaxed text-mute">
          Family Care Pharmacy is an independent, family-owned pharmacy in
          Langley, BC. They needed a site that matched their in-store
          experience — personal, trustworthy, and easy to use on a phone when
          someone needs a refill or directions.
        </p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden border border-line">
          <Image
            src="/case-studies/family-care-pharmacy.png"
            alt="Family Care Pharmacy homepage with storefront hero and prescription CTAs"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <p className="mt-3 text-sm text-faint">
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-soft transition-colors hover:text-bone"
          >
            familycarepharm.vercel.app
          </a>
          {" \u00b7 "} staging preview (custom domain pending)
        </p>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            The brief
          </h2>
          <p className="prose-measure mt-4 text-sm leading-relaxed text-mute">
            Replace a dated web presence with something patients actually use:
            clear service pages, prominent phone and prescription CTAs, and
            location details that work on mobile maps.
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
            Need a site patients actually use?
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
            We scope local and service businesses on a discovery call. Fixed
            monthly rate, one invoice for web and hosting.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            <BookCallButton label="Book a call" variant="primary" />
            <Link
              href={LIVE_URL}
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
            className="text-sm text-soft transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
