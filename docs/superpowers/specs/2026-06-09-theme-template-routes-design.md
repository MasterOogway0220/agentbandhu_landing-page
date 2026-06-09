# Theme Template Routes — Design

**Date:** 2026-06-09
**Status:** Approved-pending-review

## Goal

Ship the AgentBandhu landing page in **three color skins**, each at its own URL, with **identical markup and content** — only the colors differ:

| URL | Theme | Source palette |
|---|---|---|
| `/` | **Original** (Pomegranate) — untouched | existing `:root` tokens |
| `/template-one` | **Sunrise Glow** | `palette1.scss` |
| `/template-two` | **Oceanic Sunburst** | `palette2.scss` |

New route folders become live URLs automatically on Vercel — no platform config needed.

## Non-goals

- No layout, copy, animation, or structural changes — color only.
- The original `/` must render pixel-identical to today.
- No CMS / runtime theme persistence. Theme is fixed per route.

## Why this is low-risk

The design is skinned entirely through CSS custom properties: **97 references to `--pom-*` / `--color-*` / `--status-*` across components, and exactly 1 hardcoded color** (a wine drop-shadow in `PhoneFrame.tsx`). A new theme is therefore a scoped block that overrides those variables; every component — including the fixed mega-menu — re-skins automatically because it inherits the variables from a themed ancestor.

## Architecture

### Shared page component

Extract the body of `src/app/page.tsx` into a new shared component so all three routes render the same tree and never drift:

- **`src/app/LandingPage.tsx`** — exports `LandingPage({ themeClass }: { themeClass?: string })`. Contains everything currently inside `page.tsx`'s `<main>`. The `themeClass` is appended to the `<main>` element's className. Also renders `<ThemeSwitcher />`.
- **`src/app/page.tsx`** — becomes `export default function Home() { return <LandingPage />; }` (no theme class → default `:root` tokens → unchanged).
- **`src/app/template-one/page.tsx`** — `return <LandingPage themeClass="theme-sunrise" />;`
- **`src/app/template-two/page.tsx`** — `return <LandingPage themeClass="theme-oceanic" />;`

### Theme scoping

The theme class on `<main>` redefines the `--pom-*` and `--status-*` tokens for its subtree. Add two blocks to `globals.css` (after the `:root` block):

```css
.theme-sunrise { /* token overrides — see table below */ }
.theme-oceanic { /* token overrides — see table below */ }
```

Because the mega-menu (`.pom-menu`, `position: fixed`) is a DOM descendant of `<main>`, it inherits the themed variables correctly despite being fixed-positioned.

### One cleanup

`src/app/PhoneFrame.tsx` line 32 hardcodes the phone drop-shadow as `rgba(58,0,29,0.45)` (the original wine). Replace with a theme-aware value so the phone shadow follows the theme:

```
shadow-[0_24px_60px_-20px_color-mix(in_srgb,var(--pom-wine)_45%,transparent)]
```

This also leaves the original `/` visually identical (color-mix of the original wine at 45% == the old literal).

### Theme switcher

**`src/app/ThemeSwitcher.tsx`** — a small `"use client"` component using `usePathname()` to highlight the active route. Fixed to the bottom-right, styled with theme variables so it adapts to whichever theme it sits in. Three links:

- `Original` → `/`
- `Sunrise` → `/template-one`
- `Oceanic` → `/template-two`

Rendered once inside `LandingPage` (so it appears on all three). `z-index` below the mega-menu (z-60) so the menu can cover it. Self-contained and trivially removable (delete the file + one render line).

### Body / overscroll background

`<body>` keeps the original `:root` `--pom-bg`. Since `<main>` is `min-h-screen` and themed, the original page background is only ever visible during rubber-band overscroll. Acceptable; not worth threading the theme into the root layout. (Noted as a known, negligible cosmetic detail.)

### Metadata

`layout.tsx` metadata (title/OG) is global and shared by all three routes — fine for these demo skins. Optional, deferred: per-route `metadata` exports to label the tab (e.g. "AgentBandhu — Sunrise"). Not in scope unless requested.

## Token maps

`--pom-white` stays `#ffffff` in both themes. `--pom-cream` does double duty as a light surface **and** as the light text color on dark elements, so it must stay near-white. "derived" = a shade generated to fill a role the palette doesn't name directly.

### Theme Sunrise (`/template-one`, from `palette1.scss`)

Palette: charcoal-blue `#233d4d`, pumpkin-spice `#fe7f2d`, golden-pollen `#fcca46`, muted-olive `#a1c181`, seagrass `#619b8a`.

| Token | Value | Source |
|---|---|---|
| `--pom-wine` | `rgb(35,61,77)` `#233d4d` | charcoal-blue |
| `--pom-red` | `rgb(254,127,45)` `#fe7f2d` | pumpkin-spice |
| `--pom-red-deep` | `rgb(216,100,26)` `#d8641a` | derived (darker pumpkin) |
| `--pom-pink` | `rgb(161,193,129)` `#a1c181` | muted-olive |
| `--pom-pink-deep` | `rgb(97,155,138)` `#619b8a` | seagrass |
| `--pom-yellow` | `rgb(252,202,70)` `#fcca46` | golden-pollen |
| `--pom-bg` | `rgb(251,246,236)` `#fbf6ec` | derived (warm near-white) |
| `--pom-cream` | `rgb(246,239,221)` `#f6efdd` | derived (warm cream) |
| `--pom-peach` | `rgb(241,228,192)` `#f1e4c0` | derived (pale gold) |
| `--pom-hero-gradient` | `linear-gradient(180deg,#f6efdd 0%,#f6efdd 50%,#f1e4c0 100%)` | cream→peach |
| `--status-amber-soft` (due bg) | `rgb(252,236,196)` `#fcecc4` | derived warm |
| `--status-amber-ink` (due text) | `rgb(143,84,16)` `#8f5410` | derived deep pumpkin |
| `--status-emerald-soft` (paid bg) | `rgb(227,239,212)` `#e3efd4` | derived from olive |
| `--status-emerald-ink` (paid text) | `rgb(70,107,58)` `#466b3a` | derived deep olive/seagrass |

### Theme Oceanic (`/template-two`, from `palette2.scss`)

Palette: imperial-blue `#11296b`, steel-azure `#00509d`, platinum `#ededed`, mustard `#ffdb57`, bright-amber `#ffcb05`.

| Token | Value | Source |
|---|---|---|
| `--pom-wine` | `rgb(17,41,107)` `#11296b` | imperial-blue |
| `--pom-red` | `rgb(0,80,157)` `#00509d` | steel-azure |
| `--pom-red-deep` | `rgb(0,60,117)` `#003c75` | derived (darker azure) |
| `--pom-pink` | `rgb(207,224,242)` `#cfe0f2` | derived (light azure) |
| `--pom-pink-deep` | `rgb(42,108,176)` `#2a6cb0` | derived (mid azure) |
| `--pom-yellow` | `rgb(255,219,87)` `#ffdb57` | mustard |
| `--pom-bg` | `rgb(245,246,248)` `#f5f6f8` | derived (near platinum) |
| `--pom-cream` | `rgb(237,237,237)` `#ededed` | platinum |
| `--pom-peach` | `rgb(221,231,243)` `#dde7f3` | derived (soft blue) |
| `--pom-hero-gradient` | `linear-gradient(180deg,#ededed 0%,#ededed 50%,#dde7f3 100%)` | platinum→soft blue |
| `--status-amber-soft` (due bg) | `rgb(255,241,194)` `#fff1c2` | derived from mustard/amber |
| `--status-amber-ink` (due text) | `rgb(138,109,0)` `#8a6d00` | derived (deep amber) |
| `--status-emerald-soft` (paid bg) | `rgb(212,236,225)` `#d4ece1` | **derived teal-green** (palette has no green) |
| `--status-emerald-ink` (paid text) | `rgb(29,107,83)` `#1d6b53` | **derived teal-green** |

> Note: Oceanic's palette contains no green. To preserve the "due → paid" success cue (a per-palette tint was explicitly requested), the paid pill uses a derived teal-green that harmonizes with the cool palette while still reading as success. Bright-amber `#ffcb05` is reserved/available for accent use; mustard is the primary CTA.

## Files touched

**New:** `LandingPage.tsx`, `ThemeSwitcher.tsx`, `template-one/page.tsx`, `template-two/page.tsx`
**Edited:** `page.tsx` (delegates to `LandingPage`), `globals.css` (+2 theme blocks), `PhoneFrame.tsx` (shadow → variable)

## Testing / verification

1. `npm run build` succeeds (all four route components type-check).
2. `npm run dev`, then visually confirm:
   - `/` is unchanged vs. the current original.
   - `/template-one` renders the full page in Sunrise colors (header, hero mockups, feature art, footer CTA, mega-menu, status pill due→paid animation).
   - `/template-two` renders in Oceanic colors.
   - Switcher appears on all three, highlights the active route, and adapts its own colors per theme.
3. Spot-check the phone-frame drop-shadow color per theme.
4. Confirm reduced-motion still lands on visible final frames (unchanged behavior).

## Risks

- **Contrast on derived backgrounds** — derived light backgrounds were chosen to keep `--pom-cream` legible as text on dark elements; verify visually during implementation, adjust a shade if any text/badge looks weak.
- **Overscroll background** — original bg peeks during rubber-band scroll on themed routes (negligible; documented above).
