import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { ABOUT_PAGES } from "@/lib/about";

const ABOUT = "2-about";
const find = (slug: string) => ABOUT_PAGES.find((p) => p.slug === slug);

export function generateStaticParams() {
  return ABOUT_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  return p ? { title: text(ABOUT, p.title), description: text(ABOUT, p.line) } : {};
}

/** Paragraphs separated by blank lines or line breaks in the sheet. */
function Paragraphs({ words }: { words: string }) {
  return (
    <>
      {words.split(/\n+/).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </>
  );
}

export default async function AboutSubpage({ params }: { params: Promise<{ slug: string }> }) {
  const page = find((await params).slug);
  if (!page) notFound();
  const S = page.section;
  const others = ABOUT_PAGES.filter((p) => p.slug !== page.slug);
  return (
    <>
      <Hero photo={{ page: S, n: 1 }} tall>
        <Eyebrow light>
          <Link href="/about" className="hover:underline">{text(ABOUT, 1)}</Link>
        </Eyebrow>
        <h1 className="h-display">{text(ABOUT, page.title)}</h1>
        <p className="max-w-[44ch] text-xl text-white/85">{text(ABOUT, page.line)}</p>
      </Hero>

      <section className="mx-auto flex max-w-[760px] flex-col gap-5 px-gutter py-14 text-lg leading-relaxed text-ink/85">
        <T page={S} n={2} as="div" className="flex flex-col gap-5">
          {(w) => <Paragraphs words={w} />}
        </T>
        <ButtonLink href="/visit" className="mt-2 self-start">
          <T page={S} n={3} />
        </ButtonLink>
      </section>

      <section className="mx-auto max-w-site px-gutter pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/about/${o.slug}`}
              className="flex items-center gap-4 rounded-2xl border border-cream-line bg-cream-card p-6 transition hover:border-gold"
            >
              <Icon name={o.icon} className="h-9 w-9 shrink-0 text-purple-800" strokeWidth={1.4} />
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-xl font-semibold text-purple-800">{text(ABOUT, o.title)}</span>
                <span className="block text-sm text-sub">{text(ABOUT, o.line)}</span>
              </span>
              <Icon name="arrow" className="h-5 w-5 text-purple-800" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
