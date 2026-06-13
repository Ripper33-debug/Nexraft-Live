"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useInView, usePageVisible } from "@/lib/use-in-view";

const ProductDemoScene = dynamic(() => import("@/components/ProductDemoScene"), {
  ssr: false,
  loading: () => <ProductDemoFallback />,
});

function ProductDemoFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative h-32 w-32">
        <div
          className="absolute inset-0 border border-bone/30 bg-panel"
          style={{ transform: "rotateX(58deg) rotateZ(-24deg)" }}
        />
        <div
          className="absolute inset-2 border border-signal/40 bg-signal/10"
          style={{ transform: "rotateX(58deg) rotateZ(-24deg) translateY(-8px)" }}
        />
      </div>
    </div>
  );
}

export function ProductDemo() {
  const [interactiveAllowed, setInteractiveAllowed] = useState(false);
  const pageVisible = usePageVisible();
  const { ref, inView } = useInView<HTMLDivElement>({
    disabled: !interactiveAllowed,
    rootMargin: "120px",
  });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (!reduced && !narrow) setInteractiveAllowed(true);
  }, []);

  const showScene = interactiveAllowed && pageVisible && inView;

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="scroll-mt-[68px] border-b border-line bg-ink2 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-7 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div>
            <p className="text-sm text-mute">Interactive 3D</p>
            <h2
              id="demo-heading"
              className="mt-3 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
            >
              Spin it in the browser.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mute md:text-base">
              Product viewers, configurators, and technical walkthroughs that
              load fast and work on phones. Drag the model to explore.
            </p>
            <Link
              href="/3d-product-viewer"
              className="mt-6 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal"
            >
              See the 3D pipeline
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={ref}
            className="relative aspect-[4/3] overflow-hidden border border-line bg-ink"
          >
            {showScene ? (
              <ProductDemoScene active={showScene} />
            ) : (
              <ProductDemoFallback />
            )}
            <p className="pointer-events-none absolute bottom-3 left-3 text-xs text-faint">
              {showScene ? "Drag to rotate" : "3D preview"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
