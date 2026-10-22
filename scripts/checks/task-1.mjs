import assert from "node:assert/strict";

export const checks = [
  {
    name: "page-loads",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      assert.equal(await page.title(), "La nostra boda");
      // Reveal (whileInView, once) només es dispara en fer scroll: recorrem la pàgina.
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y <= total; y += 600) {
        await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
        await page.waitForTimeout(150);
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(700);
      await shot("full");
    },
  },
];
