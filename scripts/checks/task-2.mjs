import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = path.join(root, "src", "assets");
const DIST = path.join(root, "dist", "assets");

const SVGS = ["logo", "logo-simple", "senefa-floral-1", "senefa-floral-2"];
const MONO = ["logo-simple", "senefa-floral-1", "senefa-floral-2"];
const WEBPS = ["noltros", "mans", "finca"];

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
        if (MONO.includes(name)) {
          assert(src.includes("currentColor"), `${name}.svg no usa currentColor`);
          assert(!/#[0-9a-f]{6}/i.test(src), `${name}.svg conserva un color hex`);
        }
      }
      for (const name of WEBPS) {
        const file = path.join(SRC, `${name}.webp`);
        assert(existsSync(file), `falta ${name}.webp`);
        const size = statSync(file).size;
        assert(size < 400_000, `${name}.webp pesa ${size} bytes`);
      }
    },
  },
];
