import { ScrollReveal } from "@/components/ScrollReveal";

const dot = "\u00b7";

const records = [
  {
    index: "01",
    project: "Retail platform rebuild",
    stack: `Next.js ${dot} Vercel ${dot} Postgres`,
    metric: "0.9s LCP",
    frameLabel: "Web preview",
  },
  {
    index: "02",
    project: "SaaS dashboard + API",
    stack: `TypeScript ${dot} Edge ${dot} Monitoring`,
    metric: "99.98% uptime",
    frameLabel: "App preview",
  },
  {
    index: "03",
    project: "Product configurator",
    stack: `WebGL ${dot} GLTF ${dot} Three.js`,
    metric: "60fps target",
    frameLabel: "3D preview",
  },
] as const;

function ProofFrame({ label }: { label: string }) {
  return (
    <div className="proof-frame relative aspect-[4/3] w-full border border-border bg-surface-deep">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {label}
        </span>
        <span className="font-mono text-[9px] text-foreground/25">
          Asset pending
        </span>
      </div>
      <span className="absolute left-2 top-2 font-mono text-[9px] text-muted/50">
        +++
      </span>
    </div>
  );
}

export function ProofStrip() {
  return (
    <div className="mt-10 border-t border-border pt-8">
      <ScrollReveal
        as="p"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
      >
        Record {"\u2014"} selected delivery
      </ScrollReveal>

      <div
        className="mt-6 border-t border-border"
        role="list"
        aria-label="Selected project outcomes"
      >
        {records.map((record) => (
          <div
            key={record.index}
            role="listitem"
            className="grid grid-cols-12 items-start gap-4 border-b border-border py-5 md:gap-6 md:py-6"
          >
            <div className="col-span-12 md:col-span-3">
              <ProofFrame label={record.frameLabel} />
            </div>

            <div className="col-span-12 md:col-span-9 md:grid md:grid-cols-9 md:items-baseline md:gap-5">
              <div className="col-span-9 md:col-span-1">
                <span
                  className="font-mono text-xs tabular-nums text-muted"
                  aria-hidden="true"
                >
                  {record.index}
                </span>
              </div>
              <div className="mt-2 md:col-span-4 md:mt-0">
                <p className="font-display text-base font-medium leading-snug text-foreground md:text-lg">
                  {record.project}
                </p>
              </div>
              <div className="mt-2 md:col-span-3 md:mt-0">
                <p className="font-mono text-xs text-muted">{record.stack}</p>
              </div>
              <div className="mt-2 md:col-span-1 md:mt-0 md:text-right">
                <p className="font-mono text-xs text-accent">{record.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
