# Invitació de boda

Plantilla web d'invitació de boda: portada, història, galeria, ubicació, coses per fer, preguntes freqüents i formulari de confirmació d'assistència.

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

- `src/lib/weddingData.ts` — noms, data, lloc i enllaços.
- `src/components/` — una secció per fitxer (Hero, Història, Galeria, Ubicació, Coses per fer, FAQ, RSVP...).
- Les fotos de la Galeria i de "La nostra història" són marcadors de posició (`PlaceholderImage`): substituïu-los per les vostres imatges quan les tingueu.
- El formulari RSVP (`src/components/RSVPSection.tsx`) de moment només funciona visualment; per desar les respostes cal connectar-lo a un backend (per exemple Supabase).

> Les dades d'aquest repositori són d'exemple. No hi ha informació personal real.

## Desplegament a GitHub Pages

Cada `push` a `main` publica el lloc automàticament (`.github/workflows/deploy.yml`).
