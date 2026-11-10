import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icons";

type Variant = "gold" | "outline-light" | "outline" | "purple";

const styles: Record<Variant, string> = {
  gold: "bg-gradient-to-b from-gold-light to-gold text-purple-950 hover:brightness-105 shadow-[0_6px_18px_-8px_rgba(217,180,108,.8)]",
  "outline-light": "border border-white/70 text-white hover:bg-white/10",
  outline: "border border-purple-800/30 text-purple-800 hover:bg-purple-100",
  purple: "bg-purple-800 text-white hover:bg-purple-700",
};

export function buttonClass(variant: Variant = "gold", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "gold",
  arrow = true,
  className = "",
  children,
  external,
  ...rest
}: {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
  external?: boolean;
  [key: string]: unknown;
}) {
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow" className="h-4 w-4" strokeWidth={2} />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {inner}
    </Link>
  );
}
