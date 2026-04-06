# RQM Platform

RQM Technologies is a **quaternionic, compiler-first quantum software stack** built around SU(2)-native optimization, backend-agnostic public circuits, and workflow surfaces that extend from mathematical analysis to execution routing and Studio operations.

[:material-lightning-bolt: API Quickstart](api/quickstart.md){ .md-button .md-button--primary }
[:material-monitor: Studio Overview](applications/index.md){ .md-button }
[:material-book-open-variant: Architecture](architecture.md){ .md-button }

---

## What RQM is

RQM is not a generic SDK wrapper. It is a layered platform with clear technical boundaries:

| Layer | Repository | Current role |
|---|---|---|
| Mathematical spine | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Quaternion, spinor, SU(2), Bloch, validation, linear algebra, and coupling-analysis primitives |
| Optimization engine | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Internal optimization and rewriting after the public circuit boundary; canonical 1Q IR is `u1q` |
| Service boundary | `rqm-api` | HTTP intake for validation, analysis, optimization, execution routing, auth, billing, chat, and TTS |
| Workflow layer | `rqm-studio` | Visual and operational layer for theory, optimization, execution-oriented flows, jobs, and account surfaces |

The public circuit boundary remains **`rqm-circuits` schema `0.2`**. Internal compiler IR is separate by design.

---

## Where RQM fits in the stack

```text
client / SDK / Studio
        │
        ▼
rqm-api  ← service boundary, policy, readiness, routing
        │
        ▼
rqm-circuits 0.2  ← public wire format boundary
        │
        ▼
rqm-compiler  ← internal optimization and rewriting engine
        │
        ├── canonical internal 1Q IR: u1q
        └── explicit later lowering for backend targets
        │
        ▼
backend adapters / execution providers
```

This is how RQM stays **backend-agnostic at the public circuit boundary** while still allowing explicit backend-targeted lowering and execution when requested.

---

## What you can do now

- Fetch valid named example circuits from the API (`bell`, `ghz`, `optimizable`)
- Validate circuits against the current public schema and analyze them before optimization
- Run optimization through a compiler pipeline that normalizes, canonicalizes, lowers to `u1q`, merges compatible 1Q structure, and cancels eligible 2Q structure
- Inspect coupling / preservation signals through qualitative or measured analysis where supported
- Check execution readiness with `GET /v1/execute/capabilities` before exposing backend choices
- Route execution through Qiskit paths and Braket paths, including local simulation and held-job hardware flows where available
- Use Studio as the visual and workflow layer for theory, optimization, execution-oriented tasks, jobs, reports, and Pro/account surfaces

---

## Core platform boundaries

### `rqm-core`
Owns the mathematical foundation. That includes quaternion and SU(2) primitives, Bloch/state utilities, validation helpers, linear algebra, and the coupling / entanglement analysis primitives used to support trust and preservation analysis.

### `rqm-compiler`
Begins **after** the public `rqm-circuits` boundary. Named gates are lowered into the canonical internal single-qubit form `u1q`. Backend-targeted lowering is a later, explicit stage.

### `rqm-api`
Exposes the current service surface: circuits, coupling analysis, execution, authentication, billing/wallet, and media-oriented endpoints. Responses follow a stable operational envelope with `status`, `data` or `error`, and `meta`.

### `rqm-studio`
Sits on top of `rqm-api`. Studio is the product workflow layer, not the service boundary. It organizes user flows; the API remains canonical for service integration.

---

## Why the compiler-first model matters

RQM optimization is **proof-gated and fail-closed**.

- Only verified optimization candidates are committed
- If verification cannot be established, the original circuit is returned unchanged
- Backend-targeted lowering happens after optimization, not during public-circuit intake

That separation is central to the trust story: public interchange stays stable, optimization stays internal, and backend lowering stays explicit.

---

## What is still evolving

RQM documents some surfaces conservatively on purpose:

- Measured coupling analysis is **not** unrestricted; current measured coverage is limited and qualitative fallback remains part of the contract
- Some optimization profile and backend-hint combinations are currently equivalent or reserved in the current release
- Billing and Pro readiness do **not** by themselves guarantee hardware execution; provider readiness, credentials, validation, and quote/hold state still matter
- Studio covers broader product workflows today, but route-level maturity is not uniform enough to describe every surface as equally deep

---

## Start in the right place

| Goal | Page |
|---|---|
| Make your first API call | [API Quickstart](api/quickstart.md) |
| Understand the service surface | [API Overview](api/rqm-api-api.md) |
| Understand the visual/workflow layer | [Studio Overview](applications/index.md) |
| Understand platform boundaries | [Architecture](architecture.md) |
| Understand optimization semantics | [Optimization](optimization.md) |
| Understand the internal canonical IR | [Canonical IR (`u1q`)](compiler/canonical-ir.md) |
| Understand the broader stack | [Ecosystem](ecosystem.md) |
