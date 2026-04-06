# Optimization

Optimization in the current RQM stack is owned by `rqm-compiler` and should be understood as an **internal, verified rewriting pipeline** that begins after the public `rqm-circuits` boundary.

---

## The current pipeline

The public semantics exposed by the current stack include these stages:

1. `normalize`
2. `canonicalize`
3. `flatten`
4. `to_u1q`
5. `merge_u1q`
6. `sign_canon`
7. `cancel_2q`

This pipeline does not blur public wire format with internal optimization IR. Public callers submit `rqm-circuits`; the compiler runs the internal passes.

---

## What the passes are doing

### Normalization and canonicalization
These early stages clean up representation and prepare the circuit for reliable internal reasoning.

### Lowering to canonical internal IR
`to_u1q` lowers named single-qubit gates into the canonical internal 1Q form `u1q`.

### Merge and cancel stages
`merge_u1q` combines compatible single-qubit structure after lowering. `cancel_2q` removes eligible two-qubit redundancy where verification supports doing so. `sign_canon` keeps sign conventions canonical so equivalent forms compare cleanly.

---

## Trust semantics

Optimization is **proof-gated and fail-closed**.

That means:

- the compiler may build an optimized candidate internally
- the candidate is verified before commit
- only verified candidates become the returned optimized circuit
- if verification is unsupported, fails, or is not established, the original circuit is returned unchanged

This is the most important thing to preserve when describing RQM optimization. It is not an opportunistic best-effort rewrite surface.

---

## Profiles in the API

`POST /v1/circuits/optimize` accepts:

- `safe`
- `balanced` (default)
- `aggressive`

The docs should stay honest here: some current profile behavior may be equivalent or reserved in the present release. Clients can still use the stable request contract without assuming that every profile produces a distinct optimization regime today.

---

## Backend hints are not backend lowering

The optimize endpoint also accepts backend hints such as `generic`, `qiskit`, and `braket`.

Those hints should not be confused with the explicit backend-targeted lowering stage. In RQM's architecture, canonical optimization happens first; later lowering is separate and explicit.
