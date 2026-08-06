# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: Create React App (react-scripts 5) + Tailwind CSS, React Router v6, Firebase (Auth, Firestore, Storage), react-leaflet for maps, swiper for carousels. Redesign works within this stack; the parallel backend rebuild (NestJS + PostgreSQL) is a separate migration effort tracked outside this file.

## Users

Two audiences on one marketplace:
- **Renters/buyers** searching for a place to rent or buy, browsing by category (rent, sale, offers/discounted listings), viewing listing detail (photos, price, beds/baths, parking, furnished status, address, map location), and contacting the lister directly.
- **Landlords/agents/sellers** (authenticated users) who create and manage their own listings: multi-image upload (up to 6, first image is the cover), pricing (regular + optional discounted "offer" price), property details, and address with optional manual lat/long when geolocation is disabled.

## Product Purpose

A real estate marketplace where property owners list rentals and sales, and prospective renters/buyers discover and inquire about them. Success is a lister publishing a complete, appealing listing and a searcher finding a relevant property and making contact.

## Positioning

Undecided/open: no confirmed mechanism that differentiates this from Zillow/Redfin-style listing sites beyond execution quality. The redesign is explicitly tasked with creating a distinct, opinionated visual identity as the differentiator (see design direction, tracked in DESIGN.md, not here).

## Operating Context

- Listing categories: `rent`, `sale`, plus a cross-cutting `offer` flag (discounted price) surfaced on the homepage and its own `/offers` route.
- Listing detail shows an image slider/carousel, a Leaflet map pin (lat/long from geolocation or manual entry), pricing (with strikethrough regular price when discounted), bed/bath/parking/furnished badges, and a "Contact Landlord" action.
- Auth: email/password sign up & sign in, Google OAuth, forgot-password flow, and private routes gating listing creation/editing and the profile area.
- Profile area: authenticated users manage (edit, delete) their own listings and update account info.
- Image storage and all data currently live in Firebase (Storage for images, Firestore for listings/users) — this is the system the backend rebuild replaces.

## Capabilities and Constraints

- Confirmed functionality: browse/filter listings by category and offer status, listing CRUD (create/edit/delete) scoped to the owning user, image upload with a 6-image cap, map-based location display, contact-the-lister flow, full auth flow (email + Google OAuth + password reset).
- No confirmed pricing/licensing/legal claims to preserve; this is a functional marketplace demo, not a live business.
- Undecided: exact target region/market, currency (code uses raw `$` figures), and whether messaging/contact is in-app or mailto-style (current `Contact.jsx` — verify at implementation time).

## Brand Commitments

None binding. Full creative freedom confirmed by the user for the visual redesign — existing name ("realtor-clone"/"gidahome" placeholder logo) and Tailwind default styling are incumbent implementation, not protected brand assets.

## Evidence on Hand

No real listing photos, testimonials, or business content exist in the repo — all data is user-generated at runtime via Firestore/Storage. Nothing to fabricate; empty/seed states must be designed as first-class, not hidden.

## Product Principles

1. Design for two real jobs at once: fast, trustworthy browsing for searchers, and low-friction listing creation for owners — neither audience is a placeholder.
2. A distinct visual identity is the product's differentiator; avoid default real-estate-SaaS blue-and-white template conventions.
3. Every state a real marketplace hits (empty results, loading, upload errors, no-Firebase-auth) must be designed, not left to framework defaults.
4. Preserve all existing Firebase-backed functionality during the frontend redesign; the backend replacement is planned and scaffolded separately, not swapped live under the redesigned UI.

## Accessibility & Inclusion

No project-specific requirement established; hold to standard WCAG AA practices (contrast, focus states, form labeling, keyboard navigation) as the floor.
