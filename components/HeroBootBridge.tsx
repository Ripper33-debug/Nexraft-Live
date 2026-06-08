"use client";

import { useEffect, useState, type ReactNode } from "react";

type HeroBootBridgeProps = {
  children: ReactNode;
};

export function HeroBootBridge({ children }: HeroBootBridgeProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const markReady = () => setReady(true);

    if (document.documentElement.classList.contains("boot-complete")) {
      markReady();
      return;
    }

    window.addEventListener("nexraft:boot-complete", markReady, { once: true });
    return () =>
      window.removeEventListener("nexraft:boot-complete", markReady);
  }, []);

  return (
    <div data-hero-ready={ready ? "true" : "false"} className="contents">
      {children}
    </div>
  );
}
