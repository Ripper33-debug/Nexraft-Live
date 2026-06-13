import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
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

const causes = [
  {
    index: "01",
    title: "Plugin stack",
    detail:
      "Every plugin adds queries, scripts, and risk. Most slow WordPress sites run 20 or more.",
  },
  {
    index: "02",
    title: "Server rendering on every hit",
    detail:
      "PHP assembles each page per request. Under load, response times collapse.",
  },
  {
    index: "03",
    title: "Theme bloat",
    detail:
      "Page-builder themes ship megabytes of CSS and JS your visitors never use.",
  },
] as const;

const fixes = [
  {
    index: "01",
    title: "Static-first rebuild",
    detail:
      "Pages pre-rendered and served from a global edge network. No per-request assembly, no database in the hot path.",
  },
  {
    index: "02",
    title: "Custom CMS",
    detail:
      "Editors keep a publishing workflow tailored to your content. No plugin roulette.",
  },
  {
    index: "03",
    title: "Performance budget",
    detail:
      "90+ mobile scores as an enforced budget, not an aspiration. Measured monthly under our hosting retainer.",
  },
] as const;

export default function WordPressTooSlowPage() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="">
          <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
            Migration / WordPress
          </p>
        </div>

        <div className="">
          <h1 className="font-grotesk text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            WordPress too slow? It is not your content.
          </h1>

          <p className="prose-measure mt-6 text-sm text-mute">
            Slow WordPress sites are an architecture problem. Caching plugins
            treat the symptom. We rebuild the site static-first, serve it from
            a global edge network, and run it for you.
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Why it is slow
            </p>
            <div className="mt-4 border-t border-line">
              {causes.map((row) => (
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
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              How we fix it
            </p>
            <div className="mt-4 border-t border-line">
              {fixes.map((row) => (
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
          </div>

          <div className="mt-10 border border-line bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              Hosting rescue
            </p>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">
              {formatUsd(PRICES.hosting.managed)}/mo
            </p>
            <p className="mt-2 max-w-lg font-jetbrains text-xs leading-relaxed text-mute">
              Managed hosting with the migration included. Rebuild scope is
              quoted as a fixed rate on a discovery call. Web retainers include
              managed hosting at no extra charge. Send us your URL and we will
              run the numbers on it first.
            </p>
            <div className="mt-5">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                Recent delivery
              </p>
              <Link
                href="/work/weatherhaven"
                className="link-underline mt-3 inline-block font-jetbrains text-xs uppercase tracking-[0.2em] text-bone"
                data-cursor-hover
              >
                Weatherhaven case study
              </Link>
            </div>
            <div>
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
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
