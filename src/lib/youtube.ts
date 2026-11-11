import { site } from "./site";

/**
 * Recent videos from the channel's public feed (no API key needed; the latest 15 videos).
 * Cached for 15 minutes. If YouTube can't be reached, returns an empty list and the pages
 * show their "messages will appear here" state instead of breaking.
 *
 * Later (build prompt §6): with YOUTUBE_API_KEY, a scheduled sync stores every video in the
 * `sermons` table, where admins add series, speaker and Scripture, and true live status.
 */
export type Video = { id: string; title: string; published: string; thumbnail: string };

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

export async function recentVideos(): Promise<Video[]> {
  if (!site.youtubeChannelId) return [];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`, {
      next: { revalidate: 900 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return xml
      .split("<entry>")
      .slice(1)
      .map((e) => {
        const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
        return {
          id,
          title: decode(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? ""),
          published: e.match(/<published>([^<]+)<\/published>/)?.[1] ?? "",
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
      })
      .filter((v) => /^[\w-]{11}$/.test(v.id));
  } catch {
    return [];
  }
}

/** Service recordings are titled with just a date ("November 9, 2026"); messages have a real title. */
export const isDateTitle = (title: string) => /^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(title.trim());

/** Named messages first (newest first), for Featured Teaching and the archive. */
export function messagesOnly(videos: Video[]) {
  return videos.filter((v) => !isDateTitle(v.title));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" });
}

export const liveUrl = () => `https://www.youtube.com/channel/${site.youtubeChannelId}/live`;
export const channelVideosUrl = () => `https://www.youtube.com/channel/${site.youtubeChannelId}/videos`;

/**
 * Is the channel live right now? Reads the channel's public /live page (no API key):
 * when a stream is on, that page points at the stream's video and reports it as live.
 * Returns null if YouTube can't be reached, so the player falls back to service times.
 * Swap for the YouTube API once a key is set up (build prompt §6).
 */
export async function liveStatus(): Promise<{ live: boolean; videoId?: string } | null> {
  if (!site.youtubeChannelId) return null;
  try {
    const res = await fetch(`https://www.youtube.com/channel/${site.youtubeChannelId}/live`, {
      headers: { "Accept-Language": "en-US" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // While live, /live shows the stream's watch page: its "current video" is the stream and it says "isLive":true.
    const videoId = html.match(/"currentVideoEndpoint":\{.{0,400}?"watchEndpoint":\{"videoId":"([\w-]{11})"/)?.[1];
    const live = !!videoId && html.includes('"isLive":true');
    return live ? { live: true, videoId } : { live: false };
  } catch {
    return null;
  }
}
