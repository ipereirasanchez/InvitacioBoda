import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

function tsxFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? tsxFiles(p) : p.endsWith(".tsx") ? [p] : [];
  });
}

export const checks = [
  {
    name: "no-horizontal-overflow",
    viewports: ["desktop", "mobile"],
    run: async (page) => {
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; ; y += 600) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
        await page.waitForTimeout(100);
        const m = await page.evaluate(() => ({
          sw: document.documentElement.scrollWidth,
          iw: window.innerWidth,
        }));
        assert(m.sw <= m.iw, `scrollWidth ${m.sw} > innerWidth ${m.iw} a y=${y}`);
        if (y >= total) break;
      }
    },
  },
  {
    name: "no-legacy-tokens",
    viewports: ["node"],
    run: async () => {
      const css = readFileSync(path.join(root, "src", "index.css"), "utf8");
      const cssBad = [
        /--color-cream/, /--color-paper/, /--color-sage-\d/, /--color-gold/,
        /--color-ink/, /--font-script/, /Jost/, /Parisienne/,
      ];
      for (const re of cssBad) assert(!re.test(css), `index.css conté ${re}`);
      const tsxBad = [
        /text-ink/, /bg-cream/, /bg-paper/, /text-paper/, /text-cream/,
        /sage-\d/, /gold/, /font-script/, /brideAndGroom/, /mapEmbedSrc/,
      ];
      for (const file of tsxFiles(path.join(root, "src"))) {
        const src = readFileSync(file, "utf8");
        for (const re of tsxBad) assert(!re.test(src), `${path.relative(root, file)} conté ${re}`);
      }
      const data = readFileSync(path.join(root, "src", "lib", "weddingData.ts"), "utf8");
      assert(!/brideAndGroom|mapEmbedSrc/.test(data), "weddingData.ts conté camps retirats");
    },
  },
];
