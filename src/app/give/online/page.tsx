import type { Metadata } from "next";
import { T } from "@/components/Sheet";
import { Eyebrow } from "@/components/Hero";
import { GiveForm } from "@/components/Forms";
import { ButtonLink } from "@/components/Button";
import { list, sheetAttrs, text } from "@/lib/content";
import { givingConnected } from "@/lib/giving";
import { site } from "@/lib/site";

const P = "20-give-online";
export const metadata: Metadata = { title: text(P, 2), description: text(P, 3) };

export default function GiveOnline() {
  const connected = givingConnected();
  return (
    <>
      <section className="bg-gradient-to-br from-purple-950 via-purple-950 to-purple-800 text-white">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-gutter pb-32 pt-14 md:pb-36 md:pt-20">
          <Eyebrow light>
            <T page={P} n={1} />
          </Eyebrow>
          <T page={P} n={2} as="h1" className="h-display" />
          <T page={P} n={3} as="p" className="max-w-[44ch] text-lg text-white/85" />
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-24 flex max-w-[720px] flex-col gap-5 px-gutter pb-20">
        {!connected && (
          <div className="flex flex-col gap-3 rounded-2xl border border-gold bg-[#fbf3e2] p-5 text-ink shadow-card sm:flex-row sm:items-center sm:justify-between">
            <T page={P} n={12} as="p" className="text-sm" />
            {site.giveUrl ? (
              <ButtonLink href={site.giveUrl} external variant="purple" className="shrink-0">
                <T page={P} n={13} />
              </ButtonLink>
            ) : (
              <T page={P} n={13} className="hidden" data-sheet-hidden="needs-giving-link" />
            )}
          </div>
        )}
        <div className="rounded-2xl border border-cream-line bg-white p-6 shadow-card md:p-8">
          <GiveForm
            funds={list(P, 6)}
            frequencies={list(P, 8)}
            givingPageUrl={site.giveUrl}
            words={{
              amount: text(P, 4),
              fund: text(P, 5),
              often: text(P, 7),
              fee: text(P, 9),
              button: text(P, 10),
              note: text(P, 11),
              notConnected: text(P, 12),
              notConnectedButton: text(P, 13),
            }}
            sheet={{
              amount: sheetAttrs(P, 4),
              fund: sheetAttrs(P, 5),
              funds: sheetAttrs(P, 6),
              often: sheetAttrs(P, 7),
              oftenChoices: sheetAttrs(P, 8),
              fee: sheetAttrs(P, 9),
              button: sheetAttrs(P, 10),
              note: sheetAttrs(P, 11),
            }}
          />
        </div>
      </section>
    </>
  );
}
