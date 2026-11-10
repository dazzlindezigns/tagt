import type { Metadata } from "next";
import { T, Photo } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { ButtonLink } from "@/components/Button";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { MINISTRIES, ministryLine, ministryName } from "@/lib/ministries";

/** Ministries without a big box above get a smaller card here. */
const MORE = MINISTRIES.filter((m) => !["youth", "prayer", "bible-study"].includes(m.slug));

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
            <ButtonLink href="/ministries/youth" className="mt-2 self-start">
              <T page={P} n={17} />
            </ButtonLink>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { title: 9, when: 10, body: 11, tag: 12, href: "/ministries/prayer" },
            { title: 13, when: 14, body: 15, href: "/ministries/bible-study" },
          ].map((m) => (
            <article key={m.title} className="relative flex flex-col gap-3 rounded-2xl border border-cream-line bg-cream-card p-7 transition has-[a:hover]:border-gold">
              <T page={P} n={m.title} as="h2" className="font-serif text-2xl font-semibold text-purple-800" />
              <T page={P} n={m.when} as="p" className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-ink" />
              <T page={P} n={m.body} as="p" className="leading-relaxed text-ink/85" />
              {m.tag && <T page={P} n={m.tag} as="p" className="font-semibold text-purple-600" />}
              <Link href={m.href} className="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-purple-800 after:absolute after:inset-0 hover:underline">
                {text(P, 17)} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MORE.map((x) => (
            <li key={x.slug} className="relative flex flex-col gap-2 rounded-2xl border border-cream-line bg-cream-card p-6 transition has-[a:hover]:border-gold">
              <h3 className="font-serif text-xl font-semibold text-purple-800">{ministryName(x)}</h3>
              {ministryLine(x) && <p className="text-sm text-sub">{ministryLine(x)}</p>}
              <Link href={`/ministries/${x.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-purple-800 after:absolute after:inset-0 hover:underline">
                {text(P, 17)} <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
        <T page={P} n={16} as="p" className="mt-6" />
      </section>
    </>
  );
}
