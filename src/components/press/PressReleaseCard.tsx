import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { PressRelease } from "@/lib/press-releases";

/**
 * Horizontal press-release card: copy left, editorial image right.
 *
 * Only "Read More" is a link. It carries a stretched overlay (`after:absolute
 * after:inset-0`) so the whole card is clickable while remaining a single tab
 * stop with one accessible name -- the circular arrow over the image is
 * decorative and deliberately not a second link, which would duplicate the
 * destination in the tab order.
 */
export function PressReleaseCard({ release }: { release: PressRelease }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-brand/12 bg-white shadow-[0_14px_36px_-26px_rgba(13,30,62,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(13,30,62,0.4)] focus-within:ring-2 focus-within:ring-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:flex-row">
      {/* z-10 keeps the copy above the decorative curve, which is opaque and
              reaches ~40px into this column -- without it the curve paints
              over the last few characters of each line. min-w-0 is defensive:
              a flex child defaults to min-width:auto. */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.12em]">
          <time dateTime={release.isoDate} className="text-brand">
            {release.date.toUpperCase()}
          </time>
          <span aria-hidden className="text-ink/20">
            |
          </span>
          <span className="text-ink-muted">{release.category.toUpperCase()}</span>
        </div>

        <h3 className="mt-4 font-serif text-[1.375rem] leading-[1.25] tracking-[-0.01em] text-ink sm:text-[1.5rem]">
          {release.title}
        </h3>

        <p className="mt-4 text-[0.875rem] leading-[1.7] text-ink-muted">
          {release.excerpt}
        </p>

        <a
          href={release.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more: ${release.title} (opens in a new tab)`}
          className="mt-auto inline-flex w-fit items-center gap-2 border-b border-brand/40 pb-1 pt-6 text-sm font-medium text-brand transition-colors hover:border-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand after:absolute after:inset-0 after:content-['']"
        >
          Read More
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </a>
      </div>

      {/* Image side, with the reference's pale curved shape behind it. */}
      <div className="relative shrink-0 p-6 sm:w-[44%] sm:p-5 sm:pl-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-10 hidden w-[72%] rounded-l-[120px] bg-[#eef4fc] sm:block"
        />
        <div className="relative h-52 overflow-hidden rounded-[16px] sm:h-full sm:min-h-[232px]">
          <Image
            src={release.image}
            alt={release.imageAlt}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 290px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: release.imagePosition }}
          />
          <span
            aria-hidden
            className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white text-brand shadow-[0_6px_16px_-6px_rgba(13,30,62,0.5)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
