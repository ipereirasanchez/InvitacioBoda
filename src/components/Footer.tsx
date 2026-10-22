import LogoSimple from "../assets/logo-simple.svg?react";
import { wedding } from "../lib/weddingData";
import { Divider } from "./ui/Divider";

export function Footer() {
  return (
    <footer className="bg-olive-dark px-6 py-14 text-center text-ivory">
      <p className="font-display flex items-center justify-center gap-3 text-4xl italic">
        {wedding.bride}
        <LogoSimple data-logo="simple" aria-hidden className="h-[1.2em] w-auto" />
        {wedding.groom}
      </p>
      <div>
        <Divider light />
      </div>
      <p className="font-sans text-xs tracking-[0.2em] text-ivory/80 uppercase">
        {wedding.dayLabel}, {wedding.dateLabel} · {wedding.venueName}, {wedding.venueLocation}
      </p>
      <p className="mt-6 font-sans text-[11px] text-ivory/70">Fet amb amor per a la nostra boda.</p>
    </footer>
  );
}
