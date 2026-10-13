"use client";

import Image from "next/image";

import { CROSSFADE_MS, HERO_SLIDES } from "@/lib/hero-slides";
import { useHeroSlider } from "@/components/hero/HeroSliderContext";

/**
 * Full-bleed crossfading image layer. Decorative, so it is hidden from
 * assistive tech entirely -- the slide controls carry the semantics.
 */
export function HeroBackdrop() {
  const { index, reduceMotion } = useHeroSlider();
  const fade = reduceMotion ? 0 : CROSSFADE_MS;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-navy-950">
      {HERO_SLIDES.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transform: reduceMotion || active ? "scale(1)" : "scale(1.05)",
              transitionProperty: "opacity, transform",
              transitionDuration: `${fade}ms, ${fade * 2}ms`,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              // Promote only the layer actually animating: keeping all five
              // full-screen layers composited is real memory pressure on phones.
              willChange: active ? "opacity, transform" : undefined,
            }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="100vw"
              // Only the first frame is preloaded. The rest sit inside the
              // viewport, so the lazy observer fires immediately anyway and
              // they decode long before their turn -- without competing with
              // the LCP image for bandwidth.
              priority={i === 0}
              quality={82}
              className="object-cover"
              // A restrained grade, not a look: the supplied city shots are
              // atmospheric and read flat once the heavy scrim came off.
              style={{
                objectPosition: slide.position,
                filter: "contrast(1.08) saturate(1.1)",
              }}
            />
            <div
              className="absolute inset-0 bg-navy-950"
              style={{ opacity: slide.overlay }}
            />
          </div>
        );
      })}

      {/* Directional grade rather than a flat scrim: the left column carries
          the type, so it goes dark while the right stays bright enough to read
          as a cityscape. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/94 via-navy-950/50 to-navy-950/10" />
      {/* Vignettes that keep the header and the bottom controls legible. */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-950/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-navy-950/80 to-transparent" />
    </div>
  );
}
