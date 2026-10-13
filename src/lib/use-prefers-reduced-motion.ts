"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Server render assumes motion is allowed, then corrects on hydration. */
function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
