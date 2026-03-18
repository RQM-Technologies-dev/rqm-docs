# The RQM Ecosystem

RQM is a compiler-first quantum software platform built from focused, composable packages. Each package has a distinct responsibility. They are designed to work together without duplicating logic across boundaries.

---

## Repository Roles

### `rqm-core` — Canonical Math Engine

`rqm-core` defines the mathematical foundation of the platform. All quaternion operations, spinor normalizations, Bloch vector conversions, and SU(2) transformations originate here.

- **No backend dependency** — pure mathematics and linear algebra
- **Single source of truth** — all other packages import from `rqm-core`, not the other way around
- **Well-typed and testable** — designed for reliability and reproducibility

### `rqm-compiler` — Instruction Compiler

`rqm-compiler` sits between the math layer and the execution backends. It accepts backend-agnostic programs and produces a normalized intermediate representation (IR) that any backend can consume.

- **Depends on `rqm-core`** for gate matrix resolution
- **Backend-independent** — the compiler output is the same regardless of which backend will run the program
- **Enables optimization passes** that apply once across all backends

### `rqm-qiskit` — Qiskit Execution Backend

`rqm-qiskit` translates the compiler IR into Qiskit circuits and runs them on the Aer simulator or IBM hardware.

- **Depends on `rqm-compiler`** for the normalized IR
- **Exposes `QiskitBackend`** with `run_local()` and `run_device()` methods
- **Returns normalized results** compatible with the RQM result contract

### `rqm-braket` — AWS Braket Execution Backend

`rqm-braket` translates the compiler IR into Amazon Braket circuits and runs them locally or on AWS quantum hardware.

- **Depends on `rqm-compiler`** for the normalized IR
- **Exposes `BraketBackend`** with `run_local()` and `run_device()` methods
- **Returns normalized results** compatible with the RQM result contract

### `rqm-optimize` — Optimization Layer

`rqm-optimize` applies SU(2)-aware circuit optimization and compression to compiled circuits before they are submitted to a backend. It uses quaternion composition from `rqm-core` to fuse, simplify, and reduce gate sequences with geometric correctness.

- **Depends on `rqm-core`** for SU(2) and quaternion primitives
- **Backend-compatible** — accepts circuits already translated to a backend format (Qiskit or Braket)
- **Drop-in step** — insert `optimize(qc)` between translation and execution without restructuring the pipeline

See the [Optimization guide](optimization.md) for details and usage examples.

### `rqm-pennylane` — Differentiable and Variational Workflow Layer

`rqm-pennylane` integrates the RQM stack with [PennyLane](https://pennylane.ai/) to support differentiable quantum computing and variational algorithms. It exposes the RQM compiler and execution pipeline through PennyLane's device interface, enabling gradient-based optimization, quantum machine learning, and variational circuit workflows.

- **Depends on `rqm-compiler`** for the normalized IR
- **PennyLane-compatible device** — plug-in replacement for other PennyLane devices
- **Supports `grad`, `qnode`, and variational optimizers** through PennyLane's standard interface
- **Bridges RQM's geometry-correct math** with PennyLane's automatic differentiation engine

### `rqm-notebooks` — Demos and Learning

`rqm-notebooks` is a curated collection of Jupyter notebooks that guide users from first principles through practical quantum circuit execution.

- **Depends on `rqm-core` and execution backends**
- **Structured as a learning path** — notebooks are numbered and build on each other
- **Serves as living documentation** of how the platform is used in practice

---

## Architecture Diagram

```
rqm-core       → canonical math (quaternions, spinors, SU(2))
rqm-compiler   → instruction generation and normalization
rqm-qiskit     → execution bridge (Qiskit)
rqm-braket     → execution bridge (AWS Braket)
rqm-optimize   → optimization layer (SU(2)-aware gate fusion and compression)
rqm-pennylane  → differentiable and variational workflow layer (PennyLane)
```

```
┌──────────────────────────────────────────────────────────┐
│                        rqm-docs                          │
│          (documentation, guides, API reference)          │
└────────────────────────┬─────────────────────────────────┘
                         │ references
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌─────────────┐ ┌──────────────┐ ┌───────────────┐
  │  rqm-core   │ │ rqm-compiler │ │ rqm-notebooks │
  │ (math/core) │◄│  (compiler)  │ │  (learning)   │
  └──────┬──────┘ └──────┬───────┘ └───────────────┘
         │               │
         │   ┌───────────┴───────────┬──────────────────────┐
         │   ▼                       ▼                      ▼
         │ ┌─────────────┐        ┌──────────────┐  ┌──────────────────┐
         │ │ rqm-qiskit  │        │  rqm-braket  │  │  rqm-pennylane   │
         │ │  (Qiskit)   │        │   (Braket)   │  │  (variational /  │
         │ └──────┬──────┘        └──────┬───────┘  │  differentiable) │
         │        │                      │           └──────────────────┘
         │        └──────────┬───────────┘
         │                   ▼
         │        ┌─────────────────────┐
         └───────►│   rqm-optimize      │
                  │ (SU(2) gate fusion) │
                  └─────────────────────┘
```

> **Note:** `rqm-pennylane` depends on `rqm-compiler` in the same way as the execution backends, but serves a distinct purpose: it provides a PennyLane device interface for variational and differentiable workflows (gradient-based optimization, QML). It does not pass through `rqm-optimize`, which operates on circuits already in a backend format.

---

## Navigating the Stack

| Goal | Where to go |
|---|---|
| Understand the math | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) source + [Concepts](concepts.md) |
| Understand the compiler | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) + [Architecture](architecture.md) |
| Run on Qiskit | [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) + [API guide](api/rqm-qiskit-api.md) |
| Run on Braket | [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) |
| Differentiable / variational workflows | [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) + [API guide](api/rqm-pennylane-api.md) |
| Optimize circuits | [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) + [Optimization guide](optimization.md) |
| Learn interactively | [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) + [Notebooks guide](notebooks.md) |
| Read architecture rationale | [Architecture page](architecture.md) |
| Install packages | [Installation guide](installation.md) |
