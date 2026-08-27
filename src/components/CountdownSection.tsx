import { useEffect, useState } from "react";
import { wedding } from "../lib/weddingData";
import { Reveal } from "./ui/Reveal";

function getTimeLeft() {
  const diff = Math.max(0, wedding.date.getTime() - Date.now());
  return {
    dies: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hores: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minuts: Math.floor((diff / (1000 * 60)) % 60),
    segons: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units: Array<[label: string, value: number]> = [
    ["Dies", timeLeft.dies],
    ["Hores", timeLeft.hores],
    ["Minuts", timeLeft.minuts],
    ["Segons", timeLeft.segons],
  ];

  return (
    <section className="bg-sage-700 px-6 py-14">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <p className="font-sans text-xs font-medium tracking-[0.3em] text-cream-dark uppercase">
          Compte enrere per al gran dia
        </p>
        <div className="flex gap-6 sm:gap-12">
          {units.map(([label, value]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-display text-5xl text-paper sm:text-6xl">
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-2 font-sans text-[11px] tracking-[0.2em] text-cream-dark uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
