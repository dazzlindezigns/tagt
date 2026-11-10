import type { ElementType, ReactNode } from "react";
import { isMissing, row, type PageSlug } from "@/lib/content";

/**
 * Every editable spot on the site goes through <T> or <Photo>. They stamp the
 * content-sheet number on the element (data-sheet), which scripts/number-screenshots
 * uses to draw the gold numbered circles, and scripts/check-sheet uses to verify
 * the sheet and the site match.
 */
function attrs(page: PageSlug, n: number) {
  const r = row(page, n);
  return {
    "data-sheet": n,
    "data-sheet-page": page,
    "data-sheet-label": r.label,
    "data-sheet-kind": r.kind,
  } as const;
}

type TProps = {
  page: PageSlug;
  n: number;
  as?: ElementType;
  className?: string;
  children?: (words: string) => ReactNode;
  [key: string]: unknown;
};

/** Text from the content sheet. Missing text renders hidden, and shows only in sheet-picture mode. */
export function T({ page, n, as: Tag = "span", className, children, ...rest }: TProps) {
  const r = row(page, n);
  if (isMissing(page, n)) {
    return (
      <Tag {...rest} {...attrs(page, n)} className={`sheet-missing ${className ?? ""}`} aria-hidden="true">
        {r.now}
      </Tag>
    );
  }
  return (
    <Tag {...rest} {...attrs(page, n)} className={className}>
      {children ? children(r.now) : r.now}
    </Tag>
  );
}

/**
 * A photo spot. Until real TAGT photos are uploaded, it shows the purple striped
 * placeholder the team sheet describes, labeled with what belongs there.
 */
export function Photo({ page, n, className = "", fade }: { page: PageSlug; n: number; className?: string; fade?: "left" }) {
  const r = row(page, n);
  return (
    <div
      {...attrs(page, n)}
      role="img"
      aria-label={r.now}
      className={`photo-slot ${fade === "left" ? "photo-fade-left" : ""} ${className}`}
    >
      <span className="photo-slot-label">Photo: {r.now}</span>
    </div>
  );
}
