import { PressReleaseCard } from "@/components/press/PressReleaseCard";
import { Reveal } from "@/components/Reveal";
import { PRESS_COPY, PRESS_RELEASES } from "@/lib/press-releases";

export function PressReleasesSection() {
  return (
    <section
      id="press-releases"
      aria-labelledby="press-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#f6f9fd] px-6 py-18 sm:px-8 sm:py-22 lg:px-10 lg:py-26"
    >
      {/* Existing coastline asset as the pale map texture, faded at the edges
          so it never sits under the cards at readable contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/images/world-map.svg')] bg-[length:132%_auto] bg-center bg-no-repeat opacity-[0.07]"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 62% at 50% 42%, #000 0%, rgba(0,0,0,0.45) 60%, transparent 88%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 62% at 50% 42%, #000 0%, rgba(0,0,0,0.45) 60%, transparent 88%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span aria-hidden className="h-px w-7 bg-brand/45 sm:w-10" />
            <p className="text-[10px] font-medium tracking-[0.2em] text-brand sm:text-[11px] sm:tracking-[0.24em]">
              {PRESS_COPY.eyebrow}
            </p>
            <span aria-hidden className="h-px w-7 bg-brand/45 sm:w-10" />
          </div>

          <h2
            id="press-heading"
            className="mt-5 font-serif text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-ink"
          >
            {PRESS_COPY.heading}
          </h2>

          <p className="mt-4 text-[1rem] leading-[1.6] text-ink-muted">
            {PRESS_COPY.subtitle}
          </p>
        </Reveal>

        {/* The company publishes exactly two releases, so this is a plain
            two-up grid. No carousel controls: there is nothing to page
            through, and decorative ones that do nothing would be worse. */}
        <ul className="mt-12 grid gap-6 lg:mt-14 xl:grid-cols-2 xl:gap-7">
          {PRESS_RELEASES.map((release, i) => (
            <Reveal as="li" key={release.id} delay={i * 90} className="flex">
              <div className="w-full">
                <PressReleaseCard release={release} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
