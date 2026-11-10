// Fails the lint step if the Syne font shows up anywhere in source. (Build prompt, §1.)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["src", "tailwind.config.ts", "package.json"];
const hits = [];
function walk(p) {
  const s = statSync(p);
  if (s.isDirectory()) return readdirSync(p).forEach((f) => walk(join(p, f)));
  if (!/\.(tsx?|css|json|mjs)$/.test(p)) return;
  if (/\bsyne\b/i.test(readFileSync(p, "utf8"))) hits.push(p);
}
roots.forEach(walk);
if (hits.length) {
  console.error("The Syne font is not allowed. Found in:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("Font check passed (no Syne).");
