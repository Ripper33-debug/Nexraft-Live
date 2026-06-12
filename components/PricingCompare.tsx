import { PRICES, formatUsd } from "@/lib/pricing";

const webPlans = [
  {
    name: "Starter",
    price: PRICES.web.starter,
    summary: "Care & updates",
    popular: false,
  },
  {
    name: "Growth",
    price: PRICES.web.growth,
    summary: "Dev hours + roadmap",
    popular: true,
  },
  {
    name: "Build",
    price: PRICES.web.build,
    summary: "Full capacity",
    popular: false,
  },
] as const;

export function PricingCompare() {
  return (
    <div className="pricing-compare mt-6 border border-border">
      <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {webPlans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-compare-col p-4 md:p-5 ${
              plan.popular ? "bg-accent/[0.05]" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <p className="font-display text-lg font-semibold text-foreground">
                {plan.name}
              </p>
              {plan.popular && (
                <span className="pricing-popular-badge">Popular</span>
              )}
            </div>
            <p className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">
              {formatUsd(plan.price)}
              <span className="text-base font-medium text-muted">/mo</span>
            </p>
            <p className="mt-2 font-mono text-xs text-muted">{plan.summary}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-4 py-3 md:px-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          Web retainers {"\u00b7"} Managed hosting included {"\u00b7"} 3D priced separately below
        </p>
      </div>
    </div>
  );
}
