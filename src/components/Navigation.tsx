import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "../lib/weddingData";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-cream/95 shadow-sm backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#inici" className={`font-script text-3xl ${solid ? "text-sage-700" : "text-paper"}`}>
          X &amp; I
        </a>

        <ul
          className={`hidden items-center gap-8 font-sans text-xs font-medium tracking-[0.18em] uppercase md:flex ${
            solid ? "text-ink" : "text-paper"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-opacity hover:opacity-70">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#rsvp"
          className={`hidden rounded-full border px-6 py-2 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 md:inline-flex ${
            solid
              ? "border-sage-600 text-sage-700 hover:bg-sage-600 hover:text-cream"
              : "border-paper text-paper hover:bg-paper hover:text-ink"
          }`}
        >
          RSVP
        </a>

        <button
          type="button"
          aria-label={open ? "Tanca el menú" : "Obre el menú"}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${solid ? "text-ink" : "text-paper"}`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4 font-sans text-sm tracking-[0.1em] text-ink uppercase">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#rsvp" onClick={() => setOpen(false)} className="font-semibold text-sage-700">
                RSVP
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
