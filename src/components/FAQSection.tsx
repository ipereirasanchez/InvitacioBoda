import { Baby, Bus, Car, Shirt, Utensils } from "lucide-react";
import { Senefa } from "./ui/Senefa";
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
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-clip bg-beige bg-gradient-to-b from-beige via-beige to-sage-grey/50 px-6 py-24"
    >
      <Senefa
        n={3}
        className="absolute -right-10 bottom-6 w-[70vw] -scale-x-100 text-olive-dark opacity-20 md:w-[32vw] md:opacity-25"
      />

      <div className="relative">
        <SectionHeading
          title="Preguntes freqüents"
          ornament={
            <Senefa n={4} className="mx-auto mt-2 w-44 text-olive opacity-80 sm:w-56" />
          }
        />

        <div className="mx-auto mt-10 grid max-w-5xl auto-rows-fr gap-6 sm:grid-cols-2">
          {FAQS.map((faq, i) => {
            const Icon = faq.icon;
            const last = i === FAQS.length - 1 && FAQS.length % 2 === 1;
            return (
              <Reveal
                key={faq.question}
                delay={i * 80}
                className={last ? "sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center" : ""}
              >
                <article className="flex h-full gap-4 rounded-sm border border-sage-grey bg-ivory p-6 shadow-sm shadow-olive-dark/5 transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-olive-dark/10">
                  <Icon className="mt-0.5 shrink-0 text-olive" size={22} strokeWidth={1.4} />
                  <div>
                    <h3 className="font-sans text-base font-bold text-olive-dark">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-olive-dark">{faq.answer}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
