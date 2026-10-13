import Image from "next/image";
import { Phone } from "lucide-react";

import { OFFICES } from "@/lib/footer";

/**
 * Full-width photographic banner with the four office contact cards.
 *
 * Uses the project's existing London skyline asset rather than the reference
 * mockup image. The connection arcs are a small inline SVG, not a texture.
 */
export function GlobalReach() {
  return (
    <section
      id="global-reach"
      aria-labelledby="global-reach-heading"
      className="relative isolate overflow-hidden scroll-mt-28 bg-navy-950"
    >
      <Image
        src="/images/hero/LondonCityInvestment.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover object-[50%_60%]"
      />
      {/* Overlay deep enough for white type across the whole frame. */}
      <div aria-hidden className="absolute inset-0 bg-navy-950/45" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/20 to-navy-950/70"
      />

      {/* Understated connectivity: a few arcs and nodes, nothing more. */}
      <svg
        aria-hidden
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <g fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1">
          <path d="M-20 300 Q 300 80 700 170 T 1460 110" />
          <path d="M-20 170 Q 420 330 820 250 T 1460 300" />
        </g>
        {[
          [180, 196],
          [700, 170],
          [1100, 128],
          [1320, 232],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#ffffff" fillOpacity="0.55" />
        ))}
      </svg>

      <div className="relative mx-auto w-full max-w-[1260px] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span aria-hidden className="h-px w-7 bg-white/40 sm:w-10" />
            <p className="text-[10px] font-medium tracking-[0.22em] text-white/80 sm:text-[11px] sm:tracking-[0.26em]">
              OUR GLOBAL REACH
            </p>
            <span aria-hidden className="h-px w-7 bg-white/40 sm:w-10" />
          </div>

          <h2
            id="global-reach-heading"
            className="mt-5 font-serif text-[clamp(1.875rem,4.6vw,3.5rem)] leading-[1.08] tracking-[-0.015em] text-white"
          >
            Our Global Reach
          </h2>

          <p className="mt-4 text-[0.9375rem] text-white/75 sm:text-base">
            Strategic locations. Global connections. Local expertise.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
          {OFFICES.map((office) => (
            <li key={office.city}>
              <div className="flex h-full flex-col items-center rounded-xl border border-white/18 bg-white/8 px-5 py-7 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/35 hover:bg-white/12 motion-reduce:transition-none">
                <span
                  aria-hidden
                  className="flex size-12 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25"
                >
                  <Phone className="size-5" />
                </span>

                <a
                  href={office.tel}
                  aria-label={`Call our ${office.city} office on ${office.phone}`}
                  className="mt-5 text-[1.0625rem] font-medium text-white transition-colors hover:text-white/80 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-lg"
                >
                  {office.phone}
                </a>

                <span className="mt-4 w-full rounded-md bg-brand px-4 py-2 text-[0.8125rem] font-medium tracking-[0.06em] text-white">
                  {office.city.toUpperCase()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
