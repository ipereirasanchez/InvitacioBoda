import { wedding } from "../lib/weddingData";
import { Divider } from "./ui/Divider";

export function Footer() {
  return (
    <footer className="bg-sage-900 px-6 py-14 text-center text-cream-dark">
      <p className="font-script text-4xl text-paper">{wedding.brideAndGroom}</p>
      <div>
        <Divider light />
      </div>
      <p className="font-sans text-xs tracking-[0.2em] uppercase">
        {wedding.dayLabel}, {wedding.dateLabel} · {wedding.venueName}, {wedding.venueLocation}
      </p>
      <p className="mt-6 font-sans text-[11px] text-cream-dark/70">
        Fet amb amor per a la nostra boda.
      </p>
    </footer>
  );
}
