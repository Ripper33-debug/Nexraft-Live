import { MagneticLink } from "@/components/MagneticLink";
import { HeroVisual } from "@/components/HeroVisual";
import { SECTION_COUNT } from "@/lib/sections";

export function Hero() {
  return (
    <section
      id="home"
      className="section-pad scroll-mt-20 relative border-b border-border"
      aria-labelledby="hero-heading"
    >
      <p
        className="absolute right-[clamp(1.25rem,4vw,3rem)] top-6 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:block"
        aria-hidden="true"
      >
        WEB · HOSTING · 3D — EST. 2024
      </p>

      <div className="grid-editorial">
        <div className="col-span-12 min-w-0 lg:col-span-7">
          <p className="hero-line hero-line-1 mb-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Engineering studio
          </p>

          <h1
            id="hero-heading"
            className="text-display-hero text-balance text-pretty font-display font-bold text-foreground"
          >
            <span className="hero-line hero-line-2 block">Everything you&nbsp;need</span>
            <span className="hero-line hero-line-3 block">to&nbsp;launch —</span>
            <span className="hero-line hero-line-4 block">
              and keep it <span className="text-accent">fast</span>.
            </span>
          </h1>

          <p className="hero-line hero-line-5 prose-measure mt-8 text-body-sm text-muted">
            Web builds, managed hosting, and 3D production — one studio, one
            standard of precision. Monthly retainers, no&nbsp;lock-in.
          </p>
        </div>

        <div className="col-span-12 mt-10 hidden lg:col-span-5 lg:mt-0 lg:flex lg:items-center lg:justify-end">
          <HeroVisual />
        </div>

        <div className="hero-line hero-line-6 col-span-12 mt-12 grid grid-cols-12 gap-0 border-t border-border pt-6 md:mt-14">
          <div className="col-span-12 sm:col-span-4">
            <MagneticLink
              href="#contact"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
            >
              Start a project →
            </MagneticLink>
          </div>
          <div className="col-span-12 mt-5 border-t border-border pt-5 sm:col-span-4 sm:mt-0 sm:border-t-0 sm:pt-0">
            <MagneticLink
              href="#pricing"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              View pricing →
            </MagneticLink>
          </div>
          <div className="col-span-12 mt-5 border-t border-border pt-5 sm:col-span-4 sm:mt-0 sm:border-t-0 sm:pt-0">
            <MagneticLink
              href="#services"
              className="link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              View services →
            </MagneticLink>
          </div>
        </div>

        <div className="hero-line hero-line-7 col-span-12 mt-6 flex items-end justify-between border-t border-border pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:hidden">
            WEB · HOSTING · 3D — EST. 2024
          </p>
          <p className="ml-auto font-mono text-[10px] tabular-nums text-muted">
            01 / {String(SECTION_COUNT).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
