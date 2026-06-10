import { BookCallButton } from "@/components/BookCallButton";
import { PRICES, formatUsd } from "@/lib/pricing";

const features = [
  "Up to 6 pages, custom CMS included",
  "Vercel deploy, DNS, SSL, handoff docs",
  "Clickable demo before the first invoice",
  "Rolls into Starter or Managed hosting. Optional, never required",
  "14-day delivery from kickoff",
] as const;

export function LaunchSprint() {
  return (
    <article
      className="launch-sprint mt-6 border border-accent/35 bg-accent/[0.05] p-4 md:p-6"
      aria-labelledby="launch-sprint-heading"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
          00 / Launch Sprint
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          One-time
        </p>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <h3
              id="launch-sprint-heading"
              className="font-display text-2xl font-semibold text-foreground md:text-3xl"
            >
              Launch Sprint
            </h3>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {formatUsd(PRICES.launchSprint)}
              <span className="text-base font-medium text-muted"> one-time</span>
            </span>
          </div>
          <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
            Fixed scope. Designed, built, and deployed in 14 days.
          </p>
          <div className="mt-5">
            <BookCallButton label="Book a call" variant="primary" />
          </div>
        </div>

        <ul className="space-y-2 md:col-span-7">
          {features.map((item) => (
            <li key={item} className="font-mono text-xs text-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
