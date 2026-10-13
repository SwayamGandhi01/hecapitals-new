import { OFFICES } from "@/lib/footer";

/**
 * Pale world map with the four offices marked.
 *
 * Reuses the project's existing equirectangular coastline asset rather than
 * pulling in a map library. Marker positions are the real office coordinates
 * run through the same projection, so they sit where they should.
 */
export function FooterMap() {
  return (
    <div
      className="relative aspect-[1440/760] w-full"
      role="img"
      aria-label="World map marking HE Capital Markets offices in Vancouver, New York, London and Frankfurt"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/images/world-map.svg')] bg-contain bg-center bg-no-repeat opacity-[0.18]"
      />

      {/* Faint great-circle-ish links between the offices. */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M15.8 24.1 Q 22 18 29.4 28.6 T 50 22.9"
          fill="none"
          stroke="#365fa8"
          strokeOpacity="0.35"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M50 22.9 L 52.4 23.6"
          fill="none"
          stroke="#365fa8"
          strokeOpacity="0.35"
          strokeWidth="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {OFFICES.map((office) => (
        <span
          key={office.city}
          aria-hidden
          className="absolute"
          style={{ left: `${office.map.x}%`, top: `${office.map.y}%` }}
        >
          <span className="absolute -left-1 -top-1 block size-2 rounded-full bg-navy-900 ring-4 ring-navy-900/10" />
          <span
            className={`absolute whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-ink shadow-[0_2px_8px_-2px_rgba(13,30,62,0.35)] ${
              office.labelSide === "above"
                ? "-top-8 left-1/2 -translate-x-1/2"
                : office.labelSide === "below"
                  ? "top-3 left-1/2 -translate-x-1/2"
                  : office.labelSide === "right"
                    ? "left-4 top-2"
                    : "right-4 top-2"
            }`}
          >
            {office.city}
          </span>
        </span>
      ))}
    </div>
  );
}
