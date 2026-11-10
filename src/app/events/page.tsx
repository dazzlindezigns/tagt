import type { Metadata } from "next";
import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { Calendar } from "@/components/Calendar";
import { EventList } from "@/components/EventList";
import { austinToday, occurrences, upcoming } from "@/lib/services";
import { text } from "@/lib/content";

const P = "6-events" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };
export const revalidate = 3600;

function shiftMonths(iso: string, m: number) {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + m, 1);
  return d.toISOString().slice(0, 10);
}

export default function Events() {
  const today = austinToday();
  const items = occurrences(shiftMonths(today, -2), shiftMonths(today, 7)).map(({ date, kind, title }) => ({ date, kind, title }));
  const next = upcoming(6);
  return (
    <>
      <Hero photo={{ page: P, n: 4 }}>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <Headline page={P} n={2} />
        <T page={P} n={3} as="p" className="max-w-[50ch] text-lg text-white/85" />
      </Hero>

      <section className="mx-auto grid max-w-site gap-10 px-gutter py-14 md:grid-cols-[1fr_1.1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <T page={P} n={5} as="h2" className="h-section" />
          <Calendar items={items} today={today} />
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <T page={P} n={6} as="h2" className="h-section" />
          {next.length ? <EventList items={next} /> : <T page={P} n={8} as="p" className="text-sub" />}
          {/* Shown on events that need sign-ups once events come from the admin. */}
          <T page={P} n={7} className="hidden" data-sheet-hidden="until-signup-events" />
          {next.length > 0 && <T page={P} n={8} className="hidden" data-sheet-hidden="when-empty" />}
        </div>
      </section>
    </>
  );
}
