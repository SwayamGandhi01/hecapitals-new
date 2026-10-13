import {
  ChartNoAxesColumnIncreasing,
  Globe,
  Layers,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { GlobeVisual } from "@/components/about/GlobeVisual";
import { Reveal } from "@/components/Reveal";
import { ABOUT, CLOSING, COMMITMENT, PRINCIPLES } from "@/lib/about-content";

const ICONS: Record<string, LucideIcon> = {
  users: UsersRound,
  chart: ChartNoAxesColumnIncreasing,
  layers: Layers,
  globe: Globe,
};

/** Shared container. Measured off the reference: ~1207px of usable width. */
const CONTAINER = "mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-10";

function EyebrowRule() {
  return <span aria-hidden className="h-px w-10 bg-brand/50 sm:w-14" />;
}

export function AboutSection() {
  return (
    <section
      id="approach"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white text-ink"
    >
      {/* ---------- Atmosphere ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(64rem_40rem_at_84%_-6%,#e4f0fc_0%,transparent_60%)]"
      />

      {/* Coastline map as a faint texture. Two intersected masks fade it down
          the page and across to the left, so it never sits behind copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[46rem] bg-[url('/images/world-map.svg')] bg-[length:132%_auto] bg-[position:34%_12%] bg-no-repeat opacity-[0.07] sm:block"
        style={{
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 46%, transparent 84%), linear-gradient(to right, transparent 6%, rgba(0,0,0,0.22) 38%, #000 64%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 46%, transparent 84%), linear-gradient(to right, transparent 6%, rgba(0,0,0,0.22) 38%, #000 64%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      {/* Cloud drift along the left edge, as in the reference. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 hidden h-[40rem] w-[34%] lg:block"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_52%_30%_at_6%_28%,rgba(222,238,252,0.9)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_44%_26%_at_-4%_62%,rgba(231,243,253,0.95)_0%,transparent_72%)]" />
      </div>

      {/* ---------- Globe ----------
          Positioned against the section, not inside a grid cell: it starts at
          the top edge, spans ~46vw and bleeds ~9% past the right edge, which
          is the proportion measured off the reference. The text measure below
          is set so the two never meet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 z-0 hidden lg:right-[-16%] lg:block lg:w-[56%] xl:right-[-13%] xl:w-[50%]"
      >
        <GlobeVisual />
      </div>

      {/* ---------- Part A: introduction ---------- */}
      <div className={`relative z-10 ${CONTAINER} pt-10 sm:pt-11`}>
        <div className="lg:max-w-[32rem] xl:max-w-[43rem]">
          <Reveal>
            <div className="flex items-center gap-4">
              <EyebrowRule />
              <p className="text-[11px] font-medium tracking-[0.2em] text-brand">
                {ABOUT.eyebrow}
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-5 font-serif text-[clamp(1.75rem,2.9vw,2.6rem)] leading-[1.12] tracking-[-0.015em] text-ink"
            >
              {ABOUT.heading}
            </h2>

            <p className="mt-2 font-serif text-[clamp(1.125rem,1.9vw,1.6rem)] leading-snug text-brand/85">
              {ABOUT.subheading}
            </p>

            <p className="mt-4 text-[0.8125rem] font-medium leading-relaxed tracking-[0.12em] text-brand sm:text-sm">
              {ABOUT.statement}
            </p>
          </Reveal>

          {/* Mobile/tablet reading order: image after the headings. */}
          <Reveal className="mx-auto mt-9 max-w-[28rem] lg:hidden" delay={80}>
            <GlobeVisual />
          </Reveal>

          <Reveal className="mt-6 space-y-4" delay={120}>
            {ABOUT.paragraphs.map((text) => (
              <p
                key={text.slice(0, 32)}
                className="text-[0.9375rem] leading-[1.7] text-ink-muted"
              >
                {text}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      {/* ---------- Part B: commitment ----------
          A shallow sweep, higher on the left, so the globe's cloud base spills
          across it rather than being cut off by a straight edge. */}
      <div className="relative z-10 mt-10 bg-mist pb-20 pt-12 sm:pb-24 lg:mt-12 lg:pt-14">
        <svg
          aria-hidden
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 -top-px h-[46px] w-full sm:h-[70px] lg:h-[96px]"
        >
          <path
            d="M0,0 L1440,0 L1440,84 C 1080,76 620,58 0,24 Z"
            fill="#ffffff"
          />
        </svg>

        <div className={CONTAINER}>
          <Reveal>
            <div className="flex items-center gap-4">
              <EyebrowRule />
              <p className="text-[11px] font-medium tracking-[0.2em] text-brand">
                {COMMITMENT.eyebrow}
              </p>
            </div>

            {/* Full container width so the reference's single-line break is
                reproducible on large screens. */}
            <h2 className="mt-5 font-serif text-[clamp(1.5rem,2.65vw,2.375rem)] leading-[1.14] tracking-[-0.015em] text-ink">
              {COMMITMENT.heading}
            </h2>
          </Reveal>

          <Reveal className="mt-5 space-y-4" delay={120}>
            {COMMITMENT.paragraphs.map((text) => (
              <p
                key={text.slice(0, 32)}
                className="text-[0.9375rem] leading-[1.7] text-ink-muted"
              >
                {text}
              </p>
            ))}
          </Reveal>

          {/* ---------- Four principles ---------- */}
          <ul className="mt-14 grid gap-x-8 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
            {PRINCIPLES.map((principle, i) => {
              const Icon = ICONS[principle.icon];
              return (
                <Reveal
                  as="li"
                  key={principle.title}
                  delay={i * 90}
                  className={`group flex items-start gap-4 lg:px-7 ${
                    i > 0 ? "lg:border-l lg:border-ink/12" : "lg:pl-0"
                  } ${i === PRINCIPLES.length - 1 ? "lg:pr-0" : ""}`}
                >
                  <Icon
                    aria-hidden
                    strokeWidth={1.5}
                    className="mt-0.5 size-8 shrink-0 text-brand/80 transition-colors duration-300 group-hover:text-brand"
                  />
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                      {principle.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          {/* ---------- Closing statement ---------- */}
          <Reveal className="mt-14 flex items-center justify-center gap-4 sm:gap-6">
            <span aria-hidden className="h-px w-8 bg-brand/40 sm:w-12" />
            <p className="text-center text-[0.6875rem] font-medium tracking-[0.2em] text-brand sm:text-xs sm:tracking-[0.24em]">
              {CLOSING}
            </p>
            <span aria-hidden className="h-px w-8 bg-brand/40 sm:w-12" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
