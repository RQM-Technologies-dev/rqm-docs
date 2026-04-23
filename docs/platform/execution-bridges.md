# Execution Bridges

Execution bridges convert optimized circuits into backend-facing routes.

---

## Bridge roles

| Bridge | Role |
|---|---|
| `rqm-qiskit` | Lowering and execution bridge for Qiskit/IBM paths |
| `rqm-braket` | Lowering and execution bridge for Amazon Braket paths |
| `rqm-pennylane` | Lowering and integration bridge for PennyLane workflows |

---

## Execution posture

- Keep public payload exchange at the public circuit boundary.
- Run optimization in the internal optimization engine.
- Perform backend-specific lowering in execution bridges.
- Check readiness before exposing provider choices.
