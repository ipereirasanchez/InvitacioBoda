import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  light?: boolean;
  /** Ornament (senefa) sota el títol. */
  ornament?: ReactNode;
}

export function SectionHeading({ eyebrow, title, subtitle, light = false, ornament }: SectionHeadingProps) {
  return (
    <Reveal className="relative mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p
          className={`mb-3 font-sans text-xs font-medium tracking-[0.3em] uppercase ${
            light ? "text-ivory" : "text-olive-dark"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl italic sm:text-5xl ${light ? "text-ivory" : "text-olive-dark"}`}
      >
        {title}
      </h2>
      {ornament}
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-xl text-balance ${light ? "text-ivory" : "text-olive-dark"}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
