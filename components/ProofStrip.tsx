import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";

const dot = "\u00b7";

const records = [
  {
    index: "01",
    project: "Retail platform rebuild",
    stack: `Next.js ${dot} Vercel ${dot} Postgres`,
    metric: "0.9s LCP",
    frameLabel: "Web",
    imageSrc: undefined as string | undefined,
  },
  {
    index: "02",
    project: "SaaS dashboard + API",
    stack: `TypeScript ${dot} Edge ${dot} Monitoring`,
    metric: "99.98% uptime",
    frameLabel: "App",
    imageSrc: undefined as string | undefined,
  },
  {
    index: "03",
    project: "Product configurator",
    stack: `WebGL ${dot} GLTF ${dot} Three.js`,
    metric: "60fps target",
    frameLabel: "3D",
    imageSrc: undefined as string | undefined,
  },
] as const;

type ProofFrameProps = {
  label: string;
  imageSrc?: string;
};

function ProofFrame({ label, imageSrc }: ProofFrameProps) {
  return (
    <div className="proof-frame relative aspect-[16/10] w-full overflow-hidden border border-border bg-surface-deep">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      ) : (
        <>
          <div className="proof-frame-grid absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/70">
              Preview pending
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/20">
              {label}
            </span>
          </div>
        </>
      )}
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
            <div className="col-span-12 min-w-0 md:col-span-3">
              <ProofFrame label={record.frameLabel} imageSrc={record.imageSrc} />
            </div>

            <div className="col-span-12 min-w-0 md:col-span-9 md:grid md:grid-cols-9 md:items-baseline md:gap-5">
              <div className="md:col-span-1">
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
                <p className="break-words font-mono text-xs text-muted">
                  {record.stack}
                </p>
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
