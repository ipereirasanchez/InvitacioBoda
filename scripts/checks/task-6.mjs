import assert from "node:assert/strict";

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
export const checks = [
  {
    name: "faq-cards",
    viewports: ["desktop", "mobile"],
    run: async (page, { viewport, shot }) => {
      const cards = page.locator("#faq article");
      assert.equal(await cards.count(), 5, "ha de haver-hi 5 targetes a #faq");
      assert.equal(await page.locator("#faq button").count(), 0, "no hi pot haver cap button a #faq");
      const answers = page.locator("#faq article p");
      const n = await answers.count();
      assert.equal(n, 5, "5 respostes");
      await page.locator("#faq").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const ops = await page.$$eval("#faq article", (as) =>
        as.map((a) => getComputedStyle(a.closest("[data-reveal]") ?? a).opacity),
      );
      assert(ops.every((o) => o === "1"), `targetes amb opacitat != 1: ${ops.join(",")}`);
      for (let i = 0; i < n; i++) {
        assert(await answers.nth(i).isVisible(), `resposta ${i} no visible`);
      }
      if (viewport === "desktop") {
        const t0 = (await cards.nth(0).boundingBox()).y;
        const t1 = (await cards.nth(1).boundingBox()).y;
        assert.equal(Math.round(t0), Math.round(t1), "les dues primeres targetes han de compartir el top");
      }
      const clip = await revealSection(page, "#faq");
      await shot("faq", { clip });
    },
  },
  {
    name: "rsvp-theme",
    viewports: ["desktop"],
    run: async (page) => {
      const s = await page.evaluate(() => ({
        bg: getComputedStyle(document.querySelector("#rsvp")).backgroundColor,
        text: document.querySelector("#rsvp").textContent,
        formBg: getComputedStyle(document.querySelector("#rsvp form")).backgroundColor,
        all: document.body.textContent,
      }));
      assert.equal(s.bg, "rgb(120, 124, 105)", "fons de #rsvp");
      assert(s.text.includes("Confirmeu-nos abans del 10 de març de 2027"), "subtítol RSVP");
      assert.equal(s.formBg, "rgb(250, 247, 241)", "fons del formulari");
      assert(!s.all.includes("2030"), "la pàgina conté 2030");
    },
  },
];
