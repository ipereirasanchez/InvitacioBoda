import assert from "node:assert/strict";

export const checks = [
  {
    name: "page-loads",
    viewports: ["desktop", "mobile"],
    run: async (page, { shot }) => {
      assert.equal(await page.title(), "La nostra boda");
      await shot("full");
    },
  },
];
