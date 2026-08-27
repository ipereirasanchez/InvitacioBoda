import { SectionHeading } from "./ui/SectionHeading";
import { PlaceholderImage } from "./ui/PlaceholderImage";
import { Reveal } from "./ui/Reveal";

const PLACEHOLDERS = [
  "Foto 1",
  "Foto 2",
  "Foto 3",
  "Foto 4",
  "Foto 5",
  "Foto 6",
];

export function GallerySection() {
  return (
    <section id="galeria" className="bg-cream-dark px-6 py-24">
      <SectionHeading
        eyebrow="Records"
        title="Galeria"
        subtitle="Un petit tast del nostre camí junts. Aviat hi afegirem més fotos."
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3">
        {PLACEHOLDERS.map((label, i) => (
          <Reveal key={label} delay={i * 80}>
            <PlaceholderImage label={label} className="aspect-square w-full rounded-sm shadow-sm" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
