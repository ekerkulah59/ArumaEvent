---
name: frontend-developer
description: Guides implementation of the Even event-rental site frontend: stack, file placement, patterns for pages and components, API usage, and design system. Use when building or implementing UI features, adding pages or components, integrating with the backend, or when the user asks how to build part of the site.
---

# Front-End Developer (Even Site)

Apply this skill when implementing frontend features for the Even site. It defines where code lives, how to use the stack, and patterns so new work fits the existing codebase.

## Stack and Structure

- **Frontend**: React (CRA + Craco), Tailwind CSS, Shadcn UI (`src/components/ui/`), React Router, Framer Motion, Lenis (smooth scroll), Lucide React.
- **Backend**: Python API in `backend/`; base URL via `REACT_APP_BACKEND_URL` (default `http://localhost:8000`).

### Where Code Lives

| Purpose | Location |
|--------|----------|
| Route-level UI | `frontend/src/pages/` — one main component per route |
| Shared components | `frontend/src/components/` (e.g. Navbar, Footer, ServiceCard, RentalCard) |
| UI primitives | `frontend/src/components/ui/` — Shadcn components; use or extend, don’t duplicate |
| API client & endpoints | `frontend/src/lib/api.js` — axios instance and API methods |
| Domain logic & orchestration | `frontend/src/services/` — one service per domain (rentalService, contactService, etc.) |
| Hooks | `frontend/src/hooks/` |
| Shared utils | `frontend/src/lib/utils.js` |
| Static/mock data | `frontend/src/data/` (e.g. staticData.js, mockData.js) |
| Design system source | `design_guidelines.json` at project root |

When adding features: put API calls in `api.js` and optional domain logic in the right service; keep pages focused on layout and composition; reuse components and Shadcn primitives.

## Design System

- **Single source of truth**: `design_guidelines.json` (identity, typography, colors, layout, components, motion, images).
- **Tailwind**: Use semantic tokens from `frontend/src/index.css` (e.g. `bg-background`, `text-foreground`, `bg-primary`, `text-accent`, `font-heading`, `font-body`). Avoid hardcoding hex in JSX; use Tailwind classes or CSS variables.
- **Typography**: Playfair Display for headings (H1–H3), Manrope for body and UI.
- **Conventions**: Pill-shaped buttons (`rounded-full`), glass-style nav (see design_guidelines `components.navigation`), section padding `py-20` or `py-24`, container `max-w-7xl mx-auto px-6 md:px-12`. No generic SaaS blue; no Inter for headings. All interactive elements must have a hover state.
- **data-testid**: Add to all interactive elements (buttons, links, form fields, toggles) for E2E and component tests.

For visual and layout decisions, the ux-ui skill applies the design system; this skill focuses on implementation.

## Adding a New Page

1. Create the page component in `frontend/src/pages/` (e.g. `NewPage.jsx`).
2. Register the route in `frontend/src/App.js`: add `Route path="/path" element={<NewPage />}` and the corresponding import.
3. Data: fetch via a service that uses `lib/api.js`, or use `data/staticData.js` for static content. Do not put raw `axios` or fetch in the page; use the existing API layer.
4. Layout: follow page patterns from `design_guidelines.json` (e.g. detail page = 60% image / 40% content sticky; catalog = 3–4 column grid; marketing = Tetris-style grid).
5. Add `data-testid` on the page root and on key interactive elements.
6. Handle loading and error states (see below).

## Adding a New Component

- **Shared (feature-specific)**: Create in `frontend/src/components/` (e.g. `ServiceCard.jsx`, `RentalCard.jsx`). Use Shadcn and Tailwind; keep props clear and single-purpose.
- **Reusable primitive**: If it’s a generic UI building block, prefer adding or extending a Shadcn component in `frontend/src/components/ui/` rather than a one-off in `components/`.
- Use design tokens for colors and spacing; add `data-testid` on interactive elements.

## API and Data

- **Defining endpoints**: Add or extend methods in `frontend/src/lib/api.js` (e.g. `rentalsApi.getAll`, `contactApi.submitQuote`). Use the shared `api` axios instance.
- **Domain logic**: Put validation, request shaping, and orchestration in `frontend/src/services/` (e.g. `rentalService.createRentalRequest` calling the contact API). Pages call services or `lib/api.js`, not raw axios from pages.
- **Environment**: Backend base URL is `process.env.REACT_APP_BACKEND_URL` (default `http://localhost:8000`). API base path is `${BACKEND_URL}/api`.

## Loading and Error States

- Every data-fetching UI must handle:
  - **Loading**: Use `LoadingSpinner` or Shadcn `Skeleton` from `frontend/src/components/` / `components/ui/`.
  - **Error**: Show a clear message or fallback; optionally use toast (e.g. Shadcn Sonner already in App) for transient errors.
- Prefer a single pattern: e.g. `loading ? <LoadingSpinner /> : error ? <ErrorMessage /> : <Content />`.

## Forms

- Contact/quote and other forms submit via the backend API. Use existing services (e.g. `contactService`, `quoteService`).
- Where the project already uses react-hook-form and Zod, use them for validation and submit logic; keep validation and submit in one place (e.g. in the page or a dedicated form component that uses a service).

## Images

- Prefer image URLs and alt text from `design_guidelines.json` (hero, services, rentals) or assets in `frontend/public/`.
- Use appropriate dimensions or `aspect-ratio` to avoid layout shift; provide descriptive alt text for accessibility and SEO.

## Motion and Scroll

- **Scroll**: Lenis is used for smooth scrolling; keep it enabled where the app already initializes it.
- **Reveal**: Use Framer Motion for staggered entrance of sections or grid items (e.g. `motion.div` with `initial`/`animate`/`transition`).
- **Interaction**: Hover states on all interactive elements (scale, color, or shadow as in design_guidelines).

## Quick Reference: Layout Patterns

- **Container**: `max-w-7xl mx-auto px-6 md:px-12`
- **Section padding**: `py-20` or `py-24`
- **Catalog grid**: 3–4 columns, `gap-8`
- **Detail page**: 2-column asymmetric — ~60% image (sticky), ~40% content + CTA (e.g. “Request Quote”)
- **Marketing/Tetris**: Asymmetric grid with `col-span` for visual interest
- **Navbar**: Glass pill style per design_guidelines (`bg-white/70 backdrop-blur-md` etc.)

## Summary Checklist

When implementing a feature:

- [ ] New page in `pages/`, route in `App.js`
- [ ] New API methods in `lib/api.js` if needed; domain logic in `services/`
- [ ] Components in `components/` or `components/ui/`; reuse Shadcn where possible
- [ ] Styling from design_guidelines + Tailwind tokens (no one-off hex or Inter)
- [ ] Loading and error states for any fetched data
- [ ] `data-testid` on interactive elements
- [ ] Semantic HTML and accessible form labels/errors
