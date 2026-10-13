"use client";

import { HERO_SLIDES, SLIDE_DURATION_MS } from "@/lib/hero-slides";
import { useHeroSlider } from "@/components/hero/HeroSliderContext";

/** Slide counter plus one progress bar per slide. */
export function HeroIndicators() {
  const { index, goTo, reduceMotion, paused } = useHeroSlider();

  return (
    <div
      role="group"
      aria-label="Hero background slides"
      className="flex items-center gap-4"
    >
      <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")}
        <span className="mx-1 text-white/35">/</span>
        {String(HERO_SLIDES.length).padStart(2, "0")}
      </span>

      {/* Below sm these would collide with the scroll cue opposite them, so the
          counter carries the state on its own. */}
      <div className="hidden items-center gap-2 sm:flex">
        {HERO_SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1} of ${HERO_SLIDES.length}: ${slide.label}`}
              aria-current={active ? "true" : undefined}
              className="group cursor-pointer py-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              <span
                className={`block h-px overflow-hidden bg-white/25 transition-all duration-500 group-hover:bg-white/55 ${
                  active ? "w-10 sm:w-14" : "w-5 sm:w-7"
                }`}
              >
                {active ? (
                  <span
                    // Remounting on each slide restarts the sweep.
                    key={`${slide.id}-${index}`}
                    className="block h-full w-full origin-left bg-white"
                    style={
                      reduceMotion || paused
                        ? undefined
                        : {
                            animation: `he-slide-progress ${SLIDE_DURATION_MS}ms linear forwards`,
                          }
                    }
                  />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
