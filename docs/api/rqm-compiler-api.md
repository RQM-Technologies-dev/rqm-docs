# `rqm-compiler`

`rqm-compiler` is the **internal optimization and rewriting engine** of the RQM stack.

It sits **after** the public `rqm-circuits` boundary and owns the internal circuit model, canonical optimization pipeline, and explicit backend-targeted lowering stages.

---

## What `rqm-compiler` owns now

- the internal compiler circuit model
- optimization and rewriting passes
- canonical internal single-qubit IR: `u1q`
- proof-gated optimization commit semantics
- explicit backend-targeted lowering via `lower_circuit_for_backend(...)`
- explicit compile-and-lower flows via `compile_for_backend(...)`

---

## Current optimization semantics

The current optimization pipeline includes:

- `normalize`
- `canonicalize`
- `flatten`
- `to_u1q`
- `merge_u1q`
- `sign_canon`
- `cancel_2q`

Named single-qubit gates are lowered to `u1q`; backend-targeted lowering comes later.

---

## The trust contract

`rqm-compiler` optimization is **proof-gated and fail-closed**.

That means:

- a candidate optimized circuit may be built internally
- the candidate is verified before commit
- only verified candidates are committed
- if verification is not established, the original circuit is returned unchanged

This is the key public semantic to preserve when documenting the compiler.

---

## What `rqm-compiler` does not own

- the canonical public circuit schema or API payload contract
- auth, billing, or execution policy
- Studio workflows
- the quaternion / SU(2) math primitives themselves

Those responsibilities belong to `rqm-circuits`, `rqm-api`, `rqm-studio`, and `rqm-core` respectively.

---

## Related pages

- [Canonical IR (`u1q`)](../compiler/canonical-ir.md)
- [Optimization](../optimization.md)
- [Architecture](../architecture.md)
