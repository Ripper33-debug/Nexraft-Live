"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { useInView, usePageVisible } from "@/lib/use-in-view";
import type { Finish, ShelterLayout } from "@/components/ProductDemoScene";

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
  { id: "signal", name: "Signal", value: "#43D085" },
] as const;

const FINISHES: { id: Finish; name: string }[] = [
  { id: "matte", name: "Matte" },
  { id: "gloss", name: "Gloss" },
];

const LAYOUTS: { id: ShelterLayout; name: string }[] = [
  { id: "compact", name: "Compact" },
  { id: "field", name: "Field" },
];

/**
 * Scroll-driven story: as the visitor scrolls past the pinned demo, the model
 * auto-advances through these presets so the configurator sells itself before
 * anyone touches a control. Manual controls still override within a step.
 */
const SCROLLY_STEPS: {
  color: string;
  finish: Finish;
  layout: ShelterLayout;
  caption: string;
}[] = [
  {
    color: MATERIALS[0].value,
    finish: "matte",
    layout: "compact",
    caption: "Recolor in real time — every material updates instantly.",
  },
  {
    color: MATERIALS[3].value,
    finish: "matte",
    layout: "compact",
    caption: "Signal green, or any brand color you throw at it.",
  },
  {
    color: MATERIALS[3].value,
    finish: "matte",
    layout: "field",
    caption: "Resize and reconfigure the layout on the fly.",
  },
  {
    color: MATERIALS[1].value,
    finish: "gloss",
    layout: "field",
    caption: "Switch finishes — matte to gloss — in a single click.",
  },
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
  const [layout, setLayout] = useState<ShelterLayout>("compact");

  const outerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

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

  // Pinned scrollytelling is desktop + motion only; mobile/reduced keeps the
  // plain interactive layout.
  const scrolly = allowed && motionOk;
  const activeStep = Math.min(
    Math.floor(progress * SCROLLY_STEPS.length),
    SCROLLY_STEPS.length - 1,
  );

  useEffect(() => {
    if (!scrolly) return;
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const outer = outerRef.current;
      if (!outer) return;
      const rect = outer.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) {
        setProgress(1);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), distance);
      setProgress(scrolled / distance);
    };
    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrolly]);

  // Drive the model presets from the current scroll step.
  useEffect(() => {
    if (!scrolly) return;
    const step = SCROLLY_STEPS[activeStep];
    setColor(step.color);
    setFinish(step.finish);
    setLayout(step.layout);
  }, [scrolly, activeStep]);

  const section = (
    <section
      id={scrolly ? undefined : "demo"}
      aria-labelledby="demo-heading"
      className={`border-b border-line bg-ink2 ${
        scrolly
          ? "flex min-h-screen items-center py-12"
          : "scroll-mt-[68px] py-16 md:py-20"
      }`}
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-7 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div>
            <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
              Interactive 3D
            </p>
            <h2
              id="demo-heading"
              className="mt-3 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
            >
              Configure it live.
            </h2>
            <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-mute">
              A modular field shelter you can recolor, resize, and finish in
              real time. The same engine we ship for product viewers and full
              configurators - fast on a laptop, fast on a phone.
            </p>
            {scrolly ? (
              <div className="mt-6 min-h-[3.5rem]">
                <p
                  key={activeStep}
                  className="scrolly-caption max-w-md font-body text-base leading-relaxed text-bone"
                >
                  {SCROLLY_STEPS[activeStep].caption}
                </p>
                <div className="mt-4 flex gap-2" aria-hidden="true">
                  {SCROLLY_STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 w-8 transition-colors duration-300 ${
                        i === activeStep ? "bg-signal" : "bg-line"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
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
                  layout={layout}
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
                  <legend className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
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
                  <legend className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                    Layout
                  </legend>
                  <div className="mt-2.5 flex gap-2">
                    {LAYOUTS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setLayout(option.id)}
                        aria-pressed={layout === option.id}
                        className={`border px-3 py-1.5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] transition-colors duration-300 ${
                          layout === option.id
                            ? "border-bone text-bone"
                            : "border-line text-faint hover:border-mute hover:text-mute"
                        } ${focusRing}`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="border-0 p-0">
                  <legend className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                    Finish
                  </legend>
                  <div className="mt-2.5 flex gap-2">
                    {FINISHES.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setFinish(option.id)}
                        aria-pressed={finish === option.id}
                        className={`border px-3 py-1.5 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] transition-colors duration-300 ${
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

  if (!scrolly) return section;

  return (
    <div
      ref={outerRef}
      id="demo"
      aria-label="Interactive 3D product demo"
      className="relative scroll-mt-[68px] bg-ink2"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 overflow-hidden">{section}</div>
    </div>
  );
}
