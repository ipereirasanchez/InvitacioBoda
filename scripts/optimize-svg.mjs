import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { optimize } from "svgo";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// svgo 4: removeViewBox ja no forma part de preset-default, el viewBox es conserva.
const IN = path.join(root, "docs", "referencia", "originals");
const OUT = path.join(root, "src", "assets");
const NAMES = [
  "logo",
  "logo-simple",
  "senefa-floral-1",
  "senefa-floral-2",
  "senefa-floral-3",
  "senefa-floral-4",
  "senefa-floral-5",
  "senefa-floral-6",
];
const MONO = NAMES.filter((n) => n !== "logo");
// Les senefes 1 i 2 conserven el viewBox original: la portada ja està composta amb elles.
const KEEP_VIEWBOX = ["senefa-floral-1", "senefa-floral-2"];

// Els originals d'Illustrator porten restes fora de l'artboard (dibuixos de prova,
// text "INICI", petites marques) i, en el cas del logo, dues ombres PNG incrustades
// de 900 KB. Primer, a Chrome, s'eliminen els elements totalment fora del viewBox
// original i s'ajusta el viewBox al dibuix (marge del 2 %); això es fa abans de svgo
// perquè mergePaths fusionaria traços dels dos costats. Després svgo optimitza i
// removeRasterImages treu les imatges (l'ombra del logo es fa amb CSS, drop-shadow).
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
// Proporcions (amplada/alçada del viewBox) per al component Senefa (màscara CSS).
const ratios = {};

for (const name of NAMES) {
  const input = readFileSync(path.join(IN, `${name}.svg`), "utf8");

  await page.setContent(`<body style="margin:0">${input}</body>`);
  const cleaned = await page.evaluate((fit) => {
    const svg = document.querySelector("svg");
    const [vx, vy, vw, vh] = svg.getAttribute("viewBox").split(/\s+/).map(Number);
    let removed = 0;
    for (const el of [...svg.querySelectorAll("path, polygon, polyline, line, circle, ellipse, rect, image")]) {
      const b = el.getBBox();
      if (b.x + b.width < vx || b.x > vx + vw || b.y + b.height < vy || b.y > vy + vh) {
        el.remove();
        removed++;
      }
    }
    for (const g of [...svg.querySelectorAll("g")].reverse()) if (!g.children.length) g.remove();
    if (fit) {
      const b = svg.getBBox();
      const m = 0.02;
      const r = (n) => Math.round(n * 100) / 100;
      svg.setAttribute(
        "viewBox",
        `${r(b.x - b.width * m)} ${r(b.y - b.height * m)} ${r(b.width * (1 + 2 * m))} ${r(b.height * (1 + 2 * m))}`,
      );
    }
    return { removed, svg: svg.outerHTML, viewBox: svg.getAttribute("viewBox") };
  }, !KEEP_VIEWBOX.includes(name));

  let { data } = optimize(cleaned.svg, {
    path: `${name}.svg`,
    multipass: true,
    plugins: [
      "preset-default",
      "removeDimensions",
      "removeEditorsNSData",
      "removeRasterImages",
      { name: "inlineStyles", params: { onlyMatchedOnce: false } },
      { name: "prefixIds", params: { prefix: name } },
      { name: "removeAttrs", params: { attrs: "xmlns:i" } },
    ],
  });

  if (MONO.includes(name)) {
    // svgo deixa els colors com a atribut (fill="#...") o dins style="fill:#...".
    data = data
      .replace(/\b(fill|stroke)="#[0-9a-fA-F]{3,8}"/g, '$1="currentColor"')
      .replace(/\b(fill|stroke):#[0-9a-fA-F]{3,8}/g, "$1:currentColor");
    // Els traços d'aquests dibuixos són formes emplenades (negre per defecte),
    // no línies: l'arrel necessita fill=currentColor.
    if (!/<svg[^>]*\sfill="/.test(data)) {
      data = data.replace(/<svg\b/, '<svg fill="currentColor"');
    }
  }

  writeFileSync(path.join(OUT, `${name}.svg`), data);
  const [, , vw, vh] = cleaned.viewBox.split(/\s+/).map(Number);
  ratios[name] = Math.round((vw / vh) * 10000) / 10000;
  console.log(
    `${name}.svg ${input.length} -> ${data.length} bytes, viewBox ${cleaned.viewBox}, ${cleaned.removed} elements fora de l'artboard`,
  );
}

writeFileSync(path.join(OUT, "svg-ratios.json"), `${JSON.stringify(ratios, null, 2)}\n`);
await browser.close();
