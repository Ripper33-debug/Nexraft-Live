"use client";

import { useRef } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden border-b border-line bg-ink pt-[68px]"
    >
      <div className="absolute inset-0 z-0 hero-mesh-mask">
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

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-7 py-16 md:py-20">
        <p className="hm-fade text-sm text-mute">Est. 2024</p>

        <h1
          id="hero-heading"
          className="hm-fade mt-4 max-w-[20ch] font-display font-semibold tracking-[-0.03em] text-bone"
          style={{
            animationDelay: "0.06s",
            fontSize: "clamp(2.25rem, 6.5vw, 4.5rem)",
            lineHeight: 1.08,
          }}
        >
          We build fast websites, run the stack, and grow your leads.
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
