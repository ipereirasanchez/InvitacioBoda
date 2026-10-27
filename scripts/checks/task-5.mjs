import assert from "node:assert/strict";

const HANDS = '#historia img[alt="Il·lustració de les nostres mans"]';
const FINCA = '#ubicacio img[alt="Il·lustració de la finca"]';
const HANDS_BG = '#historia img[alt=""]';
const FINCA_BG = '#ubicacio img[alt=""]:not([data-marca-aquarela])';
const ADDRESS = "Ma-2030, 07193 Bunyola";
const MAP_HREF = "https://www.google.com/maps/search/?api=1&query=Son+Muntaner+Ma-2030+07193+Bunyola";

// Recorre una secció perquè tots els Reveal s'activin i en retorna la caixa en coordenades de pàgina.
async function revealSection(page, selector) {
  const box = await page.evaluate((sel) => {
    const r = document.querySelector(sel).getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  }, selector);
  for (let y = box.top - 200; y <= box.top + box.height; y += 300) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
  }
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  return page.evaluate((sel) => {
    const r = document.querySelector(sel).getBoundingClientRect();
    return { x: 0, y: r.top + window.scrollY, width: document.documentElement.clientWidth, height: r.height };
  }, selector);
}

// Espera que window.scrollY deixi de canviar (scroll suau), fins a 2 s.
async function waitScrollSettled(page) {
  let prev = await page.evaluate(() => window.scrollY);
  const deadline = Date.now() + 2000;
  let stable = 0;
  while (Date.now() < deadline) {
    await page.waitForTimeout(100);
    const y = await page.evaluate(() => window.scrollY);
    stable = y === prev ? stable + 1 : 0;
    if (stable >= 2) return;
    prev = y;
  }
}

// Imatge de fons a mòbil: absoluta, amb transparència i visible darrere del text.
async function backgroundImage(page, sel) {
  return page.evaluate((s) => {
    const img = document.querySelector(s);
    if (!img) return null;
    const r = img.getBoundingClientRect();
    const wrap = img.parentElement;
    return {
      opacity: Number(getComputedStyle(img).opacity),
      position: getComputedStyle(wrap).position,
      width: r.width,
      display: getComputedStyle(wrap).display,
    };
  }, sel);
}

export const checks = [
  {
    name: "story-merged",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      assert.equal(await page.locator(HANDS).count(), 1, "falta la il·lustració de les mans a #historia");
      const text = await page.locator("#historia").textContent();
      assert(!text.includes("Qui som"), '#historia encara conté "Qui som"');
      const h2s = await page.$$eval("#historia h2", (els) => els.map((e) => e.textContent.trim()));
      assert.deepEqual(h2s, ["La nostra història"], `títols de #historia: ${h2s.join(" | ")}`);
      const sub = page.locator("#historia #records");
      assert.equal(await sub.count(), 1, "falta el subtítol #records");
      assert.equal((await sub.textContent()).trim(), "Recordant els nostres moments");
      assert.equal(await page.locator("#galeria").count(), 0, "encara existeix #galeria");
      // El text apareix progressivament: més d'un Reveal dins la columna de text.
      const reveals = await page.locator("#historia [data-reveal]").count();
      assert(reveals >= 5, `només ${reveals} [data-reveal] a #historia`);
      const fotos = await page.evaluate(() =>
        [...document.querySelectorAll("#historia *")].filter(
          (el) => el.children.length === 0 && /Foto/.test(el.textContent),
        ).length,
      );
      assert.equal(fotos, 6, `elements amb "Foto" a #historia: ${fotos}`);
      // Les senefes sagnen pels costats a propòsit: la secció ha de retallar-les (overflow hidden/clip).
      const overflow = await page.evaluate(() => {
        const s = document.querySelector("#historia");
        return { px: s.scrollWidth - s.clientWidth, ox: getComputedStyle(s).overflowX };
      });
      assert(
        overflow.px <= 0 || ["hidden", "clip"].includes(overflow.ox),
        `#historia desborda horitzontalment ${overflow.px}px sense overflow hidden`,
      );
      const clip = await revealSection(page, "#historia");
      await shot("historia", { clip });
    },
  },
  {
    name: "hands-sticky-desktop",
    viewports: ["desktop"],
    run: async (page) => {
      await page.setViewportSize({ width: 1440, height: 700 });
      try {
        const results = [];
        for (const offset of [300, 450]) {
          await page.evaluate((off) => {
            const r = document.querySelector("#records");
            const top = r.getBoundingClientRect().top + window.scrollY - off;
            window.scrollTo({ top, behavior: "instant" });
          }, offset);
          await waitScrollSettled(page);
          // S'espera que l'aparició (escala 0,96 → 1) de la il·lustració hagi acabat.
          await page
            .waitForFunction(
              (sel) => {
                const el = document.querySelector(sel)?.closest("[data-reveal]");
                if (!el) return true;
                const s = getComputedStyle(el);
                return s.opacity === "1" && (s.transform === "none" || s.transform === "matrix(1, 0, 0, 1, 0, 0)");
              },
              HANDS,
              { timeout: 3000 },
            )
            .catch(() => {});
          const r = await page.evaluate((sel) => {
            const img = document.querySelector(sel);
            if (!img) return null;
            const b = img.getBoundingClientRect();
            let el = img.parentElement;
            while (el && el.id !== "historia" && getComputedStyle(el).position !== "sticky") el = el.parentElement;
            return { top: b.top, bottom: b.bottom, pos: el ? getComputedStyle(el).position : null };
          }, HANDS);
          assert(r, "no hi ha la imatge de les mans");
          assert.equal(r.pos, "sticky", "el pare de les mans no és sticky");
          assert(r.top >= 0, `#records-${offset}: top de les mans ${r.top}`);
          assert(r.bottom <= 701, `#records-${offset}: bottom de les mans ${r.bottom}`);
          assert(Math.abs(r.top - 96) <= 4, `#records-${offset}: top de les mans ${r.top}, s'esperava ≈ 96`);
          results.push(r.top);
        }
        assert(Math.abs(results[0] - results[1]) <= 2, `les mans es mouen en fer scroll: ${results.join(" → ")}`);
      } finally {
        await page.setViewportSize({ width: 1440, height: 900 });
      }
    },
  },
  {
    name: "illustrations-background-mobile",
    viewports: ["mobile"],
    run: async (page) => {
      assert(!(await page.locator(HANDS).isVisible()), "la imatge de les mans en columna és visible a mòbil");
      assert(!(await page.locator(FINCA).isVisible()), "la imatge de la finca en columna és visible a mòbil");
      for (const [label, sel] of [["mans", HANDS_BG], ["finca", FINCA_BG]]) {
        const bg = await backgroundImage(page, sel);
        assert(bg, `no hi ha la imatge de fons de ${label}`);
        assert.notEqual(bg.display, "none", `la imatge de fons de ${label} és display:none`);
        assert.equal(bg.position, "absolute", `el contenidor de fons de ${label} no és absolute`);
        assert(bg.opacity > 0.1 && bg.opacity < 0.6, `opacitat de la imatge de fons de ${label}: ${bg.opacity}`);
        assert(bg.width > 250, `amplada de la imatge de fons de ${label}: ${bg.width}`);
      }
    },
  },
  {
    name: "nav-location-anchor",
    viewports: ["desktop"],
    run: async (page) => {
      await page.locator("nav a", { hasText: /^\s*On serà\s*$/ }).first().click();
      await waitScrollSettled(page);
      const top = await page.evaluate(() => document.querySelector("#ubicacio")?.getBoundingClientRect().top);
      assert(top !== undefined, "no hi ha #ubicacio");
      assert(top >= -5 && top <= 200, `#ubicacio top després del clic: ${top}`);
    },
  },
  {
    name: "location",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      assert.equal(await page.locator(FINCA).count(), 1, "falta la il·lustració de la finca");
      assert.equal(await page.locator("iframe").count(), 0, "encara hi ha un iframe");
      const text = await page.locator("#ubicacio").textContent();
      assert(text.includes(ADDRESS), "falta l'adreça a #ubicacio");
      assert(text.includes("Son Muntaner"), "falta Son Muntaner a #ubicacio");
      const h2s = await page.$$eval("#ubicacio h2", (els) => els.map((e) => e.textContent.trim()));
      assert.deepEqual(h2s, ["On serà"], `títols de #ubicacio: ${h2s.join(" | ")}`);
      assert(!text.includes("Ubicació"), '#ubicacio encara conté "Ubicació"');
      assert(!text.includes("al mateix indret"), "#ubicacio encara té el subtítol antic");
      assert(!text.includes("Carrer d'exemple"), "#ubicacio encara té l'adreça d'exemple");
      const venue = await page.evaluate(() => {
        const el = [...document.querySelectorAll("#ubicacio span, #ubicacio strong")].find(
          (e) => e.textContent.trim() === "Son Muntaner",
        );
        return el && Number(getComputedStyle(el).fontWeight);
      });
      assert(venue >= 700, `el nom del lloc no és en negreta: ${venue}`);
      const marca = page.locator("#ubicacio [data-marca-aquarela]");
      assert.equal(await marca.count(), 1, "falta la marca d'aquarel·la a #ubicacio");
      const blend = await marca.evaluate((el) => getComputedStyle(el).mixBlendMode);
      assert.equal(blend, "luminosity", `mix-blend-mode de la marca d'aquarel·la: ${blend}`);
      await marca.evaluate((el) => (el.complete ? null : new Promise((r) => el.addEventListener("load", r, { once: true }))));
      assert((await marca.evaluate((el) => el.naturalWidth)) > 0, "la marca d'aquarel·la no es carrega");
      const link = page.locator(`a[href="${MAP_HREF}"]`);
      assert(await link.count() >= 1, "falta l'enllaç del mapa");
      assert((await link.first().textContent()).includes("Com arribar-hi"), "l'enllaç no diu 'Com arribar-hi'");
      const clip = await revealSection(page, "#ubicacio");
      await shot("ubicacio", { clip });
    },
  },
  {
    name: "footer-logo",
    viewports: ["desktop"],
    run: async (page, { shot }) => {
      assert.equal(await page.locator('footer svg[data-logo="simple"]').count(), 1, "falta el logo al footer");
      const r = await page.evaluate(() => {
        const f = document.querySelector("footer");
        return { text: f.textContent, bg: getComputedStyle(f).backgroundColor };
      });
      assert(r.text.includes("Xisca"), "el footer no conté Xisca");
      assert(r.text.includes("Ivan"), "el footer no conté Ivan");
      assert(!r.text.includes("&"), "el footer conté &");
      assert(!r.text.includes("Nom & Nom"), "el footer conté 'Nom & Nom'");
      assert.equal(r.bg, "rgb(81, 84, 73)", "fons del footer");
      const clip = await revealSection(page, "footer");
      await shot("footer", { clip });
    },
  },
];
