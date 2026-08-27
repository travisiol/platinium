"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { demoRewardEvents, type RewardEvent } from "@/lib/data";
import { DemoBadge } from "./ui/DemoBadge";

function PlatinumIcon() {
  return (
    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
      <Image
        src="/platinium-coin.png"
        alt=""
        aria-hidden
        fill
        className="scale-[1.15] object-cover"
      />
    </div>
  );
}

function RewardCard({ event }: { event: RewardEvent }) {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-plat-500/25 bg-ink-elevated/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <PlatinumIcon />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ice/70">
              PLATINIUM
            </p>
            <p className="text-[11px] text-ice/45">Platinum reward received</p>
          </div>
        </div>
        <DemoBadge label="Preview" />
      </div>
      <p className="mt-3 font-mono text-2xl text-plat-300">
        +${event.amountUsd.toFixed(2)}{" "}
        <span className="text-base text-plat-500/70">{event.asset}</span>
      </p>
    </div>
  );
}

/**
 * Reusable reward-notification component, styled like a modern brokerage
 * push notification. Intended to (a) later bind to real reward events once
 * the platinum mechanism is live, and (b) work well as a standalone
 * screenshot for social. Always carries a visible "Preview" badge while
 * running on demo data — never remove the badge to make demo output look
 * real.
 */
export function PlatinumToast({ event }: { event: RewardEvent }) {
  return <RewardCard event={event} />;
}

export function PlatinumToastShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % demoRewardEvents.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const event = demoRewardEvents[index];

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.98 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <RewardCard event={event} />
        </motion.div>
      </AnimatePresence>
      <p className="max-w-sm text-center text-xs text-ice/40">
        Illustrative preview only — no reward mechanism is live yet. This
        will connect to real reward events once PLATINIUM launches and the
        platinum mechanism goes live.
      </p>
    </div>
  );
}
