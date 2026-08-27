import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p
          className={`mb-3 font-sans text-xs font-medium tracking-[0.3em] uppercase ${
            light ? "text-cream-dark" : "text-gold-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl italic sm:text-5xl ${light ? "text-paper" : "text-ink"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-xl text-balance ${light ? "text-cream-dark" : "text-ink-light"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
