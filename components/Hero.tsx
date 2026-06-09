import { HeroBackdrop } from "@/components/HeroBackdrop";
import { BookCallLink } from "@/components/BookCallButton";
import { MagneticLink } from "@/components/MagneticLink";
import { HeroBootBridge } from "@/components/HeroBootBridge";
import { HeroEstTicker } from "@/components/HeroEstTicker";
import { HeroVisual } from "@/components/HeroVisual";
import { SECTION_COUNT } from "@/lib/sections";

const disciplines = ["Web", "Hosting", "3D"] as const;

export function Hero() {
  return (
    <HeroBootBridge>
      <section
        id="home"
        className="hero-section section-pad scroll-mt-20 relative overflow-hidden border-b border-border"
        aria-labelledby="hero-heading"
      >
        <HeroBackdrop />

        <span className="hero-reg-mark hero-reg-mark-tl" aria-hidden="true" />
        <span className="hero-reg-mark hero-reg-mark-tr" aria-hidden="true" />
        <span className="hero-reg-mark hero-reg-mark-bl" aria-hidden="true" />

        <HeroEstTicker className="absolute right-[clamp(1.25rem,4vw,3rem)] top-6 z-10 hidden md:block" />

        <div className="relative z-10 grid-editorial">
          <div className="col-span-12 min-w-0 lg:col-span-7">
            <div className="hero-line hero-line-1 mb-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <p className="hero-eyebrow font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Engineering studio
              </p>
              <ul className="hero-disciplines" aria-label="Disciplines">
                {disciplines.map((item) => (
                  <li
                    key={item}
                    className={item === "3D" ? "is-accent" : undefined}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <h1
              id="hero-heading"
              className="text-display-hero text-balance text-pretty font-display font-bold text-foreground"
            >
              <span className="hero-line hero-line-2 block">Built like</span>
              <span className="hero-line hero-line-3 block">infrastructure —</span>
              <span className="hero-line hero-line-4 block">
                web, hosting,{" "}
                <span className="hero-accent-word text-accent">3D</span>.
              </span>
            </h1>

            <div className="hero-headline-rule" aria-hidden="true" />

            <p className="hero-line hero-line-5 prose-measure mt-8 text-body-sm text-muted">
              Browser-ready 3D, managed Vercel stacks, and spec-grade web
              builds — one studio, documented delivery. Monthly retainers.
            </p>
          </div>

          <div className="col-span-12 mt-10 hidden lg:col-span-5 lg:mt-0 lg:flex lg:items-center lg:justify-end">
            <HeroVisual />
          </div>

          <div className="hero-line hero-line-6 col-span-12 mt-12 grid grid-cols-12 gap-0 border-t border-border pt-6 md:mt-14">
            <div className="col-span-12 sm:col-span-4">
              <BookCallLink className="hero-cta-primary magnetic-link-primary link-underline font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                Start a project →
              </BookCallLink>
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
            <HeroEstTicker className="md:hidden" />
            <p className="ml-auto font-mono text-[10px] tabular-nums text-muted">
              01 / {String(SECTION_COUNT).padStart(2, "0")}
            </p>
          </div>
        </div>
      </section>
    </HeroBootBridge>
  );
}
