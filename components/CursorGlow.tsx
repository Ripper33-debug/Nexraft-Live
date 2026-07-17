"use client";

import { useEffect, useRef } from "react";

/**
 * Soft signal-colored glow that trails the pointer and swells over interactive
 * elements. Augments (does not replace) the native cursor, so usability is
 * unaffected. Only runs on fine-pointer devices with motion enabled.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = ref.current;
    if (!el || !fine.matches || reduce.matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const interactive = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, textarea, select, .spotlight-card',
      );
      targetScale = interactive ? 2.1 : 1;
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    const loop = () => {
      x += (mouseX - x) * 0.18;
      y += (mouseY - y) * 0.18;
      scale += (targetScale - scale) * 0.12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[26px] w-[26px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(67,208,133,0.55) 0%, rgba(67,208,133,0.12) 45%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
