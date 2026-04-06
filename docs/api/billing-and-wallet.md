# Billing & Wallet

The billing surface in `rqm-api` covers account readiness, wallet visibility, spend policy, quote/hold orchestration, and Stripe-backed payment flows.

**Base URL:** `https://rqm-api.onrender.com`

---

## Current endpoints

### Account, wallet, and controls

- `GET /v1/billing/profile`
- `GET /v1/billing/summary`
- `GET /v1/billing/wallet`
- `GET /v1/billing/jobs`
- `GET /v1/billing/spend-controls`
- `PATCH /v1/billing/spend-controls`
- `GET /v1/billing/auto-recharge/attempts`
- `GET /v1/billing/recovery-status`
- `GET /v1/billing/dashboard`
- `POST /v1/billing/auto-recharge/test`

### Hardware quote / hold flow

- `POST /v1/billing/hardware/quote`
- `POST /v1/billing/hardware/hold`
- `POST /v1/billing/hardware/hold/{job_id}/release`

### Stripe surfaces

- `POST /v1/billing/stripe/customer`
- `POST /v1/billing/stripe/setup-intent`
- `POST /v1/billing/stripe/payment-intent`
- `POST /v1/billing/stripe/checkout-session`
- `POST /v1/billing/stripe/portal-session`
- `POST /v1/billing/stripe/reconcile-checkout`
- `POST /v1/billing/stripe/webhook`

---

## What each group is for

### Profile, summary, wallet, jobs, dashboard
These endpoints let clients present the operational account view: billing profile, current wallet state, job history, and summary/dashboard information.

### Spend controls and recovery
These endpoints exist so clients can expose policy and safety controls rather than treating billing as a black box.

### Quote, hold, release
This is the operational bridge between payment readiness and hardware-oriented execution flows. A client can request a quote, place a hold where required, and later release it.

### Stripe flows
These endpoints support customer/payment setup and ongoing billing operations, but they should be documented as payment infrastructure rather than proof of hardware execution entitlement.

---

## The most important billing truth

**Pro or billing readiness is not the same as guaranteed hardware access.**

Hardware execution still depends on:

- backend/provider readiness
- credentials
- deployment policy
- validation and execution checks
- quote / hold state where required

That distinction matters throughout Studio and API docs.

---

## Recommended hardware-oriented flow

1. authenticate
2. inspect account and wallet state
3. check execution capabilities
4. request a hardware quote if needed
5. place a hold if required
6. submit or continue execution
7. release the hold when appropriate

Related pages:

- [Authentication](authentication.md)
- [Execution](execution.md)
- [Execution Capabilities](execution-capabilities.md)
