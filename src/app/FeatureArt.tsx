/**
 * Bespoke feature illustrations for the landing's BlockFeature / dashboard
 * sections, built in the AgentBandhu (Pomegranate) idiom with plain HTML/CSS.
 *
 * These REPLACE the Rive (.riv) animations that were carried over from the
 * source clone — those were the original pomegranate.health health-app assets
 * (patient cards, heart-rate dashboards, the pomegranate-fruit logo) and were
 * wrong-brand for an insurance CRM. Everything here is themed with the --pom-*
 * tokens.
 *
 * MOTION: each panel's root is a <MockupStage>, which adds `.is-in` the first
 * time it scrolls into view. The little "scenes" (badges popping, bubbles
 * sliding in, typing dots, cascade pills filling, numbers counting up) are CSS
 * keyframes in globals.css gated behind `.pom-fa.is-armed.is-in …`, plus a
 * couple of <NumericTicker> count-ups. Per-element timing is set with a
 * `--fa-d` delay variable. Reduced-motion is neutralised globally, so those
 * users land straight on each scene's final frame. Entrance motion for the
 * whole panel is still supplied by the <Reveal> wrapper in BlockFeature.
 *
 * Each art fills its parent's aspect-ratio box (w-full h-full). Decorative —
 * the headings/paragraphs beside them carry the real meaning, so the panels
 * are marked aria-hidden (by MockupStage).
 */

import { MockupStage } from "@/app/MockupStage";
import { NumericTicker } from "@/app/NumericTicker";

const GLIKER = { fontFamily: "var(--font-gliker), system-ui, sans-serif" } as const;

/** Inline helper: merge the Gliker font style with a per-element delay var. */
const delay = (d: string) => ({ ["--fa-d" as string]: d } as React.CSSProperties);

function Avatar({
  initial,
  tone = "pink",
  className = "",
  style,
}: {
  initial: string;
  tone?: "pink" | "peach" | "yellow" | "red";
  className?: string;
  style?: React.CSSProperties;
}) {
  const bg =
    tone === "peach"
      ? "var(--pom-peach)"
      : tone === "yellow"
        ? "color-mix(in srgb, var(--pom-yellow) 70%, var(--pom-white))"
        : tone === "red"
          ? "var(--pom-red)"
          : "var(--pom-pink)";
  const fg = tone === "red" ? "var(--pom-cream)" : "var(--pom-wine)";
  return (
    <span
      className={`grid place-items-center rounded-full ${className}`}
      style={{ background: bg, color: fg, ...GLIKER, ...style }}
    >
      {initial}
    </span>
  );
}

/** Shared card chrome: cream surface, wine hairline, hard offset shadow. */
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.5rem] border-2 border-[var(--pom-wine)] bg-[var(--pom-cream)] shadow-[0_10px_0_-2px_var(--pom-wine)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Three bouncing dots — a WhatsApp-style "typing" indicator that collapses
 *  away once the reply arrives. Pure presentation; timing comes from `--fa-d`. */
function TypingBubble({ d }: { d: string }) {
  return (
    <div
      className="fa-typing self-start inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-[var(--pom-white)] px-4 py-3"
      style={delay(d)}
    >
      <i /> <i /> <i />
    </div>
  );
}

/* ───────────────────────── 1 · Birthday WhatsApp thread ──────────────────── */
export function BirthdayArt() {
  return (
    <MockupStage className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-[460px] p-5">
        <div className="flex items-center gap-3 border-b border-[var(--pom-wine)]/15 pb-3">
          <Avatar initial="A" tone="pink" className="fa-pop h-10 w-10 text-[15px]" style={delay("0s")} />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--pom-wine)]">Aarti Deshpande</p>
            <p className="text-[12px] text-[var(--pom-wine)]/55">online</p>
          </div>
          <span
            className="fa-pop ml-auto rounded-full bg-[var(--pom-wine)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--pom-cream)]"
            style={delay("0.15s")}
          >
            Auto-sent
          </span>
        </div>

        <div className="flex flex-col gap-2.5 pt-4">
          <div
            className="fa-slide-r self-end max-w-[85%] rounded-2xl rounded-br-md bg-[var(--pom-yellow)] px-3.5 py-2.5 text-[13.5px] leading-snug text-[var(--pom-wine)]"
            style={delay("0.4s")}
          >
            Happy birthday, Aarti ji! 🎂 Wishing you health and happiness this
            year.
            <span className="mt-1 block text-right text-[10px] text-[var(--pom-wine)]/50">
              9:00 AM ✓✓
            </span>
          </div>
          <TypingBubble d="1.2s" />
          <div
            className="fa-slide-l self-start max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--pom-white)] px-3.5 py-2.5 text-[13.5px] leading-snug text-[var(--pom-wine)]"
            style={delay("2.5s")}
          >
            Thank you so much Anil ji 🙏
            <span className="mt-1 block text-right text-[10px] text-[var(--pom-wine)]/50">
              9:14 AM
            </span>
          </div>
        </div>
      </Card>
    </MockupStage>
  );
}

/* ───────────────────────── 2 · The renewal that lapsed ───────────────────── */
export function LapsedArt() {
  return (
    <MockupStage className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-[440px] p-6">
        <div className="flex items-center gap-3">
          <Avatar initial="R" tone="peach" className="h-11 w-11 text-[16px]" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--pom-wine)]">Rakesh Kumar</p>
            <p className="text-[12px] text-[var(--pom-wine)]/55">Motor · Policy ••• 4821</p>
          </div>
          <span
            className="fa-pop ml-auto rounded-full bg-[var(--pom-red)]/15 px-3 py-1 text-[12px] font-semibold text-[var(--pom-red-deep)]"
            style={delay("0.1s")}
          >
            Lapsed
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-[13px] text-[var(--pom-wine)]/70">Premium due</span>
          <span className="text-[28px] text-[var(--pom-wine)]" style={GLIKER}>
            <NumericTicker to={18400} isCurrency />
          </span>
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pom-wine)]/45">
          Reminders sent
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          {["30", "15", "7", "3", "1"].map((d, i) => (
            <span
              key={d}
              className="fa-flash-red flex-1 rounded-lg border border-dashed border-[var(--pom-wine)]/25 py-1.5 text-center text-[12px] font-semibold text-[var(--pom-wine)]/35"
              style={delay(`${0.5 + i * 0.18}s`)}
            >
              {d}
            </span>
          ))}
        </div>
        <p
          className="fa-shake mt-3 flex items-center gap-1.5 text-[12px] text-[var(--pom-red-deep)]"
          style={delay("1.6s")}
        >
          <span aria-hidden>⚠</span> No reminder ever went out.
        </p>
      </Card>
    </MockupStage>
  );
}

/* ───────────────────────── 3 · Replies sitting unread ────────────────────── */
export function UnreadInboxArt() {
  const rows = [
    { i: "P", t: "pink" as const, n: "Priya Nair", m: "About my claim status…", time: "11:48 PM" },
    { i: "S", t: "peach" as const, n: "Sunil Mehta", m: "Want a top-up on my policy", time: "10:21 PM" },
    { i: "A", t: "yellow" as const, n: "Asha Rao", m: "When are you free to talk?", time: "9:03 PM" },
  ];
  return (
    <MockupStage className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-[460px] p-5">
        <div className="flex items-center justify-between border-b border-[var(--pom-wine)]/15 pb-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--pom-wine)]/55">
            Inbox
          </p>
          <span
            className="fa-pop rounded-full bg-[var(--pom-red)] px-2.5 py-1 text-[10px] font-semibold text-[var(--pom-cream)]"
            style={delay("0.15s")}
          >
            3 unread
          </span>
        </div>
        <ul className="mt-2 flex flex-col">
          {rows.map((r, i) => (
            <li
              key={r.n}
              className="fa-rise flex items-center gap-3 border-b border-[var(--pom-wine)]/10 py-3 last:border-0"
              style={delay(`${0.3 + i * 0.16}s`)}
            >
              <Avatar initial={r.i} tone={r.t} className="h-9 w-9 text-[13px]" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[var(--pom-wine)]">{r.n}</p>
                <p className="truncate text-[12.5px] text-[var(--pom-wine)]/60">{r.m}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-[var(--pom-wine)]/45">{r.time}</span>
                <span className="fa-dot h-2.5 w-2.5 rounded-full bg-[var(--pom-red)]" />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </MockupStage>
  );
}

/* ───────────────────────── 4 · Morning queue (centered dashboard) ────────── */
export function MorningQueueArt() {
  const stats = [
    { label: "Birthdays today", value: 3 },
    { label: "Renewals due", value: 5 },
    { label: "Replies waiting", value: 4 },
  ];
  const queue = [
    { i: "A", t: "pink" as const, n: "Aarti", c: "Birthday today" },
    { i: "R", t: "peach" as const, n: "Rakesh", c: "Renewal in 3 days" },
    { i: "P", t: "yellow" as const, n: "Pradnya", c: "Anniversary tomorrow" },
  ];
  return (
    <MockupStage className="w-full">
      <Card className="mx-auto w-full max-w-[760px] px-5 py-7 text-center md:px-10 md:py-9">
        {/* Greeting — centered header */}
        <p className="text-[13px] text-[var(--pom-wine)]/60">Subah ki shubhkamna,</p>
        <p className="text-[30px] leading-tight text-[var(--pom-wine)] md:text-[34px]" style={GLIKER}>
          Anil ji
        </p>

        {/* Stat tiles — centered row */}
        <div className="mx-auto mt-6 grid max-w-[600px] grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="fa-rise flex flex-col items-center justify-center rounded-2xl border border-[var(--pom-wine)]/15 bg-[var(--pom-white)] p-4 text-center"
              style={delay(`${0.2 + i * 0.12}s`)}
            >
              <span className="text-[30px] leading-none text-[var(--pom-wine)]" style={GLIKER}>
                <NumericTicker to={s.value} duration={1100} />
              </span>
              <span className="mt-1.5 text-[11px] leading-tight text-[var(--pom-wine)]/60">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action — centered, content left-aligned inside */}
        <div
          className="fa-rise fa-breathe mx-auto mt-6 flex max-w-[600px] items-center justify-between gap-3 rounded-2xl border-2 border-[var(--pom-wine)] bg-[var(--pom-yellow)] px-4 py-3 text-left shadow-[0_6px_0_-2px_var(--pom-wine)]"
          style={delay("0.3s")}
        >
          <p className="font-semibold text-[var(--pom-wine)]">Aaj 3 birthdays.</p>
          <span
            className="fa-pop shrink-0 rounded-full bg-[var(--pom-wine)] px-3 py-1 text-[11px] font-semibold text-[var(--pom-cream)]"
            style={delay("0.7s")}
          >
            Send greetings
          </span>
        </div>

        {/* Queue — centered column */}
        <div className="mx-auto mt-3 flex max-w-[600px] flex-col gap-2.5 text-left">
          {queue.map((q, i) => (
            <div
              key={q.n}
              className="fa-rise flex items-center gap-3 rounded-2xl border border-[var(--pom-wine)]/15 bg-[var(--pom-white)] px-3 py-2.5"
              style={delay(`${0.6 + i * 0.14}s`)}
            >
              <Avatar initial={q.i} tone={q.t} className="h-8 w-8 text-[12px]" />
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-semibold text-[var(--pom-wine)]">{q.n}</p>
                <p className="text-[11.5px] text-[var(--pom-wine)]/55">{q.c}</p>
              </div>
              <span
                className="fa-pop rounded-full bg-[var(--pom-wine)] px-3 py-1 text-[11px] font-semibold text-[var(--pom-cream)]"
                style={delay(`${0.95 + i * 0.14}s`)}
              >
                Send
              </span>
            </div>
          ))}
        </div>
      </Card>
    </MockupStage>
  );
}

/* ───────────────────────── 5 · One inbox · two-way thread ────────────────── */
export function InboxThreadArt() {
  return (
    <MockupStage className="flex h-full w-full items-center justify-center">
      <Card className="flex w-full max-w-[460px] flex-col p-5">
        <div className="flex items-center gap-3 border-b border-[var(--pom-wine)]/15 pb-3">
          <Avatar initial="S" tone="peach" className="h-10 w-10 text-[15px]" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--pom-wine)]">Sunil Mehta</p>
            <p className="text-[12px] text-[var(--pom-wine)]/55">Health · Policy ••• 7720</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 py-4">
          <div
            className="fa-slide-l self-start max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--pom-white)] px-3.5 py-2.5 text-[13.5px] leading-snug text-[var(--pom-wine)]"
            style={delay("0.3s")}
          >
            Can I add my wife to this policy before renewal?
          </div>
          <TypingBubble d="1.1s" />
          <div
            className="fa-slide-r self-end max-w-[85%] rounded-2xl rounded-br-md bg-[var(--pom-yellow)] px-3.5 py-2.5 text-[13.5px] leading-snug text-[var(--pom-wine)]"
            style={delay("2.4s")}
          >
            Of course, Sunil ji. I&apos;ll share the top-up options today. 👍
            <span className="mt-1 block text-right text-[10px] text-[var(--pom-wine)]/50">
              now ✓✓
            </span>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 rounded-full border border-[var(--pom-wine)]/20 bg-[var(--pom-white)] px-4 py-2.5">
          <span className="flex-1 text-[13px] text-[var(--pom-wine)]/45">
            Type a reply…
          </span>
          <span className="fa-send grid h-7 w-7 place-items-center rounded-full bg-[var(--pom-wine)] text-[var(--pom-cream)]">
            ➤
          </span>
        </div>
      </Card>
    </MockupStage>
  );
}

/* ───────────────────────── 6 · The renewal cascade ───────────────────────── */
export function CascadeArt() {
  return (
    <MockupStage className="flex h-full w-full items-center justify-center">
      <Card className="w-full max-w-[440px] p-6">
        <div className="flex items-center gap-3">
          <Avatar initial="A" tone="peach" className="h-11 w-11 text-[16px]" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--pom-wine)]">Anil Kumar</p>
            <p className="text-[12px] text-[var(--pom-wine)]/55">Policy ••• 4821</p>
          </div>
          <span
            className="fa-pop ml-auto rounded-full bg-[var(--status-emerald-soft)] px-3 py-1 text-[12px] font-semibold text-[var(--status-emerald-ink)]"
            style={delay("1.55s")}
          >
            Paid ✓
          </span>
        </div>

        <div className="mt-5 flex items-baseline justify-between">
          <span className="text-[13px] text-[var(--pom-wine)]/70">Premium</span>
          <span className="text-[28px] text-[var(--pom-wine)]" style={GLIKER}>
            <NumericTicker to={18400} isCurrency />
          </span>
        </div>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--pom-wine)]/45">
          Renewal cascade
        </p>
        <div className="mt-2 flex items-center gap-1.5">
          {[
            { d: "30", on: true },
            { d: "15", on: true },
            { d: "7", on: true },
            { d: "3", on: true },
            { d: "1", on: false },
          ].map((s, i) => (
            <span
              key={s.d}
              className={`flex-1 rounded-lg py-1.5 text-center text-[12px] font-semibold ${
                s.on
                  ? "fa-fill bg-[var(--pom-wine)]/8 text-[var(--pom-wine)]/45"
                  : "bg-[var(--pom-wine)]/8 text-[var(--pom-wine)]/45"
              }`}
              style={s.on ? delay(`${0.4 + i * 0.22}s`) : undefined}
            >
              {s.d}
            </span>
          ))}
        </div>
        <p
          className="fa-rise mt-3 text-[12px] text-[var(--status-emerald-ink)]"
          style={delay("1.7s")}
        >
          Paid on day 3 — cascade stopped automatically.
        </p>
      </Card>
    </MockupStage>
  );
}
