import { ScrollReveal } from "@/components/ScrollReveal";

const dot = "\u00b7";

const records = [
  {
    index: "01",
    project: "Retail platform rebuild",
    stack: `Next.js ${dot} Vercel ${dot} Postgres`,
    metric: "0.9s LCP",
  },
  {
    index: "02",
    project: "SaaS dashboard + API",
    stack: `TypeScript ${dot} Edge ${dot} Monitoring`,
    metric: "99.98% uptime",
  },
  {
    index: "03",
    project: "Product configurator",
    stack: `WebGL ${dot} GLTF ${dot} Three.js`,
    metric: "60fps target",
  },
] as const;

export function ProofStrip() {
  return (
    <div className="mt-16 border-t border-border pt-12">
      <ScrollReveal
        as="p"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
      >
        Record {"\u2014"} selected delivery
      </ScrollReveal>

      <div
        className="mt-8 border-t border-border"
        role="list"
        aria-label="Selected project outcomes"
      >
        {records.map((record) => (
          <div
            key={record.index}
            role="listitem"
            className="grid grid-cols-12 items-baseline gap-4 border-b border-border py-5 md:gap-6 md:py-6"
          >
            <div className="col-span-2 md:col-span-1">
              <span
                className="font-mono text-xs tabular-nums text-muted"
                aria-hidden="true"
              >
                {record.index}
              </span>
            </div>
            <div className="col-span-10 md:col-span-5">
              <p className="font-display text-base font-medium text-foreground md:text-lg">
                {record.project}
              </p>
            </div>
            <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto">
              <p className="font-mono text-xs text-muted">{record.stack}</p>
            </div>
            <div className="col-span-10 col-start-3 md:col-span-2 md:col-start-auto md:text-right">
              <p className="font-mono text-xs text-accent">{record.metric}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
