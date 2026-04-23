# Canonical Circuit Boundary (`rqm-circuits`)

`rqm-circuits` is the canonical external circuit IR for platform integrations.

---

## What this boundary guarantees

- A stable wire format for public payload exchange.
- Clear separation from internal optimizer representations.
- Consistent API intake for validation, analysis, optimization, and execution workflows.

Current public schema target: **`0.2`**.

---

## Boundary guidance

Use `rqm-circuits` when you:

- submit circuits to `rqm-api`
- exchange payloads between services or partners
- need a backend-agnostic circuit contract

Do not treat internal canonical IR (`u1q`) as a public payload contract.
