import { Icon } from "./Icons";
import { site } from "@/lib/site";

/**
 * Live player. With a YouTube channel ID set, embeds the channel's live stream
 * (YouTube shows the current stream when live). Without one, shows the "not live" state.
 * Live-status polling with caching comes with the YouTube step (build prompt §6).
 */
export function VideoBlock({ notLive }: { notLive: React.ReactNode }) {
  if (site.youtubeChannelId) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-purple-950 shadow-card">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/live_stream?channel=${site.youtubeChannelId}`}
          title="Live service"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="relative grid aspect-video w-full place-items-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#6A3A86,#1A0B2E_75%)] p-6 text-center text-white shadow-card">
      <div className="flex flex-col items-center gap-4">
        <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/60 bg-white/15">
          <Icon name="play" className="ml-1 h-7 w-7" />
        </span>
        <div className="max-w-[34ch] text-sm text-white/85">{notLive}</div>
      </div>
    </div>
  );
}
