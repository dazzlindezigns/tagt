import { Fragment, type ElementType } from "react";
import { T } from "./Sheet";
import type { PageSlug } from "@/lib/content";

/**
 * Headline styling from the mockup: one phrase in gold, and a line break on wider screens.
 * Matching is by phrase, so if the team rewrites a headline and the phrase is gone,
 * the headline simply shows in white.
 */
const STYLE: Record<string, { gold?: string; breakBefore?: string }> = {
  "2-about:2": { gold: "& Mission", breakBefore: "& Mission" },
  "4-ministries:2": { gold: "Real Faith.", breakBefore: "Real Faith." },
  "6-events:2": { gold: "TAGT", breakBefore: "at TAGT" },
  "8-give:2": { gold: "with Purpose", breakBefore: "with Purpose" },
};

function render(words: string, gold?: string, breakBefore?: string) {
  const parts: React.ReactNode[] = [];
  let rest = words;
  if (breakBefore && rest.includes(breakBefore)) {
    const i = rest.indexOf(breakBefore);
    parts.push(...withGold(rest.slice(0, i), gold, "a"));
    parts.push(<br key="br" className="hidden md:block" />);
    rest = rest.slice(i);
  }
  parts.push(...withGold(rest, gold, "b"));
  return parts;
}

function withGold(s: string, gold: string | undefined, k: string) {
  if (!gold || !s.includes(gold)) return [<Fragment key={k}>{s}</Fragment>];
  const i = s.indexOf(gold);
  return [
    <Fragment key={k + 1}>{s.slice(0, i)}</Fragment>,
    <span key={k + 2} className="text-gold-light">{gold}</span>,
    <Fragment key={k + 3}>{s.slice(i + gold.length)}</Fragment>,
  ];
}

export function Headline({ page, n, as = "h1", className = "h-display" }: { page: PageSlug; n: number; as?: ElementType; className?: string }) {
  const style = STYLE[`${page}:${n}`] ?? {};
  return (
    <T page={page} n={n} as={as} className={className}>
      {(w) => render(w, style.gold, style.breakBefore)}
    </T>
  );
}
