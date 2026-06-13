"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOptions = {
  disabled?: boolean;
  rootMargin?: string;
  threshold?: number;
};

export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): { ref: RefObject<T | null>; inView: boolean } {
  const { disabled = false, rootMargin = "80px", threshold = 0 } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(false);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled, rootMargin, threshold]);

  return { ref, inView };
}

export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === "visible");
    onChange();
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  return visible;
}
