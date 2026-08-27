import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span";
}

export function Reveal({ children, delay = 0, className = "", as = "div" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
