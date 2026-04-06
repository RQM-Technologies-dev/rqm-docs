# Backends

RQM is **backend-agnostic at the public circuit boundary** and **explicit about backend targeting later**.

This page documents backend families from the perspective of the current stack, not from the perspective of internal compiler IR.

---

## Current backend families exposed through the API

| Backend hint or route | Current role |
|---|---|
| `generic` | Backend-neutral optimization/output posture |
| `qiskit` | Qiskit-facing optimization hint and execution route |
| `braket` | Braket-facing optimization hint and execution route |

At the API layer, these appear in optimization and execution workflows.

---

## Important distinction

A backend hint on `/v1/circuits/optimize` is not the same thing as execution routing, and neither is the same thing as internal compiler IR.

RQM keeps these concerns separate:

1. public circuit intake
2. internal optimization
3. optional explicit backend lowering
4. execution routing and readiness checks

---

## What to document conservatively

- some backend-hint behavior may be reserved or equivalent in the current release
- execution availability should be inspected through capabilities, not assumed from a backend name alone
- hardware-oriented flows still depend on provider readiness, credentials, and billing state

See:

- [Execution](execution.md)
- [Execution Capabilities](execution-capabilities.md)
- [Optimization](../optimization.md)
