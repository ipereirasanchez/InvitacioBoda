import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    question: "Quin és el codi de vestimenta?",
    answer:
      "Etiqueta elegant. La cerimònia i el convit seran a l'aire lliure, així que us recomanem calçat còmode per trepitjar gespa i grava.",
  },
  {
    question: "Puc portar els meus fills?",
    answer:
      "Ens encantarà que la festa sigui per a tothom. Si teniu dubtes sobre portar els vostres fills, escriviu-nos i ho comentem junts.",
  },
  {
    question: "Hi haurà aparcament?",
    answer:
      "Sí, el lloc de la celebració disposa d'aparcament gratuït per a tots els convidats que vulguin venir amb el seu propi vehicle.",
  },
  {
    question: "Hi haurà servei de bus?",
    answer:
      "Sí, facilitarem un servei de bus des d'un punt de trobada que confirmarem més endavant. Indiqueu-nos al formulari de confirmació si el voleu utilitzar.",
  },
  {
    question: "Què passa si tinc alguna al·lèrgia o intolerància?",
    answer:
      "Indiqueu-nos-ho al formulari de confirmació d'assistència perquè puguem adaptar el menú a les vostres necessitats.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-24">
      <SectionHeading eyebrow="Dubtes habituals" title="Preguntes freqüents" />

      <div className="mx-auto mt-12 max-w-2xl divide-y divide-ink/10">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={i * 60} className="py-2">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-display text-lg text-ink sm:text-xl">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-sage-600 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="text-ink-light overflow-hidden pb-4 leading-relaxed">{faq.answer}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
