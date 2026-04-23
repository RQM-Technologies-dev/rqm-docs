# Platform Overview

RQM is a layered platform with explicit boundaries between interchange, optimization, execution, and product workflows.

---

## Layer model

- **Public circuit boundary:** `rqm-circuits` defines the canonical external circuit IR (schema `0.2`).
- **Internal optimization engine:** `rqm-compiler` performs canonical optimization after public circuit intake.
- **Execution bridges:** `rqm-qiskit`, `rqm-braket`, and `rqm-pennylane` handle backend-facing lowering and routing.
- **Service boundary:** `rqm-api` provides validate/analyze/optimize, execution, auth, billing, and chat/TTS surfaces.
- **Workflow layer:** `rqm-studio` provides browser workflows for users and teams.

`rqm-core` supports the stack with shared quaternion, spinor, SU(2), Bloch, validation, and coupling-analysis primitives.

---

## Why this separation is useful

- External payload contracts stay stable.
- Optimization internals can evolve safely.
- Backend behavior stays explicit and auditable.
- Product workflows can iterate without changing API contracts.
