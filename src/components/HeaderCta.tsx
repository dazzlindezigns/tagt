"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The header button changes by page (mockup): "Watch Live" on Teachings, otherwise "Plan Your Visit". */
export function HeaderCta({ normal, watch }: { normal: ReactNode; watch: ReactNode }) {
  const onTeachings = usePathname().startsWith("/teachings");
  return (
    <>
      <span className={onTeachings ? "header-alt hidden" : "hidden sm:inline-flex"} data-sheet-hidden={onTeachings ? "other-pages" : undefined}>
        {normal}
      </span>
      <span className={onTeachings ? "hidden sm:inline-flex" : "header-alt hidden"} data-sheet-hidden={onTeachings ? undefined : "teachings-page"}>
        {watch}
      </span>
    </>
  );
}
