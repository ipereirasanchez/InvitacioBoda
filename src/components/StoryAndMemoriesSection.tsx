import mans from "../assets/mans.webp";
import { Reveal } from "./ui/Reveal";
import { Divider } from "./ui/Divider";
import { PlaceholderImage } from "./ui/PlaceholderImage";

const PLACEHOLDERS = ["Foto 1", "Foto 2", "Foto 3", "Foto 4", "Foto 5", "Foto 6"];

const eyebrow = "font-sans text-xs font-medium tracking-[0.3em] text-olive-dark uppercase";
const title = "font-display mt-3 text-4xl text-olive-dark italic sm:text-5xl";

export function StoryAndMemoriesSection() {
  return (
    <section id="historia" className="scroll-mt-28 bg-beige px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[5fr_7fr] md:items-start">
        <div className="flex items-center md:sticky md:top-24 md:h-[calc(100vh-6rem)]">
          <img
            src={mans}
            alt="Il·lustració de les nostres mans"
            width={799}
            height={1200}
            className="mx-auto max-h-full w-full max-w-sm object-contain md:w-auto md:max-w-full"
            loading="lazy"
          />
        </div>

        <div className="text-center md:text-left">
          <Reveal>
            <p className={eyebrow}>Qui som</p>
            <h2 className={title}>La nostra història</h2>
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
            <p className="mt-4 leading-relaxed text-olive-dark">
              I ara, envoltats de família i amics, estem a punt de fer el pas més important junts:
              dir-nos &quot;sí, vull&quot; envoltats de la gent que estimem.
            </p>
          </Reveal>

          <div className="mt-24">
            <Reveal>
              <p className={eyebrow}>Els nostres moments</p>
              <h2 id="records" className={`scroll-mt-28 ${title}`}>
                Records
              </h2>
              <p className="mt-4 text-balance text-olive-dark">
                Un petit tast del nostre camí junts. Aviat hi afegirem més fotos.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PLACEHOLDERS.map((label, i) => (
                <Reveal key={label} delay={i * 80}>
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
