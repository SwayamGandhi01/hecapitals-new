import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

import { HeroBackdrop } from "@/components/hero/HeroBackdrop";
import { HeroIndicators } from "@/components/hero/HeroIndicators";
import { HeroSliderProvider } from "@/components/hero/HeroSliderContext";
import { SERVICES } from "@/lib/services";

export function Hero() {
  return (
    <HeroSliderProvider>
      <section
        aria-labelledby="hero-heading"
        className="relative isolate min-h-[100svh] w-full overflow-hidden bg-navy-950"
      >
        <HeroBackdrop />

        {/* Everything below shares one container with the header, so the
            composition stays aligned out to ultrawide widths. */}
        <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-rows-[1fr_auto] px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:px-8 lg:px-12 xl:px-16">
          {/* Centring in the 1fr row holds the eyebrow near a fifth of the
              viewport on tall screens, and compresses on short ones instead of
              pushing the bottom controls off-screen. */}
          <div className="flex items-center pb-10 pt-28 sm:pb-12 sm:pt-32 lg:pb-6">
            <div className="flex w-full items-center justify-between gap-10">
              {/* Left column — the editorial block. */}
              <div className="max-w-xl lg:max-w-[32rem] xl:max-w-[38rem] 2xl:max-w-[42rem]">
                <div className="flex items-center gap-4">
                  <p className="font-mono text-[11px] tracking-[0.22em] text-white/75">
                    GLOBAL CAPITAL MARKETS ADVISORY
                  </p>
                  <span aria-hidden className="hidden h-px w-10 bg-white/35 sm:block" />
                </div>

                <h1
                  id="hero-heading"
                  className="mt-6 font-serif text-[clamp(2.25rem,5.2vw,4.5rem)] font-normal leading-[1.06] tracking-[-0.015em] text-white"
                >
                  Building market value through strategic consultation.
                </h1>

                <span aria-hidden className="mt-8 block h-px w-28 bg-white/40" />

                <p className="mt-7 max-w-lg text-base leading-relaxed text-body sm:text-[1.0625rem]">
                  Investor relations, capital markets expertise, and strategic
                  communications that help ambitious companies strengthen
                  visibility and connect with investors.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    Discuss Your Goals
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                  >
                    Explore Our Services
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>

                {/* Below xl the right rail would crowd the headline, so the
                    same links fall in under the CTAs instead. */}
                <nav aria-label="Our services" className="mt-10 xl:hidden">
                  <ul className="flex flex-wrap gap-x-6 gap-y-3">
                    {SERVICES.map((service, i) => (
                      <li key={service.href} className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-white/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={service.href}
                          className="text-xs tracking-wide text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                        >
                          {service.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Right column — service index, desktop only. */}
              <nav
                aria-label="Our services"
                className="hidden shrink-0 border-l border-white/25 pl-10 xl:block"
              >
                <ul className="flex flex-col gap-8">
                  {SERVICES.map((service, i) => (
                    <li key={service.href} className="text-right">
                      <span className="block font-mono text-[11px] tracking-[0.2em] text-white/45">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Link
                        href={service.href}
                        className="group mt-1.5 inline-flex items-center gap-3 text-sm text-white/85 transition-colors hover:text-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                      >
                        <span className="h-px w-7 bg-white/40 transition-all duration-300 group-hover:w-12 group-hover:bg-brand-400" />
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom controls, opposite corners of the same container. */}
          <div className="flex items-end justify-between gap-6">
            <a
              href="#approach"
              className="group inline-flex flex-col gap-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="block h-10 w-px bg-white/35 transition-colors group-hover:bg-white/70"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/65 transition-colors group-hover:text-white/95">
                  SCROLL TO EXPLORE
                </span>
              </span>
              <ChevronDown
                className="size-4 text-white/45 transition-colors group-hover:text-white/80"
                aria-hidden
              />
            </a>

            <HeroIndicators />
          </div>
        </div>
      </section>
    </HeroSliderProvider>
  );
}
