import { Baby, Bus, Car, Shirt, Utensils } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    icon: Shirt,
    question: "Quin és el codi de vestimenta?",
    answer:
      "Etiqueta elegant. La cerimònia i el convit seran a l'aire lliure, així que us recomanem calçat còmode per trepitjar gespa i grava.",
  },
  {
    icon: Baby,
    question: "Puc portar els meus fills?",
    answer:
      "Ens encantarà que la festa sigui per a tothom. Si teniu dubtes sobre portar els vostres fills, escriviu-nos i ho comentem junts.",
  },
  {
    icon: Car,
    question: "Hi haurà aparcament?",
    answer:
      "Sí, el lloc de la celebració disposa d'aparcament gratuït per a tots els convidats que vulguin venir amb el seu propi vehicle.",
  },
  {
    icon: Bus,
    question: "Hi haurà servei de bus?",
    answer:
      "Sí, facilitarem un servei de bus des d'un punt de trobada que confirmarem més endavant. Indiqueu-nos al formulari de confirmació si el voleu utilitzar.",
  },
  {
    icon: Utensils,
    question: "Què passa si tinc alguna al·lèrgia o intolerància?",
    answer:
      "Indiqueu-nos-ho al formulari de confirmació d'assistència perquè puguem adaptar el menú a les vostres necessitats.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-beige px-6 py-24">
      <SectionHeading eyebrow="Dubtes habituals" title="Preguntes freqüents" />

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
        {FAQS.map((faq, i) => {
          const Icon = faq.icon;
          return (
            <Reveal key={faq.question} delay={i * 80}>
              <article className="flex gap-4 rounded-sm border border-sage-grey bg-ivory p-6">
                <Icon className="mt-1 shrink-0 text-olive" size={22} strokeWidth={1.4} />
                <div>
                  <h3 className="font-display text-xl text-olive-dark">{faq.question}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-olive-dark/80">{faq.answer}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
