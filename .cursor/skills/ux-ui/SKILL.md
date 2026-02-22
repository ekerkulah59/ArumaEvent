---
name: ux-ui
description: Guides UX and UI decisions for web interfaces: accessibility, visual consistency, layout, and interaction patterns. Use when designing or reviewing UI components, pages, or when the user asks for UX/UI feedback, design improvements, or accessibility checks. For this project, applies design_guidelines.json where relevant.
---

# UX/UI

## When to Apply

- Designing or editing UI components, pages, or layouts
- User asks for UX feedback, design improvements, or accessibility review
- Implementing new screens, forms, or interactive elements
- Reviewing or refactoring frontend for consistency and usability

## Project Design System

This repo has a design system in **design_guidelines.json** at the project root. When working on frontend UI:

1. **Read it** when making visual or layout decisions: colors, typography, spacing, components, motion.
2. **Follow** `identity`, `typography`, `colors`, `layout`, `components`, and `universal_guidelines`.
3. **Respect** `instructions_to_main_agent` for page-level patterns (hero, grids, detail pages, etc.).

Do not use generic SaaS blue, Inter for headings, or center-everything layouts. Use the defined palette and fonts (e.g. Playfair Display, Manrope).

## UX Checklist

Use this when proposing or reviewing UI:

- **Accessibility**
  - Sufficient color contrast (text on background); avoid pure black (#000) for text.
  - Focus states visible for keyboard users.
  - Semantic HTML and ARIA where needed (buttons, links, labels, form fields).
  - `alt` text for meaningful images.
- **Consistency**
  - Reuse existing `components/ui` primitives; match design_guidelines component styles.
  - Spacing: section padding (e.g. py-20/py-24), container max-width and padding as in guidelines.
  - Buttons: pill-shaped (rounded-full), primary/secondary styles from guidelines.
- **Interaction**
  - Every interactive element has a clear hover (and focus) state (scale, color, or shadow).
  - Forms: clear labels, validation feedback, minimal but clear input styling per guidelines.
- **Layout**
  - Mobile-first; test breakpoints (container, grids).
  - Use grid patterns from guidelines (marketing “Tetris”, catalog 3–4 col, detail 60/40 split where applicable).
- **Motion**
  - Prefer subtle motion (smooth scroll, staggered reveals) per guidelines; avoid distracting animation.

## Giving UX Feedback

When reviewing or suggesting changes:

- **Critical:** Accessibility issues, broken or missing focus/hover, wrong contrast.
- **Consistency:** Divergence from design_guidelines.json (colors, type, spacing, component style).
- **Improvement:** Clearer hierarchy, better affordance, simpler flows.

Suggest concrete changes (e.g. class names, structure, or copy) when possible.

## Summary

- Default to **design_guidelines.json** for this project’s look and feel.
- Enforce **accessibility** and **interaction states** on all UI work.
- Keep **SKILL.md** under 500 lines; details live in design_guidelines.json.
