import { ExternalLink, MapPin, Navigation as NavigationIcon } from "lucide-react";
import { wedding } from "../lib/weddingData";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

export function LocationSection() {
  return (
    <section id="ubicacio" className="bg-cream px-6 py-24">
      <SectionHeading
        eyebrow="On serà"
        title="Ubicació"
        subtitle="La cerimònia i el convit tindran lloc al mateix indret, envoltats de natura."
      />

      <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <Reveal className="overflow-hidden rounded-sm border border-ink/10 shadow-sm">
          <iframe
            title="Mapa del lloc de la celebració"
            src={wedding.mapEmbedSrc}
            className="h-80 w-full grayscale-[15%] md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal delay={120} className="text-center md:text-left">
          <div className="mb-4 flex items-center justify-center gap-2 text-sage-700 md:justify-start">
            <MapPin size={20} />
            <span className="font-display text-2xl italic">{wedding.venueName}</span>
          </div>
          <p className="text-ink-light leading-relaxed">
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
