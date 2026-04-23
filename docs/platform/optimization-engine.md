# Optimization Engine (`rqm-compiler`)

`rqm-compiler` is the internal optimization engine used after the public circuit boundary.

---

## Current pipeline semantics

The optimizer applies a canonical pass sequence:

1. `normalize`
2. `canonicalize`
3. `flatten`
4. `to_u1q`
5. `merge_u1q`
6. `sign_canon`
7. `cancel_2q`

Canonical internal single-qubit IR: **`u1q`**.

---

## Why this is internal

The internal optimization engine is intentionally separated from public payload contracts so the compiler can evolve without breaking external integrations.

---

## Trust behavior

Optimization is proof-gated and fail-closed:

- candidate rewrites are verified before commit
- unverified rewrites are not committed
- the original circuit is returned unchanged when verification is not established
