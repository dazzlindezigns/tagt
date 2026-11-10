/**
 * Reads every numbered spot from the running site (label, kind, current words) into
 * content/sheet-rows.json, so the content sheet always matches what the website shows.
 * Usage: npm start (in another terminal), then: node scripts/read-sheet-rows.mjs
 */
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
import { SHEET_PAGES, BASE_URL } from "./sheet-pages.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
const out = [];
for (const { slug, path } of SHEET_PAGES) {
  await page.goto(BASE_URL + path, { waitUntil: "networkidle" });
  await page.evaluate(() => document.documentElement.classList.add("sheet-mode"));
  const rows = await page.evaluate((slug) => {
    const seen = new Map();
    document.querySelectorAll(`[data-sheet-page="${slug}"]`).forEach((el) => {
      const n = Number(el.dataset.sheet);
      if (seen.has(n)) return;
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) return;
      const kind = el.dataset.sheetKind;
      const now = kind === "photo" ? el.getAttribute("aria-label") : el.innerText.replace(/\s+/g, " ").trim();
      seen.set(n, { n, label: el.dataset.sheetLabel, kind, now });
    });
    return [...seen.values()].sort((a, b) => a.n - b.n);
  }, slug);
  out.push({ slug, path, rows });
  console.log(slug, rows.length);
}
await browser.close();
writeFileSync(new URL("../content/sheet-rows.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
