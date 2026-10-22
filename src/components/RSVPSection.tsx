import { Check } from "lucide-react";
import { type FormEvent, useState } from "react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { Button } from "./ui/Button";
import { wedding } from "../lib/weddingData";

type Attendance = "si" | "no";
type Transport = "propi" | "bus";

interface RSVPForm {
  nom: string;
  contacte: string;
  assistencia: Attendance;
  acompanyants: string;
  alergies: string;
  transport: Transport;
  missatge: string;
}

const initialForm: RSVPForm = {
  nom: "",
  contacte: "",
  assistencia: "si",
  acompanyants: "0",
  alergies: "",
  transport: "propi",
  missatge: "",
};

const inputClasses =
  "w-full rounded-sm border border-sage-grey bg-ivory px-4 py-3 text-olive-dark placeholder:text-olive/60 focus:border-olive focus:outline-none";
const labelClasses = "mb-2 block font-sans text-xs font-medium tracking-[0.15em] text-olive-dark uppercase";

export function RSVPSection() {
  const [form, setForm] = useState<RSVPForm>(initialForm);
  const [sent, setSent] = useState(false);

  const attending = form.assistencia === "si";

  function update<K extends keyof RSVPForm>(key: K, value: RSVPForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="rsvp" className="bg-olive px-6 py-24">
      <SectionHeading
        eyebrow="Confirmació d'assistència"
        title="RSVP"
        subtitle={`Confirmeu-nos abans del ${wedding.rsvpDeadline} si hi podreu ser. Ens fa molta il·lusió comptar amb vosaltres.`}
        light
      />

      <Reveal delay={120} className="mx-auto mt-12 max-w-xl">
        {sent ? (
          <div className="flex flex-col items-center gap-3 rounded-sm bg-ivory px-8 py-14 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-beige text-olive">
              <Check size={22} />
            </span>
            <h3 className="font-display text-2xl text-olive-dark italic">Gràcies, {form.nom.split(" ")[0] || ""}!</h3>
            <p className="max-w-sm text-olive-dark">
              {attending
                ? "Hem rebut la teva confirmació. Ens fa molta il·lusió celebrar-ho amb tu!"
                : "Gràcies per fer-nos-ho saber, et trobarem a faltar aquell dia."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-sm bg-ivory p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClasses} htmlFor="nom">
                  Nom i cognoms
                </label>
                <input
                  id="nom"
                  required
                  className={inputClasses}
                  value={form.nom}
                  onChange={(e) => update("nom", e.target.value)}
                  placeholder="El teu nom complet"
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClasses} htmlFor="contacte">
                  Correu electrònic o telèfon
                </label>
                <input
                  id="contacte"
                  required
                  className={inputClasses}
                  value={form.contacte}
                  onChange={(e) => update("contacte", e.target.value)}
                  placeholder="nom@exemple.com"
                />
              </div>

              <fieldset className="sm:col-span-2">
                <legend className={labelClasses}>Hi assistiràs?</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(
                    [
                      ["si", "Sí, hi seré"],
                      ["no", "No podré assistir"],
                    ] as const
                  ).map(([value, text]) => (
                    <button
                      type="button"
                      key={value}
                      onClick={() => update("assistencia", value)}
                      className={`rounded-sm border px-4 py-3 text-sm font-medium transition-colors ${
                        form.assistencia === value
                          ? "border-olive bg-olive text-ivory"
                          : "border-sage-grey text-olive-dark hover:border-olive"
                      }`}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </fieldset>

              {attending && (
                <>
                  <div>
                    <label className={labelClasses} htmlFor="acompanyants">
                      Acompanyants
                    </label>
                    <input
                      id="acompanyants"
                      type="number"
                      min={0}
                      className={inputClasses}
                      value={form.acompanyants}
                      onChange={(e) => update("acompanyants", e.target.value)}
                    />
                  </div>

                  <fieldset>
                    <legend className={labelClasses}>Transport</legend>
                    <div className="flex flex-col gap-2 pt-1">
                      {(
                        [
                          ["propi", "Vindré pel meu compte"],
                          ["bus", "Utilitzaré el bus"],
                        ] as const
                      ).map(([value, text]) => (
                        <label key={value} className="flex items-center gap-2 text-sm text-olive-dark">
                          <input
                            type="radio"
                            name="transport"
                            checked={form.transport === value}
                            onChange={() => update("transport", value)}
                            className="accent-olive"
                          />
                          {text}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label className={labelClasses} htmlFor="alergies">
                      Al·lèrgies o intoleràncies alimentàries
                    </label>
                    <textarea
                      id="alergies"
                      rows={2}
                      className={inputClasses}
                      value={form.alergies}
                      onChange={(e) => update("alergies", e.target.value)}
                      placeholder="Indica-ho aquí si cal, si no, deixa-ho en blanc"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label className={labelClasses} htmlFor="missatge">
                  Missatge per als nuvis (opcional)
                </label>
                <textarea
                  id="missatge"
                  rows={3}
                  className={inputClasses}
                  value={form.missatge}
                  onChange={(e) => update("missatge", e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="mt-8 w-full">
              Enviar confirmació
            </Button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
