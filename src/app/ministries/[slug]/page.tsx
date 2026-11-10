import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Icon } from "@/components/Icons";
import { MinistryForm } from "@/components/Forms";
import { hasRow, isMissing, sheetAttrs, text } from "@/lib/content";
import { MINISTRIES, findMinistry, ministryLine, ministryName } from "@/lib/ministries";

export function generateStaticParams() {
  return MINISTRIES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = findMinistry((await params).slug);
  return m ? { title: ministryName(m), description: ministryLine(m) || undefined } : {};
}

export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const m = findMinistry((await params).slug);
  if (!m) notFound();
  const S = m.section;
  const others = MINISTRIES.filter((o) => o.slug !== m.slug);
  return (
    <>
      <Hero photo={{ page: S, n: 6 }} tall>
        <Eyebrow light>
          <Link href="/ministries" className="hover:underline">{text("4-ministries", 1)}</Link>
        </Eyebrow>
        <T page={S} n={1} as="h1" className="h-display" />
        <T page={S} n={2} as="p" className="max-w-[44ch] text-xl text-white/85" />
      </Hero>

      <section className="mx-auto grid max-w-site gap-10 px-gutter py-14 md:grid-cols-[1.5fr_1fr]">
        <div className="flex min-w-0 flex-col gap-5 text-lg leading-relaxed text-ink/85">
          <T page={S} n={5} as="div" className="flex flex-col gap-5">
            {(w) => w.split(/\n+/).map((p, i) => <p key={i}>{p}</p>)}
          </T>
          {hasRow(S, 9) && <T page={S} n={9} as="p" className="font-semibold text-purple-600" />}
        </div>
        {/* "When" and "Led by" only show once the team has filled them in. */}
        <div className="flex flex-col gap-3 self-start">
          {[
            { n: 3, label: "When", icon: "book" as const },
            { n: 4, label: "Led by", icon: "people" as const },
          ].map((f) =>
            isMissing(S, f.n) ? (
              <T key={f.n} page={S} n={f.n} as="p" />
            ) : (
              <div key={f.n} className="flex items-start gap-3 rounded-2xl border border-cream-line bg-cream-card p-5">
                <Icon name={f.icon} className="mt-0.5 h-6 w-6 shrink-0 text-purple-800" strokeWidth={1.5} />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-ink">{f.label}</div>
                  <T page={S} n={f.n} as="p" className="font-medium text-purple-800" />
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      <section id="join" className="bg-purple-100/60">
        <div className="mx-auto max-w-[760px] px-gutter py-16">
          <T page={S} n={7} as="h2" className="h-section mb-6" />
          <MinistryForm ministry={m.slug} sendLabel={text(S, 8)} sheetAttrs={sheetAttrs(S, 8)} />
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter py-14">
        <h2 className="mb-5 font-serif text-2xl font-semibold text-purple-800">{text("0-every-page", 33)}</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/ministries/${o.slug}`} className="flex items-center justify-between gap-3 rounded-xl border border-cream-line bg-cream-card px-5 py-4 font-semibold text-purple-800 transition hover:border-gold">
                {ministryName(o)} <Icon name="arrow" className="h-4 w-4 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
