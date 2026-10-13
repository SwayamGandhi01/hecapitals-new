import Image from "next/image";

/** Natural size of the supplied artwork. */
const GLOBE = {
  src: "/images/he-capital-markets-globe.png",
  width: 1312,
  height: 1199,
};

/**
 * The introduction's visual anchor: the supplied globe artwork, used as-is.
 *
 * The artwork already contains the sphere, continents, network arcs, skyline,
 * lighting and clouds, so nothing is drawn on top of it -- no SVG globe, no
 * blend mode, no blue wash. Earlier versions composited those layers
 * themselves; doing that over this image would only dull it.
 *
 * The one treatment it does need: the file is opaque RGB (no alpha) and its
 * edges are pale blue (#c6def4 top, #d1e3f3 right), not white, so against the
 * white page it would show a rectangular boundary. All four edges are
 * feathered. The right edge matters on mobile, where the whole image is on
 * screen; on desktop that fade falls beyond the viewport, so it costs nothing.
 * Every fade starts outside the sphere, so no geography or cloud detail is lost.
 */
export function GlobeVisual({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${GLOBE.width} / ${GLOBE.height}` }}
    >
      <Image
        src={GLOBE.src}
        alt="Globe showing an international financial network, with a city skyline rising from the Americas"
        fill
        sizes="(max-width: 1024px) 92vw, 50vw"
        quality={82}
        className="object-contain"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 5%, #000 93%, transparent 100%), linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 5%, #000 93%, transparent 100%), linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </div>
  );
}
