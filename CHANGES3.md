# Canvi de disseny de la web del casament

## Context

Hem treballat amb un il·lustrador professional que ha redissenyat la web partint majoritàriament del disseny actual, però reorganitzant les seccions per incorporar-hi il·lustracions personalitzades. Aquest document descriu tots els canvis a aplicar.

**Abans de tocar codi:**

1. Explora el projecte i identifica l'stack (framework, sistema d'estils, com es carreguen les fonts, estructura de seccions, breakpoints mòbil/escriptori).
2. Obre i mira **totes** les imatges de referència de `src/assets/` (llista a sota). Són la font de veritat per a colors i estructura.
3. Fes un pla breu secció per secció i després implementa-lo.

## Assets de referència (`src/assets/`)

| Fitxer | Ús |
|---|---|
| `codi colors.png` | Paleta de colors i color base de cada bloc/secció |
| `portada.PNG` | Referència de tipografia i composició general |
| `esboç portada def.png` | Estructura del text de la portada (versió escriptori). Només per a l'estructura, **no** per als colors |
| 6 senefes florals (4 són noves) | Ornaments decoratius per a totes les seccions |
| `marca acuarela.svg` | Marca d'aquarel·la decorativa. Cal aplicar-la amb `mix-blend-mode: luminosity` |
| `logo_simple.svg` | Logo simple, per a la capçalera fixa i el peu de pàgina |

Llista els fitxers de senefes que trobis i decideix quines van a cada secció; les 4 noves haurien d'aparèixer a les seccions que ara queden massa planes.

## Regles globals

### Paleta de colors

- La paleta és la de `codi colors.png`. Extreu-ne els valors i defineix-los com a variables (CSS custom properties o l'equivalent de l'stack), sense colors hardcoded repartits pel codi.
- El color de fons base de cada secció és el que indica aquesta imatge.
- Per a la resta d'elements (tipografia, blocs d'informació, botons, ornaments) usa colors de la paleta o derivats coherents (tons més clars/foscos del mateix color).

### Tipografia

Dues famílies de Google Fonts:

- **Cormorant Garamond** — https://fonts.google.com/specimen/Cormorant+Garamond — tipografia predominant: títols, noms, frases destacades.
- **Manrope** — https://fonts.google.com/specimen/Manrope — per a text informatiu on prioritzem la llegibilitat (adreça, horaris, FAQ, formularis).

Normes:

- Usa `portada.PNG` com a referència de com combinar-les, però tens llibertat per ajustar-ho.
- Fes servir més **negreta** en la informació clau: noms de lloc, dades importants i les preguntes de les FAQ.
- A la portada, el símbol **&** de «Ivan & Xisca» **no** ha d'anar en cursiva. Només el &; la resta del text manté l'estil que tingui.

### Senefes, degradats i marca d'aquarel·la

- La portada ja ens agrada: els degradats i la combinació amb les senefes funcionen. **No la facis més carregada.**
- A la resta de seccions tot ha quedat massa pla. Afegeix-hi senefes i degradats suaus perquè tinguin més contingut visual, mantenint la línia de la portada i sense sobrecarregar-les.
- Integra la marca d'aquarel·la (`marca acuarela.svg`) com a element decoratiu de fons en alguna secció, sempre amb `mix-blend-mode: luminosity`.

### Animacions

Les transicions actuals són massa planes. Tria una llibreria d'animacions adequada a l'stack del projecte (per exemple Motion/Framer Motion, GSAP + ScrollTrigger o AOS, segons el que encaixi millor) i fes-la servir per a:

- Aparició progressiva del contingut (text i il·lustracions) a mesura que l'usuari fa scroll (reveal on scroll).
- Transicions suaus entre seccions i en elements interactius (FAQ, hover de botons).

Han de ser animacions subtils i amables, no espectaculars. Respecta `prefers-reduced-motion`.

### Versió mòbil

Cada secció ha de funcionar bé en mòbil. Indicacions específiques a cada secció; en general, adapta la composició amb criteri sense perdre els elements decoratius essencials.

## Seccions

L'ordre i el contingut final de la web és el següent. Cada secció usa el color de fons que li assigna la paleta.

### 1. Portada

- El **&** no va en cursiva (vegeu Tipografia).
- Elimina la frase «junts amb les nostres famílies».
- Just a sota de «Ivan & Xisca» afegeix aquesta frase:
  > Després de deu anys compartint moments i aventures, hem decidit fer un pas més i casar-nos, i ens faria molta il·lusió que ens acompanyassis a celebrar-ho.
- Afegeix la informació del lloc, que ja és definitiva: **Son Muntaner, Ma-2030, 07193 Bunyola**.
- Estructura del text en escriptori: segueix `esboç portada def.png` (només estructura; els colors, de la paleta).
- **Mòbil:** ara només es veu una de les dues senefes. Han de veure-s'hi les dues. Adapta la composició de la resta com consideris oportú.

### 2. La nostra història

Fusiona l'actual «La nostra història» i «Records» en una sola secció:

- Elimina el bloc «Qui som».
- Títol únic: **La nostra història** (treu «Records» del títol).
- On hi havia el títol i subtítol «Records», deixa només un subtítol: **Recordant els nostres moments**.
- Fes la il·lustració de les mans més gran.
- El text i la il·lustració han d'anar apareixent progressivament amb l'scroll.
- **Mòbil:** les imatges han d'anar sobreposades al text amb transparència, com si fossin el fons de la secció.

### 3. On serà

Antiga secció «Ubicació»:

- Canvia el títol per **On serà** i elimina el subtítol.
- Posa la informació verídica: **Son Muntaner, Ma-2030, 07193 Bunyola**.
- Fes la il·lustració d'aquesta secció més gran.
- El text i la il·lustració han d'anar apareixent progressivament amb l'scroll.
- **Mòbil:** les imatges sobreposades amb transparència, com a fons de la secció.

### 4. Preguntes freqüents

- Treu el subtítol.
- Tots els blocs de pregunta han de tenir la mateixa mida.
- Les preguntes en **negreta** (Manrope).

### 5. Confirmació d'assistència

**No la toquis.** Es queda tal com està (només hereta els canvis globals de tipografia i colors si s'apliquen automàticament).

### 6. Peu de pàgina

On ara apareix «Ivan & Xisca», substitueix el **&** pel logo simple (`logo_simple.svg`), de manera que quedi: **Ivan [logo] Xisca**. El logo ha d'anar alineat verticalment amb el text i a una mida proporcionada.

### 7. Capçalera fixa (apareix en fer scroll)

A la capçalera que es mostra en fer scroll, substitueix el text amb les inicials «I & X» per **només el logo simple** (`logo_simple.svg`). Que el logo enllaci a la part superior de la pàgina.

## Verificació final

Quan acabis, comprova:

- [ ] Totes les seccions usen variables de color extretes de `codi colors.png`.
- [ ] Les dues fonts es carreguen correctament i no queda cap font antiga.
- [ ] El & de la portada no és en cursiva.
- [ ] La frase nova és a sota de «Ivan & Xisca» i l'antiga («junts amb les nostres famílies») ha desaparegut.
- [ ] L'adreça apareix a la portada i a «On serà».
- [ ] En mòbil, a la portada es veuen les dues senefes.
- [ ] «Qui som» i «Records» no existeixen com a títols.
- [ ] Les FAQ tenen blocs iguals i preguntes en negreta, sense subtítol.
- [ ] La secció de confirmació d'assistència no ha canviat.
- [ ] Peu i capçalera fixa mostren el logo simple.
- [ ] Les animacions de reveal funcionen en escriptori i mòbil, i es desactiven amb `prefers-reduced-motion`.
- [ ] La marca d'aquarel·la usa `mix-blend-mode: luminosity`.
- [ ] No hi ha errors a la consola ni warnings de build.

Fes els canvis per fases (globals → portada → resta de seccions → capçalera/peu) i mostra'm el resultat de cada fase abans de continuar.
