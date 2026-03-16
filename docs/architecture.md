# Architecture

This page explains the layering and dependency philosophy of the RQM ecosystem, and why the stack is organized the way it is.

---

## Design Principles

### 1. Canonical math lives in `rqm-core`

`rqm-core` is the single source of truth for all quaternion algebra, spinor representations, Bloch vector geometry, and SU(2) group operations. No other repository in the ecosystem duplicates this logic.

If you need to compute a spinor normalization, convert to a Bloch vector, or construct an SU(2) rotation matrix — that implementation belongs in `rqm-core`.

### 2. Execution lives in `rqm-qiskit`

`rqm-qiskit` is the bridge between the mathematical abstractions in `rqm-core` and the Qiskit circuit framework. It does not re-implement math; it maps it.

State preparation, gate construction, and simulator interaction belong here. The dependency direction is strictly one way: `rqm-qiskit` imports from `rqm-core`, never the reverse.

### 3. Teaching lives in `rqm-notebooks`

`rqm-notebooks` provides the guided learning experience. Notebooks demonstrate how to use both `rqm-core` and `rqm-qiskit` together to explore quantum geometry and run circuits.

Notebooks are allowed to be exploratory and pedagogical, but they do not define new math or new library functions.

### 4. Documentation lives in `rqm-docs`

`rqm-docs` (this site) organizes and explains the ecosystem. It does not introduce new algorithms, theory, or notebook content. Its job is to make everything else discoverable, understandable, and usable.

---

## Dependency Graph

```
rqm-notebooks ──► rqm-qiskit ──► rqm-core
                       └─────────────► rqm-core
```

- `rqm-core` has no ecosystem dependencies.
- `rqm-qiskit` depends on `rqm-core`.
- `rqm-notebooks` depends on both `rqm-core` and `rqm-qiskit`.
- `rqm-docs` references all three but has no runtime dependency on any of them.

---

## Layer Summary

| Layer | Repository | Responsibility |
|---|---|---|
| Math | `rqm-core` | Defines canonical representations and operations |
| Execution | `rqm-qiskit` | Maps math to Qiskit circuits and simulators |
| Learning | `rqm-notebooks` | Teaches and demonstrates the ecosystem through notebooks |
| Documentation | `rqm-docs` | Explains, organizes, and guides users |

---

## What Belongs Where

| Content Type | Correct Repository |
|---|---|
| Quaternion multiplication | `rqm-core` |
| Bloch vector conversion | `rqm-core` |
| SU(2) matrix construction | `rqm-core` |
| Qiskit gate from spinor | `rqm-qiskit` |
| Circuit execution helpers | `rqm-qiskit` |
| State vector extraction | `rqm-qiskit` |
| Tutorial notebook | `rqm-notebooks` |
| Concept explanation | `rqm-docs` |
| API reference guide | `rqm-docs` |

---

## Why Not One Big Repo?

Separating concerns across repositories gives each layer a clear scope:

- It keeps `rqm-core` dependency-light and testable in isolation.
- It allows `rqm-qiskit` to evolve with Qiskit without touching the math.
- It allows notebooks to be updated as learning content without affecting production code.
- It ensures that documentation can be maintained, versioned, and deployed independently.

Monorepos trade clarity for convenience. For an ecosystem centered on mathematical correctness and pedagogical value, clear boundaries are worth the additional structure.
