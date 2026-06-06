"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Fade + rise on enter. Respects reduced-motion via framer's reducedMotion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Reveals each child word/line with a stagger. Uses opacity+shift so text
 * is never completely hidden (avoids large invisible empty sections). */
export function RevealLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`block ${lineClassName ?? ""}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{
            duration: 0.9,
            delay: i * 0.09,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}
