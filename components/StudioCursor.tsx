"use client";

import { useEffect, useState } from "react";

export function StudioCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!fine || reduced) return;

    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor-hover], input, textarea"),
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
        aria-hidden="true"
      >
        <div
          className={`rounded-full border border-white transition-all duration-200 ${
            hovering ? "h-10 w-10 opacity-90" : "h-2 w-2 opacity-100"
          }`}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[99] font-mono text-[9px] uppercase tracking-widest text-muted/60"
        style={{
          left: pos.x + 14,
          top: pos.y + 14,
        }}
        aria-hidden="true"
      >
        {hovering ? "open" : ""}
      </div>
    </>
  );
}
