import type { Metadata } from "next";
import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { PrayerForm } from "@/components/Forms";
import { sheetAttrs, text } from "@/lib/content";

const P = "7-prayer-requests" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

function visibilityQuestion() {
  const [question, ...options] = text(P, 9).split("○").map((s) => s.trim());
  return { question, options: options.filter(Boolean) };
}

export default function Prayer() {
  const q = visibilityQuestion();
  return (
    <>
      <Hero overlap>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <T page={P} n={2} as="h1" className="h-display" />
        <T page={P} n={3} as="p" className="max-w-[52ch] text-lg text-white/85" />
      </Hero>
      <section className="relative z-10 mx-auto -mt-20 grid max-w-site gap-8 px-gutter pb-20 md:-mt-24 md:grid-cols-[1fr_1.15fr]">
        <figure className="order-2 self-start rounded-2xl border border-cream-line bg-cream-card p-7 md:order-1 md:mt-32">
          <T page={P} n={4} as="blockquote" className="font-serif text-xl italic leading-relaxed text-purple-800" />
          <figcaption className="mt-3">
            <T page={P} n={5} className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink" />
          </figcaption>
        </figure>
        <div className="order-1 rounded-2xl border border-cream-line bg-white p-6 shadow-card md:order-2 md:p-8">
          <PrayerForm
            labels={{ name: text(P, 6), contact: text(P, 7), request: text(P, 8), question: q.question, options: q.options, submit: text(P, 10) }}
            sheet={{ name: sheetAttrs(P, 6), contact: sheetAttrs(P, 7), request: sheetAttrs(P, 8), question: sheetAttrs(P, 9), submit: sheetAttrs(P, 10) }}
          />
        </div>
      </section>
    </>
  );
}
