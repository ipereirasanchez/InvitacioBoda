import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:shadow-olive-dark/15";

const variants = {
  solid: "bg-olive-dark text-ivory hover:bg-olive",
  outline: "border border-olive-dark text-olive-dark hover:bg-olive-dark hover:text-ivory",
  "outline-light": "border border-ivory/70 text-ivory hover:bg-ivory hover:text-olive-dark",
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
