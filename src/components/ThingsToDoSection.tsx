import { Bus, Mountain, ShoppingBag, Waves } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const ITEMS = [
  {
    icon: Mountain,
    title: "Natura i miradors",
    text: "Rutes i miradors a pocs minuts del lloc de la celebració. Ideal per a qui vulgui allargar l'estada.",
  },
  {
    icon: ShoppingBag,
    title: "El poble",
    text: "Carrerons, arquitectura tradicional i alguna terrassa on prendre alguna cosa abans de la festa.",
  },
  {
    icon: Waves,
    title: "Platges properes",
    text: "Si veniu de fora, aprofiteu per gaudir d'algun racó de la costa.",
  },
  {
    icon: Bus,
    title: "La ciutat",
    text: "A poca estona en cotxe. Casc antic, museus i passeig, perfectes per a una escapada.",
  },
];

export function ThingsToDoSection() {
  return (
    <section id="coses-per-fer" className="bg-sage-50 px-6 py-24">
      <SectionHeading
        eyebrow="Aprofiteu l'estada"
        title="Coses per fer"
        subtitle="Si veniu de lluny, aquí teniu algunes idees per fer de la vostra visita una mica més especial."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <Reveal
            key={title}
            delay={i * 80}
            className="flex gap-4 rounded-sm border border-sage-200 bg-paper p-6"
          >
            <Icon className="mt-1 shrink-0 text-sage-600" size={22} strokeWidth={1.4} />
            <div>
              <h3 className="font-display text-xl text-ink">{title}</h3>
              <p className="text-ink-light mt-1 text-sm leading-relaxed">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
