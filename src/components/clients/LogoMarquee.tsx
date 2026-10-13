import { existsSync } from "node:fs";
import path from "node:path";

import Image from "next/image";
import type { CSSProperties } from "react";

import type { ClientLogo } from "@/lib/client-logos";

/**
 * Build-time check for each logo file. Server component, so this costs nothing
 * at runtime and a dropped-in file is picked up on the next build.
 */
const CLIENTS_DIR = path.join(process.cwd(), "public", "images", "client-logos");
const hasFile = (file: string) => existsSync(path.join(CLIENTS_DIR, file));

/**
 * One cell per logo, tiling edge to edge so the separators read as a
 * continuous row. Cells are white rather than the reference's grey: ten of the
 * twelve supplied logos are opaque #ffffff tiles, so a grey cell would frame
 * each of them in a visible white rectangle.
 */
const CELL =
  "flex h-[86px] w-[150px] shrink-0 items-center justify-center border-r border-ink/10 bg-white px-5 sm:h-[96px] sm:w-[172px] lg:h-[104px] lg:w-[190px]";

function LogoItem({ logo, decorative }: { logo: ClientLogo; decorative: boolean }) {
  const src = `/images/client-logos/${logo.file}`;

  const mark = (
    <span className="relative block h-full w-full">
      {hasFile(logo.file) ? (
        <Image
          src={src}
          alt={decorative ? "" : logo.name}
          aria-hidden={decorative || undefined}
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 172px, 190px"
          className="object-contain"
        />
      ) : (
        // Provisional: the real file is not in the project yet. Deliberately
        // plain type, never an approximation of the company's mark.
        <span
          aria-hidden={decorative || undefined}
          className="flex h-full w-full items-center justify-center text-center text-[11px] font-medium leading-tight text-ink/45"
        >
          {logo.name}
        </span>
      )}
    </span>
  );

  return (
    <li className="flex shrink-0">
      {logo.url ? (
        <a
          href={logo.url}
          target="_blank"
          rel="noopener noreferrer"
          // The duplicate copy exists only to close the loop: keep it out of
          // the tab order and the accessibility tree so each company is one
          // stop, announced once.
          tabIndex={decorative ? -1 : undefined}
          aria-hidden={decorative || undefined}
          aria-label={decorative ? undefined : `${logo.name} (opens in a new tab)`}
          // The whole cell is the hit area. Only the cell tints on hover --
          // the mark itself is never dimmed, scaled or recoloured.
          className={`${CELL} cursor-pointer py-4 transition-colors duration-300 hover:bg-[#eef3fa] focus:outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand`}
        >
          {mark}
        </a>
      ) : (
        <div className={`${CELL} py-4`}>{mark}</div>
      )}
    </li>
  );
}

/**
 * Infinite logo strip.
 *
 * Pure CSS: the track holds two identical copies and translates by exactly
 * -50%, which is one full sequence, so the loop is seamless with no JavaScript
 * timer and no React state. That also lets this stay a server component.
 *
 * Under `prefers-reduced-motion` the animation stops and the track wraps into
 * a centred static row, with the duplicate copy hidden (see globals.css).
 */
export function LogoMarquee({
  logos,
  direction,
  durationSeconds,
  label,
}: {
  logos: readonly ClientLogo[];
  /** "ltr" moves content left-to-right; "rtl" moves it right-to-left. */
  direction: "ltr" | "rtl";
  /**
   * Seconds for one full cycle. Giving the two strips slightly different
   * values reads as depth, rather than one block sliding in both directions.
   * Defaults to roughly five seconds per logo.
   */
  durationSeconds?: number;
  label: string;
}) {
  const duration = `${durationSeconds ?? logos.length * 5}s`;

  return (
    // No edge fade: the reference clips the cells against the card's rounded
    // corners, which the parent's overflow-hidden handles.
    <div className="he-marquee group relative overflow-hidden bg-white">
      <div
        className={`he-marquee-track flex w-max items-stretch ${
          direction === "ltr" ? "he-marquee-ltr" : "he-marquee-rtl"
        }`}
        // A custom property rather than animation-duration directly, so the
        // reduced-motion rule in globals.css can scale it without !important.
        style={{ "--he-marquee-duration": duration } as CSSProperties}
      >
        <ul aria-label={label} className="flex items-stretch">
          {logos.map((logo) => (
            <LogoItem key={logo.file} logo={logo} decorative={false} />
          ))}
        </ul>
        {/* Second copy completes the loop. Hidden from assistive tech so names
            are not announced twice, and removed entirely under reduced
            motion, where the track becomes a static wrapped row. */}
        <ul aria-hidden className="he-marquee-dup flex items-stretch">
          {logos.map((logo) => (
            <LogoItem key={`dup-${logo.file}`} logo={logo} decorative />
          ))}
        </ul>
      </div>
    </div>
  );
}
