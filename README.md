# Invitació de boda

Plantilla web d'invitació de boda: portada, compte enrere, la nostra història, on serà, preguntes freqüents, confirmació d'assistència i peu.

React + TypeScript + Vite + Tailwind CSS.

## Desenvolupament

```bash
npm install
npm run dev
```

## Producció

```bash
npm run build
npm run preview
```

## On editar el contingut

- `src/lib/weddingData.ts` — noms, data, lloc, frase d'introducció i enllaços. `venueInstagram` i `rsvpDeadline` són valors d'exemple: substituïu-los pels reals.
- `src/components/` — una secció per fitxer, en aquest ordre: Portada (`HeroSection.tsx`), Compte enrere, La nostra història (amb la galeria de records, `StoryAndMemoriesSection.tsx`), On serà (`LocationSection.tsx`), Preguntes freqüents, Confirmació d'assistència (RSVP) i Peu (`Footer.tsx`).
- `src/components/ui/Senefa.tsx` — les senefes florals es pinten com a màscara CSS (`mask-image` + `bg-current`): es colora amb `text-*` i l'amplada amb classes; l'alçada surt de `src/assets/svg-ratios.json`.
- El formulari RSVP (`src/components/RSVPSection.tsx`) de moment només funciona visualment; per desar les respostes cal connectar-lo a un backend (per exemple Supabase).

## Il·lustracions i referències

- `docs/referencia/` — la maqueta de la portada, l'esbós de l'estructura de text i la paleta de colors que guien el disseny.
- `docs/referencia/originals/` — els originals de la il·lustradora (SVG i imatges), font de `src/assets/`. Els SVG d'Illustrator porten restes fora de l'artboard i, el logo, ombres PNG incrustades: `npm run assets:svg` ho neteja.
- `src/assets/` — recursos optimitzats que importa l'aplicació (la marca d'aquarel·la, un SVG de 5 MB, s'hi serveix com a WebP).

## Scripts

- `npm run assets:webp` — regenera les imatges WebP de `src/assets/` a partir dels originals (inclosa la marca d'aquarel·la, rasteritzada amb Chrome via `scripts/raster-svg.mjs`).
- `npm run assets:svg` — neteja els SVG originals amb Chrome (elements fora de l'artboard, viewBox ajustat al dibuix), els optimitza amb svgo i regenera els de `src/assets/` i `svg-ratios.json`.
- `npm run check:ui` — compila i executa les comprovacions visuals i del DOM amb Chrome (`scripts/checks/*.mjs`); desa captures a `docs/captures/`. Variables: `UI_CHECK_ONLY=<nom>` per executar una sola comprovació, `UI_CHECK_REDUCED_MOTION=1` per simular moviment reduït i `UI_CHECK_PORT` per canviar el port (per defecte 4173). `npm run assets:webp` requereix ImageMagick 6 (`convert`) amb suport WebP; `assets:svg`, `assets:webp` i `check:ui` requereixen tenir Google Chrome instal·lat.

> El formulari i l'enllaç d'Instagram són d'exemple; el lloc (Son Muntaner, Bunyola) i la data són els reals.

## Desplegament a GitHub Pages

Cada `push` a `main` publica el lloc automàticament (`.github/workflows/deploy.yml`).
