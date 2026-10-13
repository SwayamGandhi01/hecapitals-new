"use client";

import { ArrowUp } from "lucide-react";

import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export function ScrollToTop() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
      }
      className="group inline-flex cursor-pointer items-center gap-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-navy-900 text-white transition-colors group-hover:bg-brand">
        <ArrowUp aria-hidden className="size-4" />
      </span>
      <span className="text-[0.8125rem] text-ink-muted transition-colors group-hover:text-ink">
        Scroll to top
      </span>
    </button>
  );
}
