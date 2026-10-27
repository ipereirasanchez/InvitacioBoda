// Rasteritza un SVG amb Chrome (fons transparent): node scripts/raster-svg.mjs in.svg out.png amplada alçada
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";

const [input, output, width, height] = process.argv.slice(2);
if (!input || !output || !width || !height) {
  console.error("Ús: node scripts/raster-svg.mjs <in.svg> <out.png> <amplada> <alçada>");
  process.exit(1);
}
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } });
const svg = readFileSync(input, "utf8").replace(/<svg\b/, `<svg width="${width}" height="${height}"`);
await page.setContent(`<body style="margin:0;background:transparent">${svg}</body>`);
await page.waitForTimeout(300);
await page.screenshot({ path: output, omitBackground: true });
await browser.close();
