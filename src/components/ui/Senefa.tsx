import type { CSSProperties } from "react";
import senefa1 from "../../assets/senefa-floral-1.svg";
import senefa2 from "../../assets/senefa-floral-2.svg";
import senefa3 from "../../assets/senefa-floral-3.svg";
import senefa4 from "../../assets/senefa-floral-4.svg";
import senefa5 from "../../assets/senefa-floral-5.svg";
import senefa6 from "../../assets/senefa-floral-6.svg";
import ratios from "../../assets/svg-ratios.json";

const SENEFES = {
  1: senefa1,
  2: senefa2,
  3: senefa3,
  4: senefa4,
  5: senefa5,
  6: senefa6,
} as const;

interface SenefaProps {
  n: keyof typeof SENEFES;
  /** Amplada (i color via `text-*`) amb classes; l'alçada surt de la proporció del dibuix. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Senefa floral com a màscara CSS: l'SVG es carrega com a fitxer (no s'incrusta al JS)
 * i es pinta amb el color del text (`bg-current`), igual que amb `currentColor`.
 */
export function Senefa({ n, className = "", style }: SenefaProps) {
  const url = `url("${SENEFES[n]}")`;
  return (
    <div
      aria-hidden="true"
      data-senefa={n}
      className={`pointer-events-none bg-current ${className}`}
      style={{
        aspectRatio: ratios[`senefa-floral-${n}`],
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}
