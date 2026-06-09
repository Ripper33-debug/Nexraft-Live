const metrics = [
  "99.9% UPTIME",
  "SHIPS IN DAYS, NOT QUARTERS",
  "12+ PROJECTS DEPLOYED",
] as const;

const clients = ["Weatherhaven", "Outfyre"] as const;

export function TrustBar() {
  return (
    <section
      className="trust-bar border-b border-border bg-surface-deep"
      aria-label="Trust signals"
    >
      <div className="grid-editorial py-4 md:py-5">
        <div className="col-span-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ul
            className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted"
            role="list"
          >
            {metrics.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                <span className="text-foreground/90">{item}</span>
                {i < metrics.length - 1 && (
                  <span className="hidden text-border-strong sm:inline" aria-hidden>
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
