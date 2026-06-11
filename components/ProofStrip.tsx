import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const dot = "\u00b7";

const records = [
  {
    index: "01",
    client: "Weatherhaven",
    project: "Global deploy-map catalog for 95-country ops",
    href: "https://weatherhavenusa.com",
    stack: `Next.js ${dot} CMS ${dot} Product catalog`,
    metric: "Enterprise marketing rebuild",
    kind: "image" as const,
    imageSrc: "/case-studies/weatherhaven.png",
    imageAlt: "Weatherhaven corporate website",
  },
  {
    index: "02",
    client: "Outfyre",
    project: "AI growth studio site",
    href: "https://outfyre.com",
    stack: `Next.js ${dot} TypeScript ${dot} Tailwind`,
    metric: "3-tier retainer funnel",
    kind: "image" as const,
    imageSrc: "/case-studies/outfyre.png",
    imageAlt: "Outfyre marketing website",
  },
  {
    index: "03",
    client: "Nexraft",
    project: "Live WebGL product visualization pipeline",
    href: "#home",
    stack: `Three.js ${dot} R3F ${dot} GLTF ${dot} Draco`,
    metric: "Real-time · Browser-native",
    kind: "wireframe" as const,
  },
] as const;

type ProofFrameProps = {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
};

function ProofFrame({
  label,
  href,
  imageSrc,
  imageAlt,
  priority = false,
}: ProofFrameProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="proof-frame group relative block aspect-[16/10] w-full overflow-hidden border border-border bg-surface-deep transition-transform duration-300 ease-out hover:scale-[1.02]"
      aria-label={`${label}: view`}
      data-cursor-hover
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority={priority}
        className="object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">
        Live
      </span>
    </Link>
  );
}

function WireframeProofFrame({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="proof-frame proof-frame-wire group relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-border bg-surface-deep transition-transform duration-300 ease-out hover:scale-[1.02]"
      aria-label={`${label}: view live 3D`}
      data-cursor-hover
    >
      <svg
        viewBox="0 0 120 120"
        className="h-[55%] w-[55%] text-accent transition-transform duration-500 group-hover:scale-105"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="square">
          <polygon points="60,18 95,42 82,82 38,82 25,42" opacity="0.9" />
          <polygon points="60,102 95,78 82,38 38,38 25,78" opacity="0.55" />
          <line x1="60" y1="18" x2="60" y2="102" opacity="0.45" />
          <line x1="25" y1="42" x2="95" y2="78" opacity="0.45" />
          <line x1="95" y1="42" x2="25" y2="78" opacity="0.45" />
        </g>
        <circle cx="60" cy="60" r="2.5" fill="currentColor" />
      </svg>
      <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-[0.15em] text-accent/80">
        FIG.01
      </span>
      <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">
        WebGL
      </span>
    </Link>
  );
}

export function ProofStrip() {
  return (
    <div id="work" className="mt-6 scroll-mt-20 border-t border-border pt-6">
      <ScrollReveal
        as="p"
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted"
      >
        Record / selected delivery
      </ScrollReveal>

      <div
        className="mt-6 border-t border-border"
        role="list"
        aria-label="Selected project outcomes"
      >
        {records.map((record, i) => (
          <div
            key={record.index}
            role="listitem"
            className="grid grid-cols-12 items-start gap-4 border-b border-border py-4 md:gap-5 md:py-5"
          >
            <div className="col-span-12 min-w-0 md:col-span-3">
              {record.kind === "image" ? (
                <ProofFrame
                  label={record.client}
                  href={record.href}
                  imageSrc={record.imageSrc}
                  imageAlt={record.imageAlt}
                  priority={i === 0}
                />
              ) : (
                <WireframeProofFrame
                  label={record.client}
                  href={record.href}
                />
              )}
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
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                  {record.client}
                </p>
                <p className="mt-1 font-display text-base font-medium leading-snug text-foreground md:text-lg">
                  {record.href.startsWith("http") ? (
                    <Link
                      href={record.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                      data-cursor-hover
                    >
                      {record.project}
                    </Link>
                  ) : (
                    <Link
                      href={record.href}
                      className="link-underline"
                      data-cursor-hover
                    >
                      {record.project}
                    </Link>
                  )}
                </p>
              </div>
              <div className="mt-2 md:col-span-3 md:mt-0">
                <p className="break-words font-mono text-xs text-muted">
                  {record.stack}
                </p>
              </div>
              <div className="mt-2 md:col-span-1 md:mt-0 md:text-right">
                <p className="font-mono text-xs text-muted">{record.metric}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
