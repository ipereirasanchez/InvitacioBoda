import assert from "node:assert/strict";

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
      for (let i = 0; i < n; i++) {
        assert(await answers.nth(i).isVisible(), `resposta ${i} no visible`);
      }
      if (viewport === "desktop") {
        const t0 = (await cards.nth(0).boundingBox()).y;
        const t1 = (await cards.nth(1).boundingBox()).y;
        assert.equal(Math.round(t0), Math.round(t1), "les dues primeres targetes han de compartir el top");
      }
      await page.locator("#faq").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      await shot("faq");
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
