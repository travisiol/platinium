"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { motion, useMotionValue } from "framer-motion";

const AUTO_SPIN_DEG_PER_SEC = 22;
const WIDTH = 200;
const HEIGHT = 312;
const DEPTH = 22;

const FACE_GRADIENT =
  "linear-gradient(160deg, #F5F7F9 0%, #D8DEE3 22%, #94A1AC 50%, #E7ECEF 72%, #7C8791 100%)";
const EDGE_GRADIENT = "linear-gradient(90deg, #6B7680 0%, #B8C2CC 50%, #6B7680 100%)";

function Engraving() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <span
        className="font-serif text-black/40"
        style={{ fontSize: WIDTH * 0.42, lineHeight: 1, textShadow: "0 1px 0 rgba(255,255,255,0.35)" }}
      >
        P
      </span>
      <span
        className="font-medium tracking-[0.3em] text-black/35"
        style={{ fontSize: WIDTH * 0.065 }}
      >
        PLATINUM
      </span>
    </div>
  );
}

/**
 * A real 3D CSS bar: six actual faces (front / back / four thin edges)
 * arranged with `transform-style: preserve-3d` and per-face `translateZ`,
 * not a flat image. Sits on the page's own dark background with no image
 * asset — no black backdrop artifact, and the edges genuinely appear as it
 * spins, unlike a flat card that just flips between two identical faces. No
 * WebGL / 3D library, just CSS transforms.
 *
 * Spins on its own; dragging left/right takes over the rotation directly,
 * and auto-spin resumes from wherever it was released.
 */
export function PlatinumBar() {
  const rotateY = useMotionValue(-24);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const delta = now - last;
      last = now;
      if (!draggingRef.current) {
        rotateY.set(rotateY.get() + (AUTO_SPIN_DEG_PER_SEC * delta) / 1000);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotateY]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    rotateY.set(rotateY.get() + e.movementX * 0.6);
  }

  function handlePointerUp() {
    draggingRef.current = false;
    setIsDragging(false);
  }

  const hw = WIDTH / 2;
  const hh = HEIGHT / 2;
  const hd = DEPTH / 2;

  return (
    <div className="relative mx-auto flex w-full max-w-[280px] flex-col items-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(184,194,204,0.28), transparent 75%)",
        }}
      />

      <div style={{ perspective: 1400, width: WIDTH, height: HEIGHT }}>
        <motion.div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            rotateY,
            rotateX: -8,
            transformStyle: "preserve-3d",
            width: WIDTH,
            height: HEIGHT,
          }}
          className={clsx(
            "relative touch-none",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
        >
          {/* front */}
          <div
            className="absolute inset-0 rounded-[10px]"
            style={{
              background: FACE_GRADIENT,
              transform: `translateZ(${hd}px)`,
              boxShadow:
                "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -12px 22px rgba(0,0,0,0.25)",
            }}
          >
            <Engraving />
          </div>

          {/* back */}
          <div
            className="absolute inset-0 rounded-[10px]"
            style={{
              background: FACE_GRADIENT,
              transform: `rotateY(180deg) translateZ(${hd}px)`,
              boxShadow:
                "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -12px 22px rgba(0,0,0,0.25)",
            }}
          >
            <Engraving />
          </div>

          {/* right edge */}
          <div
            className="absolute"
            style={{
              width: DEPTH,
              height: HEIGHT,
              left: hw - hd,
              top: 0,
              background: EDGE_GRADIENT,
              transform: `rotateY(90deg) translateZ(${hw}px)`,
            }}
          />

          {/* left edge */}
          <div
            className="absolute"
            style={{
              width: DEPTH,
              height: HEIGHT,
              left: hw - hd,
              top: 0,
              background: EDGE_GRADIENT,
              transform: `rotateY(-90deg) translateZ(${hw}px)`,
            }}
          />

          {/* top edge */}
          <div
            className="absolute"
            style={{
              width: WIDTH,
              height: DEPTH,
              top: hh - hd,
              left: 0,
              background: EDGE_GRADIENT,
              transform: `rotateX(90deg) translateZ(${hh}px)`,
            }}
          />

          {/* bottom edge */}
          <div
            className="absolute"
            style={{
              width: WIDTH,
              height: DEPTH,
              top: hh - hd,
              left: 0,
              background: EDGE_GRADIENT,
              transform: `rotateX(-90deg) translateZ(${hh}px)`,
            }}
          />
        </motion.div>
      </div>

      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.3em] text-ice/30">
        Drag to spin
      </p>
    </div>
  );
}
