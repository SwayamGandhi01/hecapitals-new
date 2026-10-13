export type Office = {
  city: string;
  /** Number exactly as the company publishes it. */
  phone: string;
  /** tel: target, digits only. */
  tel: string;
  /** Marker position on the equirectangular world map, in percent. */
  map: { x: number; y: number };
  /** Which side the map label sits on, to stop London and Frankfurt colliding. */
  labelSide: "left" | "right" | "above" | "below";
};

/**
 * Offices and numbers exactly as published in the footer of
 * hecapitalmarkets.com, read from its markup on 2026-10-13.
 *
 * NOTE: Frankfurt is published with a +1 (North American) dialling code and a
 * tel: target of 0012707769191. That looks like an error on the live site for
 * a German office, but it is reproduced verbatim here rather than "corrected"
 * to a guess. Worth confirming with the client.
 *
 * Map coordinates are the office longitude/latitude run through the same
 * equirectangular projection as public/images/world-map.svg
 * (x = 720 + lon*4, y = 380 - lat*4, over a 1440x760 viewBox).
 */
export const OFFICES: readonly Office[] = [
  {
    city: "Vancouver",
    phone: "+1 604-288-2651",
    tel: "tel:0016042882651",
    map: { x: 15.8, y: 24.1 },
    // Centred under its marker. Left-aligned pushes it off the left edge of
    // the narrow mobile map.
    labelSide: "below",
  },
  {
    city: "New York",
    phone: "+1 718-578-4120",
    tel: "tel:0017185784120",
    map: { x: 29.4, y: 28.6 },
    // Right of its marker, so it clears Vancouver.
    labelSide: "right",
  },
  {
    city: "London",
    phone: "+44 207 096 0125",
    tel: "tel:00442070960125",
    map: { x: 50.0, y: 22.9 },
    labelSide: "above",
  },
  {
    city: "Frankfurt",
    phone: "+1 270-7769-191",
    tel: "tel:0012707769191",
    map: { x: 52.4, y: 23.6 },
    labelSide: "right",
  },
] as const;

export type FooterLink = { label: string; href: string };

/** Sector labels as the live footer lists them. */
export const FOOTER_SECTORS: readonly FooterLink[] = [
  { label: "Cannabis", href: "/sectors#cannabis" },
  // The company lists Oil & Gas as a sector but it is not one of the six on
  // the homepage, and no verified copy for it exists in this project, so it
  // points at the sectors index rather than an anchor that is not there.
  { label: "Oil & Gas", href: "/sectors" },
  { label: "Block Chain", href: "/sectors#blockchain" },
  { label: "Mining", href: "/sectors#mining" },
  { label: "Pharmaceuticals", href: "/sectors#pharmaceuticals" },
  { label: "Technology", href: "/sectors#technology" },
];

export const FOOTER_SERVICES: readonly FooterLink[] = [
  { label: "Investor Relations", href: "/services#investor-relations" },
  { label: "Public Relations", href: "/services#public-relations" },
  { label: "Digital & Social Media", href: "/services#digital-social-media" },
];

export const FOOTER_ABOUT: readonly FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/#clients" },
  { label: "Office Locations", href: "/#global-reach" },
  { label: "Press Releases", href: "/#press-releases" },
];

/** Legal strings, verbatim from the live site's copyright bar. */
export const FOOTER_LEGAL = {
  copyright: "© 2019 HE Capital Markets Ltd. All Rights Reserved.",
  registration: "Company Registration Number: 11959029",
  address:
    "HE Capital Markets Ltd, News Building, 3 London Bridge Street, London, SE1 9SG, UK",
  credit: { label: "Design & Developed By Amix", href: "https://amixconsulting.co.uk" },
} as const;

export const FOOTER_INTRO =
  "Connecting innovative companies with global investors through strategic investor relations, public relations, and digital communications.";
