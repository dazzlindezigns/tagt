import type { ReactNode } from "react";
import { text } from "@/lib/content";
import { address } from "@/lib/site";

export const LEGAL_UPDATED = "November 10, 2026";

export function LegalPage({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <>
      <section className="bg-gradient-to-br from-purple-950 to-purple-800 text-white">
        <div className="mx-auto flex max-w-[820px] flex-col gap-3 px-gutter py-14 md:py-16">
          <h1 className="h-display">{title}</h1>
          <p className="text-white/75">Last updated: {LEGAL_UPDATED}</p>
        </div>
      </section>
      <article className="legal mx-auto max-w-[820px] px-gutter py-14">
        <p className="lead">{intro}</p>
        {children}
      </article>
    </>
  );
}

/** How to reach the church. Email and phone appear once they're in the content sheet. */
export function ContactBlock() {
  const a = address();
  const email = text("0-every-page", 26);
  const phone = text("0-every-page", 27);
  return (
    <address className="not-italic">
      {text("0-every-page", 23)}
      <br />
      {a.street}
      <br />
      {a.cityLine}
      {email && (
        <>
          <br />
          Email: <a href={`mailto:${email}`}>{email}</a>
        </>
      )}
      {phone && (
        <>
          <br />
          Phone: {phone}
        </>
      )}
    </address>
  );
}
