# `rqm-api` Overview

`rqm-api` is the **canonical service boundary** for the current RQM platform. It sits above the public `rqm-circuits` wire format and coordinates validation, analysis, optimization, execution readiness, execution routing, account state, billing surfaces, and selected media endpoints.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-lightning-bolt: API Quickstart](quickstart.md){ .md-button }

---

## Circuits

Current circuit endpoints:

- `POST /v1/circuits/validate`
- `POST /v1/circuits/analyze`
- `POST /v1/circuits/optimize`
- `GET /v1/circuits/example`

Important semantics:

- Public wire format is **`rqm-circuits` schema `0.2`**
- Legacy `0.1` may still be accepted for compatibility, but `0.2` is current
- `GET /v1/circuits/example` supports `bell`, `ghz`, and `optimizable`; omitting `name` returns all examples
- `/v1/circuits/analyze` includes compatibility entanglement enrichment
- `/v1/circuits/optimize` accepts optimization `profile` (`safe`, `balanced`, `aggressive`) and backend hint (`generic`, `qiskit`, `braket`)

This surface should be read as the public intake layer above the compiler, not as a description of internal IR.

---

## Coupling analysis

Current analysis endpoints:

- `POST /v1/analysis/coupling`
- `POST /v1/analysis/coupling/compare`

These endpoints expose coupling / preservation analysis derived from the `rqm-core` analysis primitives. They are especially useful when optimization trust matters, but the docs describe them conservatively:

- qualitative and measured modes are distinct
- measured scope is limited
- fallback to qualitative analysis is part of the design, not a failure mode

See [Coupling Analysis](coupling-analysis.md).

---

## Execution

Current execution endpoints:

- `POST /v1/execute/qiskit`
- `POST /v1/execute/braket`
- `POST /v1/execute/braket/held/{job_id}`
- `GET /v1/execute/braket/devices`
- `GET /v1/execute/braket/{job_id}`
- `GET /v1/execute/capabilities`

The important boundary is **readiness before routing**. Clients should check capabilities before exposing provider-specific options. Qiskit, Braket local simulation, and held/billed hardware flows have different operational requirements.

See:

- [Execution](execution.md)
- [Execution Capabilities](execution-capabilities.md)

---

## Authentication

Current auth endpoints:

- `GET /v1/auth/diagnostics`
- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `POST /v1/auth/logout`

These endpoints support the bearer-session model used for account, Pro, billing, and managed workflow surfaces.

See [Authentication](authentication.md).

---

## Billing & wallet

Current billing and wallet endpoints:

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
- `POST /v1/billing/hardware/quote`
- `POST /v1/billing/hardware/hold`
- `POST /v1/billing/hardware/hold/{job_id}/release`
- `POST /v1/billing/stripe/customer`
- `POST /v1/billing/stripe/setup-intent`
- `POST /v1/billing/stripe/payment-intent`
- `POST /v1/billing/stripe/checkout-session`
- `POST /v1/billing/stripe/portal-session`
- `POST /v1/billing/stripe/reconcile-checkout`
- `POST /v1/billing/stripe/webhook`

These surfaces describe payment readiness, wallet state, and hardware quote/hold orchestration. They do **not** imply guaranteed hardware access by themselves.

See [Billing & Wallet](billing-and-wallet.md).

---

## Chat & TTS

Current media-oriented endpoints:

- `POST /v1/chat`
- `POST /v1/tts`

These sit beside the core circuit workflows. Availability may depend on deployment configuration.

See [Chat & TTS](chat-and-tts.md).

---

## Response envelope and operational notes

The API uses a consistent response shape:

### Success

```json
{
  "status": "ok",
  "data": {},
  "meta": {}
}
```

### Error

```json
{
  "status": "error",
  "error": {},
  "meta": {}
}
```

`meta` includes:

- `version`
- `request_id`
- `processing_time_ms`

Operationally important truths:

- the API boundary is public; internal compiler IR is not
- capabilities should be checked before exposing execution choices
- optimization remains proof-gated and fail-closed under the hood
- billing or Stripe readiness is not equivalent to backend/provider entitlement
- Studio sits on top of this API; Studio is not a replacement for the service contract
