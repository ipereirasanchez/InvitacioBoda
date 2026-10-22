import { ExternalLink, MapPin, Navigation as NavigationIcon } from "lucide-react";
import finca from "../assets/finca.webp";
import { wedding } from "../lib/weddingData";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

export function LocationSection() {
  return (
    <section id="ubicacio" className="bg-ivory px-6 py-24">
      <SectionHeading
        eyebrow="On serà"
        title="Ubicació"
        subtitle="La cerimònia i el convit tindran lloc al mateix indret, envoltats de natura."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <Reveal>
          <img src={finca} alt="Il·lustració de la finca" width={1200} height={799} className="w-full" loading="lazy" />
        </Reveal>

        <Reveal delay={120} className="text-center md:text-left">
          <div className="mb-4 flex items-center justify-center gap-2 text-olive md:justify-start">
            <MapPin size={20} />
            <span className="font-display text-2xl text-olive-dark italic">{wedding.venueName}</span>
          </div>
          <p className="font-sans text-olive-dark">{wedding.venueAddress}</p>
          <p className="mt-4 leading-relaxed text-olive-dark">
            {wedding.venueName}, {wedding.venueLocation}. Un indret envoltat de natura, perfecte per
            celebrar-hi el nostre gran dia a l&apos;aire lliure.
          </p>

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
    </section>
  );
}
