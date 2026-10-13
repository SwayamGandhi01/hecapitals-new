/**
 * Build-time generator for the faint world-map texture behind the
 * introduction section.
 *
 * Renders real coastline geometry (Natural Earth via world-atlas) in an
 * equirectangular projection and writes a static SVG, so d3 stays a
 * devDependency and nothing ships to the browser.
 *
 * The globe itself is supplied artwork (public/images/he-capital-markets-globe.png),
 * not generated here -- this script previously also emitted an orthographic
 * globe SVG, which is no longer used.
 *
 * Usage: npm run assets:map
 */
import { writeFileSync, readFileSync } from "node:fs";
import { geoEquirectangular, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const root = process.argv[2] ?? ".";

const topo = JSON.parse(
  readFileSync(`${root}/node_modules/world-atlas/land-110m.json`, "utf8"),
);
const land = feature(topo, topo.objects.land);

const projection = geoEquirectangular()
  .scale(1440 / (2 * Math.PI))
  .translate([720, 380]);
const path = geoPath(projection).digits(1);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 760" width="1440" height="760">
<path d="${path(land)}" fill="#4f7cb5" fill-opacity="0.5"/>
</svg>
`;

const out = `${root}/public/images/world-map.svg`;
writeFileSync(out, svg, "utf8");
console.log("wrote", out, (svg.length / 1024).toFixed(1) + " KB");
