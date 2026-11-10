import type { Metadata } from "next";
import Link from "next/link";
import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icons";
import { isMissing, text } from "@/lib/content";
import { hrefFrom, site } from "@/lib/site";

const P = "8-give" as const;
const E = "0-every-page" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

const WAYS: { title: number; body: number; icon: IconName; href?: () => string }[] = [
  { title: 7, body: 8, icon: "card", href: () => site.giveUrl },
  { title: 9, body: 10, icon: "phone" },
  { title: 11, body: 12, icon: "cash" },
  { title: 13, body: 14, icon: "envelope" },
];

export default function Give() {
  return (
    <>
      <Hero photo={{ page: P, n: 5 }} tall>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <Headline page={P} n={2} />
        <T page={P} n={3} as="p" className="max-w-[50ch] text-lg text-white/85" />
        <T page={P} n={4} as="p" className="max-w-[50ch] text-white/75" />
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href={site.giveUrl || "#ways"} external={!!site.giveUrl}>
            <T page={P} n={16} />
          </ButtonLink>
          <ButtonLink href="#ways" variant="outline-light">
            <T page={P} n={17} />
          </ButtonLink>
        </div>
      </Hero>

      <section id="ways" className="mx-auto grid max-w-site scroll-mt-24 gap-10 px-gutter py-14 md:grid-cols-[1.25fr_1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <T page={P} n={6} as="h2" className="h-section" />
          <ul className="flex flex-col gap-3">
            {WAYS.map((w) => {
              const href = w.href?.();
              const inner = (
                <>
                  <Icon name={w.icon} className="h-8 w-8 shrink-0 text-purple-800" strokeWidth={1.4} />
                  <div className="min-w-0 flex-1">
                    <T page={P} n={w.title} as="h3" className="font-serif text-lg font-semibold text-purple-800" />
                    <T page={P} n={w.body} as="p" className="text-sm text-sub" />
                  </div>
                  {href && <Icon name="chevR" className="h-5 w-5 text-sub" />}
                </>
              );
              const cls = "flex items-center gap-4 rounded-2xl border border-cream-line bg-cream-card p-5";
              return (
                <li key={w.title}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} transition hover:border-gold`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <T page={P} n={15} as="p" className="text-sm text-sub" />
        </div>

        <aside className="flex flex-col gap-4 self-start rounded-2xl border border-cream-line bg-white p-7 shadow-card">
          <h2 className="font-serif text-2xl font-semibold text-purple-800">{text(E, 23)}</h2>
          <p className="flex items-start gap-3 text-ink/85">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-purple-800" />
            <span>
              {text(E, 24)}
              <br />
              {text(E, 25)}
            </span>
          </p>
          {!isMissing(E, 27) && <p className="text-ink/85">{text(E, 27)}</p>}
          {!isMissing(E, 26) && <p className="text-ink/85">{text(E, 26)}</p>}
          {!isMissing(E, 28) && (
            <a href={hrefFrom(text(E, 28))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-purple-800 hover:underline">
              <Icon name="facebook" className="h-5 w-5" /> Facebook
            </a>
          )}
          <Link href="/prayer" className="mt-2 inline-flex items-center gap-2 font-semibold text-gold-ink hover:underline">
            {text(E, 30)} <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </aside>
      </section>
    </>
  );
}
