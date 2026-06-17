"use client";

import { useEffect, useRef, type RefObject } from "react";

const BG = "rgb(10, 14, 12)";
const WHITE = "rgb(232, 237, 233)";
const GREEN = "rgb(67, 208, 133)";
const LANES = 32;

type Stream = {
  x: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
  gap: number;
  headRadius: number;
  laneIndex: number;
};

type HeroCanvasProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

function parseRgb(color: string): [number, number, number] {
  const match = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return [232, 237, 233];
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function initStreams(canvasWidth: number): Stream[] {
  const streams: Stream[] = [];
  for (let lane = 0; lane < LANES; lane++) {
    const count = randInt(1, 3);
    for (let i = 0; i < count; i++) {
      streams.push({
        x: rand(-220, canvasWidth),
        length: rand(40, 220),
        speed: rand(0.3, 1.7),
        opacity: rand(0.08, 0.45),
        color: Math.random() < 0.75 ? WHITE : GREEN,
        gap: rand(100, 900),
        headRadius: rand(6, 10),
        laneIndex: lane,
      });
    }
  }
  return streams;
}

function drawRadialGlow(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cx: number,
  cy: number,
  radius: number,
  alpha: number,
) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  g.addColorStop(0, `rgba(67, 208, 133, ${alpha})`);
  g.addColorStop(1, "transparent");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);
}

function drawStream(
  ctx: CanvasRenderingContext2D,
  stream: Stream,
  y: number,
  width: number,
) {
  const { x, length, opacity, color, headRadius } = stream;
  const [r, g, b] = parseRgb(color);
  const head = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  const streak = ctx.createLinearGradient(x - length, y, x, y);
  streak.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
  streak.addColorStop(1, head);

  ctx.strokeStyle = streak;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x - length, y);
  ctx.lineTo(x, y);
  ctx.stroke();

  const headGlow = ctx.createRadialGradient(x, y, 0, x, y, headRadius);
  headGlow.addColorStop(0, head);
  headGlow.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${opacity * 0.45})`);
  headGlow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
  ctx.fillStyle = headGlow;
  ctx.beginPath();
  ctx.arc(x, y, headRadius, 0, Math.PI * 2);
  ctx.fill();
}

export function HeroCanvas({ sectionRef }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const streamsRef = useRef<Stream[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const rafRef = useRef(0);
  const reducedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current = { width, height };
      streamsRef.current = initStreams(width);

      if (mouseRef.current.x === 0 && mouseRef.current.y === 0) {
        mouseRef.current = { x: width * 0.65, y: height * 0.4 };
      }
    };

    const draw = () => {
      const { width, height } = sizeRef.current;
      if (width === 0 || height === 0) return;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      drawRadialGlow(ctx, width, height, width * 0.65, height * 0.4, 320, 0.08);
      drawRadialGlow(ctx, width, height, width * 0.9, height * 0.7, 200, 0.04);
      drawRadialGlow(
        ctx,
        width,
        height,
        mouseRef.current.x,
        mouseRef.current.y,
        200,
        0.07,
      );

      const vStep = width / 22;
      ctx.strokeStyle = "rgba(232, 237, 233, 0.03)";
      ctx.lineWidth = 0.5;
      for (let vx = 0; vx <= width; vx += vStep) {
        ctx.beginPath();
        ctx.moveTo(vx, 0);
        ctx.lineTo(vx, height);
        ctx.stroke();
      }

      const laneHeight = height / LANES;

      for (let lane = 0; lane < LANES; lane++) {
        const y = lane * laneHeight + laneHeight / 2;
        ctx.strokeStyle = "rgba(232, 237, 233, 0.025)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const animate = !reducedRef.current;
      for (const stream of streamsRef.current) {
        const y = stream.laneIndex * laneHeight + laneHeight / 2;
        drawStream(ctx, stream, y, width);
        if (animate) {
          stream.x += stream.speed;
          if (stream.x - stream.length > width) {
            stream.x = -stream.gap;
          }
        }
      }
    };

    const loop = () => {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    const onMouseMove = (event: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const { width, height } = sizeRef.current;
      if (rect.width === 0 || rect.height === 0) return;

      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * width,
        y: ((event.clientY - rect.top) / rect.height) * height,
      };

      if (reducedRef.current) {
        draw();
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    const section = sectionRef.current;
    section?.addEventListener("mousemove", onMouseMove);

    if (reducedRef.current) {
      draw();
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      section?.removeEventListener("mousemove", onMouseMove);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
