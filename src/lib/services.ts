import { text } from "./content";

/** The three weekly services. Wording comes from the "Every page" section of the content sheet. */
export type Service = {
  key: "prayer" | "worship" | "bible";
  slug: string; // event page address: /events/<slug>
  minutes: number; // how long it usually runs, for calendar files
  rows: { day: number; name: number; time: number; line: number };
  weekday: number; // 0 = Sunday
  hour: number;
  minute: number;
  icon: "pray" | "people" | "book";
};

export const SERVICES: Service[] = [
  { key: "prayer", slug: "sunday-morning-prayer", minutes: 60, rows: { day: 11, name: 12, time: 13, line: 14 }, weekday: 0, hour: 9, minute: 30, icon: "pray" },
  { key: "worship", slug: "sunday-worship-service", minutes: 120, rows: { day: 15, name: 16, time: 17, line: 18 }, weekday: 0, hour: 10, minute: 30, icon: "people" },
  { key: "bible", slug: "wednesday-bible-study", minutes: 90, rows: { day: 19, name: 20, time: 21, line: 22 }, weekday: 3, hour: 19, minute: 0, icon: "book" },
];

export type Occurrence = {
  id: string;
  date: string; // YYYY-MM-DD in Austin time
  title: string;
  time: string;
  line: string;
  kind: Service["key"];
  slug: string;
};

/** Today's date in Austin as YYYY-MM-DD. */
export function austinToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" }).format(now);
}

function addDays(iso: string, days: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Weekly services between two dates (inclusive). Phase 1 adds admin-published events from the `events` table. */
export function occurrences(fromIso: string, toIso: string): Occurrence[] {
  const out: Occurrence[] = [];
  for (let d = fromIso; d <= toIso; d = addDays(d, 1)) {
    const weekday = new Date(d + "T12:00:00Z").getUTCDay();
    for (const s of SERVICES) {
      if (s.weekday !== weekday) continue;
      out.push({
        id: `${s.key}-${d}`,
        date: d,
        title: text("0-every-page", s.rows.name),
        time: text("0-every-page", s.rows.time),
        line: text("0-every-page", s.rows.line),
        kind: s.key,
        slug: s.slug,
      });
    }
  }
  return out;
}

export function upcoming(count: number, now = new Date()): Occurrence[] {
  const today = austinToday(now);
  return occurrences(today, addDays(today, 21)).slice(0, count);
}

export const findService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/** The next dates for one service. */
export function nextDates(service: Service, count: number, now = new Date()): Occurrence[] {
  const today = austinToday(now);
  return occurrences(today, addDays(today, count * 7 + 7)).filter((o) => o.kind === service.key).slice(0, count);
}
