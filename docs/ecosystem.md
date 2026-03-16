# The RQM Ecosystem

The RQM ecosystem is composed of four focused repositories. Each one has a distinct responsibility, and they are designed to be used together without duplicating logic across boundaries.

---

## Repository Roles

### `rqm-core` — Canonical Math Engine

`rqm-core` defines the mathematical foundation of the ecosystem. All quaternion operations, spinor normalizations, Bloch vector conversions, and SU(2) transformations originate here.

- **No Qiskit dependency** — pure mathematics and linear algebra
- **Single source of truth** — other repos import from `rqm-core`, not the other way around
- **Well-typed and testable** — designed for reliability and reproducibility

### `rqm-qiskit` — Execution Bridge

`rqm-qiskit` takes the mathematical objects defined in `rqm-core` and maps them onto Qiskit circuits, gates, and simulators.

- **Depends on `rqm-core`** for all math
- **Exposes state preparation utilities** that accept RQM spinors and quaternions
- **Provides simulator helpers** for running and extracting results from Qiskit circuits

### `rqm-notebooks` — Demos and Learning

`rqm-notebooks` is a curated collection of Jupyter notebooks that guide users from first principles through practical quantum circuit execution.

- **Depends on both `rqm-core` and `rqm-qiskit`**
- **Structured as a learning path** — notebooks are numbered and build on each other
- **Serves as living documentation** of how the ecosystem is used in practice

### `rqm-docs` — Official Documentation (this site)

`rqm-docs` is the unified documentation layer. It does not introduce new math, algorithms, or notebook content — it explains, organizes, and guides users through the ecosystem.

---

## Architecture Diagram

```
┌──────────────────────────────────────────────────────────┐
│                        rqm-docs                          │
│          (documentation, guides, API reference)          │
└────────────────────────┬─────────────────────────────────┘
                         │ references
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌─────────────┐ ┌──────────────┐ ┌───────────────┐
  │  rqm-core   │ │ rqm-qiskit   │ │ rqm-notebooks │
  │ (math/core) │◄│(exec bridge) │ │  (learning)   │
  └─────────────┘ └──────────────┘ └───────────────┘
         ▲                 ▲
         └─────────────────┘
          rqm-qiskit and rqm-notebooks
          both depend on rqm-core
```

---

## Navigating the Stack

| Goal | Where to go |
|---|---|
| Understand the math | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) source + [Concepts](concepts/quaternion-intuition.md) pages |
| Run a quantum circuit | [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) + [API guide](api/rqm-qiskit-api.md) |
| Learn interactively | [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) + [Notebooks guide](notebooks.md) |
| Read architecture rationale | [Architecture page](architecture.md) |
| Install packages | [Installation guide](installation.md) |
