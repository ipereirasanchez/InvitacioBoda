import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  label?: string;
  className?: string;
}

const GRADIENTS = [
  "from-sage-grey to-olive",
  "from-beige to-sage-grey",
  "from-taupe to-hero-dark",
  "from-hero-mid to-sage-grey",
];

export function PlaceholderImage({ label, className = "" }: PlaceholderImageProps) {
  const gradient = GRADIENTS[Math.abs(hash(label ?? "")) % GRADIENTS.length];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${gradient} text-ivory ${className}`}
    >
      <ImageIcon size={28} strokeWidth={1.2} />
      {label && <span className="px-4 text-center font-sans text-[11px] tracking-[0.15em] uppercase">{label}</span>}
    </div>
  );
}

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i);
  }
  return h;
}
