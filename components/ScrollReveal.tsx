"use client";

import {
  useEffect,
  useRef,
  createElement,
  type ReactNode,
  type HTMLAttributes,
} from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span";
} & HTMLAttributes<HTMLElement>;

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: `scroll-reveal-line ${className}`.trim(),
      ...rest,
    },
    children,
  );
}
