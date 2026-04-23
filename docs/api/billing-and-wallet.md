# Billing & Wallet

Billing endpoints support account readiness, wallet visibility, spend controls, and hardware quote/hold workflows.

**Base URL:** `https://rqm-api.onrender.com`

---

## Endpoint groups

### Account and wallet

- `GET /v1/billing/profile`
- `GET /v1/billing/summary`
- `GET /v1/billing/wallet`
- `GET /v1/billing/jobs`
- `GET /v1/billing/dashboard`

### Spend controls and recovery

- `GET /v1/billing/spend-controls`
- `PATCH /v1/billing/spend-controls`
- `GET /v1/billing/auto-recharge/attempts`
- `GET /v1/billing/recovery-status`
- `POST /v1/billing/auto-recharge/test`

### Hardware quote / hold

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

## Operational note

Billing readiness supports execution workflows but does not guarantee provider-side hardware availability.
