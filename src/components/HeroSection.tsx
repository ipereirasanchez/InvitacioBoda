import { ChevronDown } from "lucide-react";
import { wedding } from "../lib/weddingData";
import { Divider } from "./ui/Divider";
import { ButtonLink } from "./ui/Button";

export function HeroSection() {
  return (
    <section
      id="inici"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-sage-800 via-sage-700 to-sage-600 px-6 text-center"
    >
      <BotanicalOverlay />

      <div className="relative z-10 flex flex-col items-center pt-16">
        <p className="font-sans text-xs font-medium tracking-[0.4em] text-cream-dark uppercase">
          Junts amb les nostres famílies
        </p>

        <h1 className="font-script mt-6 text-7xl leading-none text-paper drop-shadow-sm sm:text-8xl md:text-9xl">
          {wedding.brideAndGroom}
        </h1>

        <div className="text-cream-dark">
          <Divider light />
        </div>

        <p className="font-display text-xl tracking-wide text-paper sm:text-2xl">
          {wedding.dayLabel}, {wedding.dateLabel}
          <span className="mx-3 text-gold-light">·</span>
          {wedding.venueName}, {wedding.venueLocation}
        </p>

        <ButtonLink href="#rsvp" variant="outline-light" className="mt-10">
          Confirma l&apos;assistència
        </ButtonLink>
      </div>

      <a
        href="#historia"
        aria-label="Baixa a la següent secció"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-paper/80"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

function BotanicalOverlay() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#f0e9db" strokeWidth="1" fill="none">
        <path d="M-20 40 C 60 90, 100 10, 180 60 S 260 140, 340 90" />
        <path d="M20 60 C 30 20, 50 0, 70 -20" />
        <path d="M60 50 C 70 10, 90 -10, 110 -30" />
        <path d="M780 520 C 700 470, 660 550, 580 500 S 500 420, 420 470" />
        <path d="M760 540 C 750 580, 730 600, 710 620" />
        <path d="M720 530 C 710 570, 690 590, 670 610" />
        <circle cx="150" cy="55" r="3" />
        <circle cx="620" cy="480" r="3" />
      </g>
    </svg>
  );
}
