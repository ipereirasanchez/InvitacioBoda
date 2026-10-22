import assert from "node:assert/strict";

const NAV_LABELS = ["Inici", "La nostra història", "Records", "Ubicació", "Preguntes freqüents"];
const unquote = (s) => s.replace(/["']/g, "");

async function scrollToBottom(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(150);
}

export const checks = [
  {
    name: "theme-tokens",
    viewports: ["desktop"],
    run: async (page) => {
      const s = await page.evaluate(() => {
        const body = getComputedStyle(document.body);
        const h2 = document.querySelector("h2");
        return {
          bg: body.backgroundColor,
          color: body.color,
          bodyFont: body.fontFamily,
          h2Font: h2 ? getComputedStyle(h2).fontFamily : null,
        };
      });
      assert.equal(s.bg, "rgb(250, 247, 241)", "fons del body");
      assert.equal(s.color, "rgb(81, 84, 73)", "color del body");
      assert(unquote(s.bodyFont).startsWith("Manrope"), `font del body: ${s.bodyFont}`);
      assert(s.h2Font, "no hi ha cap h2");
      assert(unquote(s.h2Font).startsWith("Cormorant Garamond"), `font de l'h2: ${s.h2Font}`);
    },
  },
  {
    name: "fonts-loaded",
    viewports: ["desktop"],
    run: async (page) => {
      const r = await page.evaluate(async () => {
        await document.fonts.ready;
        const loaded = (name) =>
          [...document.fonts].some((f) => f.family.replace(/"/g, "") === name && f.status === "loaded");
        return {
          manrope: loaded("Manrope"),
          cormorant: loaded("Cormorant Garamond"),
          links: [...document.querySelectorAll('link[href*="fonts.googleapis.com"]')].map((l) => l.href),
        };
      });
      assert(r.links.length > 0, "no hi ha cap <link> de Google Fonts");
      assert(
        r.links.some((h) => h.includes("family=Cormorant+Garamond") && h.includes("family=Manrope")),
        `cap enllaç de fonts inclou Cormorant Garamond i Manrope: ${r.links.join(" ")}`,
      );
      assert(r.manrope, "Manrope no carregada");
      assert(r.cormorant, "Cormorant Garamond no carregada");
      for (const href of r.links) {
        assert(!href.includes("Jost"), `enllaç de fonts conté Jost: ${href}`);
        assert(!href.includes("Parisienne"), `enllaç de fonts conté Parisienne: ${href}`);
      }
    },
  },
  {
    name: "fonts-fallback",
    viewports: ["desktop"],
    run: async (page) => {
      const base = page.url();
      const block = (r) => r.abort();
      await page.route("**/fonts.googleapis.com/**", block);
      try {
        await page.goto(base, { waitUntil: "load" });
        const r = await page.evaluate(() => {
          const h2 = document.querySelector("h2");
          return {
            len: document.body.innerText.length,
            h2Font: h2 ? getComputedStyle(h2).fontFamily : null,
          };
        });
        assert(r.len > 200, `poc text visible sense fonts: ${r.len}`);
        assert(r.h2Font, "no hi ha cap h2");
        assert(/Cormorant Garamond|Georgia/.test(r.h2Font), `font de l'h2 sense Cormorant/Georgia: ${r.h2Font}`);
        assert(/(^|,\s*)serif\s*$/.test(r.h2Font), `font de l'h2 no acaba en serif: ${r.h2Font}`);
      } finally {
        await page.unroute("**/fonts.googleapis.com/**", block);
      }
    },
  },
  {
    name: "reveal-reduced-motion",
    viewports: ["desktop", "mobile"],
    run: async (page, { viewport }) => {
      if (process.env.UI_CHECK_REDUCED_MOTION !== "1") {
        console.log("  (reveal-reduced-motion omesa: cal UI_CHECK_REDUCED_MOTION=1)");
        return;
      }
      await scrollToBottom(page);
      await page.waitForTimeout(800);
      const ops = await page.evaluate(() =>
        [...document.querySelectorAll("[data-reveal]")].map((el) => getComputedStyle(el).opacity),
      );
      assert(ops.length > 0, "no hi ha cap [data-reveal]");
      const bad = ops.filter((o) => o !== "1");
      assert.equal(bad.length, 0, `${bad.length}/${ops.length} [data-reveal] amb opacitat != 1: ${bad.join(",")}`);
      const sb = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
      assert.notEqual(sb, "smooth", "scroll-behavior ha de no ser smooth amb moviment reduït");
      const arrow = page.locator('a[aria-label="Baixa a la següent secció"]');
      if (viewport === "desktop") {
        const an = await arrow.evaluate((el) => getComputedStyle(el).animationName);
        assert.equal(an, "none", "la fletxa no ha d'animar amb moviment reduït");
      }
    },
  },
  {
    name: "nav-links",
    viewports: ["desktop"],
    run: async (page) => {
      const labels = await page.$$eval("nav ul a", (as) => as.map((a) => a.textContent.trim()));
      assert.deepEqual(labels, NAV_LABELS);
      const text = await page.evaluate(() => document.body.textContent.toLowerCase());
      assert(!text.includes("coses per fer"), "la pàgina encara conté 'Coses per fer'");
    },
  },
];
