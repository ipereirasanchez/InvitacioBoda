import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300";

const variants = {
  solid: "bg-sage-600 text-cream hover:bg-sage-700",
  outline: "border border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  "outline-light": "border border-cream/50 text-cream hover:bg-cream hover:text-ink",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  children: ReactNode;
}

export function Button({ variant = "solid", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants;
  children: ReactNode;
}

export function ButtonLink({ variant = "solid", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
