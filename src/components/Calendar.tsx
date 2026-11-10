"use client";

import { useMemo, useState } from "react";
import { Icon } from "./Icons";

type Item = { date: string; kind: string; title: string };
const KIND_COLOR: Record<string, string> = { prayer: "bg-gold", worship: "bg-purple-800", bible: "bg-purple-600" };
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Calendar({ items, today }: { items: Item[]; today: string }) {
  const [ym, setYm] = useState(today.slice(0, 7));
  const [year, month] = ym.split("-").map(Number);
  const byDate = useMemo(() => {
    const m = new Map<string, Item[]>();
    items.forEach((i) => m.set(i.date, [...(m.get(i.date) ?? []), i]));
    return m;
  }, [items]);

  const first = new Date(Date.UTC(year, month - 1, 1));
  const start = first.getUTCDay();
  const daysIn = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(start).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const label = first.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (d: number) => {
    const t = new Date(Date.UTC(year, month - 1 + d, 1));
    setYm(t.toISOString().slice(0, 7));
  };
  const legend = Array.from(new Map(items.map((i) => [i.kind, i.title])).entries());

  return (
    <div className="rounded-2xl border border-cream-line bg-cream-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-purple-100" aria-label="Previous month">
          <Icon name="chevL" className="h-5 w-5 text-purple-800" />
        </button>
        <h3 className="font-serif text-xl font-semibold text-purple-800" aria-live="polite">{label}</h3>
        <button type="button" onClick={() => shift(1)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-purple-100" aria-label="Next month">
          <Icon name="chevR" className="h-5 w-5 text-purple-800" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center text-xs tabular-nums" role="grid" aria-label={label}>
        {DAYS.map((d) => (
          <div key={d} className="pb-2 font-semibold text-sub" role="columnheader">{d}</div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = `${ym}-${String(d).padStart(2, "0")}`;
          const evs = byDate.get(iso) ?? [];
          const isToday = iso === today;
          return (
            <div key={i} className="flex flex-col items-center gap-1 py-1" role="gridcell" aria-label={`${iso}${evs.length ? ": " + evs.map((e) => e.title).join(", ") : ""}`}>
              <span className={`grid h-8 w-8 place-items-center rounded-full text-sm ${isToday ? "bg-purple-800 font-semibold text-white" : "text-ink"}`}>{d}</span>
              <span className="flex h-1.5 gap-0.5">
                {evs.map((e) => (
                  <span key={e.kind} className={`h-1.5 w-1.5 rounded-full ${KIND_COLOR[e.kind] ?? "bg-sub"}`} />
                ))}
              </span>
            </div>
          );
        })}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-sub">
        {legend.map(([k, t]) => (
          <li key={k} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${KIND_COLOR[k] ?? "bg-sub"}`} /> {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
