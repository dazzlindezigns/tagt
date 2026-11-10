import type { Metadata } from "next";
import { T, Photo } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { Headline } from "@/components/Headline";
import { ButtonLink } from "@/components/Button";
import { IconCard } from "@/components/IconCard";
import { text } from "@/lib/content";

const P = "2-about" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 7) };

export default function About() {
  return (
    <>
      <Hero photo={{ page: P, n: 4 }} tall>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <Headline page={P} n={2} />
        <T page={P} n={3} as="p" className="max-w-[40ch] text-xl text-white/85" />
      </Hero>

      <section className="mx-auto grid max-w-site items-center gap-10 px-gutter py-16 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-4">
          <Eyebrow>
            <T page={P} n={5} />
          </Eyebrow>
          <T page={P} n={6} as="h2" className="h-section" />
          <T page={P} n={7} as="p" className="max-w-[60ch] leading-relaxed text-ink/85" />
          <ButtonLink href="/visit" className="mt-2 self-start">
            <T page={P} n={8} />
          </ButtonLink>
        </div>
        <Photo page={P} n={9} className="aspect-[4/3] w-full rounded-2xl shadow-card" />
      </section>

      <section className="mx-auto max-w-site px-gutter pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          <IconCard id="beliefs" page={P} title={10} body={11} icon="book" />
          <IconCard id="mission" page={P} title={12} body={13} icon="people" />
          <IconCard id="heart" page={P} title={14} body={15} icon="heart" />
        </div>
      </section>
    </>
  );
}
