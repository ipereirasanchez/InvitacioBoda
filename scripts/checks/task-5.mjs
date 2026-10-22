import assert from "node:assert/strict";

const HANDS = '#historia img[alt="Il·lustració de les nostres mans"]';
const FINCA = '#ubicacio img[alt="Il·lustració de la finca"]';
const ADDRESS = "Carrer d'exemple, 1 · 07000 Ciutat, Mallorca";
const MAP_HREF = "https://www.google.com/maps/search/?api=1&query=Nom+del+lloc";

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

async function handsParentPosition(page) {
  return page.evaluate((sel) => {
    const img = document.querySelector(sel);
    return img ? getComputedStyle(img.parentElement).position : null;
  }, HANDS);
}

export const checks = [
  {
    name: "story-merged",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      assert.equal(await page.locator(HANDS).count(), 1, "falta la il·lustració de les mans a #historia");
      const records = page.locator("#historia h2#records");
      assert.equal(await records.count(), 1, "falta #historia h2#records");
      assert.equal((await records.textContent()).trim(), "Records");
      assert.equal(await page.locator("#galeria").count(), 0, "encara existeix #galeria");
      const fotos = await page.evaluate(() =>
        [...document.querySelectorAll("#historia *")].filter(
          (el) => el.children.length === 0 && /Foto/.test(el.textContent),
        ).length,
      );
      assert.equal(fotos, 6, `elements amb "Foto" a #historia: ${fotos}`);
      const overflow = await page.evaluate(() => {
        const s = document.querySelector("#historia");
        return s.scrollWidth - s.clientWidth;
      });
      assert(overflow <= 0, `#historia desborda horitzontalment ${overflow}px`);
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
        await page.evaluate(() => {
          const r = document.querySelector("#records");
          window.scrollTo(0, r.getBoundingClientRect().top + window.scrollY - 300);
        });
        await page.waitForTimeout(300);
        const r = await page.evaluate((sel) => {
          const img = document.querySelector(sel);
          if (!img) return null;
          const b = img.getBoundingClientRect();
          return { top: b.top, bottom: b.bottom, pos: getComputedStyle(img.parentElement).position };
        }, HANDS);
        assert(r, "no hi ha la imatge de les mans");
        assert(r.top >= 0, `top de les mans: ${r.top}`);
        assert(r.bottom <= 700, `bottom de les mans: ${r.bottom}`);
        assert.equal(r.pos, "sticky", "el pare de les mans no és sticky");
      } finally {
        await page.setViewportSize({ width: 1440, height: 900 });
      }
    },
  },
  {
    name: "hands-static-mobile",
    viewports: ["mobile"],
    run: async (page) => {
      const pos = await handsParentPosition(page);
      assert(pos !== null, "no hi ha la imatge de les mans");
      assert.notEqual(pos, "sticky", "el pare de les mans és sticky a mòbil");
    },
  },
  {
    name: "nav-records-anchor",
    viewports: ["desktop"],
    run: async (page) => {
      await page.locator("nav a", { hasText: /^\s*Records\s*$/ }).first().click();
      await page.waitForTimeout(800);
      const top = await page.evaluate(() => document.querySelector("#records")?.getBoundingClientRect().top);
      assert(top !== undefined, "no hi ha #records");
      assert(top >= 0 && top <= 200, `#records top després del clic: ${top}`);
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
