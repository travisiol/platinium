export const siteConfig = {
  name: "PLATINIUM",
  // Ticker not finalized yet — swap this one string once it is.
  ticker: "$PLATINIUM",
  tagline: "TRADE MEMES. STACK PLATINUM.",
  altTagline: "The memecoin that rewards in platinum.",
  description:
    "A Robinhood Chain memecoin designed around a simple idea: trading activity helps fund transparent platinum rewards and reserves.",
  seoDescription:
    "A platinum-focused memecoin experiment built for Robinhood Chain.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://platinium.example",
  x: "https://x.com/platinium_onchain",
} as const;

/**
 * Launch / integration surface. None of these are confirmed live values —
 * everything here is either "not yet configured" or sourced from public
 * research that still needs to be reconfirmed against official docs before
 * go-live. See README for details. Do not treat any address below as
 * verified — they are wired through env vars precisely so nothing here
 * ends up hardcoded and shipped by accident.
 */
/** Treats both "unset" and "" the same way: not configured yet. */
function envOrNull(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

export const launchConfig = {
  isLive: process.env.NEXT_PUBLIC_PLATINIUM_LIVE === "true",
  tokenAddress: envOrNull(process.env.NEXT_PUBLIC_PLATINIUM_TOKEN_ADDRESS),
  treasuryAddress: envOrNull(
    process.env.NEXT_PUBLIC_PLATINIUM_TREASURY_ADDRESS,
  ),
  ponsLaunchUrl: envOrNull(process.env.NEXT_PUBLIC_PLATINIUM_PONS_URL),
  buyUrl: envOrNull(process.env.NEXT_PUBLIC_PLATINIUM_BUY_URL),
  platinumAssetDescription: envOrNull(
    process.env.NEXT_PUBLIC_PLATINIUM_ASSET,
  ),
} as const;

export const pons = {
  name: "PONS",
  homepage: "https://ponslaunchpad.com/",
  // Contract addresses for the PONS factory/router are intentionally NOT
  // hardcoded here. Automated research surfaced candidate addresses whose
  // provenance could not be independently verified in this session — do not
  // trust them. Confirm current, audited addresses directly from PONS's own
  // documentation/app before wiring any live launch logic, then set them
  // via env vars.
  factoryAddress: envOrNull(process.env.NEXT_PUBLIC_PONS_FACTORY_ADDRESS),
} as const;
