import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// svgo 4: removeViewBox ja no forma part de preset-default, el viewBox es conserva.
const IN = path.join(root, "docs", "referencia", "originals");
const OUT = path.join(root, "src", "assets");
const NAMES = ["logo", "logo-simple", "senefa-floral-1", "senefa-floral-2"];
const MONO = ["logo-simple", "senefa-floral-1", "senefa-floral-2"];

mkdirSync(OUT, { recursive: true });

for (const name of NAMES) {
  const input = readFileSync(path.join(IN, `${name}.svg`), "utf8");
  let { data } = optimize(input, {
    path: `${name}.svg`,
    multipass: true,
    plugins: [
      "preset-default",
      "removeDimensions",
      "removeEditorsNSData",
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
  console.log(`${name}.svg ${input.length} -> ${data.length} bytes`);
}
