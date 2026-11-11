import { liveStatus } from "@/lib/youtube";

/** { live, videoId } for the video player. Cached for a minute so YouTube is asked at most once a minute. */
export const revalidate = 60;

export async function GET() {
  const status = await liveStatus();
  return Response.json(status ?? { live: null }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60" } });
}
