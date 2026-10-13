"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { SERVICES } from "@/lib/services";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: SERVICES },
  { label: "Sectors", href: "/sectors" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Flat header sharing the hero's container: logo hard left, navigation and CTA
 * right. No pill -- the hero's own top vignette supplies the legibility.
 * Below lg the links collapse into a full-screen overlay.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // The header's artwork and links are white, so it can only stay transparent
  // while it is over the hero. Past that it takes a navy backdrop, otherwise
  // it disappears against the light section below.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 120);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock the page behind the overlay, and always restore on unmount.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Resizing up to desktop hides the overlay via CSS; close it too, or the
  // scroll lock would survive with no visible way to undo it.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  // Dismiss an open desktop dropdown on Escape or a click elsewhere.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [menu]);

  const linkClass =
    "text-sm text-white/85 transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-300 ${
          scrolled
            ? "bg-navy-950/92 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md lg:pb-4 lg:pt-4"
            : "pt-[max(1.5rem,env(safe-area-inset-top))] lg:pt-8"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center px-6 sm:px-8 lg:px-12 xl:px-16">
          <Logo />

          <nav
            ref={navRef}
            aria-label="Primary"
            className="ml-auto hidden items-center gap-8 lg:flex"
          >
            {NAV_LINKS.map((link) =>
              "children" in link && link.children ? (
                <div key={link.href} className="relative">
                  <button
                    type="button"
                    aria-expanded={menu === link.href}
                    aria-haspopup="true"
                    onClick={() => setMenu(menu === link.href ? null : link.href)}
                    className={`inline-flex cursor-pointer items-center gap-1.5 ${linkClass}`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`size-3.5 transition-transform ${menu === link.href ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>

                  {menu === link.href ? (
                    <ul className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2 rounded-lg border border-white/10 bg-navy-900/95 p-2 shadow-2xl backdrop-blur-xl">
                      <li>
                        <Link
                          href={link.href}
                          onClick={() => setMenu(null)}
                          className="block rounded-md px-3 py-2 text-sm text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                        >
                          All {link.label}
                        </Link>
                      </li>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMenu(null)}
                            className="block rounded-md px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <span aria-hidden className="mx-6 hidden h-6 w-px bg-white/20 lg:block" />

          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:inline-flex"
          >
            Discuss Your Goals
            <ArrowRight className="size-4" aria-hidden />
          </Link>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-label="Open menu"
            className="-mr-2 ml-auto inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
