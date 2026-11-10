import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
import { formatDate, type Video } from "@/lib/youtube";

export function VideoCard({ video }: { video: Video }) {
  return (
    <Link href={`/teachings/${video.id}`} className="group flex flex-col gap-2">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-purple-950">
        <Image src={video.thumbnail} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition group-hover:scale-[1.03]" />
        <span className="absolute inset-0 grid place-items-center bg-purple-950/20 opacity-0 transition group-hover:opacity-100">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/85 text-purple-800">
            <Icon name="play" className="ml-0.5 h-5 w-5" />
          </span>
        </span>
      </div>
      <h3 className="font-serif text-lg font-semibold leading-snug text-purple-800 group-hover:underline">{video.title}</h3>
      <p className="text-xs text-sub">{formatDate(video.published)}</p>
    </Link>
  );
}
