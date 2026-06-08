import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-20 relative border-b border-border pb-24 pt-16 md:pb-32 md:pt-24"
      aria-labelledby="hero-heading"
    >
      <p
        className="absolute right-[clamp(1.25rem,4vw,3rem)] top-8 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:block"
        aria-hidden="true"
      >
        WEB · HOSTING · 3D — EST. 2024
      </p>

      <div className="grid-editorial">
        <div className="col-span-12 md:col-span-10 lg:col-span-9">
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Engineering studio
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-foreground"
          >
            <span className="hero-line block">Everything you need</span>
            <span className="hero-line block">to launch —</span>
            <span className="hero-line block">
              and keep it <span className="text-accent">fast</span>.
            </span>
          </h1>

          <p className="hero-line mt-10 max-w-md font-body text-base leading-relaxed text-muted md:text-lg">
            Web builds, managed hosting, and 3D production — one studio, one
            standard of precision.
          </p>
        </div>

        <div className="col-span-12 mt-16 grid grid-cols-12 gap-0 border-t border-border pt-8 md:mt-20">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Link
              href="#contact"
              className="link-underline inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground"
            >
              Start a project →
            </Link>
          </div>
          <div className="col-span-12 mt-6 border-t border-border pt-6 md:col-span-5 md:col-start-7 md:mt-0 md:border-t-0 md:pt-0 lg:col-span-4 lg:col-start-6">
            <Link
              href="#services"
              className="link-underline inline-block font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              View services →
            </Link>
          </div>
        </div>

        <div className="col-span-12 mt-8 flex items-end justify-between border-t border-border pt-6 md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:hidden">
            WEB · HOSTING · 3D — EST. 2024
          </p>
          <p className="ml-auto font-mono text-[10px] tabular-nums text-muted">
            01 / 04
          </p>
        </div>
      </div>
    </section>
  );
}
