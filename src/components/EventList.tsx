import { Icon } from "./Icons";
import type { Occurrence } from "@/lib/services";

function parts(iso: string) {
  const d = new Date(iso + "T12:00:00Z");
  return {
    mon: d.toLocaleString("en-US", { month: "short", timeZone: "UTC" }).toUpperCase(),
    day: d.getUTCDate(),
    weekday: d.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" }),
  };
}

export function EventList({ items }: { items: Occurrence[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((e) => {
        const p = parts(e.date);
        return (
          <li key={e.id} className="flex items-center gap-4 rounded-2xl border border-cream-line bg-cream-card p-4">
            <div className="w-14 shrink-0 rounded-xl border border-cream-line bg-white py-1.5 text-center">
              <div className="text-[10px] font-bold tracking-[0.12em] text-gold-ink">{p.mon}</div>
              <div className="font-serif text-2xl font-semibold leading-none text-purple-800 tabular-nums">{p.day}</div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-lg font-semibold text-purple-800">{e.title}</h3>
              <p className="text-sm text-sub">
                {p.weekday} · {e.time}
              </p>
              <p className="text-sm text-sub">{e.line}</p>
            </div>
            <Icon name="chevR" className="hidden h-5 w-5 text-sub sm:block" />
          </li>
        );
      })}
    </ul>
  );
}
