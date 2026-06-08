import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const dot = "\u00b7";

const records = [
  {
    index: "01",
    client: "Weatherhaven",
    project: "Corporate marketing site",
    href: "https://weatherhaven.com",
    stack: `Next.js ${dot} CMS ${dot} Product catalog`,
    metric: "95-country deploy map",
    imageSrc: "/case-studies/weatherhaven.png",
    imageAlt: "Weatherhaven corporate website",
  },
  {
    index: "02",
    client: "Outfyre",
    project: "AI growth studio site",
    href: "https://outfyre.com",
    stack: `Next.js ${dot} Vercel ${dot} Tailwind`,
    metric: "3-tier retainer funnel",
    imageSrc: "/case-studies/outfyre.png",
    imageAlt: "Outfyre marketing website",
  },
] as const;

type ProofFrameProps = {
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

function ProofFrame({ label, href, imageSrc, imageAlt }: ProofFrameProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="proof-frame group relative block aspect-[16/10] w-full overflow-hidden border border-border bg-surface-deep"
      aria-label={`${label} — view live site`}
      data-cursor-hover
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
        sizes="(max-width: 768px) 100vw, 25vw"
      />
      <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-[0.15em] text-foreground/50">
        Live
      </span>
    </Link>
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
              <ProofFrame
                label={record.client}
                href={record.href}
                imageSrc={record.imageSrc}
                imageAlt={record.imageAlt}
              />
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
                  <Link
                    href={record.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    data-cursor-hover
                  >
                    {record.project}
                  </Link>
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
