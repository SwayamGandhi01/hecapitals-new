import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Sector } from "@/lib/sectors";

/**
 * Folder-tab sector card.
 *
 * The silhouette is three pieces sharing one panel colour:
 *   1. a short tab across the upper left, rounded on its top corners
 *   2. a concave fillet where the tab's right edge meets the body's top edge,
 *      so the two read as one folded shape instead of a hard step
 *   3. the full-width body, rounded on its top right
 *
 * The fillet is a radial gradient that is transparent inside its arc and panel
 * coloured outside it, which lets the photograph show through the curve. That
 * is why it can be a concave corner at all -- an overlay in a flat colour
 * could not, since what sits behind it is an image.
 *
 * Panel geometry is fixed (the description reserves three lines) so every card
 * in a row shows the same amount of photograph.
 */
export function SectorCard({ sector }: { sector: Sector }) {
  const dark = sector.theme === "dark";

  const panelBg = dark ? "bg-navy-900" : "bg-[#e9f0fa]";
  // Same colour as the panel, for the fillet's gradient.
  const panelHex = dark ? "#17345f" : "#e9f0fa";

  const titleColor = dark ? "text-white" : "text-ink";
  const bodyColor = dark ? "text-white/72" : "text-ink-muted";
  const arrowColor = dark ? "text-white/75" : "text-ink/60";
  const ruleColor = dark ? "bg-white/20" : "bg-ink/12";

  return (
    <Link
      href={sector.href}
      aria-label={`${sector.title}: ${sector.description}`}
      className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[22px] bg-navy-950 ring-1 ring-ink/8 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-28px_rgba(13,30,62,0.5)] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:min-h-[446px]"
    >
      <Image
        src={sector.image}
        alt={sector.imageAlt}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{ objectPosition: sector.imagePosition }}
      />

      {/* Softens the image into the panel rather than cutting it off hard. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/25 to-transparent"
      />

      <div className="relative mt-auto">
        <div className="relative flex items-end">
          {/* 1. tab */}
          <div className={`h-9 w-[58%] rounded-t-[20px] ${panelBg}`} />
          {/* 2. concave fillet joining tab to body. The box must be exactly
                 as wide and tall as the arc radius, and sit on the tab's
                 baseline -- any taller and the wedge squares off into a nub
                 instead of curving. */}
          <div
            aria-hidden
            className="h-5 w-5"
            style={{
              background: `radial-gradient(circle at 100% 0%, transparent 0 20px, ${panelHex} 20px)`,
            }}
          />
        </div>

        {/* 3. body */}
        <div className={`-mt-px rounded-tr-[20px] px-6 pb-7 pt-2 sm:px-7 ${panelBg}`}>
          <div className="flex items-start justify-between gap-4">
            <span
              className={`font-serif text-[2.75rem] leading-none tracking-[-0.02em] ${titleColor}`}
            >
              {sector.number}
            </span>
            <ArrowUpRight
              aria-hidden
              strokeWidth={1.75}
              className={`mt-1.5 size-5 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0 ${arrowColor}`}
            />
          </div>

          <span aria-hidden className={`mt-4 block h-px w-8 ${ruleColor}`} />

          <h3 className={`mt-4 font-serif text-[1.3125rem] leading-snug ${titleColor}`}>
            {sector.title}
          </h3>
          {/* Reserve the worst-case line count per breakpoint, so every panel --
              and therefore every image -- is the same height across a row.
              Four lines in the one- and two-column layouts, three at lg where
              the columns are wide enough. Measured, not guessed. */}
          <p
            className={`mt-2.5 min-h-[5.8rem] text-[0.875rem] leading-[1.65] xl:min-h-[4.4rem] ${bodyColor}`}
          >
            {sector.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
