# Senior Developer Code Review

**Date:** February 21, 2025  
**Scope:** Quote system, form system, backend API, services layer

---

## Executive Summary

The codebase is generally well-structured with clear separation between frontend forms, services, and backend API. Several bugs and risks were identified that could cause production issues, data loss, or security exposure. The most critical items should be addressed before or shortly after deployment.

---

## 🔴 Critical Issues

### 1. Exposed API Key in `.env.example`

**Location:** `backend/.env.example:7`

```env
RESEND_API_KEY=re_H2D4a1FF_FZk5xJbJVYqeGL8sZCVjqn3p
```

**Impact:** A real Resend API key is committed. Anyone with repo access can abuse it; if the repo is public, it is exposed.

**Fix:** Replace with a placeholder: `RESEND_API_KEY=your_resend_api_key_here`

---

### 2. QuoteForm Does Not Pass `serviceId` / `rentalId` to Backend

**Location:** `frontend/src/components/QuoteForm.jsx:86-96`

The form accepts `serviceId` and `rentalId` as props and uses them in `buildItems()` to populate the `items` array. However, the payload sent to `quoteService.submitQuoteRequest()` does **not** include `serviceId` or `rentalId`. The backend model expects `service_id` and `rental_id` as top-level fields for single-item context.

**Current payload:**
```javascript
const payload = {
  name, email, phone, eventType, eventDate, guestCount,
  message, eventLocation, items: buildItems(),  // ← items has ids, but no serviceId/rentalId
};
```

**Impact:** When requesting a quote from `RentalDetailPage` or `ServiceDetailPage`, the backend receives items but not explicit `service_id`/`rental_id`. This may break analytics, reporting, or downstream processing that expects these fields.

**Fix:** Add to payload:
```javascript
serviceId: serviceId ?? undefined,
rentalId: rentalId ?? undefined,
```

---

### 3. Dead API Endpoints in Contact Service (404 When Used)

**Location:** `frontend/src/services/contactService.js`

These methods call backend routes that do **not** exist:

| Method | Endpoint Called | Backend Exists? |
|--------|-----------------|-----------------|
| `sendEmail()` | `POST /contact/send-email` | No |
| `subscribeToNewsletter()` | `POST /contact/newsletter` | No |
| `requestCallback()` | `POST /contact/callback` | No |

**Impact:** If any UI uses these with `REACT_APP_USE_MOCK_DATA !== 'true'`, they will return 404. Currently these appear unused, but they are dead code that would fail if wired up.

**Fix:** Either implement the backend routes or remove these methods with a comment that they are placeholders for future use.

---

## 🟠 High Priority Issues

### 4. `formatQuoteForEmail` with Missing `eventDate`

**Location:** `frontend/src/services/quoteService.js:144`

```javascript
const eventDate = new Date(quoteData.eventDate).toLocaleDateString('en-US', {...});
```

When `quoteData.eventDate` is `undefined`, `new Date(undefined)` produces an invalid date, and `.toLocaleDateString()` returns the string `"Invalid Date"`. The email subject/body would contain "Invalid Date".

**Impact:** Unprofessional or confusing emails for optional event dates.

**Fix:** Add a guard:
```javascript
const eventDate = quoteData.eventDate
  ? new Date(quoteData.eventDate).toLocaleDateString('en-US', {...})
  : 'Not specified';
```

---

### 5. Duplicate API Configurations

**Locations:**  
- `frontend/src/services/apiService.js` (used by `contactService`, `quoteService`)  
- `frontend/src/lib/api.js` (exports `contactApi` with its own axios instance)

**Impact:** Two axios instances with different base URL logic and no shared interceptors. If one is updated, the other can drift, leading to inconsistent behavior (CORS, auth, error handling).

**Fix:** Deprecate `lib/api.js` and use `apiService` everywhere, or make `lib/api.js` a thin wrapper around `apiService`.

---

### 6. Guest Count Type Coercion Risk

**Context:**  
- Frontend: `guest_count` is a string from `react-hook-form` (`z.string().optional()`).  
- Backend: `guest_count: Optional[int]`.

The `QuoteForm` correctly converts: `guestCount: data.guest_count ? Number(data.guest_count) : undefined`. However, `Number("")` returns `0`, not `NaN`. An empty string would become `0`, which is then sent. The backend expects `Optional[int]`; `0` is valid, but semantically "no guest count" vs "0 guests" differs.

**Impact:** Low; the backend accepts it. But `0` could be misleading in emails or reports.

**Recommendation:** Treat empty string as `undefined`:
```javascript
guestCount: data.guest_count && data.guest_count.trim() !== ''
  ? Number(data.guest_count)
  : undefined,
```

---

### 7. Phone Validation Regex Mismatch

**QuoteForm (Zod):** `z.string().min(10, ...)` — any 10+ characters  
**quoteService:** `phoneRegex = /^[\d\s\-\+\(\)]{10,}$/` — digits/spaces/punctuation only  

A value like `"abcdefghij"` passes Zod but fails the service, causing an unexpected error after form submit.

**Fix:** Align validation. Either strengthen Zod with `.regex()` or relax the service validation if you intend to support broader formats.

---

## 🟡 Medium Priority / Potential Bugs

### 8. No Backend Validation for Past Event Date

**Backend:** `event_date: Optional[str]` — no date validation  
**Frontend:** `quoteService.validateQuoteData()` rejects past dates  

If someone bypasses the frontend (e.g. direct API call), past dates are accepted. Usually acceptable, but worth documenting if business rules require backend enforcement.

---

### 9. Items Array Structure Not Strictly Validated

**Backend model:** `items: Optional[list] = None` — accepts any list.

Email templates assume items have `name` and `quantity` and use `item.get('name', 'Item')`, `item.get('quantity', 1)`. Malformed items (wrong types, missing keys) would not crash but could produce odd email content.

**Recommendation:** Add a Pydantic model for items, e.g. `{id: str, name: str, quantity: int}` with sensible defaults.

---

### 10. Mock vs Real Mode Inconsistency

- **quoteService:** `USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true'`  
- **contactService:** Same logic  

Default is real API. One cached babel artifact showed `!== 'false'` (i.e. default to mock). If that ever made it into source, production could silently use mock mode. Worth double-checking env handling and defaults.

---

### 11. CheckoutPage Redirect Race

**Location:** `frontend/src/pages/CheckoutPage.jsx`

```javascript
useEffect(() => {
  if (items.length === 0) {
    navigate('/cart', { replace: true });
  }
}, [items.length, navigate]);
```

After a successful quote, `onSuccess` calls `clearCart()` and `navigate('/contact')`. If `clearCart()` triggers a re-render before `navigate`, the effect could fire and redirect to `/cart` instead of `/contact`. React’s batching may prevent this, but the order of operations is subtle.

**Recommendation:** Call `navigate` first, then `clearCart`, or guard the effect so it doesn’t run when the intent is to go to `/contact`.

---

## Forms Audit

### Quote Form (`QuoteForm.jsx`)

| Field (id/name)   | Type   | Label                          | Required | Assessment |
|-------------------|--------|--------------------------------|----------|------------|
| name              | text   | Full Name *                     | Yes      | ✅ Correct |
| email             | email  | Email *                        | Yes      | ✅ Correct |
| phone             | tel    | Phone *                        | Yes      | ✅ Correct |
| event_type        | select | Event Type *                   | Yes      | ✅ Correct |
| event_date        | date   | Event Date (optional)           | No       | ✅ Correct |
| guest_count       | number | Expected Guests (optional)      | No       | ✅ Correct |
| event_location    | text   | Event location (optional)       | No       | ✅ Correct |
| message           | textarea| Tell us about your event *     | Yes      | ✅ Correct |

**Input IDs:** Unique (`name`, `email`, `phone`, `event_type`, `event_date`, `guest_count`, `event_location`, `message`). All linked with `<Label htmlFor="...">`.

**CTA:** "Request Quote" — clear and action-oriented. Disabled during submit; loading state shown.

---

### Contact Form (`ContactForm.jsx`)

| Field (id/name)   | Type     | Label           | Required | Assessment |
|-------------------|----------|-----------------|----------|------------|
| contact-name      | text     | Full Name *     | Yes      | ✅ Correct |
| contact-email     | email    | Email *         | Yes      | ✅ Correct |
| contact-phone     | tel      | Phone (optional)| No       | ✅ Correct |
| contact-subject   | text     | Subject *       | Yes      | ✅ Correct |
| contact-message   | textarea | Message *       | Yes      | ✅ Correct |

**Input IDs:** Unique with `contact-` prefix. All linked with labels.

**CTA:** "Send Message" — clear and appropriate.

---

## Quote System Flow Summary

1. **QuoteForm** → builds payload with camelCase (`eventType`, `eventDate`, etc.) plus `items`
2. **quoteService.submitQuoteRequest()** → validates, then maps to API format (snake_case + `eventLocation` alias)
3. **apiService.post('/quotes', payload)** → sends to backend
4. **Backend** `POST /api/quotes` → Pydantic validation, background email task
5. **Background task** → `send_quote_notification` + `send_quote_confirmation_to_customer`

**Data flow:** Frontend → quoteService (validation + mapping) → apiService → Backend → Email service.

---

## Recommendations Summary

1. **Immediate:** Remove real API key from `.env.example`; use a placeholder.
2. **Immediate:** Add `serviceId` and `rentalId` to QuoteForm payload.
3. **Short-term:** Fix `formatQuoteForEmail` for missing `eventDate`.
4. **Short-term:** Consolidate API config (remove or wrap `lib/api.js`).
5. **Short-term:** Implement or remove `sendEmail`, `subscribeToNewsletter`, `requestCallback` in contactService.
6. **Medium-term:** Add rate limiting for `/api/contact` and `/api/quotes`.
7. **Medium-term:** Add Pydantic model for `items` and stricter validation.
8. **Ongoing:** Add integration tests for quote and contact flows.
