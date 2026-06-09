"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "p" | "h2" | "h3" | "span" | "blockquote";
  id?: string;
};

const motionTags = {
  div: motion.div,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  blockquote: motion.blockquote,
} as const;

export function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motionTags[Tag];

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
