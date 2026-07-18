"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Services } from "@/components/Services";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { useScrollScene } from "@/lib/use-scroll-scene";

const dot = "\u00b7";

type Card = {
  index: string;
  title: string;
  plan: string;
  summary: string;
  stack: string;
  links?: { href: string; label: string }[];
};

const cards: Card[] = [
  {
    index: "01",
    title: "Web",
    plan: "Build",
    summary:
      "Fast, custom sites and apps built to convert, not just look good. Every one ships with its own CMS. We also migrate WordPress and Squarespace when the old stack is the problem.",
    stack: `Next.js ${dot} Custom CMS ${dot} TypeScript`,
    links: [
      { href: "/wordpress-too-slow", label: "Slow WordPress" },
      { href: "/squarespace-migration", label: "Squarespace migration" },
    ],
  },
  {
    index: "02",
    title: "Hosting",
    plan: "Care",
    summary:
      "We run what we build. Uptime, CDN, SSL, backups, monitoring, and small monthly changes - no separate server bill.",
    stack: `Edge network ${dot} CDN ${dot} Observability`,
  },
  {
    index: "03",
    title: "Growth",
    plan: "Growth",
    summary:
      "SEO, Google Business Profile, review workflows, landing pages, and light AI automation so the site brings in leads - not just sits online.",
    stack: `SEO ${dot} Local search ${dot} Reviews ${dot} AI workflows`,
    links: [{ href: "#pricing", label: "See Growth pricing" }],
  },
  {
    index: "04",
    title: "AI tools",
    plan: "Add-on",
    summary:
      "Custom copilots, assistants, and automations built for your workflows - not generic chat widgets pasted onto a page. Scoped to your data, your brand voice, and your approval rules.",
    stack: `TypeScript ${dot} LLM APIs ${dot} RAG ${dot} Edge deploy`,
  },
  {
    index: "05",
    title: "3D",
    plan: "Add-on",
    summary:
      "Product spins, walkthroughs and web-ready 3D that make you look like nobody else in your market. Ideal for physical products, equipment, and real estate.",
    stack: `Blender ${dot} GLTF ${dot} Three.js ${dot} WebGL`,
    links: [{ href: "/3d-product-viewer", label: "See the live demo" }],
  },
];

/**
 * Desktop: a pinned, horizontally-scrolling rail of service cards driven by
 * `useScrollScene` (vertical scroll translates the track sideways, no wheel
 * hijacking, native scrollbar behavior preserved). Mobile / coarse pointers /
 * reduced motion: falls back to the existing vertical <Services /> section so
 * copy lives in one place per breakpoint and nothing is pinned on touch.
 */
export function ServicesRail() {
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Until we know the viewport, render the safe vertical version (also the
  // SSR output, so hydration matches and content is always crawlable).
  if (!desktop) return <Services />;

  return <RailDesktop />;
}

function RailDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const sectionRef = useScrollScene<HTMLElement>((progress, velocity) => {
    const track = trackRef.current;
    if (track) {
      // Distance = full track width minus the visible viewport (the track is
      // w-max, so its own clientWidth equals its scrollWidth — measure the
      // clipping parent instead).
      const viewport = track.parentElement?.clientWidth ?? window.innerWidth;
      const max = Math.max(0, track.scrollWidth - viewport);
      const skew = Math.max(Math.min(velocity * -120, 2.2), -2.2);
      track.style.transform = `translate3d(${-max * progress}px,0,0) skewX(${skew}deg)`;
    }
    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress})`;
    }
  });

  return (
    <section
      id="do"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="relative h-[280vh] border-t border-line bg-ink"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1180px] px-7">
          <SpecLabel className="mb-4">01 / SERVICES</SpecLabel>
          <h2
            id="services-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
          >
            Build, host, grow, and ship.
          </h2>
        </div>

        <div
          ref={trackRef}
          className="rail-track mt-12 flex w-max gap-6 pl-[max(1.75rem,calc((100vw-1180px)/2+1.75rem))] pr-[10vw] will-change-transform"
        >
          {cards.map((card) => (
            <article
              key={card.title}
              className="rail-card flex w-[420px] shrink-0 flex-col border border-line bg-ink2 p-8"
            >
              <span className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                {card.index}
              </span>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {card.title}
                </h3>
                <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
                  {card.plan}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                {card.summary}
              </p>
              <p className="mt-auto pt-6 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-tag">
                {card.stack}
              </p>
              {card.links ? (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {card.links.map((l) =>
                    l.href.startsWith("#") ? (
                      <a
                        key={l.href}
                        href={l.href}
                        className="text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone"
                      >
                        {l.label}
                      </Link>
                    ),
                  )}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mx-auto mt-12 w-full max-w-[1180px] px-7">
          <div className="h-px w-full bg-line">
            <span
              ref={progressRef}
              className="block h-px origin-left bg-signal"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
