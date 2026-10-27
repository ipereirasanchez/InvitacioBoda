import { ExternalLink, MapPin, Navigation as NavigationIcon } from "lucide-react";
import finca from "../assets/finca.webp";
import marcaAquarela from "../assets/marca-aquarela.webp";
import { Senefa } from "./ui/Senefa";
import { wedding } from "../lib/weddingData";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

const FINCA_ALT = "Il·lustració de la finca";

export function LocationSection() {
  return (
    <section
      id="ubicacio"
      className="relative scroll-mt-20 overflow-clip bg-ivory bg-gradient-to-b from-ivory via-ivory to-beige px-6 py-24"
    >
      {/* Marca d'aquarel·la de fons: amb luminosity agafa el to del fons i només hi deixa una variació de llum. */}
      <img
        src={marcaAquarela}
        alt=""
        aria-hidden="true"
        width={1600}
        height={798}
        data-marca-aquarela
        className="pointer-events-none absolute top-0 -left-[10%] w-[120%] max-w-none mix-blend-luminosity opacity-50 md:top-10 md:-left-[6%] md:w-[80%]"
        loading="lazy"
      />
      <Senefa
        n={6}
        className="absolute -right-4 bottom-0 w-[34vw] text-olive opacity-25 md:-right-2 md:w-[16vw] md:max-w-xs md:opacity-35"
      />

      {/* Mòbil: la finca queda darrere del text, com a fons. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 flex justify-center md:hidden">
        <img src={finca} alt="" width={1200} height={760} className="w-[110vw] max-w-none opacity-30" loading="lazy" />
      </div>

      <div className="relative">
        <SectionHeading title="On serà" />

        <div className="mx-auto mt-10 grid max-w-7xl items-center gap-8 md:mt-14 md:grid-cols-[2fr_1fr] md:gap-10 lg:gap-14">
          <Reveal variant="scale" className="hidden md:block">
            <img src={finca} alt={FINCA_ALT} width={1200} height={760} className="w-full" loading="lazy" />
          </Reveal>

          <div className="text-center md:text-left">
            <Reveal>
              <div className="flex items-center justify-center gap-2 text-olive md:justify-start">
                <MapPin size={22} />
                <span className="font-display text-3xl font-bold text-olive-dark italic">{wedding.venueName}</span>
              </div>
              <p className="mt-3 font-sans text-lg font-semibold text-olive-dark">{wedding.venueAddress}</p>
              <p className="mt-1 font-sans text-olive-dark">{wedding.venueLocation}</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <ButtonLink href={wedding.mapLinkHref} target="_blank" rel="noreferrer" variant="solid">
                  <NavigationIcon size={14} />
                  Com arribar-hi
                </ButtonLink>
                <ButtonLink href={wedding.venueInstagram} target="_blank" rel="noreferrer" variant="outline">
                  <ExternalLink size={14} />
                  Veure el lloc
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
