"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

import { Logo } from "@/components/Logo";
import { CONTACT, LEGAL_LINKS, SOCIAL_LINKS } from "@/lib/contact";
import { SERVICES } from "@/lib/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const EXIT_MS = 240;

type NavItem = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

const NAV_ITEMS: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: SERVICES },
  { label: "Sectors", href: "/sectors" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function MobileMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduceMotion = usePrefersReducedMotion();
  // `mounted` keeps the overlay in the tree long enough to play its exit.
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const [prevOpen, setPrevOpen] = useState(open);

  // Adjusting state during render rather than in an effect: this reacts to a
  // prop change, so an effect would only add a wasted render pass. Entry is a
  // CSS animation, so no "paint once hidden first" dance is needed.
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setMounted(true);
      setClosing(false);
      setExpanded(null);
    } else if (mounted) {
      if (reduceMotion) setMounted(false);
      else setClosing(true);
    }
  }

  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_MS);
    return () => clearTimeout(timer);
  }, [closing]);

  // Move focus in on open; hand it back to the trigger on close.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const raf = requestAnimationFrame(() => closeRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep Tab inside the dialog.
      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      ref={panelRef}
      className="fixed inset-0 z-60 lg:hidden"
      style={{
        opacity: closing ? 0 : 1,
        transition:
          closing && !reduceMotion ? `opacity ${EXIT_MS}ms ease-out` : undefined,
        animation:
          !closing && !reduceMotion
            ? `he-menu-in ${EXIT_MS}ms ease-out`
            : undefined,
      }}
    >
      {/* Cinematic backdrop. Requested small and then blurred, so it costs a
          few KB rather than a full-size hero image. */}
      <div aria-hidden className="absolute inset-0 overflow-hidden bg-navy-950">
        <Image
          src="/images/hero/LondonCityInvestment.jpg"
          alt=""
          fill
          sizes="420px"
          className="scale-110 object-cover blur-xl"
        />
        <div className="absolute inset-0 bg-navy-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/55 via-navy-950/72 to-navy-950/90" />
      </div>

      <div className="relative h-full overflow-y-auto overscroll-contain">
        <div className="flex min-h-full flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] sm:px-8">
          {/* Menu header mirrors the closed navbar. */}
          <div className="flex items-center justify-between">
            <Logo onNavigate={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10">
            <ul>
              {NAV_ITEMS.map((item, i) => {
                const isExpanded = expanded === item.href;
                return (
                  <li
                    key={item.href}
                    className="border-b border-white/12"
                    style={{
                      // `both` holds the item hidden through its stagger delay.
                      animation:
                        !closing && !reduceMotion
                          ? `he-menu-item-in 320ms ease-out ${60 + i * 45}ms both`
                          : undefined,
                    }}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setExpanded(isExpanded ? null : item.href)}
                          aria-expanded={isExpanded}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-serif text-[1.875rem] leading-none sm:text-[2rem] text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                        >
                          {item.label}
                          <ChevronRight
                            className={`size-5 shrink-0 text-white/55 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                            aria-hidden
                          />
                        </button>
                        {isExpanded ? (
                          <ul className="-mt-1 flex flex-col pb-4 pl-1">
                            <li>
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className="block py-2 text-sm text-white/85 transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                              >
                                All {item.label}
                              </Link>
                            </li>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className="block py-2 text-sm text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between gap-4 py-5 font-serif text-[1.875rem] leading-none sm:text-[2rem] text-white transition-opacity hover:opacity-80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                      >
                        {item.label}
                        <ChevronRight
                          className="size-5 shrink-0 text-white/55"
                          aria-hidden
                        />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href="/contact"
            onClick={onClose}
            className="mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-brand px-6 py-4 text-base font-medium text-white transition-colors hover:bg-brand-700 active:bg-brand-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Discuss Your Goals
            <ArrowRight className="size-5" aria-hidden />
          </Link>

          <div className="mt-8 border-t border-white/12 pt-7">
            <address className="flex flex-col gap-5 not-italic">
              <div className="flex gap-3.5">
                <MapPin
                  className="mt-0.5 size-5 shrink-0 text-white/70"
                  aria-hidden
                />
                <span className="text-[0.9375rem] leading-relaxed text-body">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-3.5">
                <Phone className="size-5 shrink-0 text-white/70" aria-hidden />
                <a
                  href={CONTACT.phone.href}
                  className="text-[0.9375rem] text-body transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  {CONTACT.phone.label}
                </a>
              </div>
              <div className="flex items-center gap-3.5">
                <Mail className="size-5 shrink-0 text-white/70" aria-hidden />
                <a
                  href={CONTACT.email.href}
                  className="break-all text-[0.9375rem] text-body transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                >
                  {CONTACT.email.label}
                </a>
              </div>
            </address>

            {/* Rendered only when real profiles are configured. */}
            {SOCIAL_LINKS.length > 0 ? (
              <ul className="mt-7 flex items-center gap-5">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-white/80 transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {LEGAL_LINKS.length > 0 ? (
            <div className="mt-7 border-t border-white/12 pt-5">
              <ul className="flex items-center gap-3 text-xs text-white/60">
                {LEGAL_LINKS.map((legal, i) => (
                  <li key={legal.href} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span aria-hidden className="text-white/25">
                        |
                      </span>
                    ) : null}
                    <Link
                      href={legal.href}
                      onClick={onClose}
                      className="transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                    >
                      {legal.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div aria-hidden className="h-2 shrink-0" />
        </div>
      </div>
    </div>
  );
}
