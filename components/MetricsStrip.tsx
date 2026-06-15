"use client";

import { SITE_METRICS } from "@/lib/metrics";
import { useCountUp } from "@/lib/use-count-up";
import { useInView } from "@/lib/use-in-view";
import Link from "next/link";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function MetricValue({
  metric,
  active,
}: {
  metric: (typeof SITE_METRICS)[number];
  active: boolean;
}) {
  const display = useCountUp({
    end: metric.value,
    decimals: metric.decimals ?? 0,
    active,
  });

  return (
    <span className="font-display text-2xl font-semibold tracking-tight text-bone md:text-3xl">
      {metric.prefix}
      {display}
      {metric.suffix}
    </span>
  );
}

export function MetricsStrip() {
  const { ref, inView } = useInView<HTMLElement>({ rootMargin: "0px 0px -10% 0px" });

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
              <MetricValue metric={metric} active={inView} />
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
