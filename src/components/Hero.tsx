import type { ReactNode } from "react";
import { Photo } from "./Sheet";
import type { PageSlug } from "@/lib/content";

/** Full-bleed purple hero with the photo on the right fading into the purple (mockup). */
export function Hero({
  photo,
  children,
  tall = false,
  overlap = false,
}: {
  photo?: { page: PageSlug; n: number };
  children: ReactNode;
  tall?: boolean;
  overlap?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-purple-950 via-purple-950 to-purple-800 text-white">
      {photo && (
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]">
          <Photo page={photo.page} n={photo.n} fade="left" className="h-full w-full" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-purple-950 via-purple-950/80 to-transparent md:via-purple-950/40" />
      <div
        className={`mx-auto max-w-site px-gutter ${tall ? "py-20 md:py-28" : "py-14 md:py-20"} ${overlap ? "pb-28 md:pb-36" : ""}`}
      >
        <div className="flex max-w-[620px] flex-col gap-4">{children}</div>
      </div>
    </section>
  );
}

export function Eyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return (
    <div className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-gold-light" : "text-gold-ink"} ${className}`}>
      {children}
    </div>
  );
}
