"use client";

import { useEffect, useRef, useState } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

const HEADLINE =
  "We build fast websites, run the stack, and grow your leads.".split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top;
      // Only drift while the hero is on its way out (top <= 0).
      setScrollY(Math.max(0, -top));
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const contentY = scrollY * 0.28;
  const contentOpacity = Math.max(0, 1 - scrollY / 520);
  const meshY = scrollY * 0.12;
  const meshScale = 1 + Math.min(scrollY, 900) / 4200;

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden border-b border-line bg-ink pt-[68px]"
    >
      <div
        className="absolute inset-0 z-0 hero-mesh-mask will-change-transform"
        style={{
          transform: `translate3d(0, ${meshY}px, 0) scale(${meshScale})`,
        }}
      >
        <HeroCanvas sectionRef={sectionRef} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 42%, transparent 45%, rgba(10,14,12,0.35) 78%, rgba(10,14,12,0.72) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,14,12,0.65) 100%)",
        }}
      />

      <div
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-7 py-16 will-change-transform md:py-20"
        style={{
          transform: `translate3d(0, ${contentY}px, 0)`,
          opacity: contentOpacity,
        }}
      >
        <p className="hm-fade text-sm text-mute">Est. 2024</p>

        <h1
          id="hero-heading"
          className="relative isolate mt-5 max-w-[20ch] font-display font-semibold tracking-[-0.035em] text-bone"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: 1.04,
          }}
        >
          <span aria-hidden="true" className="headline-glow" />
          {HEADLINE.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="word-rise text-sheen mr-[0.26em]"
              style={{ animationDelay: `${0.08 + i * 0.05}s` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="hm-fade mt-5 max-w-[46ch] font-body text-lg leading-relaxed text-mute md:text-xl"
          style={{ animationDelay: "0.12s" }}
        >
          Custom builds, WordPress and Squarespace migrations, managed hosting,
          SEO, and AI automation. Build once, then Care or Growth every month.
        </p>

        <div
          className="hm-fade pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5"
          style={{ animationDelay: "0.18s" }}
        >
          <MagneticButton href={BOOK_CALL_URL} magnetic={false}>
            Book a call
          </MagneticButton>
          <a
            href="#pricing"
            className="pointer-events-auto text-sm text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            View pricing
          </a>
          <a
            href="#work"
            className="pointer-events-auto text-sm text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            See our work
          </a>
        </div>

        <p
          className="hm-fade mt-12 max-w-xl text-sm text-faint"
          style={{ animationDelay: "0.24s" }}
        >
          99.9% uptime on stacks we operate. Migrations, 3D, and custom AI tools
          when you need them. Weatherhaven, Outfyre, and more since 2024.
        </p>
      </div>
    </section>
  );
}
