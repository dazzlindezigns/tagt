import { text } from "@/lib/content";
import { findService, nextDates } from "@/lib/services";
import { address, site } from "@/lib/site";

/** "Add to My Calendar": a weekly repeating calendar event in Austin time. */
// Built on request so the first date in the file is always the next upcoming one.
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
const pad = (n: number) => String(n).padStart(2, "0");
const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
// Calendar files need CRLF line endings. Built this way because the minifier turns a "\r\n" join into
// a template literal, and template literals turn CR into LF.
const CRLF = String.fromCharCode(13, 10);

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const s = findService((await params).slug);
  if (!s) return new Response("Not found", { status: 404 });
  const first = nextDates(s, 1)[0];
  const day = first.date.replace(/-/g, "");
  const start = `${day}T${pad(s.hour)}${pad(s.minute)}00`;
  const endMinutes = s.hour * 60 + s.minute + s.minutes;
  const end = `${day}T${pad(Math.floor(endMinutes / 60))}${pad(endMinutes % 60)}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const name = text("0-every-page", 23);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${esc(name)}//Website//EN`,
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    "TZID:America/Chicago",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:-0600",
    "TZOFFSETTO:-0500",
    "TZNAME:CDT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0600",
    "TZNAME:CST",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${s.slug}@${new URL(site.url).host}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=America/Chicago:${start}`,
    `DTEND;TZID=America/Chicago:${end}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${DAYS[s.weekday]}`,
    `SUMMARY:${esc(`${text("0-every-page", s.rows.name)} at ${name}`)}`,
    `DESCRIPTION:${esc(text("0-every-page", s.rows.line))}`,
    `LOCATION:${esc(address().oneLine)}`,
    `URL:${site.url}/events/${s.slug}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join(CRLF);
  return new Response(ics + CRLF, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${s.slug}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
