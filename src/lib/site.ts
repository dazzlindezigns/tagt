import { text } from "./content";

/** Settings that are not page copy. These move to the `settings` table with the admin console. */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://tagtministry.org",
  giveUrl: process.env.NEXT_PUBLIC_GIVE_URL || "",
  // The TAGT YouTube channel (public, not a secret).
  youtubeChannelId: process.env.YOUTUBE_CHANNEL_ID || "UCa1RK9QABO0KllO5YGg9IPw",
};

export function address() {
  const street = text("0-every-page", 24);
  const cityLine = text("0-every-page", 25);
  return { street, cityLine, oneLine: [street, cityLine].filter(Boolean).join(", ") };
}

export function mapsLink() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address().oneLine)}`;
}

export function mapsEmbed() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(address().oneLine)}&z=15&output=embed`;
}

/** Turns "facebook.com/x" into a full https link. */
export function hrefFrom(value: string) {
  if (!value) return "";
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}
