import type { Metadata } from "next";
import { T } from "@/components/Sheet";
import { Eyebrow } from "@/components/Hero";
import { ButtonLink } from "@/components/Button";
import { VideoBlock } from "@/components/VideoBlock";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { site } from "@/lib/site";

const P = "5-teachings" as const;
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

const liveUrl = () => (site.youtubeChannelId ? `https://www.youtube.com/channel/${site.youtubeChannelId}/live` : "#watch");

export default function Teachings() {
  return (
    <>
      <section className="bg-gradient-to-br from-purple-950 via-purple-950 to-purple-800 text-white">
        <div className="mx-auto grid max-w-site items-center gap-10 px-gutter py-14 md:grid-cols-[1fr_1.25fr] md:py-20">
          <div className="flex flex-col gap-4">
            <Eyebrow light>
              <T page={P} n={1} />
            </Eyebrow>
            <T page={P} n={2} as="h1" className="h-display" />
            <T page={P} n={3} as="p" className="max-w-[44ch] text-lg text-white/85" />
            <ButtonLink href={liveUrl()} external={!!site.youtubeChannelId} className="mt-2 self-start">
              <T page={P} n={4} />
            </ButtonLink>
          </div>
          <div id="watch">
            <VideoBlock notLive={<T page={P} n={5} />} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter py-14">
        <T page={P} n={6} as="h2" className="h-section mb-5" />
        <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-cream-line bg-cream-card md:grid-cols-[1.2fr_1fr]">
          <div className="photo-slot grid aspect-video place-items-center text-white/80">
            <Icon name="play" className="h-10 w-10" />
          </div>
          <div className="flex flex-col gap-3 p-6 md:p-8">
            <Eyebrow>
              <T page={P} n={7} />
            </Eyebrow>
            <p className="text-sub">Messages appear here automatically once the church YouTube channel is connected.</p>
            <ButtonLink href={liveUrl()} external={!!site.youtubeChannelId} variant="outline" className="self-start">
              <T page={P} n={8} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter pb-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <T page={P} n={9} as="h2" className="h-section" />
          <a href="#archive" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 hover:underline">
            <T page={P} n={10} /> <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
        <div id="archive" className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[11, 12, 13, 14].map((n) => (
            <div key={n} className="flex flex-col gap-2">
              <div className="photo-slot aspect-[4/3] rounded-xl" aria-hidden="true" />
              <T page={P} n={n} as="h3" className="font-serif text-lg font-semibold text-purple-800" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
