import Image from "next/image";
import Link from "next/link";
import { T } from "./Sheet";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { ButtonLink } from "./Button";
import { NAV } from "@/lib/nav";
import { text } from "@/lib/content";

const P = "0-every-page" as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-purple-950/95 backdrop-blur supports-[backdrop-filter]:bg-purple-950/85">
      <div className="relative mx-auto flex max-w-site items-center justify-between gap-4 px-gutter py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-white" aria-label={`${text(P, 8)} home`}>
          <Image src="/logo.png" alt="" width={48} height={48} priority className="h-12 w-12 shrink-0" />
          <span className="min-w-0 leading-tight">
            <T page={P} n={8} className="block max-w-[15ch] font-serif text-[15px] font-semibold tracking-wide sm:max-w-none" />
            <T page={P} n={9} className="block text-[10.5px] font-semibold tracking-[0.2em] text-gold-light" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 nav:flex">
          {NAV.map((item) => (
            <NavLink key={item.n} href={item.href}>
              <T page={P} n={item.n} />
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/visit" arrow={false} className="hidden whitespace-nowrap !px-5 !py-2.5 sm:inline-flex">
            <T page={P} n={10} />
          </ButtonLink>
          <MobileMenu>
            <nav aria-label="Main" className="flex flex-col">
              {NAV.map((item) => (
                <Link key={item.n} href={item.href} className="border-b border-white/10 py-3.5 text-lg text-white">
                  {text(P, item.n)}
                </Link>
              ))}
            </nav>
            <ButtonLink href="/visit" className="mt-6 w-full">
              {text(P, 10)}
            </ButtonLink>
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
