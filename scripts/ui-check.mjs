import { spawn } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "http://localhost:4173/InvitacioBoda/";
const CAPTURES = path.join(root, "docs", "captures");
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

async function loadChecks() {
  const dir = path.join(root, "scripts", "checks");
  const files = readdirSync(dir).filter((f) => f.endsWith(".mjs")).sort();
  const all = [];
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    all.push(...(mod.checks ?? []));
  }
  const only = process.env.UI_CHECK_ONLY;
  return only ? all.filter((c) => c.name === only) : all;
}

async function waitForServer() {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (serverExited) throw new Error("vite preview ha sortit (port 4173 ocupat?)");
    try {
      const res = await fetch(BASE);
      if (res.status === 200) return;
    } catch {
      // encara no respon
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("El servidor de previsualització no respon");
}

let passed = 0;
let failed = 0;
async function runOne(viewport, check, page, shot) {
  try {
    await check.run(page, { viewport, shot });
    passed++;
    console.log(`PASS ${viewport} ${check.name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${viewport} ${check.name}: ${e?.message ?? e}`);
  }
}

mkdirSync(CAPTURES, { recursive: true });
const checks = await loadChecks();
const server = spawn("npx", ["vite", "preview", "--port", "4173", "--strictPort"], {
  cwd: root,
  stdio: "ignore",
  detached: true,
});
let serverExited = false;
server.on("exit", () => {
  serverExited = true;
});
let browser;
try {
  await waitForServer();

  for (const check of checks.filter((c) => c.viewports?.includes("node"))) {
    await runOne("node", check, null, async () => {});
  }

  const browserChecks = checks.filter(
    (c) => !c.viewports || c.viewports.some((v) => v !== "node"),
  );
  if (browserChecks.length) {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    for (const [viewport, size] of Object.entries(VIEWPORTS)) {
      const list = browserChecks.filter((c) => !c.viewports || c.viewports.includes(viewport));
      if (!list.length) continue;
      const context = await browser.newContext({
        viewport: size,
        ...(process.env.UI_CHECK_REDUCED_MOTION === "1" ? { reducedMotion: "reduce" } : {}),
      });
      const page = await context.newPage();
      await page.goto(BASE, { waitUntil: "networkidle" });
      const shot = async (name, opts = {}) => {
        await page.screenshot({
          path: path.join(CAPTURES, `${viewport}-${name}.png`),
          fullPage: true,
          ...opts,
        });
      };
      for (const check of list) await runOne(viewport, check, page, shot);
      await context.close();
    }
  }
} finally {
  await browser?.close().catch(() => {});
  try {
    process.kill(-server.pid);
  } catch {
    // ja ha acabat
  }
  console.log(`${passed} passed, ${failed} failed`);
}
process.exit(failed ? 1 : 0);
