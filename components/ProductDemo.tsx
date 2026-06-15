"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useInView, usePageVisible } from "@/lib/use-in-view";
import type { Finish } from "@/components/ProductDemoScene";

const ProductDemoScene = dynamic(() => import("@/components/ProductDemoScene"), {
  ssr: false,
  loading: () => <ProductDemoFallback />,
});

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const MATERIALS = [
  { id: "bone", name: "Bone", value: "#E8EDE9" },
  { id: "steel", name: "Steel", value: "#7C8A82" },
  { id: "slate", name: "Slate", value: "#566159" },
  { id: "signal", name: "Signal", value: "#9EFF5B" },
] as const;

const FINISHES: { id: Finish; name: string }[] = [
  { id: "matte", name: "Matte" },
  { id: "gloss", name: "Gloss" },
];

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
  const [allowed, setAllowed] = useState(false);
  const [motionOk, setMotionOk] = useState(true);
  const [color, setColor] = useState<string>(MATERIALS[0].value);
  const [finish, setFinish] = useState<Finish>("matte");

  const pageVisible = usePageVisible();
  const { ref, inView } = useInView<HTMLDivElement>({
    disabled: !allowed,
    rootMargin: "120px",
  });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    setAllowed(!narrow);
    setMotionOk(!reduced);
  }, []);

  const mountScene = allowed && pageVisible && inView;
  const sceneActive = mountScene && motionOk;

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
              Configure it live.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-mute md:text-base">
              Pick a material and finish and the product updates in real time.
              The same engine we use for product viewers and full configurators -
              fast on a laptop, fast on a phone.
            </p>
            <Link
              href="/3d-product-viewer"
              className={`mt-6 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-signal ${focusRing}`}
            >
              See the 3D pipeline
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <div
              ref={ref}
              className="relative aspect-[4/3] overflow-hidden border border-line bg-ink"
            >
              {mountScene ? (
                <ProductDemoScene
                  active={sceneActive}
                  color={color}
                  finish={finish}
                />
              ) : (
                <ProductDemoFallback />
              )}
              <p className="pointer-events-none absolute bottom-3 left-3 text-xs text-faint">
                {mountScene ? "Drag to rotate" : "3D preview"}
              </p>
            </div>

            {allowed ? (
              <div className="mt-5 flex flex-wrap items-start gap-x-10 gap-y-5">
                <fieldset className="border-0 p-0">
                  <legend className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                    Material
                  </legend>
                  <div className="mt-2.5 flex gap-2">
                    {MATERIALS.map((material) => (
                      <button
                        key={material.id}
                        type="button"
                        onClick={() => setColor(material.value)}
                        aria-pressed={color === material.value}
                        aria-label={material.name}
                        title={material.name}
                        className={`h-8 w-8 border transition-colors duration-300 ${
                          color === material.value
                            ? "border-signal"
                            : "border-line hover:border-mute"
                        } ${focusRing}`}
                        style={{ backgroundColor: material.value }}
                      />
                    ))}
                  </div>
                </fieldset>

                <fieldset className="border-0 p-0">
                  <legend className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                    Finish
                  </legend>
                  <div className="mt-2.5 flex gap-2">
                    {FINISHES.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFinish(option.id)}
                        aria-pressed={finish === option.id}
                        className={`border px-3 py-1.5 font-jetbrains text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                          finish === option.id
                            ? "border-bone text-bone"
                            : "border-line text-faint hover:border-mute hover:text-mute"
                        } ${focusRing}`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
