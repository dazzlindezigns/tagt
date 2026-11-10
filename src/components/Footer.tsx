import Image from "next/image";
import Link from "next/link";
import { T } from "./Sheet";
import { Icon } from "./Icons";
import { NAV } from "@/lib/nav";
import { text } from "@/lib/content";
import { hrefFrom } from "@/lib/site";

const P = "0-every-page" as const;

export function Footer() {
  const facebook = hrefFrom(text(P, 28));
  const youtube = hrefFrom(text(P, 29));
  return (
    <footer className="mt-auto bg-gradient-to-b from-purple-900 to-purple-950 text-white/85">
      <div className="mx-auto grid max-w-site gap-10 px-gutter py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={56} height={56} className="h-14 w-14" />
            <T page={P} n={23} as="p" className="font-serif text-lg font-semibold text-white" />
          </div>
          <address className="not-italic leading-relaxed">
            <T page={P} n={24} as="span" className="block" />
            <T page={P} n={25} as="span" className="block" />
            <T page={P} n={26} as="span" className="block">
              {(w) => <a href={`mailto:${w}`} className="underline-offset-4 hover:underline">{w}</a>}
            </T>
            <T page={P} n={27} as="span" className="block">
              {(w) => <a href={`tel:${w.replace(/[^\d+]/g, "")}`} className="underline-offset-4 hover:underline">{w}</a>}
            </T>
          </address>
          <div className="flex gap-3">
            <T page={P} n={28} as="span">
              {() => (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <Icon name="facebook" className="h-5 w-5" />
                </a>
              )}
            </T>
            <T page={P} n={29} as="span">
              {() => (
                <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <Icon name="youtube" className="h-5 w-5" />
                </a>
              )}
            </T>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-x-6 gap-y-2.5 text-sm">
          {NAV.map((item) => (
            <Link key={item.n} href={item.href} className="hover:text-white">
              {text(P, item.n)}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-start gap-3 text-sm">
          <Link href="/prayer" className="inline-flex items-center gap-2 font-semibold text-gold-light hover:text-gold">
            <T page={P} n={30} /> <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/visit" className="inline-flex items-center gap-2 font-semibold text-gold-light hover:text-gold">
            <T page={P} n={31} /> <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-wrap justify-between gap-2 px-gutter py-5 text-xs text-white/60">
          <span>© {new Date().getFullYear()} {text(P, 23)}</span>
        </div>
      </div>
    </footer>
  );
}
