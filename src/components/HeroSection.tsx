import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import noltros from "../assets/noltros.webp";
import Logo from "../assets/logo.svg?react";
import SenefaFloral1 from "../assets/senefa-floral-1.svg?react";
import SenefaFloral2 from "../assets/senefa-floral-2.svg?react";
import { wedding } from "../lib/weddingData";
import { ButtonLink } from "./ui/Button";

export function HeroSection() {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  });

  return (
    <section
      id="inici"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-hero-light via-hero-mid to-hero-dark"
    >
      <SenefaFloral2
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-0 hidden h-auto w-[27vw] text-olive opacity-60 md:block"
      />
      <SenefaFloral1
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-auto w-[80vw] translate-x-[30%] text-olive/60 md:right-2 md:bottom-4 md:w-[34vw] md:translate-x-0 md:text-ivory"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-6 pt-20 pb-16 md:grid-cols-2 md:gap-4 md:px-10 md:pt-16">
        <motion.div {...enter(0)} className="flex justify-center md:justify-start">
          <img
            src={noltros}
            alt="Il·lustració de la Xisca i l'Ivan"
            width={799}
            height={1200}
            className="aspect-[799/900] w-full max-w-md object-cover md:-ml-[8%] md:w-[120%] md:max-w-none"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        <div className="order-first flex flex-col items-center text-center md:order-none">
          <motion.div {...enter(0.2)}>
            <Logo data-logo="main" aria-hidden="true" className="-mb-2 h-auto w-56 md:-mb-4 md:w-72 lg:w-96" />
          </motion.div>

          <motion.div {...enter(0.4)} className="flex flex-col items-center">
            <p className="font-display text-2xl text-olive-dark italic">Junts amb les nostres famílies</p>
            <h1 className="mt-1 font-display text-6xl leading-none text-olive-dark italic sm:text-7xl md:text-8xl md:text-ivory md:drop-shadow-md">
              {wedding.bride} &amp; {wedding.groom}
            </h1>
            <p className="mt-2 font-display text-3xl tracking-wide text-date-brown md:text-4xl">
              {wedding.dateShort}
            </p>
            <p className="mt-2 font-sans text-sm text-olive-dark">
              {wedding.venueName}, {wedding.venueLocation}
            </p>
            <ButtonLink href="#rsvp" variant="solid" className="mt-8">
              Confirma l&apos;assistència
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <a
        href="#historia"
        aria-label="Baixa a la següent secció"
        className="absolute hidden md:block bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-olive-dark/70"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
