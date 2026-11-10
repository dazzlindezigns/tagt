import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-gutter py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-ink">Page not found</p>
      <h1 className="h-section">We couldn&apos;t find that page</h1>
      <p className="text-sub">It may have moved. Try the menu above, or head back home.</p>
      <ButtonLink href="/">Back to home</ButtonLink>
    </section>
  );
}
