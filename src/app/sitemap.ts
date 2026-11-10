import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/visit", "/ministries", "/teachings", "/events", "/prayer", "/give"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/events" || p === "/teachings" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
