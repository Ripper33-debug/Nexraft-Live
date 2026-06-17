export type SiteMetric =
  | {
      id: string;
      kind?: "count";
      value: number;
      countFrom?: number;
      suffix?: string;
      prefix?: string;
      decimals?: number;
      label: string;
    }
  | {
      id: string;
      kind: "logos";
      label: string;
    };

/** Managed production stacks - update when a new client site goes live. */
export const PRODUCTION_STACK_COUNT = 3;

/** Operational metrics shown on the homepage strip. Keep honest and defensible. */
export const SITE_METRICS: SiteMetric[] = [
  {
    id: "uptime",
    value: 99.9,
    countFrom: 99.0,
    suffix: "%",
    decimals: 1,
    label: "Uptime target on managed stacks",
  },
  {
    id: "clients",
    kind: "logos",
    label: `${PRODUCTION_STACK_COUNT} managed stacks, live in production`,
  },
  {
    id: "ttfb",
    value: 0.9,
    countFrom: 0.85,
    suffix: "s",
    decimals: 1,
    label: "Typical edge TTFB after migration",
  },
  {
    id: "sla",
    value: 48,
    countFrom: 44,
    suffix: "h",
    label: "Small-fix turnaround on Starter",
  },
];
