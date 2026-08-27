import { Reveal } from "./ui/Reveal";
import { Divider } from "./ui/Divider";
import { PlaceholderImage } from "./ui/PlaceholderImage";

export function StorySection() {
  return (
    <section id="historia" className="bg-cream px-6 py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <Reveal>
          <PlaceholderImage
            label="Substituïu-ho per la vostra fotografia"
            className="aspect-4/5 w-full rounded-sm shadow-sm"
          />
        </Reveal>

        <Reveal delay={120} className="text-center md:text-left">
          <p className="font-sans text-xs font-medium tracking-[0.3em] text-gold-dark uppercase">
            La nostra història
          </p>
          <h2 className="font-display mt-3 text-4xl text-ink italic sm:text-5xl">
            Un camí que ens ha portat fins aquí
          </h2>
          <div className="mx-auto md:mx-0">
            <Divider />
          </div>
          <p className="text-ink-light leading-relaxed">
            Aquest és el lloc perfecte per explicar com us vau conèixer, aquell primer moment que
            recordeu amb un somriure i el camí que us ha portat fins al dia del casament. Substituïu
            aquest text d&apos;exemple per la vostra pròpia història: un parell de paràgrafs n&apos;hi
            ha prou per fer-la sentir propera i especial.
          </p>
          <p className="text-ink-light mt-4 leading-relaxed">
            I ara, envoltats de família i amics, estem a punt de fer el pas més important junts: dir-nos
            &quot;sí, vull&quot; envoltats de la gent que estimem.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
