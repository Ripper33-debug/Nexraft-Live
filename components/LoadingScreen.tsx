"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

const FLAG = "nexraft-intro-shown";
const MIN_DISPLAY = 1100;
const MAX_DISPLAY = 3500;
const OUT_DURATION = 600;

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning
// and lets the overlay mount before first paint on a genuine first load).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LoadingScreen() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useIsoLayoutEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(FLAG) === "1";
    } catch {
      alreadyShown = false;
    }
    if (alreadyShown) return;

    try {
      sessionStorage.setItem(FLAG, "1");
    } catch {
      // ignore storage failures
    }

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    setShow(true);
  }, []);

  const pctRef = useRef<HTMLSpanElement>(null);

  // 000 → 100 counter, eased so it sprints early and settles at the end.
  useEffect(() => {
    if (!show) return;
    const t0 =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    let raf = 0;
    const tick = () => {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const p = Math.min((now - t0) / MIN_DISPLAY, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (pctRef.current) {
        pctRef.current.textContent = String(Math.round(eased * 100)).padStart(
          3,
          "0",
        );
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const start =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    let leaveTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;
    let finished = false;

    const leave = () => {
      if (finished) return;
      finished = true;
      setLeaving(true);
      removeTimer = setTimeout(() => setShow(false), OUT_DURATION);
    };

    const ready = () => {
      const now =
        typeof performance !== "undefined" ? performance.now() : Date.now();
      const elapsed = now - start;
      leaveTimer = setTimeout(leave, Math.max(0, MIN_DISPLAY - elapsed));
    };

    if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready, { once: true });
    }

    const maxTimer = setTimeout(leave, MAX_DISPLAY);

    return () => {
      window.removeEventListener("load", ready);
      if (leaveTimer) clearTimeout(leaveTimer);
      if (removeTimer) clearTimeout(removeTimer);
      clearTimeout(maxTimer);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="loader-overlay fixed inset-0 z-[120] flex flex-col items-center justify-center bg-ink"
      data-leaving={leaving ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="loader-content flex flex-col items-center">
        <Image
          src="/nexraft-logo-header.png"
          alt=""
          width={394}
          height={80}
          priority
          className="block w-auto"
          style={{ height: 40, width: "auto" }}
        />
        <div className="loader-bar mt-8">
          <span className="loader-bar-fill" />
        </div>
        <p className="mt-5 flex items-baseline gap-4 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
          <span>INITIALIZING // EDGE NETWORK</span>
          <span ref={pctRef} className="loader-pct text-signal">
            000
          </span>
        </p>
      </div>
    </div>
  );
}
