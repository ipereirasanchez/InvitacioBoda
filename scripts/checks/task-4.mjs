import assert from "node:assert/strict";

const HERO_ALT = "Il·lustració de la Xisca i l'Ivan";

export const checks = [
  {
    name: "hero-content",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      const h1 = page.locator("#inici h1");
      assert.equal((await h1.textContent())?.trim(), "Xisca & Ivan", "text de l'h1");
      const img = page.locator(`img[alt="${HERO_ALT}"]`);
      assert.equal(await img.count(), 1, "falta la il·lustració de la portada");
      await img.evaluate((el) => (el.complete ? null : new Promise((r) => el.addEventListener("load", r, { once: true }))));
      const nw = await img.evaluate((el) => el.naturalWidth);
      assert(nw > 0, `naturalWidth de la il·lustració: ${nw}`);
      assert.equal(await page.locator('svg[data-logo="main"]').count(), 1, 'falta svg[data-logo="main"]');
      const text = await page.locator("#inici").textContent();
      for (const t of ["Junts amb les nostres famílies", "10-04-2027", "Confirma l'assistència"]) {
        assert(text.includes(t), `#inici no conté "${t}"`);
      }
      await page.waitForTimeout(1300);
      await shot("hero", { fullPage: false });
    },
  },
  {
    name: "hero-mobile-no-overflow",
    viewports: ["mobile"],
    run: async (page) => {
      await page.waitForTimeout(1300);
      const r = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth,
        iw: window.innerWidth,
        color: getComputedStyle(document.querySelector("#inici h1")).color,
      }));
      assert(r.sw <= r.iw, `desbordament horitzontal: scrollWidth ${r.sw} > innerWidth ${r.iw}`);
      assert.equal(r.color, "rgb(81, 84, 73)", "color de l'h1 a mòbil");
    },
  },
  {
    name: "hero-desktop-names-light",
    viewports: ["desktop"],
    run: async (page) => {
      const color = await page.locator("#inici h1").evaluate((el) => getComputedStyle(el).color);
      assert.equal(color, "rgb(250, 247, 241)", "color de l'h1 a escriptori");
    },
  },
  {
    name: "nav-logo-on-scroll",
    viewports: ["desktop"],
    run: async (page, { shot }) => {
      assert.equal(await page.locator('header[data-scrolled="false"]').count(), 1, "a dalt, header no és data-scrolled=false");
      const logo = page.locator('header a[aria-label="Inici"] svg[data-logo="simple"]');
      assert.equal(await logo.count(), 1, 'falta svg[data-logo="simple"] dins a[aria-label="Inici"]');
      assert(!(await logo.isVisible()), "el logo simple és visible a dalt de tot");
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(600);
      assert.equal(await page.locator('header[data-scrolled="true"]').count(), 1, "després de l'scroll, header no és data-scrolled=true");
      assert(await logo.isVisible(), "logo simple no visible després de l'scroll");
      const opScrolled = await logo.evaluate((el) => getComputedStyle(el.closest("a")).opacity);
      assert.equal(opScrolled, "1", `opacitat del logo després de l'scroll: ${opScrolled}`);
      const text = await page.evaluate(() => document.body.textContent);
      assert(!text.includes("X & I"), 'la pàgina encara conté "X & I"');
      await shot("nav-scrolled", { fullPage: false });
    },
  },
  {
    name: "countdown",
    viewports: ["desktop"],
    run: async (page) => {
      const section = page.locator('section[aria-label="Compte enrere"]');
      assert.equal(await section.count(), 1, 'falta section[aria-label="Compte enrere"]');
      const bg = await section.evaluate((el) => getComputedStyle(el).backgroundColor);
      assert.equal(bg, "rgb(186, 170, 146)", "fons del compte enrere");
      const text = await section.textContent();
      for (const l of ["Dies", "Hores", "Minuts", "Segons"]) {
        assert(text.includes(l), `falta l'etiqueta ${l}`);
      }
    },
  },
];
