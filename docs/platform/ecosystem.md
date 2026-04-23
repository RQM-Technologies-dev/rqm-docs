# Ecosystem

This page maps the main repositories in the current RQM stack.

---

## Repository map

| Repository | Primary role | Typical user |
|---|---|---|
| [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Math and analysis primitives | Compiler and analysis engineers |
| [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) | Canonical external circuit IR and schema | API and SDK integrators |
| [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Internal optimization engine and canonical internal IR (`u1q`) | Compiler engineers |
| `rqm-api` | Hosted service boundary for platform features | App and backend developers |
| [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Qiskit/IBM execution bridge | IBM/Qiskit teams |
| [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) | Braket execution bridge | AWS/Braket teams |
| [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) | PennyLane differentiable execution bridge | Variational workflow teams |
| `rqm-studio` | Browser workflow layer | Product users and operators |

---

## Practical interpretation

- Integrations should anchor to the public circuit boundary and API contracts.
- Internal optimization details are intentionally separated from external payloads.
- Backend-specific behavior lives in explicit execution bridges.
