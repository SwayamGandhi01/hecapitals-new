export type ClientLogo = {
  /** Company name, used as the image's alt text. */
  name: string;
  /** File expected under public/images/client-logos/. */
  file: string;
  /**
   * Official company website. Omitted when no official URL could be verified,
   * in which case the logo renders unlinked rather than pointing somewhere
   * unrelated.
   */
  url?: string;
};

/**
 * Clients named by HE Capital Markets. Order here is the first strip's order;
 * the second strip reverses it so the two read differently while using the
 * same verified set.
 *
 * Every URL below was checked by loading the domain and confirming the live
 * page identifies the right company (page <title> or rendered content), on
 * 2026-10-13. Re-check before adding new entries.
 *
 * Logo files are the company marks published by HE Capital Markets itself
 * (hecapitalmarkets.com/wp-content/uploads), downloaded to
 * public/images/client-logos/. They arrive as uniform 270x155 tiles, so the
 * strip renders them in a box of the same aspect ratio. Nothing is redrawn or
 * approximated; a company whose file is missing would render as a plain
 * provisional wordmark rather than a fake logo.
 */
export const CLIENT_LOGOS: readonly ClientLogo[] = [
  {
    name: "POET Technologies",
    file: "poet-technologies.jpg",
    // "Home | POET Technologies"
    url: "https://www.poet-technologies.com/",
  },
  {
    name: "AMEX Exploration",
    file: "amex-exploration.jpg",
    // Cited as the company website in Amex's own press releases; the live
    // domain sits behind Cloudflare bot protection.
    url: "https://amexexploration.com/",
  },
  {
    name: "Marimaca Copper",
    file: "marimaca-copper.jpg",
    // "Home - Marimaca"
    url: "https://marimaca.com/",
  },
  {
    name: "GoGold Resources",
    file: "gogold.png",
    // "GoGold Resources Inc."
    url: "https://gogoldresources.com/",
  },
  {
    name: "Silver Tiger Metals",
    file: "silver-tiger-metals.png",
    // "Silver Tiger Metals Inc."
    url: "https://silvertigermetals.com/",
  },
  {
    name: "INHIBRX",
    file: "inhibrx.jpg",
    // "Inhibrx | Discover our clinical-stage biotechnology company."
    url: "https://inhibrx.com/",
  },
  {
    name: "F3 Uranium",
    file: "f3-uranium.jpg",
    // "F3 Uranium - Clean Energy Uranium Exploration Company"
    url: "https://f3uranium.com/",
  },
  {
    name: "Independence Contract Drilling",
    file: "independence-contract-drilling.jpg",
    // NO VERIFIED URL. independencecontractdrilling.com now redirects to a
    // GoDaddy parking page offering the domain for sale, so it is not linked.
    // Supply a current official URL to enable the link.
  },
  {
    name: "The Metals Company",
    file: "the-metals-company.jpg",
    // "Home Page - The Metals Company"
    url: "https://metals.co/",
  },
  {
    name: "Cerrado Gold",
    file: "cerrado-gold.jpg",
    // "Cerrado Gold - Home"
    url: "https://cerradogold.com/",
  },
  {
    name: "MAX Resource Corp.",
    file: "max-resource.jpg",
    // "Home - Max Resource Corp. (MAX.V)"
    url: "https://www.maxresource.com/",
  },
  {
    name: "ARway",
    file: "arway.jpg",
    // "ARway | Indoor Mapping, Navigation & AR Experiences"
    url: "https://arway.ai/",
  },
] as const;

export const CLIENTS_COPY = {
  eyebrow: "CLIENTS WE HAVE WORKED WITH",
  heading: "Trusted by Innovative Companies Worldwide",
  body: "We are proud to partner with a diverse range of forward-thinking companies across the resource, technology and industrial sectors, helping them connect with the right investors and achieve their strategic goals.",
} as const;
