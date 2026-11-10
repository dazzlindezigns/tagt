import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoCard } from "@/components/VideoCard";
import { Icon } from "@/components/Icons";
import { text } from "@/lib/content";
import { formatDate, messagesOnly, recentVideos } from "@/lib/youtube";

export const revalidate = 900;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await recentVideos()).map((v) => ({ id: v.id }));
}

async function find(id: string) {
  const videos = await recentVideos();
  return { video: videos.find((v) => v.id === id), videos };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { video } = await find((await params).id);
  return video ? { title: video.title, openGraph: { images: [{ url: video.thumbnail }] } } : {};
}

/** One message, played inside the site. Series, speaker, Scripture and notes come with the admin. */
export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[\w-]{11}$/.test(id)) notFound();
  const { video, videos } = await find(id);
  const named = messagesOnly(videos);
  const more = [...named, ...videos.filter((v) => !named.includes(v))].filter((v) => v.id !== id).slice(0, 4);
  return (
    <>
      <section className="bg-gradient-to-br from-purple-950 via-purple-950 to-purple-800 text-white">
        <div className="mx-auto flex max-w-[960px] flex-col gap-5 px-gutter py-12 md:py-16">
          <Link href="/teachings" className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-gold-light hover:underline">
            <Icon name="chevL" className="h-4 w-4" /> {text("0-every-page", 4)}
          </Link>
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-purple-950 shadow-card">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title={video?.title ?? "Message"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          {video && (
            <div>
              <h1 className="font-serif text-[clamp(1.7rem,3.5vw,2.6rem)] font-semibold leading-tight">{video.title}</h1>
              <p className="mt-1 text-white/75">{formatDate(video.published)}</p>
            </div>
          )}
        </div>
      </section>
      {more.length > 0 && (
        <section className="mx-auto max-w-site px-gutter py-14">
          <h2 className="h-section mb-6">{text("5-teachings", 9)}</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4">
            {more.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
