import { sheetAttrs, text } from "./content";
import { ABOUT_PAGES } from "./about";
import { MINISTRIES, ministryName } from "./ministries";

/** Menu links. The words come from "Every page" rows 1–7 of the content sheet. */
export const NAV = [
  { n: 1, href: "/about" },
  { n: 2, href: "/visit" },
  { n: 3, href: "/ministries" },
  { n: 4, href: "/teachings" },
  { n: 5, href: "/events" },
  { n: 6, href: "/prayer" },
  { n: 7, href: "/give" },
] as const;


/** Drop-down items under a menu word, or null. */
export function submenu(href: string): { href: string; label: string; sheet?: Record<string, string | number> }[] | null {
  if (href === "/about") return ABOUT_PAGES.map((p) => ({ href: `/about/${p.slug}`, label: text("2-about", p.title) }));
  if (href === "/ministries")
    return [
      { href: "/ministries", label: text("0-every-page", 33), sheet: sheetAttrs("0-every-page", 33) },
      ...MINISTRIES.map((m) => ({ href: `/ministries/${m.slug}`, label: ministryName(m) })),
    ];
  return null;
}
