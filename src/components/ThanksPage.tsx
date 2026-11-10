import { ButtonLink } from "./Button";

/** Thank-you page after a form. Wording to be added to the content sheet (docs/DECISIONS.md). */
export function ThanksPage({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="mx-auto flex max-w-[640px] flex-col items-center gap-5 px-gutter py-24 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-gold-light to-gold text-2xl text-purple-950" aria-hidden="true">
        ✓
      </div>
      <h1 className="h-section">{heading}</h1>
      <p className="text-lg text-sub">{body}</p>
      <ButtonLink href="/" variant="outline">
        Back to home
      </ButtonLink>
    </section>
  );
}
