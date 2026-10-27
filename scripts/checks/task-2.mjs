import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = path.join(root, "src", "assets");
const DIST = path.join(root, "dist", "assets");

const SVGS = ["logo", "logo-simple", ...[1, 2, 3, 4, 5, 6].map((n) => `senefa-floral-${n}`)];
const MONO = SVGS.filter((n) => n !== "logo");
const WEBPS = ["noltros", "mans", "finca", "marca-aquarela"];

export const checks = [
  {
    name: "assets-weight",
    viewports: ["node"],
    run: async () => {
      const total = readdirSync(DIST)
        .filter((f) => !f.endsWith(".woff2"))
        .reduce((sum, f) => sum + statSync(path.join(DIST, f)).size, 0);
      assert(total < 1_500_000, `dist/assets pesa ${total} bytes (màxim 1500000)`);
    },
  },
  {
    name: "assets-shape",
    viewports: ["node"],
    run: async () => {
      for (const name of SVGS) {
        const file = path.join(SRC, `${name}.svg`);
        assert(existsSync(file), `falta ${name}.svg`);
        const src = readFileSync(file, "utf8");
        assert(!src.includes("Capa_1"), `${name}.svg conté Capa_1`);
        assert(!src.includes(".st0"), `${name}.svg conté .st0`);
        assert(!/\swidth="/.test(src.slice(0, 300)), `${name}.svg té width`);
        assert(!src.includes("<image"), `${name}.svg conté una imatge incrustada`);
        assert(!src.includes("INICI"), `${name}.svg conté el text INICI`);
        if (MONO.includes(name)) {
          assert(src.includes("currentColor"), `${name}.svg no usa currentColor`);
          assert(!/#[0-9a-f]{6}/i.test(src), `${name}.svg conserva un color hex`);
        }
      }
      const ratios = JSON.parse(readFileSync(path.join(SRC, "svg-ratios.json"), "utf8"));
      for (const name of SVGS) assert(ratios[name] > 0, `svg-ratios.json no té ${name}`);
      assert(statSync(path.join(SRC, "logo.svg")).size < 10_000, "logo.svg pesa més de 10 KB");
      for (const name of WEBPS) {
        const file = path.join(SRC, `${name}.webp`);
        assert(existsSync(file), `falta ${name}.webp`);
        const size = statSync(file).size;
        assert(size < 400_000, `${name}.webp pesa ${size} bytes`);
      }
    },
  },
];
