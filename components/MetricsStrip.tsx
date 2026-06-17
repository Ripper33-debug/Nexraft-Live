"use client";

import Image from "next/image";
import Link from "next/link";
import { CLIENT_LOGOS } from "@/lib/clients";
import { SITE_METRICS } from "@/lib/metrics";
import { useCountUp } from "@/lib/use-count-up";
import { useInView } from "@/lib/use-in-view";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function MetricValue({
  end,
  countFrom,
  decimals = 0,
  prefix,
  suffix,
  active,
}: {
  end: number;
  countFrom?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const start = countFrom ?? end;
  const display = useCountUp({
    end,
    start,
    decimals,
    active,
  });

  return (
    <span className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function ClientLogoCell() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {CLIENT_LOGOS.map((client) => (
        <li key={client.id}>
          <a
            href={client.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${client.name} (opens in new tab)`}
            className={`group inline-flex ${focusRing}`}
          >
            <Image
              src={client.src}
              alt=""
              width={client.width}
              height={client.height}
              className="h-5 w-auto opacity-55 transition-opacity duration-300 group-hover:opacity-100 md:h-6"
              sizes="120px"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function MetricsStrip() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.5 });

  return (
    <section
      ref={ref}
      aria-label="Operational metrics"
      className="border-b border-line bg-ink2"
    >
      <div className="mx-auto max-w-[1180px] px-7 py-8 md:py-10">
        <div className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {SITE_METRICS.map((metric) => (
            <div key={metric.id} className="bg-ink2 px-5 py-5 md:px-6 md:py-6">
              {metric.kind === "logos" ? (
                <ClientLogoCell />
              ) : (
                <MetricValue
                  end={metric.value}
                  countFrom={metric.countFrom}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  active={inView}
                />
              )}
              <p className="mt-2 font-jetbrains text-[10px] uppercase leading-relaxed tracking-[0.14em] text-faint">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center font-jetbrains text-[10px] uppercase tracking-[0.16em] text-faint">
          Managed edge infrastructure {"\u00b7"}{" "}
          <Link href="/status" className={`text-mute hover:text-bone ${focusRing}`}>
            System status
          </Link>
        </p>
      </div>
    </section>
  );
}
