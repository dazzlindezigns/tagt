/**
 * Online giving. The form collects the gift details; payment happens on the processor's own
 * secure page, so card numbers never touch this website.
 *
 * NOT CONNECTED YET: the processor (Stripe or Zeffy) is Dani's decision (docs/DECISIONS.md, Q1),
 * and the build prompt says to ask before choosing one. Until it is chosen and set up,
 * `startCheckout` returns null and the page points people to the current giving page (ShelbyNext).
 */
export type GiftRequest = {
  amountCents: number;
  fund: string;
  frequency: string;
  coverFee: boolean;
  name: string;
  email: string;
};

export function givingConnected(): boolean {
  return false;
}

/** Returns the processor's checkout URL, or null when online giving isn't connected. */
export async function startCheckout(gift: GiftRequest): Promise<string | null> {
  void gift;
  return null;
}
