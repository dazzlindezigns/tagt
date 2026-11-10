import { T } from "./Sheet";
import { Icon } from "./Icons";
import { SERVICES } from "@/lib/services";

const P = "0-every-page" as const;

/** The three service-time cards that sit on the hero's bottom edge (mockup, Plan Your Visit). */
export function ServiceCards({ overlap = true }: { overlap?: boolean }) {
  return (
    <div className={`relative z-10 mx-auto max-w-site px-gutter ${overlap ? "-mt-20 md:-mt-24" : ""}`}>
      <ul className="grid gap-4 sm:grid-cols-3">
        {SERVICES.map((s) => (
          <li key={s.key} className="flex flex-col items-center gap-1.5 rounded-2xl border border-cream-line bg-cream-card px-5 py-7 text-center shadow-card">
            <Icon name={s.icon} className="mb-1 h-9 w-9 text-purple-800" strokeWidth={1.4} />
            <T page={P} n={s.rows.day} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-ink" />
            <T page={P} n={s.rows.name} as="h3" className="font-serif text-xl font-semibold text-purple-800" />
            <T page={P} n={s.rows.time} className="font-serif text-2xl font-semibold text-purple-800 tabular-nums" />
            <T page={P} n={s.rows.line} as="p" className="mt-1 max-w-[26ch] text-sm text-sub" />
          </li>
        ))}
      </ul>
    </div>
  );
}
