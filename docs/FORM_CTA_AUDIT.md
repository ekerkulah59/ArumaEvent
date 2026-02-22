# Form & CTA Audit — Aruma Events (Event Rental)

**Scope:** All forms and call-to-action buttons across the site.  
**Context:** Event rental business (décor services, equipment rentals, quotes by request).  
**Date:** 2025-02-09

---

## Business & user context

- **Business:** Aruma Events — event décor services and rental catalog (tents, tables, chairs, catering equipment, etc.). Quotes are request-based (no instant purchase).
- **Users:** Couples, event planners, corporates — they browse services/rentals, add to “cart,” then request a quote. Contact/quote is the main conversion.
- **Market:** Event rental flows are quote-first; minimal required fields and clear CTAs improve conversion. Location and date matter for logistics and pricing.

---

## Forms audit

### Form: Quote request (Contact / Request a Quote)

**Used on:** Contact page, Checkout page, Service detail page, Rental detail page.  
**Component:** `QuoteForm.jsx` (react-hook-form + zod).

| Field (id/name) | Type   | Label              | Required | Should be here? | Notes |
|-----------------|--------|--------------------|----------|-----------------|-------|
| name            | text   | Full Name *        | Yes      | **Yes**         | Needed for follow-up. Has `id="name"` and `<Label htmlFor="name">`. Add `autocomplete="name"`. |
| email           | email  | Email *            | Yes      | **Yes**         | Has id/label. Add `autocomplete="email"`. |
| phone           | text   | Phone *            | Yes      | **Yes**         | Critical for event biz. Add `type="tel"` and `autocomplete="tel"`. |
| event_type      | select | Event Type *       | Yes      | **Yes**         | **Accessibility:** Label has no `htmlFor`; Select trigger has no `id`. Add `id="event_type"` on `SelectTrigger` and `htmlFor="event_type"` on Label (or use `aria-labelledby`). |
| event_date      | date   | Event Date         | No       | **Conditional** | Keep as optional. Helps availability & pricing. Mark as “Optional” in UI to reduce friction. |
| guest_count     | number | Expected Guests    | No       | **Conditional** | Keep optional. Useful for scoping. Mark “Optional” in UI. |
| message         | textarea | Tell us about your event * | Yes | **Yes** | Good for details. Has id/label. |

**Missing field (recommend ADD):**

| Field           | Type   | Label (suggested)   | Should add? | Notes |
|-----------------|--------|----------------------|-------------|-------|
| event_location  | text   | Event location / Venue (optional) | **Yes**     | Backend/email template already reference “Location” (e.g. quoteService `formatQuoteForEmail`). For event rental, venue/location drives delivery and travel. Add as optional; backend `QuoteRequest`/`QuoteRequestCreate` would need optional `event_location`. |

**Summary:**  
- **Remove:** None.  
- **Keep:** name, email, phone, event_type, message.  
- **Keep, mark optional:** event_date, guest_count.  
- **Add:** event_location (optional).  
- **Fix:** Event Type select label/id association; add `type="tel"` and autocomplete on phone; autocomplete on name/email.

---

## CTAs audit

| Location              | Copy                          | Role              | Assessment |
|-----------------------|-------------------------------|-------------------|------------|
| **Navbar**            | Get a Quote                   | Primary           | Good. Visible, action-oriented. |
| **Navbar**            | Cart (icon + count)           | Secondary         | Good. Clear for quote flow. |
| **Home hero**         | Explore Services              | Primary           | Good. |
| **Home hero**         | Get a Quote                   | Secondary         | Good. |
| **Home about**        | Learn More About Us           | Primary           | Good. |
| **Home CTA section**  | Get a Free Quote              | Primary           | Good. Consider aligning copy with rest of site: “Get a Quote” or “Request a Quote.” |
| **Home CTA section**  | Browse Rentals                | Secondary         | Good. |
| **Cart (empty)**      | Browse Rentals                | Primary           | Good. |
| **Cart (empty)**      | Browse Services               | Secondary         | Good. |
| **Cart (with items)** | Request quote for X item(s)  | Primary submit    | Good, specific. |
| **Cart**              | Continue shopping             | Secondary         | Good. |
| **Checkout**          | Back to cart                  | Link              | Good. |
| **Quote form**        | Request Quote                 | Form submit       | Good, specific. |
| **Service detail**    | Add to cart                   | Secondary         | Good. |
| **Service detail**    | Request a Quote               | Primary           | Good. |
| **Rental detail**     | Add to cart                   | Secondary         | Good. |
| **Rental detail**     | **Reserve Now**               | Primary           | **Change.** Button links to `/contact` (quote request), not a reservation. Rename to **“Request a Quote”** so intent matches action and matches Service detail. |
| **Rentals page CTA**  | Get Expert Advice             | Primary           | Good, context-specific. |
| **Services page CTA** | Contact Us                    | Primary           | Good. |
| **FAQ page**          | Contact Us                    | Primary           | Good. |
| **About page**        | Get in Touch                  | Primary           | Good. |
| **Footer**            | Contact (link)                | Link              | Good. |

**CTA summary:**  
- **Remove:** None.  
- **Change:** Rental detail page — change “Reserve Now” to “Request a Quote” (or “Request a Quote for this item”).  
- **Optional:** Unify “Get a Quote” / “Get a Free Quote” to one phrase site-wide (e.g. “Request a Quote” or “Get a Quote”) for consistency.

---

## Accessibility & implementation notes

1. **Quote form**
   - Event Type: Associate label with the select (e.g. `id` on `SelectTrigger`, `htmlFor` on `Label`, or `aria-labelledby`).
   - Phone: Use `type="tel"` and `autocomplete="tel"`; name/email: add appropriate `autocomplete`.
2. **Rental detail quantity**
   - Quantity input has `id="rental-qty"` and a visually hidden label — good. Ensure the control is still announced correctly when the label is `sr-only`.
3. **Design**
   - Buttons follow design_guidelines (pill-shaped, primary/secondary). Destructive actions (e.g. remove from cart) use ghost + destructive styling — appropriate.

---

## Recommended action list

**Forms**  
1. Add optional **Event location / Venue** to `QuoteForm` and backend (optional `event_location`).  
2. Mark **Event Date** and **Expected Guests** as optional in the UI (e.g. “(Optional)” in label or helper text).  
3. Fix **Event Type** label/id (or aria) so the select has an accessible name.  
4. Set **phone** to `type="tel"` and add **autocomplete** on name, email, and phone.

**CTAs**  
5. **Rental detail:** Change “Reserve Now” to “Request a Quote” (or “Request a Quote for this item”).  
6. (Optional) Use one primary phrase site-wide: “Get a Quote” or “Request a Quote.”

No forms or CTAs are recommended for removal; one CTA copy change and one optional form field addition are recommended for clarity and conversion.
