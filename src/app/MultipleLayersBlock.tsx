import { Reveal } from "@/app/Reveal";
import { MorningQueueArt } from "@/app/FeatureArt";

const GLIKER = { fontFamily: "var(--font-gliker), system-ui, sans-serif" } as const;

/**
 * "Your morning queue" section.
 *
 * The layered top edge is the spec's trick: a SINGLE clipped inline-SVG of four
 * stacked rounded rects (rx=32, exaggerated height) — pink → red → deep maroon
 * → cream face — each offset further down the y-axis so only their top edges
 * peek as stacked rounded ledges, with the cream rect becoming the card face.
 * The card's own overflow-hidden + 2rem radius clips the bar corners.
 *
 * The bottom is the morning-queue dashboard kept central (matching the
 * "one screen, one verb" story) and flanked by two small floating cards that
 * peek out for depth, echoing the hero's phone trio.
 */

/** Left flank — a tiny auto-sent birthday greeting. */
function MiniGreetingCard() {
  return (
    <div className="rounded-2xl border-2 border-[var(--pom-wine)] bg-[var(--pom-white)] p-3.5 shadow-[0_8px_0_-2px_var(--pom-wine)]">
      <div className="flex items-center gap-2">
        <span
          className="grid h-7 w-7 place-items-center rounded-full bg-[var(--pom-pink)] text-[11px] text-[var(--pom-wine)]"
          style={GLIKER}
        >
          A
        </span>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold text-[var(--pom-wine)]">Aarti</p>
          <p className="text-[10px] text-[var(--pom-wine)]/55">birthday today</p>
        </div>
        <span className="ml-auto rounded-full bg-[var(--pom-wine)] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-[var(--pom-cream)]">
          Auto
        </span>
      </div>
      <div className="mt-2.5 rounded-xl rounded-tl-sm bg-[var(--pom-yellow)] px-2.5 py-2 text-[11px] leading-snug text-[var(--pom-wine)]">
        Happy birthday, Aarti ji! 🎂
      </div>
    </div>
  );
}

/** Right flank — a renewal that just flipped to paid. */
function MiniPaidCard() {
  return (
    <div className="rounded-2xl border-2 border-[var(--pom-wine)] bg-[var(--pom-white)] p-3.5 shadow-[0_8px_0_-2px_var(--pom-wine)]">
      <div className="flex items-center gap-2">
        <span
          className="grid h-7 w-7 place-items-center rounded-full bg-[var(--pom-peach)] text-[11px] text-[var(--pom-wine)]"
          style={GLIKER}
        >
          R
        </span>
        <div className="leading-tight">
          <p className="text-[12px] font-semibold text-[var(--pom-wine)]">Rakesh</p>
          <p className="text-[10px] text-[var(--pom-wine)]/55">Motor · renewal</p>
        </div>
        <span className="ml-auto rounded-full bg-[var(--status-emerald-soft)] px-2 py-0.5 text-[9px] font-semibold text-[var(--status-emerald-ink)]">
          Paid ✓
        </span>
      </div>
      <div className="mt-2.5 flex items-baseline justify-between">
        <span className="text-[10px] text-[var(--pom-wine)]/60">Premium</span>
        <span className="text-[16px] text-[var(--pom-wine)]" style={GLIKER}>
          ₹18,400
        </span>
      </div>
    </div>
  );
}

export function MultipleLayersBlock() {
  return (
    // Outer wrapper carries the side gaps + vertical rhythm at full width; the
    // inner pom-card (max-width + margin:0 auto) then centers itself within it.
    <div className="mx-2 my-10 md:mx-6 md:my-16">
      <section className="pom-card pom-hero-bg relative overflow-hidden border-2 border-[var(--pom-wine)]">
        {/* Layered top edge — clipped SVG of stacked rounded rects. */}
        <svg
          aria-hidden
          className="block h-auto w-full"
          viewBox="0 0 1440 176"
          preserveAspectRatio="xMinYMin meet"
        >
          <rect x="0" y="0" width="1440" height="999" rx="32" fill="var(--pom-pink-deep)" stroke="var(--pom-wine)" strokeWidth="2" />
          <rect x="0" y="67.2" width="1440" height="999" rx="32" fill="var(--pom-red)" stroke="var(--pom-wine)" strokeWidth="2" />
          <rect x="0" y="115.2" width="1440" height="999" rx="32" fill="var(--pom-red-deep)" stroke="var(--pom-wine)" strokeWidth="2" />
          <rect x="0" y="144" width="1440" height="999" rx="32" fill="var(--pom-cream)" stroke="var(--pom-wine)" strokeWidth="2" />
        </svg>

        <div className="relative pb-8 pt-2 md:pb-12 md:pt-4">
          <div className="pom-container text-center">
            <Reveal from="up" amount={14}>
              <span className="pom-tag pom-tag--soft">Your morning queue</span>
            </Reveal>
            <Reveal delay={120} from="up" amount={28}>
              <h1 className="pom-display-xl mt-6 max-w-[1120px] mx-auto text-balance">
                This is what 9am looks like.
              </h1>
            </Reveal>
            <Reveal delay={260} from="up" amount={18}>
              <p className="pom-lead mt-6 max-w-[920px] mx-auto text-pretty">
                Subah ki shubhkamna. One screen, one verb. The queue is already in
                the order you should send it — birthdays, renewals, anniversaries,
                ranked by urgency.
              </p>
            </Reveal>
          </div>

          <Reveal delay={420} duration={900} from="scale" amount={6}>
            <div className="pom-container mt-10 md:mt-14">
              {/* Positioning context = the centered dashboard's own width, so the
                  flank cards anchor to its edges at any screen size. */}
              <div className="relative mx-auto w-full max-w-[760px]">
                {/* Left flank — hangs off the dashboard's left edge. */}
                <div className="pom-flank absolute bottom-10 left-[-176px] z-20 w-[220px] -rotate-[5deg]">
                  <div className="pom-float pom-float--delay-1">
                    <MiniGreetingCard />
                  </div>
                </div>

                {/* Right flank — hangs off the dashboard's right edge. */}
                <div className="pom-flank absolute right-[-176px] top-10 z-20 w-[210px] rotate-[5deg]">
                  <div className="pom-float pom-float--delay-2">
                    <MiniPaidCard />
                  </div>
                </div>

                {/* Central dashboard. */}
                <div className="relative z-10">
                  <MorningQueueArt />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
