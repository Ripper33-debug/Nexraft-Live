"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WorkProject } from "@/lib/work";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function CardVisual({ project }: { project: WorkProject }) {
  if (project.demo) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center border-b border-line bg-gradient-to-br from-panel via-ink2 to-ink">
        <span className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-bone">
          3D
        </span>
        <span className="mt-1 text-xs text-faint">Live demo</span>
      </div>
    );
  }
  if (project.image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line bg-ink">
        <Image
          src={project.image}
          alt={`${project.name} project preview`}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="440px"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center border-b border-line bg-gradient-to-br from-panel to-ink">
      <span className="font-display text-5xl font-semibold text-line">
        {project.name.charAt(0)}
      </span>
    </div>
  );
}

function ProjectCard({ project }: { project: WorkProject }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      ref={ref}
      href={project.href}
      target={project.external ? "_blank" : undefined}
      rel={project.external ? "noopener noreferrer" : undefined}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`spotlight-card group flex w-[78vw] max-w-[440px] shrink-0 flex-col border border-line bg-ink2 transition-[transform,background-color] duration-300 [transform-style:preserve-3d] hover:bg-panel ${focusRing}`}
    >
      <span aria-hidden="true" className="spotlight-card-fill" />
      <span aria-hidden="true" className="spotlight-card-edge" />
      <div className="relative z-[1] flex h-full flex-col">
        <CardVisual project={project} />
        <div className="flex flex-1 flex-col p-6 md:p-7">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
            {project.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">
            {project.outcome}
          </p>
          <span
            aria-hidden="true"
            className="mt-5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint transition-colors group-hover:text-soft"
          >
            {project.external ? "Visit site" : "View project"} {"\u2197"}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function WorkTrack({ projects }: { projects: WorkProject[] }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [outerHeight, setOuterHeight] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rafId = 0;
    let distance = 0;

    const measure = () => {
      const track = trackRef.current;
      if (!track || !desktop.matches || reduce.matches) {
        distance = 0;
        setOuterHeight(0);
        setX(0);
        return;
      }
      distance = Math.max(0, track.scrollWidth - window.innerWidth + 56);
      setOuterHeight(window.innerHeight + distance);
    };

    const update = () => {
      rafId = 0;
      const outer = outerRef.current;
      if (!outer || distance <= 0) {
        setX(0);
        return;
      }
      const top = outer.getBoundingClientRect().top;
      const scrolled = Math.min(Math.max(-top, 0), distance);
      setX(-scrolled);
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktop.addEventListener("change", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [projects.length]);

  return (
    <>
      {/* Desktop: pinned horizontal scroll */}
      <div
        ref={outerRef}
        className="relative mt-12 hidden md:block"
        style={outerHeight ? { height: `${outerHeight}px` } : undefined}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6 px-7 will-change-transform"
            style={{ transform: `translate3d(${x}px, 0, 0)` }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: swipeable snap row */}
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-7 pb-4 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <div key={project.id} className="snap-start">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </>
  );
}
