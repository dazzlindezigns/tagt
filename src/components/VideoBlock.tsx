"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Icon } from "./Icons";

/**
 * The site's video player.
 * - During service times (Austin time, with a little margin), it shows the channel's live stream.
 * - Otherwise it plays the most recent video, with the "not live right now" line under it.
 * Live status from the YouTube API (needs a key) can replace the time windows later.
 */
type Window = { weekday: number; start: number; end: number }; // minutes after midnight, Austin time

function austinNow() {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { weekday, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function VideoBlock({
  channelId,
  latest,
  windows,
  notLive,
  empty,
}: {
  channelId: string;
  latest?: { id: string; title: string };
  windows: Window[];
  notLive: ReactNode;
  empty: ReactNode;
}) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = austinNow();
      setLive(windows.some((w) => w.weekday === now.weekday && now.minutes >= w.start && now.minutes <= w.end));
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, [windows]);

  const src = live
    ? `https://www.youtube-nocookie.com/embed/live_stream?channel=${channelId}`
    : latest
      ? `https://www.youtube-nocookie.com/embed/${latest.id}`
      : "";

  return (
    <div className="flex flex-col gap-3">
      {src ? (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-purple-950 shadow-card">
          <iframe
            key={src}
            className="h-full w-full"
            src={src}
            title={live ? "Live service" : latest?.title ?? "Latest message"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : (
        <div className="grid aspect-video w-full place-items-center rounded-2xl bg-[radial-gradient(circle_at_50%_40%,#6A3A86,#1A0B2E_75%)] p-6 text-center text-white shadow-card">
          <div className="flex flex-col items-center gap-4">
            <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/60 bg-white/15">
              <Icon name="play" className="ml-1 h-7 w-7" />
            </span>
            <div className="max-w-[34ch] text-sm text-white/85">{empty}</div>
          </div>
        </div>
      )}
      {live ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-current">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c62f3b] px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
          </span>
        </p>
      ) : (
        src && <div className="text-sm opacity-80">{notLive}</div>
      )}
    </div>
  );
}
