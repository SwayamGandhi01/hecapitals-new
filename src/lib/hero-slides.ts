export type HeroSlide = {
  /** Stable key, also used for slide labels in the indicator controls. */
  id: string;
  /** Path under /public. */
  src: string;
  /** Short city / theme label announced to assistive tech via the slide controls. */
  label: string;
  /** object-position tuned per image so landmarks survive aggressive crops. */
  position: string;
  /** Flat navy wash per image (0-1), on top of the shared directional grade.
   * Deliberately light: the reference keeps the cityscape clearly visible. */
  overlay: number;
};

/**
 * Slide order: London first, then New York, Vancouver, Toronto, growth.
 * Change the order here and the slider, counter and indicators follow.
 */
export const HERO_SLIDES: readonly HeroSlide[] = [
  {
    id: "london",
    src: "/images/hero/LondonCityInvestment.jpg",
    label: "London",
    // Keeps The Shard and Tower Bridge in frame on narrow viewports.
    position: "72% 50%",
    overlay: 0.22,
  },
  {
    id: "new-york",
    src: "/images/hero/New_York_Investor_Relations.jpg",
    label: "New York",
    // Anchors left so the Statue of Liberty is never cropped out.
    position: "22% 50%",
    overlay: 0.2,
  },
  {
    id: "vancouver",
    src: "/images/hero/vancouver_during_the_day.jpg",
    label: "Vancouver",
    // Already a dusky aerial — keep the overlay lighter.
    position: "55% 45%",
    overlay: 0.14,
  },
  {
    id: "toronto",
    src: "/images/hero/torontoat_night.jpg",
    label: "Toronto",
    // Skyline sits low in the frame; bias downward to hold the city lights.
    position: "50% 62%",
    overlay: 0.16,
  },
  {
    id: "growth",
    src: "/images/hero/iStock-1051659174.jpg",
    label: "Market growth",
    // Dark studio shot with the chart on the right half.
    position: "60% 50%",
    overlay: 0.12,
  },
] as const;

export const SLIDE_DURATION_MS = 5000;
export const CROSSFADE_MS = 1100;
