import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import noltros from "../assets/noltros.webp";
import Logo from "../assets/logo.svg?react";
import { Senefa } from "./ui/Senefa";
import { wedding } from "../lib/weddingData";
import { ButtonLink } from "./ui/Button";

export function HeroSection() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section
      id="inici"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-hero-light via-hero-mid to-hero-dark"
    >
      {/* Senefa superior esquerra: a mòbil, més petita i darrere del logo. */}
      <Senefa
        n={2}
        className="absolute top-14 -left-2 w-[44vw] text-olive opacity-50 md:top-2 md:left-0 md:w-[27vw] md:opacity-60"
      />
      <Senefa
        n={1}
        className="absolute right-0 bottom-0 w-[70vw] translate-x-[28%] translate-y-[6%] text-olive/60 md:right-2 md:bottom-4 md:w-[34vw] md:translate-x-0 md:translate-y-0 md:text-ivory"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-4 px-6 pt-24 pb-20 md:grid-cols-[11fr_10fr] md:gap-2 md:px-10 md:pt-16 md:pb-16">
        <motion.div {...enter(0)} className="flex justify-center md:justify-start">
          <img
            src={noltros}
            alt="Il·lustració de la Xisca i l'Ivan"
            width={799}
            height={1200}
            className="aspect-[799/900] w-full max-w-sm object-cover sm:max-w-md md:-ml-[8%] md:w-[118%] md:max-w-none"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        <div className="order-first flex flex-col items-center text-center md:order-none">
          <motion.div {...enter(0.2)}>
            <Logo
              data-logo="main"
              aria-hidden="true"
              className="h-auto w-36 drop-shadow-xl drop-shadow-olive-dark/25 sm:w-44 md:w-48 lg:w-56"
            />
          </motion.div>

          <motion.div {...enter(0.4)} className="flex flex-col items-center">
            <h1 className="mt-3 font-display text-6xl leading-none text-olive-dark italic sm:text-7xl md:mt-5 md:text-8xl md:text-ivory md:drop-shadow-md">
              {wedding.bride} <span className="not-italic">&amp;</span> {wedding.groom}
            </h1>
            <p className="mt-3 font-display text-3xl tracking-wide text-date-brown md:text-4xl [font-variant-numeric:lining-nums]">
              {wedding.dateShort}
            </p>
            <p className="mt-2 font-sans text-sm text-olive-dark">
              <span className="font-bold">{wedding.venueName}</span> · {wedding.venueLocation}
            </p>
          </motion.div>

          <motion.div {...enter(0.6)} className="flex flex-col items-center">
            <p className="mt-6 max-w-xs font-display text-xl leading-snug text-balance text-olive-dark italic sm:max-w-lg sm:text-2xl md:mt-8 md:max-w-xl">
              {wedding.intro}
            </p>
            <ButtonLink href="#rsvp" variant="solid" className="mt-8 w-full max-w-xs sm:max-w-sm md:mt-10 md:py-4">
              Confirma l&apos;assistència
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <a
        href="#historia"
        aria-label="Baixa a la següent secció"
        className="absolute hidden md:block bottom-6 left-1/2 z-10 -translate-x-1/2 motion-safe:animate-bounce text-olive-dark/70"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
