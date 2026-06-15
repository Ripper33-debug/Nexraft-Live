export type SiteMetric = {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
};

/** Operational metrics shown on the homepage strip. Keep honest and defensible. */
export const SITE_METRICS: SiteMetric[] = [
  {
    id: "uptime",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Uptime target on managed stacks",
  },
  {
    id: "sites",
    value: 3,
    label: "Client sites in production",
  },
  {
    id: "ttfb",
    value: 0.9,
    suffix: "s",
    decimals: 1,
    label: "Typical edge TTFB after migration",
  },
  {
    id: "sla",
    value: 48,
    suffix: "h",
    label: "Small-fix turnaround on Starter",
  },
];
