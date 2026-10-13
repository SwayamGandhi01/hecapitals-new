export type PressRelease = {
  id: string;
  /** Machine-readable date for <time dateTime>. */
  isoDate: string;
  /** Display date. */
  date: string;
  /** Short sector label. */
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  imagePosition: string;
  /** The live article on hecapitalmarkets.com. */
  href: string;
};

/**
 * The press releases HE Capital Markets publishes.
 *
 * Titles, excerpts, article URLs and images are taken verbatim from the
 * company's own homepage carousel and /blog/ index, confirmed on 2026-10-13.
 * The site carries exactly these two -- no others appear in either listing --
 * so the section renders them as a pair rather than inventing slides.
 *
 * Dates are the ones stated inside each release's own opening sentence
 * ("February 28, 2022" and "Friday, February 11th, 2022"), not added here.
 * The category labels come from the supplied design reference; the source
 * markup carries no category field.
 *
 * "Surgeover" in the second title is the company's own spelling and is kept
 * as published.
 */
export const PRESS_RELEASES: readonly PressRelease[] = [
  {
    id: "opawica",
    isoDate: "2022-02-28",
    date: "February 28, 2022",
    category: "Mining",
    title:
      "Opawica Intercepts Visible Gold “Again” & Completes 4,742M Of Drilling At Bazooka",
    excerpt:
      "Vancouver, B.C. – February 28, 2022 – Opawica Explorations Inc. (TSXV: OPW) (FSE: A2PEAD) (OTC: OPWEF) (the “Company” or “Opawica”) is pleased to provide an update …",
    image: "/images/press/opawica-mining.jpg",
    imageAlt: "Open-pit mine with haul roads and excavation machinery",
    imagePosition: "50% 50%",
    href: "https://www.hecapitalmarkets.com/opawica-intercepts-visible-gold/",
  },
  {
    id: "boosh",
    isoDate: "2022-02-11",
    date: "February 11, 2022",
    category: "Consumer Brands",
    title: "Boosh Revenues Surgeover 4,500% On Acquisition of Beanfields",
    excerpt:
      "Boosh Plant-Based Brands Inc. (“Boosh” or the “Company”) (CSE:VEGI; OTCQB: VGGIF: Frankfurt: 77i) announced on Friday, February 11th, 2022 that it executed an asset purchase agreement …",
    image: "/images/press/boosh-growth.jpg",
    imageAlt: "Rising financial growth chart displayed above a tablet",
    imagePosition: "50% 50%",
    href: "https://www.hecapitalmarkets.com/boosh-revenues-surge/",
  },
] as const;

export const PRESS_COPY = {
  eyebrow: "PRESS RELEASES",
  heading: "Press Releases",
  subtitle: "Keep Up To Date With All The Latest Global Press Releases",
} as const;
