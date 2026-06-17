import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { SubpageShell } from "@/components/SubpageShell";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
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

export default function SquarespaceMigrationPage() {
  return (
    <>
      <SubpageShell
        title="Move off Squarespace without losing your content."
        intro={
          <p>
            We migrate Squarespace and Wix sites to custom-built,
            engineer-grade stacks on managed edge infrastructure. Migration is
            included with hosting. Your content, your domain, your rankings
            come with you.
          </p>
        }
        sections={[
          {
            heading: "Why teams leave builders",
            items: [
              {
                title: "Template ceiling",
                detail:
                  "Layout and feature limits you cannot code around. Every workaround is another plugin or another monthly fee.",
              },
              {
                title: "Page speed",
                detail:
                  "Builder sites ship heavy scripts you cannot remove. Slow pages cost rankings and conversions.",
              },
              {
                title: "Lock-in",
                detail:
                  "Your content lives in their system, on their terms, at their next price increase.",
              },
            ],
          },
          {
            heading: "How the migration works",
            items: [
              {
                title: "Audit",
                detail:
                  "We review your current site, content, SEO state, and DNS.",
              },
              {
                title: "Rebuild",
                detail:
                  "Custom build with a CMS tailored to your content workflow. You approve a clickable demo first.",
              },
              {
                title: "Migrate",
                detail:
                  "Content, redirects, and DNS moved with a zero-downtime cutover. Rankings preserved with 1:1 redirects.",
              },
              {
                title: "Run",
                detail:
                  "We operate the stack: SSL, backups, monitoring, and updates. 99.9% uptime on stacks we operate.",
              },
            ],
          },
        ]}
        cta={
          <>
            <p className="font-display text-3xl font-semibold tracking-tight text-bone">
              {formatUsd(PRICES.hosting.managed)}/mo
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              Managed hosting with the migration included. Site rebuilds are
              quoted as a fixed rate on a discovery call. Web retainers include
              managed hosting at no extra charge.
            </p>
            <div className="mt-6">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </>
        }
        footerLink={null}
      />

      <section className="border-t border-line bg-ink2 py-[84px] md:py-[100px]">
        <div className="mx-auto max-w-[1180px] px-7">
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone">
            Typical results after migration
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute">
            Drag the slider to compare a legacy builder stack against a Nexraft
            managed deployment.
          </p>
          <BeforeAfterSlider className="mt-10" />
        </div>
      </section>

      <section className="border-t border-line bg-ink pb-[84px] md:pb-[120px]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-7 sm:grid-cols-2">
          <div>
            <p className="text-sm text-faint">Recent delivery</p>
            <Link
              href="/work/weatherhaven"
              className="mt-2 inline-block text-sm text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              Weatherhaven case study
            </Link>
          </div>
          <div>
            <p className="text-sm text-faint">Direct line</p>
            <div className="mt-2">
              <ContactEmails stacked />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1180px] border-t border-line px-7 pt-8">
          <Link
            href="/"
            className="text-sm text-soft transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
