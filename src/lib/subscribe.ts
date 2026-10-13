export type SubscribeResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid" | "failed" };

/**
 * Basic RFC-shaped check. Deliberately permissive -- the authoritative test is
 * whether the provider accepts the address.
 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * ---------------------------------------------------------------------------
 * NEWSLETTER INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * This project has no newsletter backend. The live hecapitalmarkets.com site
 * does not expose a subscription endpoint either, so there is nowhere to send
 * an address.
 *
 * Rather than accept a submission and silently drop it, this returns
 * `not-configured` and the form tells the visitor to email the company
 * directly. Nothing is collected and no success message is ever shown.
 *
 * To switch it on, replace the body below with a call to the real provider
 * (Mailchimp, HubSpot, a route handler, …) and return `{ ok: true }` only once
 * that call has actually succeeded. Nothing else in the UI needs to change.
 */
export async function subscribeToNewsletter(
  email: string,
): Promise<SubscribeResult> {
  if (!isValidEmail(email)) return { ok: false, reason: "invalid" };
  return { ok: false, reason: "not-configured" };
}
