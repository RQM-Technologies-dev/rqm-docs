# RQM Studio

RQM Studio is the visual interface for the RQM platform. It integrates with `rqm-api` to provide a UI-driven workflow for circuit optimization, execution preparation, and result inspection — without writing code.

---

## What RQM Studio Does

| Capability | Description |
|---|---|
| [Optimize Circuits](optimize-circuits.md) | Reduce gate count and depth. Get back a cleaner circuit ready for execution. |
| [Verify Optimizations](verify-optimizations.md) | Confirm that optimization preserved circuit behavior. Inspect what changed and why. |
| [Visualize Quantum Geometry](visualize-quantum-geometry.md) | Explore circuit behavior through an interactive, geometry-native interface. |
| Execution preparation | Configure and submit optimized circuits to Qiskit or Braket backends |
| Result display | Inspect measurement counts and execution reports |

!!! note "Execution UI"
    Execution UI is enabled as backend support evolves. Current execution is available directly via the [API endpoints](../api/execution.md).

---

## How It Works

RQM Studio is a UI layer on top of `rqm-api`. Every action in Studio corresponds to an API call:

| Studio action | API call |
|---|---|
| Upload circuit | `POST /v1/circuits/validate` |
| Run optimization | `POST /v1/circuits/optimize` |
| Execute on Qiskit | `POST /v1/execute/qiskit` |
| Execute on Braket | `POST /v1/execute/braket` |
| View result | `GET /v1/execute/braket/{job_id}` |

---

## Getting Started

The fastest way to experience the RQM optimization + execution pipeline is through the live API:

1. Open the [Swagger UI](https://rqm-api.onrender.com/docs)
2. Fetch an example circuit with `GET /v1/circuits/example`
3. Submit it to `POST /v1/circuits/optimize`
4. Inspect the result — optimized circuit, gate count, depth, and optimization report
5. Optionally, execute via `POST /v1/execute/qiskit` or `POST /v1/execute/braket`

For a guided walkthrough, see the [API Quickstart](../api/quickstart.md).

---

🌐 **Website:** [https://rqmtechnologies.com](https://rqmtechnologies.com)
