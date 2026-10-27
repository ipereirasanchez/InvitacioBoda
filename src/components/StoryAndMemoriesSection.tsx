import mans from "../assets/mans.webp";
import { Senefa } from "./ui/Senefa";
import { Reveal } from "./ui/Reveal";
import { Divider } from "./ui/Divider";
import { PlaceholderImage } from "./ui/PlaceholderImage";

const PLACEHOLDERS = ["Foto 1", "Foto 2", "Foto 3", "Foto 4", "Foto 5", "Foto 6"];

const HANDS_ALT = "Il·lustració de les nostres mans";

export function StoryAndMemoriesSection() {
  return (
    <section
      id="historia"
      className="relative scroll-mt-28 overflow-clip bg-beige bg-gradient-to-b from-beige via-beige to-ivory px-6 py-24"
    >
      {/* Senefes de fons. */}
      <Senefa n={5} className="absolute -top-6 -right-10 hidden w-[20vw] max-w-sm text-olive opacity-30 md:block" />
      <Senefa n={3} className="absolute bottom-4 -left-8 w-[70vw] text-olive opacity-25 md:w-[36vw] md:opacity-30" />

      {/* Mòbil: la il·lustració de les mans queda darrere del text, com a fons. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-start justify-center pt-16 md:hidden">
        <img src={mans} alt="" width={799} height={1200} className="w-[90vw] max-w-sm opacity-35" loading="lazy" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[6fr_6fr] md:gap-10 md:items-start lg:grid-cols-[7fr_6fr]">
        <div className="hidden items-center md:sticky md:top-24 md:flex md:h-[calc(100vh-6rem)]">
          <Reveal variant="scale" className="w-full">
            <img
              src={mans}
              alt={HANDS_ALT}
              width={799}
              height={1200}
              className="mx-auto max-h-[calc(100vh-6rem)] w-full object-contain"
              loading="lazy"
            />
          </Reveal>
        </div>

        <div className="text-center md:text-left">
          <Reveal>
            <h2 className="font-display text-4xl text-olive-dark italic sm:text-5xl">La nostra història</h2>
            <div className="md:[&>div]:ml-0">
              <Divider />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="leading-relaxed text-olive-dark">
              Aquest és el lloc perfecte per explicar com us vau conèixer, aquell primer moment que
              recordeu amb un somriure i el camí que us ha portat fins al dia del casament.
              Substituïu aquest text d&apos;exemple per la vostra pròpia història: un parell de
              paràgrafs n&apos;hi ha prou per fer-la sentir propera i especial.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 leading-relaxed text-olive-dark">
              I ara, envoltats de família i amics, estem a punt de fer el pas més important junts:
              dir-nos &quot;sí, vull&quot; envoltats de la gent que estimem.
            </p>
          </Reveal>

          <div className="mt-20 md:mt-24">
            <Reveal>
              <p id="records" className="scroll-mt-28 font-display text-2xl text-olive-dark italic sm:text-3xl">
                Recordant els nostres moments
              </p>
              <p className="mt-3 text-balance text-olive-dark">
                Un petit tast del nostre camí junts. Aviat hi afegirem més fotos.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PLACEHOLDERS.map((label, i) => (
                <Reveal key={label} delay={i * 90} variant="scale">
                  <PlaceholderImage label={label} className="aspect-square w-full rounded-sm shadow-sm" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
