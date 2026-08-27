"use client";

import { clsx } from "clsx";
import { launchConfig, siteConfig } from "@/lib/site-config";

export function BuyButton({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: "primary" | "secondary";
}) {
  if (launchConfig.isLive && launchConfig.buyUrl) {
    return (
      <a
        href={launchConfig.buyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "inline-flex items-center justify-center rounded-full bg-plat-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-plat-300",
          className,
        )}
      >
        Buy {siteConfig.ticker}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled
      title="PLATINIUM has not launched on PONS yet. This button will route to the live trading pair once it exists."
      className={clsx(
        "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition",
        variant === "primary"
          ? "border border-plat-500/40 bg-white/5 text-plat-300/70"
          : "border border-line text-ice/50",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-plat-500/60" />
      PLATINIUM Not Live Yet
    </button>
  );
}
