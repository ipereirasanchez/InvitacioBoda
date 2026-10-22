# Invitació de boda

Plantilla web d'invitació de boda: portada, compte enrere, la nostra història i records, ubicació, preguntes freqüents, confirmació d'assistència i peu.

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

- `src/lib/weddingData.ts` — noms, data, lloc i enllaços. `venueAddress`, `mapLinkHref` i `rsvpDeadline` són valors d'exemple: substituïu-los pels reals.
- `src/components/` — una secció per fitxer, en aquest ordre: Portada (`HeroSection.tsx`), Compte enrere, La nostra història i records (una sola secció, `StoryAndMemoriesSection.tsx`), Ubicació, Preguntes freqüents, Confirmació d'assistència (RSVP) i Peu (`Footer.tsx`).
- El formulari RSVP (`src/components/RSVPSection.tsx`) de moment només funciona visualment; per desar les respostes cal connectar-lo a un backend (per exemple Supabase).

## Il·lustracions i referències

- `docs/referencia/` — la maqueta i la paleta de colors que guien el disseny.
- `docs/referencia/originals/` — els originals de la il·lustradora (SVG i imatges), font de `src/assets/`.
- `src/assets/` — recursos optimitzats que importa l'aplicació.

## Scripts

- `npm run assets:webp` — regenera les imatges WebP de `src/assets/` a partir dels originals.
- `npm run assets:svg` — optimitza els SVG originals i regenera els de `src/assets/`.
- `npm run check:ui` — compila i executa les comprovacions visuals i del DOM amb Chrome (`scripts/checks/*.mjs`); desa captures a `docs/captures/`. Variables: `UI_CHECK_ONLY=<nom>` per executar una sola comprovació, `UI_CHECK_REDUCED_MOTION=1` per simular moviment reduït i `UI_CHECK_PORT` per canviar el port (per defecte 4173).

> Les dades d'aquest repositori són d'exemple. No hi ha informació personal real.

## Desplegament a GitHub Pages

Cada `push` a `main` publica el lloc automàticament (`.github/workflows/deploy.yml`).
