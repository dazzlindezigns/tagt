"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative whitespace-nowrap rounded-md px-2 py-2 text-[13px] xl:px-2.5 xl:text-[13.5px] font-medium text-white/85 transition hover:text-white ${
        active ? "text-white after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-gold" : ""
      }`}
    >
      {children}
    </Link>
  );
}
