import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { ABOUT_PAGES } from "@/lib/about";
import { MINISTRIES } from "@/lib/ministries";
import { SERVICES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    ...ABOUT_PAGES.map((p) => `/about/${p.slug}`),
    "/visit",
    "/ministries",
    ...MINISTRIES.map((m) => `/ministries/${m.slug}`),
    "/teachings",
    "/events",
    ...SERVICES.map((s) => `/events/${s.slug}`),
    "/prayer",
    "/give",
    "/give/online",
    "/privacy",
    "/terms",
  ].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/events" || p === "/teachings" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
