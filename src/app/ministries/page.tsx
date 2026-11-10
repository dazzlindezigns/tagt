import type { Metadata } from "next";
import { T, Photo } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { ButtonLink } from "@/components/Button";
import { text } from "@/lib/content";

const P = "4-ministries" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

export default function Ministries() {
  return (
    <>
      <Hero>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <Headline page={P} n={2} />
        <T page={P} n={3} as="p" className="max-w-[56ch] text-lg text-white/85" />
      </Hero>

      <section className="mx-auto max-w-site px-gutter py-14">
        <article className="grid overflow-hidden rounded-3xl border border-cream-line bg-cream-card shadow-card md:grid-cols-2">
          <Photo page={P} n={8} className="min-h-[280px] w-full" />
          <div className="flex flex-col gap-3 p-7 md:p-10">
            <Eyebrow>
              <T page={P} n={4} />
            </Eyebrow>
            <T page={P} n={5} as="h2" className="h-section" />
            <T page={P} n={6} as="p" className="font-serif text-lg italic text-purple-600" />
            <T page={P} n={7} as="p" className="leading-relaxed text-ink/85" />
            <ButtonLink href="/visit" className="mt-2 self-start">
              {text("0-every-page", 10)}
            </ButtonLink>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { title: 9, when: 10, body: 11, tag: 12 },
            { title: 13, when: 14, body: 15 },
          ].map((m) => (
            <article key={m.title} className="flex flex-col gap-3 rounded-2xl border border-cream-line bg-cream-card p-7">
              <T page={P} n={m.title} as="h2" className="font-serif text-2xl font-semibold text-purple-800" />
              <T page={P} n={m.when} as="p" className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink" />
              <T page={P} n={m.body} as="p" className="leading-relaxed text-ink/85" />
              {m.tag && <T page={P} n={m.tag} as="p" className="font-semibold text-purple-600" />}
            </article>
          ))}
        </div>
        <T page={P} n={16} as="p" className="mt-6" />
      </section>
    </>
  );
}
