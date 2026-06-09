const metrics = [
  {
    label: "99.9% uptime",
    detail: "On production stacks we operate",
  },
  {
    label: "Ships in days",
    detail: "Scoped sprints, not quarter-long holds",
  },
  {
    label: "12+ projects",
    detail: "Delivered since 2024",
  },
] as const;

const clients = ["Weatherhaven", "Outfyre"] as const;

export function TrustBar() {
  return (
    <section
      className="trust-bar border-b border-border bg-surface-deep"
      aria-label="Trust signals"
    >
      <div className="grid-editorial py-4 md:py-5">
        <div className="col-span-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <ul
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
            role="list"
          >
            {metrics.map((item, i) => (
              <li
                key={item.label}
                className="flex items-start gap-4 sm:items-center"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/90">
                    {item.label}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] tracking-[0.08em] text-muted/80">
                    {item.detail}
                  </p>
                </div>
                {i < metrics.length - 1 && (
                  <span
                    className="mt-1 hidden shrink-0 text-border-strong sm:mt-0 sm:inline"
                    aria-hidden
                  >
                    |
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span className="text-muted/70">Deployed for </span>
            {clients.map((name, i) => (
              <span key={name}>
                {i > 0 && <span className="text-muted/50"> / </span>}
                <span className="text-foreground/80">{name}</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
