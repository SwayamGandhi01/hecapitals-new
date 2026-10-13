export type SectorTheme = "dark" | "light";

export type Sector = {
  id: string;
  /** Two-digit label shown on the folder panel. */
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** `object-position`, tuned per photograph so the subject survives cropping. */
  imagePosition: string;
  theme: SectorTheme;
  href: string;
};

/**
 * The six sectors HE Capital Markets covers, in the order the site lists them.
 *
 * Photographs are the originals from hecapitalmarkets.com
 * (wp-content/uploads), downloaded to public/images/sectors/. Copy is the
 * company's own wording.
 */
export const SECTORS: readonly Sector[] = [
  {
    id: "mining",
    number: "01",
    title: "Mining",
    description:
      "With the right strategy, you can realise incredible results in this long-established sector.",
    image: "/images/sectors/mining.jpg",
    imageAlt: "Open-pit mine with excavation machinery and terraced earth",
    imagePosition: "50% 45%",
    theme: "dark",
    href: "/sectors#mining",
  },
  {
    id: "technology",
    number: "02",
    title: "Technology",
    description:
      "For results in an ever-evolving industry, we will create an equally innovative communications strategy.",
    image: "/images/sectors/technology.jpg",
    imageAlt:
      "Figures walking through a corridor of blue and cyan digital light trails",
    imagePosition: "50% 40%",
    theme: "light",
    href: "/sectors#technology",
  },
  {
    id: "blockchain",
    number: "03",
    title: "Blockchain",
    description:
      "With the right connections in cryptography, the potential for inspiring investment is almost limitless.",
    image: "/images/sectors/blockchain.jpg",
    imageAlt:
      "Digital fingerprint and padlock over a network of circuit elements",
    imagePosition: "50% 45%",
    theme: "dark",
    href: "/sectors#blockchain",
  },
  {
    id: "psychedelics",
    number: "04",
    title: "Psychedelics",
    description: "Securing investment opportunities in psychedelics.",
    image: "/images/sectors/psychedelics.jpg",
    imageAlt:
      "Researcher using a tablet overlaid with molecular and data graphics",
    imagePosition: "55% 45%",
    theme: "light",
    href: "/sectors#psychedelics",
  },
  {
    id: "pharmaceuticals",
    number: "05",
    title: "Pharmaceuticals",
    description:
      "Put your products in the minds and portfolios of investors dedicated to pharmaceuticals worldwide.",
    image: "/images/sectors/pharmaceuticals.jpg",
    imageAlt:
      "Laboratory pipettes dispensing blue liquid into a sample plate",
    imagePosition: "50% 50%",
    theme: "dark",
    href: "/sectors#pharmaceuticals",
  },
  {
    id: "cannabis",
    number: "06",
    title: "Cannabis",
    description:
      "Expert strategies for achieving the right impact in this unique and constantly expanding market in North America and Europe.",
    image: "/images/sectors/cannabis.jpg",
    imageAlt: "Cannabis leaves behind an upward-trending line graph",
    imagePosition: "50% 50%",
    theme: "light",
    href: "/sectors#cannabis",
  },
] as const;

export const SECTORS_COPY = {
  eyebrow: "SECTORS WE COVER",
  heading: "Sectors We Cover",
  subtitle:
    "We work with companies across a range of investment sectors, tailoring each capital markets programme to the audience it needs to reach.",
} as const;
