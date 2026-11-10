/**
 * Screenshots each public page at 1000px wide and draws gold numbered circles on every
 * spot marked with data-sheet, saving to /content/page-pictures/<section>.png.
 * Also verifies the numbers on each page equal the numbers in /content/sheet-seed.json.
 *
 * Usage: npm run build && npm start   (in another terminal)
 *        npm run number-screenshots    (BASE_URL defaults to http://localhost:3000)
 */
import { createRequire } from "node:module";
// Loaded with require so a globally installed Playwright also works (see docs/RUNBOOK.md).
const { chromium } = createRequire(import.meta.url)("playwright");
import { mkdirSync, readFileSync } from "node:fs";
import { SHEET_PAGES, BASE_URL } from "./sheet-pages.mjs";

const seed = JSON.parse(readFileSync(new URL("../content/sheet-seed.json", import.meta.url)));
const outDir = new URL("../content/page-pictures/", import.meta.url);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 1 });
let problems = 0;

for (const { slug, path } of SHEET_PAGES) {
  await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.documentElement.classList.add("sheet-mode"));
  await page.evaluate(() => document.fonts.ready);
  // Sticky header would repeat over content in a full-page shot.
  await page.addStyleTag({ content: "header{position:relative!important} iframe{visibility:hidden}" });

  const found = await page.evaluate((slug) => {
    const marks = [];
    document.querySelectorAll(`[data-sheet-page="${slug}"]`).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      marks.push({ n: Number(el.dataset.sheet), x: r.left + window.scrollX, y: r.top + window.scrollY, kind: el.dataset.sheetKind, w: r.width, h: r.height, inNav: !!el.closest('header nav') });
    });
    const layer = document.createElement("div");
    layer.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;z-index:99999;pointer-events:none";
    const placed = [];
    for (const m of marks) {
      // Photos: circle near the top-left corner inside the box. Text: circle just left of the text.
      // Menu words sit close together, so their circles go just above the word instead.
      let x = m.kind === "photo" ? m.x + 14 : m.inNav ? m.x + m.w / 2 - 13 : Math.max(4, m.x - 30);
      let y = m.kind === "photo" ? m.y + 14 : m.inNav ? m.y - 24 : m.y + Math.min(m.h, 40) / 2 - 13;
      while (placed.some((p) => Math.abs(p.x - x) < 28 && Math.abs(p.y - y) < 28)) x += 30;
      placed.push({ x, y });
      const c = document.createElement("div");
      c.textContent = m.n;
      c.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:26px;height:26px;border-radius:50%;background:#D9B46C;color:#1A0B2E;border:2px solid #1A0B2E;font:700 13px/22px Inter,sans-serif;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.35)`;
      layer.appendChild(c);
    }
    document.body.appendChild(layer);
    return [...new Set(marks.map((m) => m.n))].sort((a, b) => a - b);
  }, slug);

  const expected = seed.find((p) => p.slug === slug).rows.map((r) => r.n).sort((a, b) => a - b);
  const missing = expected.filter((n) => !found.includes(n));
  const extra = found.filter((n) => !expected.includes(n));
  if (missing.length || extra.length) {
    problems++;
    console.error(`✗ ${slug}: not on page ${JSON.stringify(missing)}, not in sheet ${JSON.stringify(extra)}`);
  } else console.log(`✓ ${slug}: ${found.length} numbers match the sheet`);

  await page.screenshot({ path: new URL(`${slug}.png`, outDir).pathname, fullPage: true });
}
await browser.close();
if (problems) process.exit(1);
