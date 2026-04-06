# `rqm-core`

`rqm-core` is the **mathematical spine** of the RQM stack.

It owns the shared primitives that other layers depend on: quaternion algebra, spinors, SU(2), Bloch/state mappings, validation, linear algebra, and the coupling / preservation analysis surfaces that support optimization trust.

---

## What `rqm-core` owns now

- quaternion primitives and conversions
- spinor helpers and normalization
- SU(2) construction and validation
- Bloch/state mappings
- shared validation and linear algebra helpers
- coupling / entanglement analysis primitives
- optimization-preservation analysis support

This is broader than a generic math utility package. It is the substrate used by both the compiler and analysis layers.

---

## Coupling-analysis support

One of the important current changes is that `rqm-core` now includes coupling / entanglement analysis primitives.

The docs should describe this honestly:

- there are **qualitative** and **measured** analysis modes
- measured scope is limited
- unsupported cases should not be described as unrestricted measured entanglement analysis

This same analysis support also underpins preservation-oriented checks used in optimization trust workflows.

---

## Why this matters to the rest of the stack

- `rqm-compiler` depends on `rqm-core` for canonical mathematical meaning
- `rqm-api` exposes coupling-analysis endpoints built on these primitives
- Studio can surface analysis and preservation signals without re-implementing the math

---

## Boundary language

`rqm-core` does **not** own:

- the public circuit schema
- compiler rewrites or optimization policy
- API service boundaries
- Studio workflow state
- provider execution logic

Those live in higher layers.

---

## Next pages

- [Coupling Analysis](coupling-analysis.md)
- [Architecture](../architecture.md)
- [Optimization](../optimization.md)
