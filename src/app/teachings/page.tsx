import type { Metadata } from "next";
import Image from "next/image";
import { T } from "@/components/Sheet";
import { Eyebrow } from "@/components/Hero";
import { ButtonLink } from "@/components/Button";
import { VideoBlock } from "@/components/VideoBlock";
import { VideoCard } from "@/components/VideoCard";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { site } from "@/lib/site";
import { liveWindows } from "@/lib/services";
import { channelVideosUrl, formatDate, liveUrl, messagesOnly, recentVideos } from "@/lib/youtube";

const P = "5-teachings";
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };
export const revalidate = 900;

const EMPTY = "Messages appear here automatically from the church YouTube channel.";

export default async function Teachings() {
  const videos = await recentVideos();
  const messages = messagesOnly(videos);
  const featured = messages[0] ?? videos[0];
  // Named messages first, then recent service recordings, up to 8.
  const archive = [...messages, ...videos.filter((v) => !messages.includes(v))].filter((v) => v.id !== featured?.id).slice(0, 8);

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
            <ButtonLink href={liveUrl()} external className="mt-2 self-start">
              <T page={P} n={4} />
            </ButtonLink>
          </div>
          <div id="watch">
            <VideoBlock channelId={site.youtubeChannelId} latest={videos[0]} windows={liveWindows()} notLive={<T page={P} n={5} />} empty={EMPTY} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter py-14">
        <T page={P} n={6} as="h2" className="h-section mb-5" />
        <div className="grid items-center gap-6 overflow-hidden rounded-2xl border border-cream-line bg-cream-card md:grid-cols-[1.2fr_1fr]">
          {featured ? (
            <a href={`/teachings/${featured.id}`} className="relative block aspect-video bg-purple-950" aria-label={featured.title}>
              <Image src={featured.thumbnail} alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" priority />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white/85 text-purple-800">
                  <Icon name="play" className="ml-1 h-6 w-6" />
                </span>
              </span>
            </a>
          ) : (
            <div className="photo-slot grid aspect-video place-items-center text-white/80">
              <Icon name="play" className="h-10 w-10" />
            </div>
          )}
          <div className="flex flex-col gap-3 p-6 md:p-8">
            <Eyebrow>
              <T page={P} n={7} />
            </Eyebrow>
            {featured ? (
              <>
                <h3 className="font-serif text-2xl font-semibold text-purple-800">{featured.title}</h3>
                <p className="text-sm text-sub">{formatDate(featured.published)}</p>
              </>
            ) : (
              <p className="text-sub">{EMPTY}</p>
            )}
            <ButtonLink href={featured ? `/teachings/${featured.id}` : liveUrl()} external={!featured} variant="outline" className="self-start">
              <T page={P} n={8} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-gutter pb-20">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <T page={P} n={9} as="h2" className="h-section" />
          <a href={channelVideosUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-800 hover:underline">
            <T page={P} n={10} /> <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
        {/* Group names (#11-14) become filters once messages are organized into groups in the admin. */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[11, 12, 13, 14].map((n, i) => (
            <T key={n} page={P} n={n} className={`rounded-full border px-4 py-1.5 text-sm font-semibold ${i === 0 ? "border-purple-800 bg-purple-800 text-white" : "border-cream-line bg-white text-purple-800 opacity-60"}`} />
          ))}
        </div>
        {archive.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
            {archive.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <p className="text-sub">{EMPTY}</p>
        )}
      </section>
    </>
  );
}
