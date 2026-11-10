import { isMissing, text } from "./content";

/**
 * Ministry pages. Each ministry has its own section in the content sheet with the same
 * row numbers: 1 name, 2 short line, 3 when it meets, 4 who leads it, 5 full description,
 * 6 photo, 7 form heading, 8 form button, 9 optional extra line.
 * To add a ministry: add a section to the sheet with those rows, then add it here.
 */
export const MINISTRIES = [
  { slug: "youth", section: "12-ministry-youth" },
  { slug: "prayer", section: "13-ministry-prayer" },
  { slug: "bible-study", section: "14-ministry-bible-study" },
  { slug: "women-of-glory", section: "15-ministry-women" },
  { slug: "men-of-glory", section: "16-ministry-men" },
  { slug: "one-sound", section: "17-ministry-one-sound" },
  { slug: "one-accord", section: "18-ministry-one-accord" },
] as const;

export type Ministry = (typeof MINISTRIES)[number];

export const ministryName = (m: Ministry) => text(m.section, 1);
export const ministryLine = (m: Ministry) => (isMissing(m.section, 2) ? "" : text(m.section, 2));
export const findMinistry = (slug: string) => MINISTRIES.find((m) => m.slug === slug);
