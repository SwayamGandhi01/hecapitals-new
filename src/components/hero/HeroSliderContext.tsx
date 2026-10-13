"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { HERO_SLIDES, SLIDE_DURATION_MS } from "@/lib/hero-slides";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type HeroSliderValue = {
  index: number;
  goTo: (next: number) => void;
  reduceMotion: boolean;
  paused: boolean;
};

const HeroSliderContext = createContext<HeroSliderValue | null>(null);

export function useHeroSlider() {
  const ctx = useContext(HeroSliderContext);
  if (!ctx) throw new Error("useHeroSlider must be used inside HeroSliderProvider");
  return ctx;
}

/**
 * Owns the slide index so the backdrop and the bottom-right indicators can
 * share it while living in different parts of the layout. `children` arrives
 * as a prop from the server component, so advancing a slide re-renders neither
 * the headline nor the CTAs.
 */
export function HeroSliderProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const goTo = useCallback((next: number) => {
    const count = HERO_SLIDES.length;
    setIndex(((next % count) + count) % count);
  }, []);

  // Don't run the timer (or jump several slides at once) while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // A timeout keyed on `index` rather than a free-running interval: picking a
  // slide by hand restarts the full five seconds instead of inheriting a
  // part-elapsed tick, which keeps the progress sweep honest.
  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = setTimeout(() => goTo(index + 1), SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [index, paused, reduceMotion, goTo]);

  const value = useMemo(
    () => ({ index, goTo, reduceMotion, paused }),
    [index, goTo, reduceMotion, paused],
  );

  return (
    <HeroSliderContext.Provider value={value}>
      {children}
    </HeroSliderContext.Provider>
  );
}
