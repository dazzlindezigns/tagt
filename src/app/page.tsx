import { T } from "@/components/Sheet";
import { Hero, Eyebrow } from "@/components/Hero";
import { ServiceCards } from "@/components/ServiceCards";
import { ButtonLink } from "@/components/Button";
import { EventList } from "@/components/EventList";
import { VideoBlock } from "@/components/VideoBlock";
import { upcoming } from "@/lib/services";
import { site } from "@/lib/site";
import { text } from "@/lib/content";

const P = "1-home" as const;
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero photo={{ page: P, n: 6 }} tall overlap>
        <Eyebrow light>
          <T page={P} n={1} />
        </Eyebrow>
        <T page={P} n={2} as="h1" className="h-display" />
        <T page={P} n={3} as="p" className="max-w-[52ch] text-lg text-white/85" />
        <div className="mt-2 flex flex-wrap gap-3">
          <ButtonLink href="/visit">
            <T page={P} n={4} />
          </ButtonLink>
          <ButtonLink href="/ministries" variant="outline-light">
            <T page={P} n={5} />
          </ButtonLink>
        </div>
      </Hero>
      <ServiceCards />

      <section className="mx-auto grid max-w-site gap-12 px-gutter py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div className="flex min-w-0 flex-col gap-5">
          <T page={P} n={7} as="h2" className="h-section" />
          <VideoBlock notLive={text("5-teachings", 5)} />
          <ButtonLink href="/teachings" variant="outline" className="self-start">
            {text("0-every-page", 4)}
          </ButtonLink>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <T page={P} n={8} as="h2" className="h-section" />
          <EventList items={upcoming(3)} />
          <ButtonLink href="/events" variant="outline" className="self-start">
            {text("0-every-page", 5)}
          </ButtonLink>
        </div>
      </section>

      <section className="bg-gradient-to-br from-purple-950 to-purple-800 text-white">
        <div className="mx-auto flex max-w-site flex-col items-start gap-5 px-gutter py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="flex max-w-[620px] flex-col gap-3">
            <Eyebrow light>
              <T page={P} n={9} />
            </Eyebrow>
            <T page={P} n={10} as="h2" className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] font-semibold leading-tight" />
            <T page={P} n={11} as="p" className="text-lg text-white/85" />
          </div>
          <ButtonLink href={site.giveUrl || "/give"} external={!!site.giveUrl}>
            <T page={P} n={12} />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
