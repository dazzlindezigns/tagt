import Link from "next/link";
import { T } from "./Sheet";
import { Icon, type IconName } from "./Icons";
import { text, type PageSlug } from "@/lib/content";

export function IconCard({
  page,
  title,
  body,
  icon,
  id,
  link,
}: {
  page: PageSlug;
  title: number;
  body: number;
  icon: IconName;
  id?: string;
  /** Optional "Learn More" link: where it goes, and which sheet row holds its words. */
  link?: { href: string; page: PageSlug; n: number; numbered?: boolean };
}) {
  return (
    <div id={id} className="relative flex scroll-mt-28 flex-col items-center gap-2 rounded-2xl border border-cream-line bg-cream-card px-6 py-8 text-center transition has-[a:hover]:border-gold">
      <Icon name={icon} className="mb-1 h-10 w-10 text-purple-800" strokeWidth={1.4} />
      <T page={page} n={title} as="h3" className="font-serif text-xl font-semibold text-purple-800" />
      <T page={page} n={body} as="p" className="max-w-[30ch] text-sm leading-relaxed text-sub" />
      {link && (
        <Link href={link.href} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-800 after:absolute after:inset-0 hover:underline">
          {link.numbered === false ? <LinkWords page={link.page} n={link.n} /> : <T page={link.page} n={link.n} />}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

/** Same words, without a number (used when the same row repeats on one page). */
function LinkWords({ page, n }: { page: PageSlug; n: number }) {
  return <span>{text(page, n)}</span>;
}
