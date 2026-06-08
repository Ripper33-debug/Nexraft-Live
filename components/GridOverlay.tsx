export function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-[90rem] px-[clamp(1.25rem,4vw,3rem)]"
      aria-hidden="true"
    >
      <div className="grid h-full grid-cols-12 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="border-r border-border first:border-l"
          />
        ))}
      </div>
    </div>
  );
}
