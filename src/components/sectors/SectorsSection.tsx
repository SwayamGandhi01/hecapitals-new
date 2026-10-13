import { SectorCard } from "@/components/sectors/SectorCard";
import { Reveal } from "@/components/Reveal";
import { SECTORS, SECTORS_COPY } from "@/lib/sectors";

export function SectorsSection() {
  return (
    <section
      aria-labelledby="sectors-heading"
      className="relative overflow-hidden bg-white px-6 py-18 sm:px-8 sm:py-22 lg:px-10 lg:py-28"
    >
      {/* Two very faint washes so the cards sit on a surface rather than a
          flat sheet. Nothing here should be readable as a shape. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(58rem_32rem_at_50%_-12%,#e4effb_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-[#f4f8fd]"
      />

      <div className="relative mx-auto w-full max-w-[1260px]">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span aria-hidden className="h-px w-7 bg-brand/45 sm:w-11" />
            <p className="text-[10px] font-medium tracking-[0.2em] text-brand sm:text-[11px] sm:tracking-[0.26em]">
              {SECTORS_COPY.eyebrow}
            </p>
            <span aria-hidden className="h-px w-7 bg-brand/45 sm:w-11" />
          </div>

          <h2
            id="sectors-heading"
            className="mt-6 font-serif text-[clamp(1.75rem,3.6vw,2.875rem)] leading-[1.12] tracking-[-0.015em] text-ink"
          >
            {SECTORS_COPY.heading}
          </h2>

          <p className="mx-auto mt-5 max-w-[38rem] text-[0.9375rem] leading-[1.7] text-ink-muted">
            {SECTORS_COPY.subtitle}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 xl:grid-cols-3 xl:gap-7">
          {SECTORS.map((sector, i) => (
            <Reveal as="li" key={sector.id} delay={i * 70} className="flex">
              <div className="w-full">
                <SectorCard sector={sector} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
