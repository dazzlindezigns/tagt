import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/components/Sheet";
import { Eyebrow } from "@/components/Hero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { SERVICES, findService, nextDates } from "@/lib/services";
import { address, mapsLink } from "@/lib/site";

const P = "19-event-page";
const E = "0-every-page";
export const revalidate = 3600;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = findService((await params).slug);
  return s ? { title: text(E, s.rows.name), description: text(E, s.rows.line) } : {};
}

function fmt(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = findService((await params).slug);
  if (!s) notFound();
  const dates = nextDates(s, 6);
  const a = address();
  return (
    <>
      <section className="bg-gradient-to-br from-purple-950 via-purple-950 to-purple-800 text-white">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-gutter py-14 md:py-20">
          <Link href="/events" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold-light hover:underline">
            <Icon name="chevL" className="h-4 w-4" /> <T page={P} n={1} />
          </Link>
          <Eyebrow light>{text(E, s.rows.day)}</Eyebrow>
          <h1 className="h-display">{text(E, s.rows.name)}</h1>
          <p className="font-serif text-2xl text-gold-light">{text(E, s.rows.time)}</p>
          <p className="max-w-[50ch] text-lg text-white/85">{text(E, s.rows.line)}</p>
          <ButtonLink href={`/events/${s.slug}/calendar.ics`} className="mt-2 self-start" arrow={false}>
            <Icon name="book" className="h-4 w-4" /> <T page={P} n={3} />
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto grid max-w-site gap-10 px-gutter py-14 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-4">
          <T page={P} n={2} as="h2" className="h-section" />
          {dates.length ? (
            <ul className="flex flex-col divide-y divide-cream-line rounded-2xl border border-cream-line bg-cream-card">
              {dates.map((d) => (
                <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="font-medium text-purple-800">{fmt(d.date)}</span>
                  <span className="text-sub tabular-nums">{d.time}</span>
                </li>
              ))}
            </ul>
          ) : (
            <T page={P} n={8} as="p" className="text-sub" />
          )}
          {dates.length > 0 && <T page={P} n={8} className="hidden" data-sheet-hidden="when-no-dates" />}
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <T page={P} n={4} as="h2" className="h-section" />
          <p className="flex items-start gap-3 text-lg text-purple-800">
            <Icon name="pin" className="mt-1 h-6 w-6 shrink-0" />
            <span>
              {text(E, 23)}
              <br />
              {a.street}
              <br />
              {a.cityLine}
            </span>
          </p>
          <ButtonLink href={mapsLink()} external variant="purple" className="self-start">
            <T page={P} n={5} />
          </ButtonLink>
        </div>
      </section>

      {/* Sign-up form: shown on events that need sign-ups, once events are published from the admin. */}
      <div className="mx-auto max-w-site px-gutter pb-14">
        <T page={P} n={6} className="hidden" data-sheet-hidden="signup-events-only" />
        <T page={P} n={7} className="hidden" data-sheet-hidden="signup-events-only" />
      </div>
    </>
  );
}
