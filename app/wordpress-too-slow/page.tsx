import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { SubpageShell } from "@/components/SubpageShell";
import { PRICES, formatUsd } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "WordPress Too Slow",
  description:
    "WordPress site too slow? We rebuild slow WordPress sites as static-first builds on managed edge infrastructure. Migration included with hosting from $350/mo.",
  openGraph: {
    title: "WordPress too slow? It is not your content.",
    description:
      "Static-first rebuilds on managed edge infrastructure. Migration included.",
  },
};

export default function WordPressTooSlowPage() {
  return (
    <>
      <SubpageShell
        title="WordPress too slow? It is not your content."
        intro={
          <p>
            Slow WordPress sites are an architecture problem. Caching plugins
            treat the symptom. We rebuild the site static-first, serve it from
            a global edge network, and run it for you.
          </p>
        }
        sections={[
          {
            heading: "Why it is slow",
            items: [
              {
                title: "Plugin stack",
                detail:
                  "Every plugin adds queries, scripts, and risk. Most slow WordPress sites run 20 or more.",
              },
              {
                title: "Server rendering on every hit",
                detail:
                  "PHP assembles each page per request. Under load, response times collapse.",
              },
              {
                title: "Theme bloat",
                detail:
                  "Page-builder themes ship megabytes of CSS and JS your visitors never use.",
              },
            ],
          },
          {
            heading: "How we fix it",
            items: [
              {
                title: "Static-first rebuild",
                detail:
                  "Pages pre-rendered and served from a global edge network. No per-request assembly, no database in the hot path.",
              },
              {
                title: "Custom CMS",
                detail:
                  "Editors keep a publishing workflow tailored to your content. No plugin roulette.",
              },
              {
                title: "Performance budget",
                detail:
                  "90+ mobile scores as an enforced budget, not an aspiration. Measured monthly under our hosting retainer.",
              },
            ],
          },
        ]}
        cta={
          <>
            <p className="font-display text-2xl font-semibold text-bone">
              {formatUsd(PRICES.hosting.managed)}/mo
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              Managed hosting with the migration included. Rebuild scope is
              quoted as a fixed rate on a discovery call. Send us your URL and
              we will run the numbers on it first.
            </p>
            <div className="mt-6">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </>
        }
        footerLink={null}
      />

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
            className="text-sm text-mute transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
