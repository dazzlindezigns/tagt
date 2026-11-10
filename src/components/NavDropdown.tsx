"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

/** A menu word with a drop-down (About, Ministries). Opens on hover, click, or keyboard. */
export function NavDropdown({ href, label, items }: { href: string; label: ReactNode; items: { href: string; label: string; sheet?: Record<string, string | number> }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pointer = useRef<string>("");
  const active = pathname === href || pathname.startsWith(href + "/");
  const id = `menu-${href.slice(1)}`;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="group relative flex items-center" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={`relative whitespace-nowrap rounded-md py-2 pl-2 pr-0.5 text-[13px] xl:pl-2.5 xl:text-[13.5px] font-medium text-white/85 transition hover:text-white ${
          active ? "text-white after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:rounded after:bg-gold" : ""
        }`}
      >
        {label}
      </Link>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        // A mouse already opened the menu by hovering, so its click keeps it open. Touch and keyboard toggle it.
        onClick={() => {
          const byMouse = pointer.current === "mouse";
          pointer.current = "";
          setOpen((o) => (byMouse ? true : !o));
        }}
        className="grid h-7 w-4 place-items-center rounded text-white/70 hover:text-white"
      >
        <span className="sr-only">Show the {typeof label === "string" ? label : ""} menu</span>
        <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div id={id} className="absolute left-0 top-full z-50 pt-2">
          <ul className="min-w-[220px] overflow-hidden rounded-xl border border-white/10 bg-purple-950 py-2 shadow-2xl">
            {items.map((i) => (
              <li key={i.href}>
                <Link
                  href={i.href}
                  aria-current={pathname === i.href ? "page" : undefined}
                  className="block px-4 py-2.5 text-sm text-white/85 hover:bg-white/10 hover:text-white aria-[current=page]:text-gold-light"
                >
                  <span {...i.sheet}>{i.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
