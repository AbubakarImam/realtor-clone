---
name: Registry
description: A property marketplace that reads as a county land-records office — parcel grids, ink stamps, and ledger rows.
colors:
  paper: "#F3F4EF"
  paper-deep: "#EAEBE2"
  paper-line: "#C7CBBF"
  ink: "#1B1F1B"
  ink-soft: "#4B5147"
  ink-faint: "#767C70"
  stamp: "#B3261E"
  stamp-dark: "#8C2116"
  registry: "#2B4A5E"
  registry-dark: "#1E3544"
  seal-available: "#2F6B3A"
  seal-pending: "#B9791A"
  seal-sold: "#8C2116"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.5rem–1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem–0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  interactive: "2px"
  card: "0px"
spacing:
  field-gap: "1.5rem"
  card-padding: "1.25rem–2rem"
  section-gap: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.stamp}"
    textColor: "{colors.paper}"
    rounded: "{rounded.interactive}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.stamp-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.interactive}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "{colors.registry}"
    textColor: "{colors.paper}"
    rounded: "{rounded.interactive}"
    padding: "12px 28px"
  card:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
---

# Design System: Registry

## Overview

**Creative North Star: "The County Land-Records Office"**

Registry treats a real-estate marketplace as a system of record rather than a storefront. Every listing is a filed document: it carries a record number, a status seal, and a parcel diagram, and the surrounding chrome — navigation, cards, forms — borrows its grammar from cadastral survey sheets, ink rubber stamps, and ledger books rather than from real-estate-SaaS templates (rounded hero cards, blue-and-white gradients, big search bars). The world was assigned by the impeccable skill's direction-seeding script against grounded candidates derived from the product's own domain (property surveys, deed offices, parcel maps), chosen over catalog challengers on audience fit and product clarity for a real-estate task.

Density stays high and functional — this is an Operate-mode surface (the visitor is completing a task: finding a home, filing a listing), so scanability and native form conventions always outrank expressive flourish. Brand personality lives in specific, restrained details: the stamp-red accent, the mono data typography, the canted status seals, the parcel-grid ground — never in decoration layered on top of the task.

**Key Characteristics:**
- Cool, technical paper ground with a faint parcel-grid texture site-wide — never warm cream/parchment.
- One saturated accent (stamp red) reserved for primary actions and sale/urgent status; a second desaturated accent (registry blue) for secondary actions and links.
- Data and labels set in monospace, uppercase, tracked — body copy in a plain humanist sans.
- Sharp-cornered card surfaces (0px radius); only small interactive controls (buttons, inputs, badges) carry a 2px radius.
- No kickers/eyebrows above headings; a heading always carries its own weight.

## Colors

The palette is Restrained: a cool neutral ground plus one committed accent, extended with a small semantic-seal ramp for listing status.

### Primary
- **Stamp Red** (#B3261E): primary actions (submit/CTA buttons), the "For Sale" status seal, discount/urgent emphasis, price figures on listing cards. Used sparingly — one solid CTA per view, never as a background field.

### Secondary
- **Registry Blue** (#2B4A5E): secondary actions ("Send message", "Continue with Google" text is neutral but the button family follows this role), links (forgot-password, view-all), the "For Rent" status seal, focus rings.

### Neutral
- **Paper** (#F3F4EF): page ground, always under the parcel-grid texture.
- **Paper Deep** (#EAEBE2): secondary surface fill (hover states, disabled/read-only fields, the illustration's grid ground).
- **Paper Line** (#C7CBBF): all hairline borders, dividers, and the parcel-grid lines itself.
- **Ink** (#1B1F1B): primary text, headings, active nav.
- **Ink Soft** (#4B5147): secondary body text, muted labels, field values.
- **Ink Faint** (#767C70): tertiary/meta text (timestamps, inactive nav, placeholder-adjacent copy).

### Semantic seals
- **Seal Available** (#2F6B3A): available/positive status (discount badge, "available" seal tone).
- **Seal Pending** (#B9791A): reserved for a pending/under-offer listing state; coded in `StatusStamp` but not yet driven by live data (no pending field exists in the current listing schema — see PRODUCT.md capabilities).
- **Seal Sold** (#8C2116): sold/closed status; shares the stamp-dark value deliberately (a "sold" stamp is the same ink as a "for sale" stamp gone final).

### Named Rules
**The One Stamp Rule.** Stamp red drives exactly one primary action per view. A second red element on the same screen (beyond a price figure or a sale-type seal) means the hierarchy has collapsed to two competing calls to action.

## Typography

**Display Font:** IBM Plex Sans (with system-ui, sans-serif fallback)
**Body Font:** IBM Plex Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace, monospace fallback)

**Character:** A workhorse technical pairing, not a decorative one — Plex Sans reads like an official form's body copy, Plex Mono like a typewritten ledger entry or a rubber-stamp serial number. Both fonts are self-loaded from Google Fonts, never a system-font substitution.

### Hierarchy
- **Headline** (600, 1.5–1.875rem, 1.25 line-height): page titles, section headers ("Sign in to the registry", "File a record").
- **Title** (600, 1.125–1.25rem, 1.3): card/listing names, form section leads.
- **Body** (400, 1rem, 1.6 line-height): descriptions, paragraph copy.
- **Label** (600, 0.6875–0.75rem, 0.08em tracking, uppercase, mono): field labels, nav items, status seals, "field-label" meta captions.
- **Record figure** (600, mono, tabular-nums): prices, record numbers, timestamps — anything that reads as recorded data rather than prose.

### Named Rules
**The No-Kicker Rule.** No small caption ever sits stacked directly above a page or section heading. A heading states its own context; a "Registry Access" or "Ledger Volume" eyebrow over "Sign in" is chrome, not information, and is banned outright — carry the framing into the heading's own words instead ("Sign in to the registry").

## Layout

Single-column content capped at `max-w-6xl` (listings, home) or `max-w-3xl`/`max-w-2xl` (forms, profile), centered with responsive gutters (`px-3`–`px-6`). Listing grids step `grid-cols-1` → `sm:2` → `lg:3` → `xl:4` → `2xl:5` as viewport grows. Section rhythm: a `border-b-2 border-ink` rule under every page or ledger-book heading, generous top spacing (`pt-8`+) before a new section, tighter spacing within a card. The header is sticky, translucent (`bg-paper/95 backdrop-blur`) over the parcel-grid ground.

## Elevation & Depth

Hybrid: flat by default (cards sit on a 1px paper-line border, no ambient shadow at rest on dense grids), with two purposeful soft shadows reserved for surfaces that need to visually lift off the parcel-grid ground — the `ledger` shadow on standalone cards/panels/modals-equivalent, and the `stamp` shadow under the primary red CTA to make it read as pressed/inked. Shadows always carry an offset and soft blur; no zero-offset glow.

### Shadow Vocabulary
- **ledger** (`0 1px 0 0 rgba(27,31,27,0.08), 0 8px 20px -12px rgba(27,31,27,0.35)`): standalone ledger-card panels (forms, listing detail, sign-in card).
- **stamp** (`0 2px 8px -2px rgba(179,38,30,0.45)`): the primary stamp-red call-to-action button.

### Named Rules
**The Flat-Grid Rule.** Listing cards inside a dense grid (Home, Category, Offers) carry only a hairline border, never the ledger shadow — shadow is reserved for singular, standalone surfaces so it keeps meaning "this lifted off the page" rather than decorating every tile.

## Shapes

Two-tier corner system: card and panel surfaces (`ledger-card`, exhibit photo frames) are perfectly square — 0px radius, borrowing the cut-edge of paper and photographic prints. Small interactive controls (buttons, inputs, file-upload chips, status seals) carry a minimal 2px radius, just enough to read as touchable without softening into the generic rounded-SaaS silhouette. Status seals additionally carry a `-2deg` rotation, canted like a hand-stamped mark.

## Components

### Buttons
- **Shape:** 2px radius, mono uppercase label, 0.08em tracking.
- **Primary:** stamp-red background, paper text, `stamp` shadow, 12px/28px padding.
- **Secondary:** registry-blue background, paper text (Contact/"Send message").
- **Ghost/Outline:** white background, `ink/20` border, ink text (Google OAuth, "Load more records").
- **Segmented toggle:** `SegmentToggle` — a bordered row of equal-width buttons (Sell/Rent, Yes/No); the active option fills solid ink, inactive options stay white with a soft-hover paper-deep fill.

### Chips / Seals
- **StatusStamp:** canted (-2deg), bordered in the status's own color (currentColor), mono uppercase label, transparent/paper-tinted fill. Tones: `available` (green), `pending` (amber, reserved), `sold` (red), `rent` (registry blue), `sale` (stamp red).

### Cards / Containers
- **Corner Style:** 0px (square).
- **Background:** solid white, distinct from the paper-deep/parcel-grid ground it sits on.
- **Shadow Strategy:** see Elevation — `ledger` shadow only on standalone panels, hairline-only inside dense grids.
- **Border:** 1px `paper-line`.
- **Internal Padding:** 1.25–2rem depending on card role (listing card content ~1rem, form panels 1.25–2rem).

### Inputs / Fields
- **Style:** white background, 1px `paper-line` border, 2px radius, `ledger-input` class.
- **Focus:** border shifts to registry blue with a soft 3px blue glow ring (`box-shadow: 0 0 0 3px rgba(43,74,94,0.15)`), no default browser outline.
- **File input:** the native file-picker button is restyled as a small ink-filled mono chip via `file:` pseudo-classes.

### Navigation
- **Style:** sticky, translucent header; mono uppercase nav labels; active route underlined with a 3px stamp-red rule; logo mark is a compass/survey-seal SVG (`RegistryMark`) plus a wordmark hidden below the `sm` breakpoint to protect against overflow.
- **Mobile treatment:** nav gap and type size step down (`gap-4`/`text-[11px]` below `sm`, `gap-8`/`text-xs` above); no hamburger/drawer pattern exists yet — the nav is only two persistent items plus account, so it stays flat at all sizes.

### Parcel-Grid Ground (signature)
A sitewide `background-image` of two hairline `paper-line` gradients forming a 44px grid, applied to `body`. It is the system's defining material — every surface sits visibly on a survey sheet — and stays subtle enough (1px lines at low contrast) that it never competes with card content sitting on solid white above it.

## Do's and Don'ts

### Do:
- **Do** reserve stamp red for exactly one primary action per view (The One Stamp Rule).
- **Do** set all data/labels (prices, record numbers, timestamps, nav, field labels) in IBM Plex Mono, uppercase, tracked; reserve IBM Plex Sans for prose and headings.
- **Do** keep card corners square (0px) and reserve the 2px radius for small interactive controls only.
- **Do** let the parcel-grid ground show through on every page background; don't cover it with a second flat color.

### Don't:
- **Don't** stack a small caption/eyebrow directly above any page or section heading (The No-Kicker Rule) — fold the context into the heading's own words instead.
- **Don't** apply the `ledger` shadow to tiles inside a dense listing grid; reserve it for standalone panels (The Flat-Grid Rule).
- **Don't** render fake material (embossing, bevels, faux paper texture via box-shadow tricks) to simulate physicality — the parcel-grid and stamp-seal already carry the world's materiality; anything beyond that is imitation.
- **Don't** introduce a second saturated accent color; registry blue stays desaturated relative to stamp red so the one-accent hierarchy holds.
