---
name: form-cta-audit
description: Systematically reviews all forms on a page (input ids, types, labels, necessity) and CTA buttons (copy, placement, hierarchy). Use when the user asks to review forms, form inputs, input fields, whether an input should or should not be there, CTA buttons, call-to-action, or to audit forms and CTAs on a page.
---

# Form & CTA Audit

## When to Apply

- User asks to "review all forms on the page" or "audit forms"
- User asks about specific input fields: "should this input be here?", "review input ids"
- User asks to review CTA buttons, call-to-action, or primary actions
- User wants a structured review of form fields and CTAs together

## Audit Workflow

### 1. Discover forms and inputs

For each form on the page (or in the given scope):

- List every **form control**: `<input>`, `<select>`, `<textarea>`, and any custom control that collects data.
- For each control, capture:
  - **id** (and whether it’s unique, stable, and used by `<label for="">`)
  - **name** (submission key)
  - **type** (text, email, tel, password, etc.)
  - **label** (visible and/or aria-label)
  - **required**, **placeholder**, **autocomplete** (if present)
  - **Purpose**: what the field is for in this form’s flow

### 2. Assess each input: should it be there?

For every field, answer:

- **Should this input be here?** (Yes / No / Conditional)
- **Reasoning**: necessity for the task, redundancy with other fields, UX (cognitive load, friction), security (e.g. unnecessary PII), conversion (abandonment risk), or accessibility (missing label/id).

Guidelines:

- **Remove or defer** fields that aren’t needed for the current step (e.g. optional details that can be collected later).
- **Prefer one purpose per field**; split or relabel if one input is doing two jobs.
- **Require only what’s necessary**; mark optional fields clearly.
- **IDs**: every input should have a unique `id` and a `<label for="that-id">` (or equivalent accessible name). Flag missing or duplicate ids.

### 3. Review CTA buttons

Identify every **primary call-to-action** (submit, sign up, buy, contact, etc.) and secondary actions:

- **Placement**: Is the main CTA visible without scrolling? Is it at a natural end of the form or flow?
- **Copy**: Is the button text specific and action-oriented (e.g. "Request quote" not "Submit")?
- **Hierarchy**: One clear primary CTA; secondary actions (Cancel, "Back") visually de-emphasized.
- **Accessibility**: Focusable, visible focus state, not disabled without explanation; associated with form if it submits that form.
- **Risk**: Buttons that look primary but do something destructive (e.g. delete) should look secondary or dangerous, not primary.

## Output Format

Produce a concise audit report:

```markdown
## Forms audit

### Form: [form name or purpose, e.g. "Contact form"]

| Field (id/name) | Type | Label | Should be here? | Notes |
|-----------------|------|-------|-----------------|-------|
| email           | email| Email | Yes             | Required; ensure id/label linked. |
| phone           | tel  | Phone | Conditional     | Optional; consider collecting later. |
...

### CTAs

| Location | Copy | Role | Assessment |
|----------|------|------|------------|
| Form footer | "Send message" | Primary submit | Good; consider "Request a quote" for clarity. |
...
```

## Integration

- For **accessibility and design consistency**, apply or reference the **ux-ui** skill and project **design_guidelines.json**.
- For **implementation details** (React, HTML, validation), use **frontend-developer** or **senior-frontend-mentor** as needed.
