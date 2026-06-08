export function SiteBackdrop() {
  return (
    <div className="site-backdrop pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="site-backdrop-vignette" />
      <div className="site-backdrop-glow" />
      <div className="site-backdrop-signal" />
      <div className="site-backdrop-scan" />

      <div className="site-backdrop-grid mx-auto h-full max-w-[90rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="site-backdrop-horizons" />
        <div className="grid h-full grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="site-backdrop-col border-r border-border first:border-l"
            />
          ))}
        </div>
      </div>

      <div className="site-backdrop-origin" />
    </div>
  );
}
