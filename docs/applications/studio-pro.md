# Studio Pro

Studio Pro and account surfaces cover the managed parts of the product experience: identity, billing visibility, wallet state, dashboard views, and hardware-readiness operations.

---

## What belongs here

Studio Pro should be read as the UI layer over authenticated API surfaces such as:

- account diagnostics and current-user state
- billing profile, summary, and wallet state
- jobs and dashboard views
- spend controls and recovery status
- hardware quote / hold / release flows
- Stripe-backed customer and payment setup flows

---

## What Pro means operationally

Pro/account readiness supports managed workflows, but it does **not** itself guarantee hardware access.

Hardware-oriented execution still depends on:

- backend/provider readiness
- credentials
- deployment policy
- validation and execution checks
- quote / hold state where required

That is why Studio Pro should be described as a readiness and management surface, not as entitlement.

---

## Relationship to the API

Studio Pro depends on the same auth and billing endpoints documented in the API reference.

See:

- [Authentication](../api/authentication.md)
- [Billing & Wallet](../api/billing-and-wallet.md)
- [Execution Capabilities](../api/execution-capabilities.md)
