import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LogoSimple from "../assets/logo-simple.svg?react";
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

  // A mòbil la barra és sempre clara (i mostra el logo); a escriptori només després de fer scroll.
  const solid = scrolled || open;

  return (
    <header
      data-scrolled={scrolled ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ivory/95 shadow-sm backdrop-blur-sm" : "bg-ivory/95 shadow-sm backdrop-blur-sm md:bg-transparent md:shadow-none md:backdrop-blur-none"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 sm:px-10">
        <a
          href="#inici"
          aria-label="Inici"
          className={`transition-[opacity,visibility] duration-300 ${
            scrolled ? "visible opacity-100" : "md:pointer-events-none md:invisible md:opacity-0"
          }`}
        >
          <LogoSimple data-logo="simple" aria-hidden="true" className="h-9 w-auto text-olive-dark" />
        </a>

        <ul className="hidden items-center gap-8 font-sans text-xs font-medium tracking-[0.18em] text-olive-dark uppercase md:flex">
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
          className="hidden rounded-full border border-olive-dark px-6 py-2 font-sans text-xs font-medium tracking-[0.2em] text-olive-dark uppercase transition-colors duration-300 hover:bg-olive-dark hover:text-ivory md:inline-flex"
        >
          RSVP
        </a>

        <button
          type="button"
          aria-label={open ? "Tanca el menú" : "Obre el menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="text-olive-dark md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-olive-dark/10 bg-ivory px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4 font-sans text-sm tracking-[0.1em] text-olive-dark uppercase">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#rsvp" onClick={() => setOpen(false)} className="font-semibold text-olive-dark">
                RSVP
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
