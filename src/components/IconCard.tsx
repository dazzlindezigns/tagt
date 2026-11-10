import { T } from "./Sheet";
import { Icon, type IconName } from "./Icons";
import type { PageSlug } from "@/lib/content";

export function IconCard({ page, title, body, icon, id }: { page: PageSlug; title: number; body: number; icon: IconName; id?: string }) {
  return (
    <div id={id} className="flex scroll-mt-28 flex-col items-center gap-2 rounded-2xl border border-cream-line bg-cream-card px-6 py-8 text-center">
      <Icon name={icon} className="mb-1 h-10 w-10 text-purple-800" strokeWidth={1.4} />
      <T page={page} n={title} as="h3" className="font-serif text-xl font-semibold text-purple-800" />
      <T page={page} n={body} as="p" className="max-w-[30ch] text-sm leading-relaxed text-sub" />
    </div>
  );
}
