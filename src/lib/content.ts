import seed from "@content/sheet-seed.json";

/**
 * Page copy, keyed by page section + number, exactly like the TAGT Website Content Sheet.
 * Today this reads /content/sheet-seed.json. When Supabase is connected, `site_content`
 * rows override it (same page + number keys), and scripts/import-content writes there.
 */
export type PageSlug =
  | "0-every-page"
  | "1-home"
  | "2-about"
  | "3-visit-us"
  | "4-ministries"
  | "5-teachings"
  | "6-events"
  | "7-prayer-requests"
  | "8-give";

export type SheetRow = { n: number; label: string; now: string; kind: "text" | "photo" };
type SheetPage = { slug: string; title: string; rows: SheetRow[] };

const pages = new Map<string, Map<number, SheetRow>>(
  (seed as SheetPage[]).map((p) => [p.slug, new Map(p.rows.map((r) => [r.n, r as SheetRow]))]),
);

export const MISSING = "[Needs your words]";

export function row(page: PageSlug, n: number): SheetRow {
  const r = pages.get(page)?.get(n);
  if (!r) throw new Error(`Content sheet has no row ${page} #${n}`);
  return r;
}

/** True when the team hasn't supplied this text yet. Missing text is hidden on the live site. */
export function isMissing(page: PageSlug, n: number): boolean {
  return row(page, n).now.startsWith(MISSING);
}

/** The current words for a row, or "" when missing. */
export function text(page: PageSlug, n: number): string {
  return isMissing(page, n) ? "" : row(page, n).now;
}

export function allRows(): { slug: string; title: string; rows: SheetRow[] }[] {
  return seed as SheetPage[];
}

/** The data-sheet attributes for a spot rendered inside a client component. */
export function sheetAttrs(page: PageSlug, n: number): Record<string, string | number> {
  const r = row(page, n);
  return { "data-sheet": n, "data-sheet-page": page, "data-sheet-label": r.label, "data-sheet-kind": r.kind };
}
