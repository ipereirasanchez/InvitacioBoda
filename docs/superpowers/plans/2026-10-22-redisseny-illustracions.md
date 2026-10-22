# Redisseny amb il·lustracions — pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar la nova identitat de l'il·lustrador (paleta, Cormorant + Manrope, il·lustracions, logo, animacions) a la invitació de boda existent, sense publicar-la a GitHub Pages.

**Architecture:** Es manté l'arquitectura actual: una SPA de React amb una secció per fitxer a `src/components/`, dades a `src/lib/weddingData.ts` i tokens de Tailwind 4 a `src/index.css`. Primer es posen els fonaments (actius optimitzats, tokens, fonts, dades, `Reveal` sobre `motion`), després tres grups de seccions amb fitxers disjunts es poden fer en paral·lel, i al final una neteja de tokens antics i la verificació global.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, `motion` 12 (animacions), `vite-plugin-svgr` (ja instal·lat), `svgo` (optimització SVG), ImageMagick (WebP), `playwright-core` + Google Chrome del sistema (comprovacions visuals i de DOM).

**Spec:** `docs/superpowers/specs/2026-10-22-redisseny-illustracions-design.md`

## Global Constraints

- **No fer merge ni push a `main`.** El workflow `.github/workflows/deploy.yml` publica a GitHub Pages amb cada push a `main`. Tot va a la branca `redisseny-illustracions`.
- Commits en català, com la resta de l'historial, i acabats amb `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Paleta (tokens Tailwind a `@theme`): `hero-light #F0EBE5`, `hero-mid #D1C9BA`, `hero-dark #A99B81`, `taupe #BAAA92`, `beige #F1E9D8`, `ivory #FAF7F1`, `sage-grey #B3B29F`, `olive #787C69`, `olive-dark #515449`, `date-brown #735845`.
- Tipografies: `font-display` = "Cormorant Garamond"; `font-sans` = "Manrope". Jost i Parisienne desapareixen. No queda cap `font-script`.
- Contrast (via intermèdia): cos de text, enllaços, eyebrows, etiquetes i text de botons en `olive-dark` sobre fons clars; `ivory` sobre `olive`/`olive-dark`. Noms, logo, números del compte enrere i títols grans poden anar com a la maqueta amb ombra suau. A mòbil els noms de la portada van en `olive-dark`.
- Textos fixos (copiar tal qual): "Junts amb les nostres famílies", "Confirma l'assistència", "La nostra història", "Records", "Ubicació", "Preguntes freqüents", "Com arribar-hi", "Veure el lloc". Secció "Coses per fer" eliminada.
- Pes dels actius del `dist/` (sense fonts, que vénen de Google) per sota d'1,5 MB.
- Cada tasca acaba amb `npm run lint` i `npm run check:ui` nets i un commit.

## Review Focus

1. Mòbil a 390 px: cap desbordament horitzontal (`scrollWidth <= innerWidth`) i noms de la portada llegibles en `olive-dark`. Test a la Tasca 4 (`hero-mobile-no-overflow`) i a la Tasca 7 (`no-horizontal-overflow` global).
2. `prefers-reduced-motion: reduce`: tot el contingut és visible (opacitat 1) després de baixar fins al final; res queda amagat per una animació que no s'executa. Test a la Tasca 3 (`reveal-reduced-motion`).
3. Secció unificada: a escriptori la il·lustració de les mans queda fixa i sencera dins la finestra a mitja secció (també amb finestra baixa, 1440×700); a mòbil no és sticky. Tests a la Tasca 5 (`hands-sticky-desktop`, `hands-static-mobile`).
4. Àncores de navegació: `#historia`, `#records`, `#ubicacio`, `#faq`, `#rsvp` existeixen i el clic a "Records" del menú deixa el títol "Records" dins dels 200 px superiors. Test a la Tasca 5 (`nav-records-anchor`).
5. Fonts: si Google Fonts falla, el text no desapareix (`display=swap`) i les famílies de reserva són serif/sans-serif. Test a la Tasca 3 (`fonts-fallback`, bloquejant `fonts.googleapis.com`).

---

## Estructura de fitxers

| Fitxer | Responsabilitat | Tasca |
|---|---|---|
| `scripts/ui-check.mjs`, `scripts/ui-checks.mjs` | Arrenca `vite preview`, obre Chrome a 1440×900 i 390×844, executa comprovacions amb nom, desa captures a `docs/captures/` | 1 (creat), ampliat a cada tasca |
| `scripts/optimize-svg.mjs`, `scripts/make-webp.sh` | Regeneren `src/assets/*.svg` i `*.webp` des de `docs/referencia/originals/` | 2 |
| `docs/referencia/` | `portada.png`, `codi-colors.png` i `originals/` (PNG i SVG tal com els va lliurar l'il·lustrador) | 2 |
| `src/assets/` | Només actius que s'importen: `noltros.webp`, `mans.webp`, `finca.webp`, `logo.svg`, `logo-simple.svg`, `senefa-floral-1.svg`, `senefa-floral-2.svg` | 2 |
| `src/index.css`, `index.html` | Tokens de paleta i fonts | 3 |
| `src/lib/weddingData.ts` | Dades reals i camps de mostra | 3 |
| `src/components/ui/Reveal.tsx` | Animació d'entrada sobre `motion` (mateixa API que ara) | 3 |
| `src/components/ui/{Button,SectionHeading,Divider,PlaceholderImage}.tsx` | Retematitzats | 3 |
| `src/components/{Navigation,HeroSection,CountdownSection}.tsx` | Capçalera, portada, compte enrere | 4 |
| `src/components/StoryAndMemoriesSection.tsx` (nou), `LocationSection.tsx`, `Footer.tsx`, `App.tsx` | Història + records unificats, ubicació, peu | 5 |
| `src/components/{FAQSection,RSVPSection}.tsx` | FAQ en targetes, RSVP retematitzat | 6 |
| `public/favicon.svg`, `README.md`, `src/index.css` (neteja) | Favicon amb el logo simple, documentació, eliminació de tokens antics | 7 |

**Paral·lelisme:** Tasques 1→2→3 en sèrie. Tasques 4, 5 i 6 en paral·lel (fitxers disjunts; cap d'elles toca `index.css`, `weddingData.ts` ni `ui/`). Tasca 7 al final. En execució amb subagents: tres implementadors alhora per a 4, 5 i 6, cadascun amb el seu revisor.

---

### Task 1: Branca i arnès de comprovació visual

**Files:**
- Create: `scripts/ui-check.mjs`, `scripts/ui-checks.mjs`
- Modify: `package.json` (devDependency `playwright-core`, script `check:ui`), `.gitignore` (afegir `docs/captures/`)
- Commit també: `docs/superpowers/specs/2026-10-22-redisseny-illustracions-design.md`, `docs/superpowers/plans/2026-10-22-redisseny-illustracions.md`, `CHANGES.md`, i els canvis pendents de `vite-plugin-svgr` (`package.json`, `package-lock.json`, `tsconfig.app.json`, `vite.config.ts`).

**Interfaces:**
- Produces: `npm run check:ui` = `npm run build && node scripts/ui-check.mjs`. `scripts/ui-checks.mjs` exporta `export const checks = [{ name: string, viewports?: ("desktop"|"mobile")[], run: async (page, { viewport, shot }) => void }]`. `page` és una `Page` de Playwright ja a la URL base; `shot(name)` desa `docs/captures/<viewport>-<name>.png`. Una comprovació falla llançant (usar `node:assert/strict`). Viewports: `desktop` 1440×900, `mobile` 390×844. URL base: `http://localhost:4173/InvitacioBoda/`.
- Una comprovació amb `viewports: ["node"]` s'executa una sola vegada sense navegador, amb `page` nul (per a comprovacions de fitxers).
- Opcions: la variable d'entorn `UI_CHECK_ONLY=<nom>` executa només aquesta comprovació; `UI_CHECK_REDUCED_MOTION=1` crea el context amb `reducedMotion: "reduce"`.

- [ ] **Step 1: Crear la branca** `git switch -c redisseny-illustracions` (o worktree segons `superpowers:using-git-worktrees`) partint de l'arbre de treball actual, amb els canvis pendents.

- [ ] **Step 2: Instal·lar** `npm install -D playwright-core@1.64.1`. Afegir a `package.json`: `"check:ui": "npm run build && node scripts/ui-check.mjs"`.

- [ ] **Step 3: Escriure `scripts/ui-check.mjs`**: arrenca `npx vite preview --port 4173 --strictPort` amb `child_process.spawn`, espera que `http://localhost:4173/InvitacioBoda/` respongui 200 (reintents cada 250 ms, màxim 20 s), obre `chromium.launch({ channel: "chrome", headless: true })`, i per a cada viewport crea un context (amb `reducedMotion` si toca), fa `page.goto(BASE, { waitUntil: "networkidle" })` i executa cada comprovació que inclogui el viewport. Imprimeix `PASS <viewport> <name>` o `FAIL <viewport> <name>: <missatge>`, mata el preview i surt amb codi 1 si n'hi ha cap de fallida. Crea `docs/captures/` si no existeix.

- [ ] **Step 4: Escriure `scripts/ui-checks.mjs`** amb una primera comprovació `page-loads`: `assert.equal(await page.title(), "La nostra boda")` i `shot("full")` amb `fullPage: true`.

- [ ] **Step 5: Executar** `npm run check:ui`. Esperat: `PASS desktop page-loads`, `PASS mobile page-loads`, codi de sortida 0, dues captures a `docs/captures/`.

- [ ] **Step 6: Commit** de tot (spec, pla, CHANGES.md, svgr, arnès): `Prepara la branca del redisseny: spec, pla i arnès de comprovació visual`.

---

### Task 2: Actius optimitzats

**Files:**
- Create: `scripts/optimize-svg.mjs`, `scripts/make-webp.sh`, `docs/referencia/` (moguts), `src/assets/{noltros,mans,finca}.webp`, `src/assets/{logo,logo-simple,senefa-floral-1,senefa-floral-2}.svg`
- Modify: `package.json` (devDependency `svgo`, scripts `assets:svg`, `assets:webp`)
- Delete de `src/assets/`: tots els fitxers actuals (es mouen a `docs/referencia/`).

**Interfaces:**
- Produces: les set rutes de `src/assets/` de dalt. Els SVG tenen `viewBox` i cap `width`/`height`; `logo-simple.svg` i les dues senefes usen `fill`/`stroke` `currentColor` (sense cap color fix); `logo.svg` conserva els seus degradats. Cap SVG conté `id="Capa_1"` ni classes `.st0`.

- [ ] **Step 1: Moure referències i originals** (són fitxers sense seguiment: `mv` i després `git add`): `src/assets/portada.png` → `docs/referencia/portada.png`, `src/assets/codi colors.png` → `docs/referencia/codi-colors.png`. Els altres set fitxers a `docs/referencia/originals/` amb nom en kebab-case i extensió en minúscula (`noltros.png`, `mans.png`, `finca.png`, `logo.svg`, `logo-simple.svg`, `senefa-floral-1.svg`, `senefa-floral-2.svg`).

- [ ] **Step 2: Escriure les comprovacions d'actius abans de generar-los**, a `scripts/ui-checks.mjs`. `assets-weight` (`viewports: ["node"]`): llegeix `dist/assets/`, suma els bytes dels fitxers que no siguin `.woff2`, i `assert(total < 1_500_000)`. `assets-shape` (`viewports: ["node"]`): per a cada SVG de `src/assets/`, `assert(!src.includes('Capa_1'))`, `assert(!src.includes('.st0'))`, `assert(!/\swidth="/.test(src.slice(0,300)))`; per a `logo-simple.svg` i les senefes `assert(src.includes('currentColor'))` i `assert(!/#[0-9a-f]{6}/i.test(src))`; per a cada WebP `assert(size < 400_000)`.

- [ ] **Step 3: Executar** `UI_CHECK_ONLY=assets-shape npm run check:ui`. Esperat: FAIL (els fitxers no existeixen).

- [ ] **Step 4: `scripts/make-webp.sh`** (ImageMagick 6, `convert`): per a `noltros`, `mans`, `finca` de `docs/referencia/originals/`: `convert in.png -resize '1200x1200>' -quality 82 -define webp:alpha-quality=90 src/assets/out.webp`. Script `assets:webp` a `package.json`.

- [ ] **Step 5: `npm install -D svgo@4.1.0` i `scripts/optimize-svg.mjs`**: usa `optimize` de `svgo` amb `multipass: true`, plugins `preset-default` (amb `removeViewBox: false`), `removeDimensions`, `inlineStyles` (`onlyMatchedOnce: false`), `removeXMLNS` no, `prefixIds` amb prefix = nom del fitxer, `removeAttrs` per a `xmlns:i`, `removeEditorsNSData`. Després del svgo, per a `logo-simple`, `senefa-floral-1` i `senefa-floral-2` substitueix amb regex qualsevol `fill="#..."` o `stroke="#..."` per `currentColor` i afegeix `fill="currentColor"` a l'arrel de `logo-simple` i `stroke="currentColor" fill="none"` a les senefes si no en tenen. Script `assets:svg` a `package.json`.

- [ ] **Step 6: Executar** `npm run assets:webp && npm run assets:svg`, després `UI_CHECK_ONLY=assets-shape npm run check:ui` i `UI_CHECK_ONLY=assets-weight npm run check:ui`. Esperat: PASS a totes dues. (`assets-weight` ja passa perquè encara no s'importa res; es tornarà a executar a la Tasca 7.)

- [ ] **Step 7: Comprovació visual dels SVG**: obrir cada SVG amb `convert -background '#F1E9D8' src/assets/x.svg /tmp/.../x.png` i mirar-los: logo amb degradat intacte, logo simple i senefes dibuixats en negre (currentColor sense valor = negre).

- [ ] **Step 8: Commit**: `Optimitza les il·lustracions: WebP i SVG amb currentColor`.

---

### Task 3: Fonaments: paleta, fonts, dades i Reveal amb motion

**Files:**
- Modify: `src/index.css`, `index.html`, `src/lib/weddingData.ts`, `src/components/ui/Reveal.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/SectionHeading.tsx`, `src/components/ui/Divider.tsx`, `src/components/ui/PlaceholderImage.tsx`, `src/App.tsx`, `scripts/ui-checks.mjs`
- Delete: `src/hooks/useReveal.ts` (i la carpeta `src/hooks/`), `src/components/ThingsToDoSection.tsx`
- `package.json`: dependency `motion`

**Interfaces:**
- Produces, a `src/index.css` dins `@theme`: `--color-hero-light`, `--color-hero-mid`, `--color-hero-dark`, `--color-taupe`, `--color-beige`, `--color-ivory`, `--color-sage-grey`, `--color-olive`, `--color-olive-dark`, `--color-date-brown` (valors de Global Constraints); `--font-display: "Cormorant Garamond", Georgia, serif`; `--font-sans: "Manrope", system-ui, sans-serif`. Els tokens antics (`cream*`, `paper`, `sage-*`, `gold*`, `ink*`, `--font-script`) **es mantenen fins a la Tasca 7**. `body` passa a `background-color: var(--color-ivory); color: var(--color-olive-dark)`. La classe `.font-script` s'elimina ja aquí (cap component la farà servir després de la Tasca 4 i 5; fins llavors Hero i Footer mostren Cormorant per defecte).
- `weddingData.ts` exporta `wedding` amb: `bride: "Xisca"`, `groom: "Ivan"`, `brideAndGroom: "Xisca & Ivan"` (es retira a la Tasca 7), `date: new Date("2027-04-10T17:00:00")`, `dayLabel: "Dissabte"`, `dateLabel: "10 d'abril de 2027"`, `dateShort: "10-04-2027"`, `venueName: "Nom del lloc"`, `venueLocation: "Ciutat, Mallorca"`, `venueAddress: "Carrer d'exemple, 1 · 07000 Ciutat, Mallorca"`, `venueInstagram: "https://www.instagram.com/"`, `mapLinkHref: "https://www.google.com/maps/search/?api=1&query=Nom+del+lloc"`, `mapEmbedSrc` (es retira a la Tasca 7), `rsvpDeadline: "10 de març de 2027"`. `navLinks`: `#inici Inici`, `#historia La nostra història`, `#records Records`, `#ubicacio Ubicació`, `#faq Preguntes freqüents`.
- `Reveal` conserva la signatura `({ children, delay = 0, className = "", as = "div" })`, `delay` en ms. Implementada amb `motion.div`/`motion.span` de `motion/react`: `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`, `transition={{ duration: 0.6, ease: "easeOut", delay: delay / 1000 }}`; amb `useReducedMotion()` cert, `initial={{ opacity: 0 }}` i `whileInView={{ opacity: 1 }}` sense `y`. L'element arrel porta `data-reveal`.
- `Button`/`ButtonLink` variants: `solid` = `bg-olive-dark text-ivory hover:bg-olive`; `outline` = `border border-olive-dark text-olive-dark hover:bg-olive-dark hover:text-ivory`; `outline-light` = `border border-ivory/70 text-ivory hover:bg-ivory hover:text-olive-dark`.
- `SectionHeading`: eyebrow `text-olive` (light: `text-ivory/80`), títol `font-display italic text-olive-dark` (light: `text-ivory`), subtítol `text-olive-dark/80` (light: `text-ivory/90`).
- `Divider`: traç `#787C69` (light: `#FAF7F1`).
- `PlaceholderImage`: degradats `from-sage-grey to-olive`, `from-beige to-sage-grey`, `from-taupe to-hero-dark`, `from-hero-mid to-sage-grey`, text `text-ivory`.

- [ ] **Step 1: Afegir comprovacions** a `scripts/ui-checks.mjs`:
  - `theme-tokens` (desktop): `getComputedStyle(document.body).backgroundColor === "rgb(250, 247, 241)"`, `color === "rgb(81, 84, 73)"`, `fontFamily` comença per `Manrope`; `getComputedStyle(document.querySelector('h2')).fontFamily` comença per `"Cormorant Garamond"`.
  - `fonts-loaded` (desktop): `document.fonts.check('16px Manrope')` i `document.fonts.check('16px "Cormorant Garamond"')` són certs; cap `<link>` de Google Fonts conté `Jost` ni `Parisienne`.
  - `fonts-fallback` (desktop): amb `page.route('**/fonts.googleapis.com/**', r => r.abort())` i recàrrega, `document.body.innerText.length > 200` i la `fontFamily` computada del `h1` conté `serif`.
  - `reveal-reduced-motion` (desktop i mobile, només si `UI_CHECK_REDUCED_MOTION=1`): baixar fins al final en passos de 600 px amb 150 ms d'espera, i `assert(every [data-reveal] té opacity "1")`.
  - `nav-links` (desktop): els textos dels enllaços del `<nav>` són exactament `["Inici","La nostra història","Records","Ubicació","Preguntes freqüents"]` i no existeix cap text "Coses per fer" a la pàgina.

- [ ] **Step 2: Executar** `npm run check:ui` i `UI_CHECK_REDUCED_MOTION=1 UI_CHECK_ONLY=reveal-reduced-motion npm run check:ui`. Esperat: FAIL a `theme-tokens`, `fonts-loaded`, `nav-links`; `reveal-reduced-motion` pot fallar o passar (encara és l'antic Reveal).

- [ ] **Step 3: `index.html`**: substituir l'enllaç de fonts per `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Manrope:wght@400;500;600&display=swap`.

- [ ] **Step 4: `src/index.css`**: afegir els tokens i fonts descrits a Interfaces; `body` nou; eliminar `.font-script` i `--font-script`.

- [ ] **Step 5: `weddingData.ts`** segons Interfaces.

- [ ] **Step 6: `npm install motion@12`** (12.x). Reescriure `Reveal.tsx` segons Interfaces; esborrar `src/hooks/useReveal.ts`.

- [ ] **Step 7: Retematitzar `Button.tsx`, `SectionHeading.tsx`, `Divider.tsx`, `PlaceholderImage.tsx`** segons Interfaces.

- [ ] **Step 8: Esborrar `ThingsToDoSection.tsx`** i treure'n la importació i l'ús d'`App.tsx`.

- [ ] **Step 9: Executar** `npm run lint`, `npm run check:ui` i `UI_CHECK_REDUCED_MOTION=1 UI_CHECK_ONLY=reveal-reduced-motion npm run check:ui`. Esperat: tot PASS. Les seccions encara no retematitzades poden quedar lletges; no és error.

- [ ] **Step 10: Commit**: `Fonaments del redisseny: paleta, Manrope, dades reals i Reveal amb motion`.

---

### Task 4: Capçalera, portada i compte enrere

**Files:**
- Modify: `src/components/Navigation.tsx`, `src/components/HeroSection.tsx`, `src/components/CountdownSection.tsx`, `scripts/ui-checks.mjs`

**Interfaces:**
- Consumes: tokens i `wedding`/`navLinks` de la Tasca 3; `src/assets/logo.svg`, `logo-simple.svg`, `senefa-floral-1.svg`, `senefa-floral-2.svg` importats amb `?react`; `noltros.webp` importat com a URL; `Reveal`, `ButtonLink`.
- Produces: `<header>` amb `data-scrolled="true|false"`; dins, l'enllaç del logo `a[aria-label="Inici"]` que conté `svg[data-logo="simple"]`, visible només quan `data-scrolled="true"`. `HeroSection` amb `id="inici"`, `img[alt="Il·lustració de la Xisca i l'Ivan"]`, `svg[data-logo="main"]`, `h1` amb text `Xisca & Ivan`. Compte enrere: `section[aria-label="Compte enrere"]`.

- [ ] **Step 1: Afegir comprovacions**:
  - `hero-content` (desktop, mobile): `h1` text `Xisca & Ivan`; existeix `img[alt="Il·lustració de la Xisca i l'Ivan"]` amb `naturalWidth > 0`; existeix `svg[data-logo="main"]`; text "Junts amb les nostres famílies", "10-04-2027" i "Confirma l'assistència" presents al `#inici`. `shot("hero")`.
  - `hero-mobile-no-overflow` (mobile): `document.documentElement.scrollWidth <= window.innerWidth`; el `h1` té `color` computat `rgb(81, 84, 73)`.
  - `hero-desktop-names-light` (desktop): el `h1` té `color` computat `rgb(250, 247, 241)`.
  - `nav-logo-on-scroll` (desktop): a dalt, `header[data-scrolled="false"]` i el logo simple no és visible (`isVisible()` fals); després de `window.scrollTo(0, 600)` i 600 ms, `header[data-scrolled="true"]` i `svg[data-logo="simple"]` visible; cap text "X & I" a la pàgina. `shot("nav-scrolled")`.
  - `countdown` (desktop): `section[aria-label="Compte enrere"]` amb fons `rgb(186, 170, 146)` i quatre etiquetes `Dies, Hores, Minuts, Segons`.

- [ ] **Step 2: Executar** `npm run check:ui`. Esperat: FAIL a les cinc.

- [ ] **Step 3: `Navigation.tsx`**: estat `scrolled` com ara; `data-scrolled`; a dalt fons transparent amb enllaços `text-olive-dark`; en fer scroll `bg-ivory/95 backdrop-blur-sm shadow-sm`. Logo: `import LogoSimple from "../assets/logo-simple.svg?react"` dins `<a href="#inici" aria-label="Inici">` amb `className="h-9 w-auto text-olive-dark"`, i `data-logo="simple"` a l'SVG; amagat amb `opacity-0 pointer-events-none` quan no s'ha fet scroll, `opacity-100` quan sí (transició 300 ms). Botó RSVP píndola `border-olive-dark text-olive-dark hover:bg-olive-dark hover:text-ivory`. Menú mòbil amb `bg-ivory` i text `olive-dark`.

- [ ] **Step 4: `HeroSection.tsx`** seguint `docs/referencia/portada.png`: `section#inici` amb `min-h-screen bg-gradient-to-br from-hero-light via-hero-mid to-hero-dark`; graella `md:grid-cols-2` amb `max-w-7xl`. Columna esquerra: `<img src={noltros} alt="Il·lustració de la Xisca i l'Ivan" className="w-full max-w-md md:max-w-lg" loading="eager" fetchPriority="high">`; `SenefaFloral2` absoluta a dalt-esquerra (`text-olive opacity-60`, amplada ~22 vw, amagada per sota de `md`), `SenefaFloral1` absoluta a baix-dreta de la secció. Columna dreta centrada: `Logo` (`data-logo="main"`, `w-56 md:w-72`), `<p>` "Junts amb les nostres famílies" en `font-display italic text-2xl text-olive-dark`, `<h1>` `font-display italic text-6xl sm:text-7xl md:text-8xl text-olive-dark md:text-ivory md:drop-shadow-md`, `<p>` `wedding.dateShort` en `font-display text-3xl md:text-4xl text-date-brown tracking-wide`, `<p>` `{venueName}, {venueLocation}` en `font-sans text-sm text-olive-dark`, `ButtonLink href="#rsvp" variant="solid"` "Confirma l'assistència". A mòbil l'ordre és: columna dreta (textos) primer i il·lustració sota (`order-first md:order-none` a la columna de text). Animació d'entrada amb `motion.div` i `initial/animate` (no `whileInView`): il·lustració (delay 0), logo (0,2 s), textos i botó (0,4 s), durada 0,8 s; amb `useReducedMotion` només opacitat. Es treu `BotanicalOverlay` i la fletxa de baixada es manté en `text-olive-dark/70`.

- [ ] **Step 5: `CountdownSection.tsx`**: `section aria-label="Compte enrere" className="bg-taupe"`; números `font-display text-ivory drop-shadow-sm`; etiquetes `font-sans text-olive-dark/80`; eyebrow "Compte enrere per al gran dia" en `text-olive-dark`.

- [ ] **Step 6: Executar** `npm run lint` i `npm run check:ui`. Esperat: tot PASS. Comparar `docs/captures/desktop-hero.png` amb `docs/referencia/portada.png` i ajustar mides/espaiats fins que la composició coincideixi (logo a la dreta a sobre dels textos, il·lustració a l'esquerra ocupant ~45 % d'amplada).

- [ ] **Step 7: Commit**: `Portada, capçalera i compte enrere amb la nova identitat`.

---

### Task 5: Història i records unificats, ubicació i peu

**Files:**
- Create: `src/components/StoryAndMemoriesSection.tsx`
- Delete: `src/components/StorySection.tsx`, `src/components/GallerySection.tsx`
- Modify: `src/components/LocationSection.tsx`, `src/components/Footer.tsx`, `src/App.tsx`, `scripts/ui-checks.mjs`

**Interfaces:**
- Consumes: tokens i `wedding` de la Tasca 3; `mans.webp`, `finca.webp` (URL); `logo-simple.svg?react`; `Reveal`, `SectionHeading`, `PlaceholderImage`, `ButtonLink`, `Divider`.
- Produces: `section#historia` que conté `img[alt="Il·lustració de les nostres mans"]` i, dins, `h2#records` amb text `Records` i la graella de sis `PlaceholderImage`. `section#ubicacio` amb `img[alt="Il·lustració de la finca"]`, text de `wedding.venueAddress` i `a[href=wedding.mapLinkHref]`. `footer` amb `svg[data-logo="simple"]` entre els textos `Xisca` i `Ivan`.

- [ ] **Step 1: Afegir comprovacions**:
  - `story-merged` (desktop, mobile): existeix `#historia img[alt="Il·lustració de les nostres mans"]`; `#historia h2#records` text `Records`; no existeix `#galeria`; dins de `#historia` hi ha sis elements amb el text "Foto"; `shot("historia")` després de `scrollIntoViewIfNeeded` i 800 ms.
  - `hands-sticky-desktop` (desktop): posar la finestra a 1440×700 (`page.setViewportSize`), scroll fins a `#records` menys 300 px, esperar 300 ms; el `boundingClientRect` de la imatge de les mans té `top >= 0` i `bottom <= 700`; `getComputedStyle(img.parentElement).position === "sticky"`.
  - `hands-static-mobile` (mobile): `getComputedStyle(img.parentElement).position !== "sticky"`.
  - `nav-records-anchor` (desktop): clicar l'enllaç del `<nav>` amb text `Records`, esperar 800 ms, `document.querySelector('#records').getBoundingClientRect().top` entre 0 i 200.
  - `location` (desktop, mobile): `#ubicacio img[alt="Il·lustració de la finca"]`; cap `iframe` a la pàgina; text `Carrer d'exemple, 1 · 07000 Ciutat, Mallorca` present; `a[href="https://www.google.com/maps/search/?api=1&query=Nom+del+lloc"]` amb text `Com arribar-hi`. `shot("ubicacio")`.
  - `footer-logo` (desktop): `footer svg[data-logo="simple"]` existeix; el `footer` conté `Xisca` i `Ivan` i no conté `&` ni `Nom & Nom`; fons `rgb(81, 84, 73)`. `shot("footer")`.

- [ ] **Step 2: Executar** `npm run check:ui`. Esperat: FAIL a totes.

- [ ] **Step 3: `StoryAndMemoriesSection.tsx`**: `section#historia className="bg-beige px-6 py-24"`, contenidor `mx-auto grid max-w-6xl gap-12 md:grid-cols-[5fr_7fr] md:items-start`. Columna esquerra: `<div className="md:sticky md:top-24 md:h-[calc(100vh-6rem)] flex items-center">` amb `<img src={mans} alt="Il·lustració de les nostres mans" className="mx-auto max-h-full w-auto max-w-sm md:max-w-full object-contain" loading="lazy">`. Columna dreta: bloc història (eyebrow "Qui som", `h2` "La nostra història" `font-display italic text-4xl sm:text-5xl text-olive-dark`, `Divider`, els dos paràgrafs actuals de `StorySection` en `text-olive-dark/80`), després `mt-24` bloc records (eyebrow "Els nostres moments", `h2#records` "Records" amb `scroll-mt-28`, subtítol "Un petit tast del nostre camí junts. Aviat hi afegirem més fotos.", graella `grid-cols-2 sm:grid-cols-3 gap-4` amb els sis `PlaceholderImage` de l'antiga galeria dins `Reveal` amb `delay={i * 80}`). `scroll-mt-28` també al `section`.

- [ ] **Step 4: `App.tsx`**: substituir `StorySection` i `GallerySection` per `StoryAndMemoriesSection`; esborrar els dos fitxers antics.

- [ ] **Step 5: `LocationSection.tsx`**: `bg-ivory`; substituir l'`iframe` per `<img src={finca} alt="Il·lustració de la finca" className="w-full" loading="lazy">` dins el `Reveal` (sense vora ni ombra); columna de text: nom del lloc amb `MapPin` en `text-olive`, `<p>` `wedding.venueAddress` en `font-sans text-olive-dark`, paràgraf descriptiu actual en `text-olive-dark/80`, botons "Com arribar-hi" (`solid`, `href={wedding.mapLinkHref}`) i "Veure el lloc" (`outline`). Eliminar l'ús de `mapEmbedSrc`.

- [ ] **Step 6: `Footer.tsx`**: `bg-olive-dark text-ivory`; primera línia `<p className="font-display italic text-4xl flex items-center justify-center gap-3">` amb `{wedding.bride}`, `<LogoSimple data-logo="simple" aria-hidden className="h-[1.2em] w-auto" />`, `{wedding.groom}`; `Divider light`; línia de data i lloc com ara en `font-sans text-xs tracking-[0.2em] uppercase text-ivory/80`.

- [ ] **Step 7: Executar** `npm run lint` i `npm run check:ui`. Esperat: tot PASS. Revisar `docs/captures/desktop-historia.png` i `mobile-historia.png`.

- [ ] **Step 8: Commit**: `Unifica història i records amb les mans fixes; ubicació amb la finca; peu amb el logo`.

---

### Task 6: Preguntes freqüents en targetes i RSVP retematitzat

**Files:**
- Modify: `src/components/FAQSection.tsx`, `src/components/RSVPSection.tsx`, `scripts/ui-checks.mjs`

**Interfaces:**
- Consumes: tokens i `wedding.rsvpDeadline` de la Tasca 3; `Reveal`, `SectionHeading`, `Button`; icones de `lucide-react`.
- Produces: `section#faq` amb una graella `sm:grid-cols-2` de cinc targetes `article`, cadascuna amb icona, `h3` (pregunta) i `p` (resposta) sempre visible, sense cap `button`. `section#rsvp` amb fons `olive` i el text `Confirmeu-nos abans del 10 de març de 2027`.

- [ ] **Step 1: Afegir comprovacions**:
  - `faq-cards` (desktop, mobile): `#faq article` n'hi ha 5; cap `#faq button`; totes les respostes visibles (`isVisible()` de cada `#faq article p`); a desktop, les dues primeres targetes tenen el mateix `top` (dues columnes). `shot("faq")`.
  - `rsvp-theme` (desktop): `#rsvp` fons `rgb(120, 124, 105)`; conté el text `Confirmeu-nos abans del 10 de març de 2027`; el formulari té fons `rgb(250, 247, 241)`; cap text `2030` a la pàgina.

- [ ] **Step 2: Executar** `npm run check:ui`. Esperat: FAIL a totes dues.

- [ ] **Step 3: `FAQSection.tsx`**: `bg-beige`; mantenir `FAQS` afegint a cada entrada una `icon` de `lucide-react` (`Shirt`, `Baby`, `Car`, `Bus`, `Utensils`); eliminar l'estat `open` i `ChevronDown`; graella `mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2`; cada targeta `<Reveal delay={i*80}><article className="flex gap-4 rounded-sm border border-sage-grey bg-ivory p-6"> <Icon className="mt-1 shrink-0 text-olive" size={22} strokeWidth={1.4}/> <div><h3 className="font-display text-xl text-olive-dark">…</h3><p className="mt-1 text-sm leading-relaxed text-olive-dark/80">…</p></div></article></Reveal>` (el mateix patró que tenia `ThingsToDoSection`).

- [ ] **Step 4: `RSVPSection.tsx`**: `bg-olive`; subtítol `Confirmeu-nos abans del {wedding.rsvpDeadline} si hi podreu ser. Ens fa molta il·lusió comptar amb vosaltres.`; `inputClasses` amb `border-sage-grey bg-ivory text-olive-dark placeholder:text-olive/60 focus:border-olive`; `labelClasses` `text-olive-dark`; formulari i targeta d'èxit `bg-ivory`; cercle de l'icona `bg-beige text-olive`; títols `text-olive-dark`; text `text-olive-dark/80`. Mateixa estructura i lògica.

- [ ] **Step 5: Executar** `npm run lint` i `npm run check:ui`. Esperat: tot PASS.

- [ ] **Step 6: Commit**: `FAQ en targetes i RSVP amb la nova paleta`.

---

### Task 7: Neteja de tokens antics, favicon, README i verificació global

**Files:**
- Modify: `src/index.css`, `src/lib/weddingData.ts`, `public/favicon.svg`, `README.md`, `scripts/ui-checks.mjs`

**Interfaces:**
- Consumes: tot l'anterior.
- Produces: cap token antic a `index.css`; `wedding` sense `brideAndGroom` ni `mapEmbedSrc`; favicon = `logo-simple.svg` amb `fill="#515449"` sobre fons transparent.

- [ ] **Step 1: Afegir comprovacions**:
  - `no-horizontal-overflow` (desktop, mobile): baixar fins al final en passos de 600 px; a cada pas `scrollWidth <= innerWidth`. `shot("full")` ja existeix a `page-loads`.
  - `no-legacy-tokens` (`viewports: ["node"]`): el text de `src/index.css` no conté `sage-`, `gold`, `cream`, `paper`, `ink`, `Jost`, `Parisienne`; cap fitxer de `src/**/*.tsx` conté `text-ink`, `bg-cream`, `bg-paper`, `sage-` (excepte `sage-grey`), `gold`, `font-script`.
  - `assets-weight` (ja existeix) ara amb totes les imatges importades.

- [ ] **Step 2: Executar** `npm run check:ui`. Esperat: FAIL a `no-legacy-tokens`.

- [ ] **Step 3: Grep i substitució**: `grep -rnE "text-ink|bg-cream|bg-paper|sage-[0-9]|gold|font-script|brideAndGroom|mapEmbedSrc" src` i canviar cada aparició pel token nou equivalent (`ink`→`olive-dark`, `cream`/`paper`→`ivory`, `sage-N`→`olive`/`sage-grey`, `gold`→`olive`). Esborrar els tokens antics d'`index.css` i els camps `brideAndGroom` i `mapEmbedSrc` de `weddingData.ts`.

- [ ] **Step 4: `public/favicon.svg`**: còpia de `src/assets/logo-simple.svg` amb `fill="#515449"` a l'arrel.

- [ ] **Step 5: `README.md`**: actualitzar la llista de seccions (sense Coses per fer; "Història i records" unificada), explicar `docs/referencia/originals/` i els scripts `assets:webp`, `assets:svg`, `check:ui`, i notar que la data límit del RSVP i l'adreça són a `weddingData.ts`.

- [ ] **Step 6: Executar** `npm run lint`, `npm run check:ui`, `UI_CHECK_REDUCED_MOTION=1 npm run check:ui`. Esperat: tot PASS, incloent `assets-weight` (< 1,5 MB).

- [ ] **Step 7: Revisió visual completa** de `docs/captures/desktop-full.png` i `mobile-full.png` secció per secció contra la spec: fons segons l'assignació, cap text clar sobre fons clar, portada comparable a `docs/referencia/portada.png`.

- [ ] **Step 8: Commit**: `Neteja els tokens antics, favicon amb el logo i documentació`.

- [ ] **Step 9: No fer merge a `main`.** Deixar la branca `redisseny-illustracions` pujada (`git push -u origin redisseny-illustracions` no dispara el desplegament: el workflow només escolta `main`) i avisar l'Ivan.
