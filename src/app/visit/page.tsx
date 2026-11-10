import type { Metadata } from "next";
import { T, Photo } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { ButtonLink } from "@/components/Button";
import { IconCard } from "@/components/IconCard";
import { Icon } from "@/components/Icons";
import { VisitForm } from "@/components/Forms";
import { sheetAttrs, text } from "@/lib/content";
import { mapsEmbed, mapsLink } from "@/lib/site";

const P = "3-visit-us" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

export default function Visit() {
  return (
    <>
      <Hero photo={{ page: P, n: 6 }} tall overlap>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <T page={P} n={2} as="h1" className="h-display" />
        <T page={P} n={22} as="p" className="max-w-[44ch] text-xl text-white/85" />
      </Hero>
      <ServiceCards />

      <section className="mx-auto flex max-w-[760px] flex-col gap-4 px-gutter pt-14 text-lg leading-relaxed text-ink/85">
        <T page={P} n={3} as="p" />
        <T page={P} n={4} as="p" />
        <T page={P} n={5} as="p" />
      </section>

      <section className="mx-auto max-w-site px-gutter py-14">
        <div className="grid overflow-hidden rounded-2xl border border-cream-line bg-cream-card shadow-card md:grid-cols-[1.2fr_1fr]">
          <Photo page={P} n={7} className="min-h-[240px] w-full" />
          <div className="flex flex-col gap-4 p-7 md:p-9">
            <T page={P} n={8} as="h2" className="h-section" />
            <p className="flex items-start gap-3 font-medium text-purple-800">
              <Icon name="pin" className="mt-0.5 h-6 w-6 shrink-0" />
              <T page={P} n={9} />
            </p>
            <ButtonLink href={mapsLink()} external variant="purple" className="self-start">
              <T page={P} n={10} />
            </ButtonLink>
            <iframe
              title={`Map: ${text(P, 9)}`}
              src={mapsEmbed()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-2 h-56 w-full rounded-xl border border-cream-line"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter pb-16">
        <Eyebrow className="mb-6 text-center">
          <T page={P} n={11} />
        </Eyebrow>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <IconCard page={P} title={12} body={13} icon="smile" />
          <IconCard page={P} title={14} body={15} icon="music" />
          <IconCard page={P} title={16} body={17} icon="book" />
          <IconCard page={P} title={18} body={19} icon="heart" />
        </div>
      </section>

      <section id="connect" className="bg-purple-100/60">
        <div className="mx-auto max-w-[760px] px-gutter py-16">
          <T page={P} n={20} as="h2" className="h-section mb-6" />
          <VisitForm sendLabel={text(P, 21)} sheetAttrs={sheetAttrs(P, 21)} />
        </div>
      </section>
    </>
  );
}
