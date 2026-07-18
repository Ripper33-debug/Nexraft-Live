"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

// Refractive 3D crystal centerpiece — desktop + motion only. Loaded lazily so
// the three.js bundle never ships to phones (which use the 2D HeroCanvas).
const HeroCrystal = dynamic(() => import("@/components/HeroCrystal"), {
  ssr: false,
});

const HEADLINE =
  "We build fast websites, run the stack, and grow your leads.".split(" ");

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  // Whether to render the heavy 3D terrain (desktop + fine pointer + motion).
  const [use3D, setUse3D] = useState(false);
  // Pause the render loop once the hero scrolls out of view.
  const [heroActive, setHeroActive] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUse3D(desktop && finePointer && !reduce);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !use3D) return;
    const io = new IntersectionObserver(
      ([entry]) => setHeroActive(entry?.isIntersecting ?? false),
      { rootMargin: "0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [use3D]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let rafId = 0;
    let shown = 0;
    // Continuous eased loop: drive the parallax by writing styles straight to
    // the DOM (no React re-renders) and lerp toward the target for smoothness.
    const loop = () => {
      const section = sectionRef.current;
      let targetScroll = shown;
      if (section) {
        const top = section.getBoundingClientRect().top;
        // Only drift while the hero is on its way out (top <= 0).
        targetScroll = Math.max(0, -top);
      }
      shown += (targetScroll - shown) * 0.12;
      if (Math.abs(targetScroll - shown) < 0.05) shown = targetScroll;

      const content = contentRef.current;
      if (content) {
        content.style.transform = `translate3d(0, ${shown * 0.28}px, 0)`;
        content.style.opacity = String(Math.max(0, 1 - shown / 520));
      }
      const mesh = meshRef.current;
      if (mesh) {
        const meshScale = 1 + Math.min(shown, 900) / 4200;
        mesh.style.transform = `translate3d(0, ${shown * 0.12}px, 0) scale(${meshScale})`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden border-b border-line bg-ink pt-[68px]"
    >
      <div
        ref={meshRef}
        className="absolute inset-0 z-0 hero-mesh-mask will-change-transform"
      >
        {use3D ? (
          <>
            {/* Soft halo behind the crystal — fakes bloom without postprocessing. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[72%] top-1/2 h-[58vh] w-[58vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(67,208,133,0.28), rgba(67,208,133,0.06) 45%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <HeroCrystal active={heroActive} sectionRef={sectionRef} />
          </>
        ) : (
          <HeroCanvas sectionRef={sectionRef} />
        )}
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
        ref={contentRef}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-7 py-16 will-change-transform md:py-20"
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
