# Redisseny amb il·lustracions — document de disseny

Data: 2026-10-22. Origen: `CHANGES.md` (instruccions d'en Ivan) i les converses posteriors.

## Intenció

Un il·lustrador ha redissenyat la invitació de boda a partir del disseny actual. Cal aplicar la nova
identitat (paleta, tipografies, il·lustracions, logo) a la web existent sense canviar-ne l'estructura
tècnica: React 19 + TypeScript + Vite 8 + Tailwind CSS 4, desplegada a GitHub Pages.

La maqueta de referència de la portada és `src/assets/portada.png`. La resta de seccions no tenen
maqueta: s'han de resoldre en coherència amb la portada i la paleta.

## Objectius

- Portada fidel a la maqueta: il·lustració de la parella, logo entrellaçat, senefes florals, noms, data, lloc i botó.
- Una sola secció "La nostra història i records" amb la il·lustració de les mans fixa (sticky) mentre el text i la galeria fan scroll.
- Ubicació amb la il·lustració de la finca, adreça escrita i enllaç a Google Maps.
- Preguntes freqüents amb el format de targetes que ara té "Coses per fer". "Coses per fer" desapareix.
- Capçalera (en fer scroll) i peu amb el logo simple en lloc de "X & I" i "Nom & Nom".
- Tipografia: Cormorant Garamond predominant, Manrope per a text informatiu. Desapareixen Jost i Parisienne.
- Animacions d'entrada coherents per a tota la pàgina pensades per a lectura vertical, amb una biblioteca.
- Dades reals de noms i data: "Xisca & Ivan", 10 d'abril de 2027 (dissabte).

## No-objectius

- Connectar el formulari RSVP a cap backend. Es manté només visual, retematitzat.
- Fotos reals a la galeria: es mantenen els marcadors de posició.
- Adreça i enllaç de Maps reals: queden com a camps preparats amb text de mostra a `weddingData.ts`.
- Publicar a GitHub Pages. El desplegament es dispara amb cada push a `main`, així que **no es fa merge ni push a `main`** fins que l'Ivan ho digui. Tot el treball va a la branca `redisseny-illustracions`.

## Anti-objectius (què faria fracassar el resultat)

- Animació excessiva o diferent a cada secció. Ha de ser un sol llenguatge, discret.
- Text poc llegible sobre els fons clars de la paleta (contrast insuficient).
- Pàgina pesada: les il·lustracions tal com arriben sumen més de 8 MB.
- Trencar el mòbil: la maqueta només és d'escriptori; tot ha de funcionar a 360 px d'amplada.

## Paleta (mostrejada de `src/assets/codi colors.png`)

| Token proposat | Hex | Ús base |
|---|---|---|
| `hero-light` → `hero-mid` → `hero-dark` | #F0EBE5 → #D1C9BA → #A99B81 | Degradat diagonal de la portada (clar a dalt-esquerra, fosc a baix-dreta) |
| `taupe` | #BAAA92 | Barra del compte enrere |
| `beige` | #F1E9D8 | Fons de seccions alternes |
| `ivory` | #FAF7F1 | Fons de seccions alternes, targetes, capçalera en fer scroll |
| `sage-grey` | #B3B29F | Vores, fons secundari, botons suaus |
| `olive` | #787C69 | Text secundari, icones, fons del RSVP |
| `olive-dark` | #515449 | Text principal, peu de pàgina |

Colors de suport agafats de la maqueta i dels SVG (no són a la paleta però hi són coherents):
- Marró de la data a la portada: aproximadament #5A4A3A (mostrejar de `portada.png`).
- Blanc dels noms a la portada amb ombra suau.
- El logo gran porta els seus propis degradats daurat/salvia dins l'SVG; no es recolora.

Assignació de fons per secció (ordre vertical):
1. Capçalera: transparent sobre la portada; en fer scroll, `ivory` al 95% amb desenfocament.
2. Portada: degradat `hero-*`.
3. Compte enrere: `taupe`, números en `ivory`.
4. Història i records: `beige`.
5. Ubicació: `ivory`.
6. Preguntes freqüents: `beige`; targetes `ivory` amb vora `sage-grey`.
7. Confirmació d'assistència: `olive` amb text `ivory` (substitueix el verd actual).
8. Peu: `olive-dark` amb text i logo en `ivory`.

## Contrast i llegibilitat (decisió de l'Ivan: via intermèdia)

- Elements grans i decoratius es queden com a la maqueta, amb ombra suau: noms a la portada, logo, números del compte enrere, títols grans.
- Cos de text, enllaços, eyebrows, etiquetes i text de botons en `olive-dark` (#515449) sobre qualsevol fons clar de la paleta. Els botons píndola porten text `olive-dark` sobre `sage-grey`, o text `ivory` sobre `olive-dark` si han de destacar.
- A mòbil, els noms de la portada cauen sobre la part clara del degradat: allà es pinten en `olive-dark` en lloc de blanc.
- Sobre fons foscos (`olive`, `olive-dark`) el text és `ivory`.

## Tipografia

- Cormorant Garamond (ja carregada): títols de secció, noms, data, números del compte enrere, preguntes de les FAQ, títols de targeta. Itàlica per a títols i noms, com a la maqueta.
- Manrope (nova, Google Fonts, pesos 400/500/600): navegació, eyebrows en majúscules espaiades, cos de text, botons, etiquetes del compte enrere, formulari.
- S'eliminen Jost i Parisienne de `index.html` i de `index.css`.

## Actius

Carpeta `src/assets/`. Tots els fitxers es renomenen sense espais ni majúscules a l'extensió (`senefa-floral-1.svg`, `noltros.png`...).

| Fitxer | Ús | Tractament |
|---|---|---|
| `noltros.PNG` (1023×1537) | Portada | WebP amb qualitat ~82, amplada màx. 1200 px; PNG de reserva no cal |
| `mans.PNG` (1023×1537) | Història i records | Igual |
| `finca.png` (1537×1023) | Ubicació | Igual |
| `logo.svg` | Portada | svgo amb ids prefixats; es manté el degradat intern |
| `logo_simple.svg` | Capçalera i peu | svgo; el fill `#1e1e1c` passa a `currentColor` per pintar-lo amb classes de text |
| `senefa_floral 1.svg`, `senefa_floral 2.svg` | Portada (decoració) | svgo; els traços passen a `currentColor` i es pinten en `olive` amb opacitat baixa |
| `portada.png`, `codi colors.png` | Només referència | Es mouen a `docs/referencia/` perquè no visquin a `src/` |

Motiu del svgo: els quatre SVG surten d'Illustrator amb l'id `Capa_1` i la classe `.st0` amb significats diferents; incrustats com a components React en una mateixa pàgina, els estils xoquen. S'instal·la `svgo` com a dependència de desenvolupament amb un script `npm run assets:svg`. Els SVG s'importen amb `?react` (vite-plugin-svgr, ja instal·lat).

## Seccions

### Capçalera
- A dalt de tot (sobre la portada): fons transparent, enllaços en `olive-dark` (la portada és clara). No es mostra cap logo a l'esquerra: la portada ja porta el logo gran.
- En fer scroll (>40 px): fons `ivory`, apareix el logo simple a l'esquerra (alçada ~36 px, color `olive-dark`), que enllaça a `#inici`.
- Enllaços: Inici, La nostra història, Records, Ubicació, Preguntes freqüents, més el botó RSVP en píndola. "Records" enllaça a l'àncora de la galeria dins la secció unificada.
- Menú mòbil com ara, retematitzat.

### Portada (seguint `portada.png`)
- Escriptori: dues columnes. Esquerra, la il·lustració de la parella amb les senefes al voltant (senefa 2 a dalt-esquerra, senefa 1 a baix-dreta de la columna dreta, com a la maqueta). Dreta, centrat: logo gran (~260 px d'amplada), "Junts amb les nostres famílies" en Cormorant itàlica, "Xisca & Ivan" en Cormorant itàlica gran i blanc amb ombra, "10-04-2027" en Cormorant marró, lloc en Manrope, botó píndola "Confirma l'assistència" en `sage-grey`/`olive`.
- Mòbil: una columna. Logo petit, noms, data, lloc, botó, i la il·lustració a sota. Les senefes es redueixen o s'amaguen si molesten.
- Alçada mínima de pantalla com ara.

### Compte enrere
- Igual que ara però amb fons `taupe`, números en Cormorant `ivory`, etiquetes en Manrope.

### La nostra història i records (una sola secció, `id="historia"`, amb `id="records"` a la galeria)
- Escriptori: dues columnes. Esquerra, la il·lustració de les mans enganxada (`position: sticky; top`) i centrada verticalment a la finestra. Dreta, en flux normal: eyebrow + títol "La nostra història", text, i a continuació l'eyebrow + títol "Records" amb la graella de la galeria (marcadors de posició). Només fa scroll la columna dreta mentre la il·lustració queda fixa fins que la secció acaba.
- Mòbil: la il·lustració a dalt, sense sticky (o sticky amb alçada reduïda si queda bé), i després text i galeria.
- Títol de la galeria i etiqueta del menú: "Records".

### Ubicació
- Dues columnes: il·lustració de la finca (substitueix l'iframe del mapa) i, al costat, nom del lloc, adreça escrita (camp nou `venueAddress` amb text de mostra) i botons "Com arribar-hi" (enllaç a Maps) i "Veure el lloc" (Instagram).
- El camp `mapEmbedSrc` deixa d'usar-se i s'elimina.

### Preguntes freqüents
- Mateixa graella de targetes de dues columnes que ara té "Coses per fer": targeta amb icona, pregunta en Cormorant i resposta en Manrope sempre visible (sense acordió).
- El component `ThingsToDoSection` i la seva entrada al menú s'eliminen.

### Confirmació d'assistència
- Mateixa estructura i comportament. Només canvien colors (fons `olive`) i tipografies.

### Peu
- "Xisca [logo simple] Ivan" en Cormorant itàlica, logo d'alçada ~1,2 em en `ivory` alineat a la línia base. El camp `brideAndGroom` deixa de ser un text únic: es fan servir `bride` i `groom` (noms curts) i el logo al mig.
- Fons `olive-dark`. Resta igual.

## Dades (`src/lib/weddingData.ts`)

```ts
bride: "Xisca", groom: "Ivan",
date: new Date("2027-04-10T17:00:00"),   // hora de mostra, pendent de confirmar
dayLabel: "Dissabte", dateLabel: "10 d'abril de 2027", dateShort: "10-04-2027",
venueName: "Nom del lloc",
venueAddress: "Carrer d'exemple, 1 · 07000 Ciutat, Mallorca",   // text de mostra
venueLocation: "Ciutat, Mallorca",
mapLinkHref: "https://www.google.com/maps/search/?api=1&query=Nom+del+lloc",
venueInstagram: "https://www.instagram.com/",
rsvpDeadline: "10 de març de 2027",   // text de mostra: el RSVP ara porta una data del 2030 escrita a mà
```

## Animacions

- Biblioteca: `motion` (successora de Framer Motion, versió 12.x), compatible amb React 19 i Vite. Substitueix el component `Reveal` i el hook `useReveal` actuals.
- Un sol patró d'entrada per a tots els blocs: opacitat 0→1 i desplaçament vertical 24 px→0, 0,6 s, `ease-out`, només la primera vegada que entra en pantalla (`whileInView` + `once`).
- Graelles (galeria, targetes de FAQ) amb escalonat de 80 ms entre elements.
- Portada: seqüència d'entrada en carregar: il·lustració, després logo, després text i botó, amb retards curts.
- Secció d'història: el sticky es fa amb CSS; opcionalment un parallax molt subtil de la il·lustració amb `useScroll`. No cal res més.
- Respectar `prefers-reduced-motion`: sense desplaçaments, només opacitat.

## Decisions preses per mi (l'Ivan les pot revertir)

- Logo simple amagat a la capçalera quan som a dalt de tot; apareix en fer scroll.
- Referències (`portada.png`, `codi colors.png`) es mouen fora de `src/`.
- Les FAQ deixen de ser un acordió: resposta sempre visible dins la targeta.
- El fons del RSVP passa a `olive`.
- WebP sense PNG de reserva (tots els navegadors actuals el suporten).
- Nom de la branca: `redisseny-illustracions`. Parteix del working tree actual, que inclou els canvis de `vite-plugin-svgr` sense comprometre.
- Els originals de l'il·lustrador (`noltros.PNG`, `mans.PNG`, `finca.png`, ~5 MB) es conserven al repositori a `docs/referencia/originals/` per poder regenerar els WebP; a `src/assets/` només hi queden els WebP i els SVG optimitzats. `CHANGES.md` es versiona com a brief del redisseny.
- La data límit del RSVP passa a `weddingData.ts` (`rsvpDeadline`) amb text de mostra.

## Queda a criteri del constructor

- Espaiats, mides exactes de fonts i punts de tall responsive.
- Temps i corbes exactes de les animacions dins del patró descrit.
- Com s'aconsegueix que el sticky funcioni bé en mòbil.
- Paràmetres concrets de svgo i de la conversió a WebP.
- Icones de les targetes de FAQ (lucide-react, ja instal·lat).

## Verificació

- `npm run build` i `npm run lint` nets.
- Captures reals a escriptori (1440 px) i mòbil (390 px) de totes les seccions, comparant la portada amb `portada.png`.
- Pes total dels actius carregats per sota de 1,5 MB.
