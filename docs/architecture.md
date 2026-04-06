# Architecture

The RQM stack is easiest to understand if you keep four boundaries separate:

1. **public wire format**
2. **internal optimization IR**
3. **service boundary**
4. **Studio workflow layer**

---

## The boundary model

```text
Studio
  ↓
rqm-api                      ← service boundary
  ↓
rqm-circuits schema 0.2      ← public wire format boundary
  ↓
rqm-compiler                 ← internal optimization and rewriting engine
  ↓
u1q                          ← canonical internal 1Q optimization IR
  ↓
explicit backend lowering    ← later, target-specific stage
```

This boundary language matters because RQM is intentionally **backend-agnostic at the public circuit boundary** while still supporting explicit backend-targeted lowering later in the flow.

---

## `rqm-core` is the mathematical spine

`rqm-core` owns the shared mathematical and analytical substrate:

- quaternion primitives
- spinor helpers
- SU(2) utilities
- Bloch/state mappings
- validation and linear algebra helpers
- coupling / entanglement analysis primitives
- optimization-preservation analysis support

That makes `rqm-core` more than a small math helper package. It is the foundation for both compiler semantics and trust surfaces.

---

## `rqm-circuits` is the public wire format boundary

Public callers, API clients, and Studio workflows should think in terms of `rqm-circuits`, not internal compiler descriptors.

Important boundary rules:

- `rqm-circuits` schema `0.2` is the current public format
- legacy `0.1` may still appear for compatibility
- public circuits are the interchange layer
- internal IR should not be documented as the public payload contract

---

## `rqm-compiler` is the internal optimization engine

`rqm-compiler` begins **after** the public circuit boundary. It owns the internal circuit model, optimization passes, and explicit lowering stages.

Current public optimization semantics include:

- `normalize`
- `canonicalize`
- `flatten`
- `to_u1q`
- `merge_u1q`
- `sign_canon`
- `cancel_2q`

Named single-qubit gates are lowered to `u1q`, the canonical internal 1Q IR.

---

## `u1q` is internal by design

`u1q` is central, but it is **not** the public wire format.

Why that separation exists:

- public callers should exchange portable circuits, not internal optimization forms
- the optimizer benefits from a canonical 1Q representation
- backend-targeted lowering must remain explicit and later
- Studio can explain `u1q` without requiring users to author it directly

---

## Optimization is proof-gated and fail-closed

This is a core architecture rule, not just an implementation detail.

- candidate rewrites are verified before commit
- only verified candidates are committed
- if verification is not established, the original circuit is returned unchanged

That behavior protects the public service contract from uncertain optimization output.

---

## Backend lowering happens later and explicitly

The current docs should distinguish optimization from target selection.

Explicit backend-targeted lowering exists via:

- `lower_circuit_for_backend(...)`
- `compile_for_backend(...)`

This means backend targeting is a later stage layered on top of the canonical optimization pipeline, not a replacement for it.

---

## `rqm-api` is the service boundary

`rqm-api` is where public service concerns live:

- circuit validation, analysis, optimization
- coupling-analysis endpoints
- execution readiness and routing
- auth and identity
- billing / wallet / hardware quote/hold surfaces
- chat and TTS

The API returns a stable operational envelope and hides the internal optimizer boundary behind a consistent service surface.

---

## Studio is the workflow layer

Studio sits above the API. It can expose theory, optimization, execution-oriented workflows, jobs, and account surfaces, but it is **not** the canonical service contract.

That distinction keeps product workflows flexible while preserving clean integration boundaries.
