import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  /** Retard en mil·lisegons. */
  delay?: number;
  className?: string;
  as?: "div" | "span";
  /** "up": text i blocs (pugen 24 px). "scale": il·lustracions (apareixen des del 96 %). "fade": només opacitat. */
  variant?: "up" | "scale" | "fade";
  /** Fracció visible de l'element que dispara l'aparició. */
  amount?: number;
}

const HIDDEN = {
  up: { opacity: 0, y: 24 },
  scale: { opacity: 0, scale: 0.96 },
  fade: { opacity: 0 },
};
const SHOWN = {
  up: { opacity: 1, y: 0 },
  scale: { opacity: 1, scale: 1 },
  fade: { opacity: 1 },
};

export function Reveal({ children, delay = 0, className = "", as = "div", variant = "up", amount = 0.2 }: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "span" ? motion.span : motion.div;
  const v = reduce ? "fade" : variant;

  return (
    <Tag
      data-reveal
      className={className}
      initial={HIDDEN[v]}
      whileInView={SHOWN[v]}
      viewport={{ once: true, amount }}
      transition={{ duration: v === "scale" ? 0.9 : 0.7, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </Tag>
  );
}
