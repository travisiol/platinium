import { PlatinumToastShowcase } from "./PlatinumToast";

export function RewardSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-plat-400">
          Reward UX
        </p>
        <h2 className="mt-3 font-serif text-3xl text-ice sm:text-4xl">
          Built to screenshot
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-sm text-ice/55">
          A reusable reward notification, styled like a modern brokerage app.
          Once the platinum mechanism is live, this connects to real reward
          events &mdash; for now it&rsquo;s a labeled preview.
        </p>
      </div>

      <PlatinumToastShowcase />
    </section>
  );
}
