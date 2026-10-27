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
      const clip = await revealSection(page, "#faq");
      const ops = await page.$$eval("#faq article", (as) =>
        as.map((a) => getComputedStyle(a.closest("[data-reveal]") ?? a).opacity),
      );
      assert(ops.every((o) => o === "1"), `targetes amb opacitat != 1: ${ops.join(",")}`);
      for (let i = 0; i < n; i++) {
        assert(await answers.nth(i).isVisible(), `resposta ${i} no visible`);
      }
      const text = await page.locator("#faq").textContent();
      assert(!text.includes("Dubtes habituals"), "#faq encara té el subtítol 'Dubtes habituals'");
      const h2s = await page.$$eval("#faq h2", (els) => els.map((e) => e.textContent.trim()));
      assert.deepEqual(h2s, ["Preguntes freqüents"]);
      const qs = await page.$$eval("#faq article h3", (els) =>
        els.map((e) => ({ w: Number(getComputedStyle(e).fontWeight), f: getComputedStyle(e).fontFamily })),
      );
      assert.equal(qs.length, 5);
      for (const q of qs) {
        assert(q.w >= 700, `pregunta sense negreta: ${q.w}`);
        assert(q.f.replace(/["']/g, "").startsWith("Manrope"), `pregunta sense Manrope: ${q.f}`);
      }
      const boxes = [];
      for (let i = 0; i < 5; i++) boxes.push(await cards.nth(i).boundingBox());
      const hs = boxes.map((b) => Math.round(b.height));
      const ws = boxes.map((b) => Math.round(b.width));
      assert(Math.max(...hs) - Math.min(...hs) <= 1, `targetes amb alçades diferents: ${hs.join(",")}`);
      assert(Math.max(...ws) - Math.min(...ws) <= 1, `targetes amb amplades diferents: ${ws.join(",")}`);
      if (viewport === "desktop") {
        assert.equal(Math.round(boxes[0].y), Math.round(boxes[1].y), "les dues primeres targetes han de compartir el top");
        const centre = boxes[4].x + boxes[4].width / 2;
        const vw = await page.evaluate(() => document.documentElement.clientWidth);
        assert(Math.abs(centre - vw / 2) <= 2, `la cinquena targeta no és centrada: ${centre} vs ${vw / 2}`);
      }
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
      // "Ma-2030" és la carretera; cap any 2030 de mostra.
      assert(!/\b2030\b/.test(s.all.replace(/Ma-2030/g, "")), "la pàgina conté l'any 2030");
    },
  },
];
