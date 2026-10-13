/** Contact details as supplied for the HE Capital Markets site. */
export const CONTACT = {
  address: [
    "News Building",
    "3 London Bridge Street",
    "London, SE1 9SG",
    "United Kingdom",
  ],
  phone: { label: "+44 20 7096 0125", href: "tel:+442070960125" },
  email: {
    label: "info@hecapitalmarkets.com",
    href: "mailto:info@hecapitalmarkets.com",
  },
} as const;

/**
 * Official social profiles. Intentionally empty: no verified profile URLs have
 * been supplied, and the menu renders this section only when it is non-empty,
 * rather than linking somewhere invented.
 */
export const SOCIAL_LINKS: readonly { label: string; href: string }[] = [];

/**
 * Legal pages, rendered only once the routes actually exist. `/privacy` and
 * `/terms` have not been built, so the footer row stays hidden.
 */
export const LEGAL_LINKS: readonly { label: string; href: string }[] = [];
