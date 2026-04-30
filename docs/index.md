# RQM Platform Documentation

RQM is a quantum software platform for circuit optimization, execution routing, and geometry-native analysis.

[:material-rocket-launch: Quickstart](getting-started/quickstart.md){ .md-button .md-button--primary }
[:material-view-dashboard-outline: Platform Overview](platform/overview.md){ .md-button }
[:material-api: API Overview](api/overview.md){ .md-button }
[:material-robot-outline: Connect an Agent](agents/index.md){ .md-button .md-button--primary }

---

## Agent-ready docs

RQM documentation now ships both human-readable guides and machine-readable agent entrypoints. Start with `/llms.txt`, then use `/llms-full.txt`, `/capabilities.json`, [API Overview](api/overview.md), and [Swagger UI](https://rqm-api.onrender.com/docs) to ground implementation choices in documented behavior.

## What the platform does

RQM helps teams move from circuit payloads to production-facing execution workflows:

- validate and analyze circuits against the **canonical external circuit IR** (`rqm-circuits`, schema `0.2`)
- optimize circuits through an **internal optimization engine** (`rqm-compiler`) with canonical internal 1Q IR `u1q`
- route execution through explicit **execution bridges** for Qiskit/IBM and Amazon Braket paths
- provide a browser **workflow layer** through RQM Studio

---

## How the stack is organized

```text
Client / Studio / SDK
        |
        v
rqm-api                      <- service boundary
        |
        v
rqm-circuits (schema 0.2)    <- public circuit boundary
        |
        v
rqm-compiler                 <- internal optimization engine
        |
        v
execution bridges            <- rqm-qiskit, rqm-braket, rqm-pennylane
        |
        v
providers / simulators
```

`rqm-core` provides shared math and analysis primitives used across these layers.

---

## Core repositories

| Repository | Role | Who it is for |
|---|---|---|
| [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Mathematical spine: quaternion, spinor, SU(2), Bloch, validation, linear algebra, coupling analysis | Compiler and analysis engineers |
| [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) | Canonical external circuit IR and stable wire format (`0.2`) | API consumers and SDK integrators |
| [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Internal optimization engine and canonical internal 1Q IR (`u1q`) | Compiler engineers and optimization evaluators |
| `rqm-api` | FastAPI service boundary for validate/analyze/optimize, execution, billing, auth, jobs, chat/TTS | Application developers and platform integrators |
| [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Execution bridge for Qiskit/IBM paths | Teams targeting IBM/Qiskit environments |
| [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) | Execution bridge for Amazon Braket paths | Teams targeting AWS Braket environments |
| [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) | Execution bridge for differentiable and variational workflows | Variational and ML-oriented teams |
| `rqm-studio` | Browser workflow layer across optimization, execution workflows, and account surfaces | Studio users and product operations teams |

---

## Why this architecture matters

- **Stable public circuit boundary:** client payloads remain portable and predictable.
- **Internal optimization separation:** compiler internals can evolve without changing public payload contracts.
- **Explicit backend lowering:** provider-specific transforms happen in dedicated execution bridges.
- **Trust posture:** optimization is proof-gated and fail-closed, with verification surfaces exposed at the product boundary.
- **Product/service separation:** the workflow layer remains decoupled from the service API.

---

## Start here

| Audience | Start with |
|---|---|
| Developer | [Quickstart](getting-started/quickstart.md) and [API Overview](api/overview.md) |
| Studio user | [RQM Studio](products/rqm-studio.md) and [Execution Workflows](products/execution-workflows.md) |
| Evaluator / partner | [Platform Architecture](platform/architecture.md) and [Verification / Trust](products/verification-trust.md) |
