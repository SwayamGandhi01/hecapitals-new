import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Hero photography is full-bleed; the default 75 is visibly soft on wide
  // displays, so allow the 82 the slider asks for.
  images: {
    qualities: [75, 82],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
