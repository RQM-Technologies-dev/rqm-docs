# The RQM Ecosystem

RQM is an optimization-first quantum execution platform built from focused, composable packages. Each package has a distinct responsibility in the stack. They are designed to work together without duplicating logic across boundaries.

RQM sits between circuit creation and hardware execution, providing a geometry-aware optimization and execution pipeline that works with both IBM Qiskit and Amazon Braket.

---

## Foundation

### `rqm-core` — Canonical Math Engine

`rqm-core` defines the mathematical foundation of the platform. All quaternion operations, spinor normalizations, Bloch vector conversions, and SU(2) transformations originate here.

- **No backend dependency** — pure mathematics and linear algebra
- **Single source of truth** — all other packages import from `rqm-core`, not the other way around
- **Well-typed and testable** — designed for reliability and reproducibility

---

## Compiler

### `rqm-compiler` — Instruction Compiler

`rqm-compiler` sits between the math layer and the execution backends. It accepts backend-agnostic programs and produces a normalized intermediate representation (IR) that any backend can consume.

- **Depends on `rqm-core`** for gate matrix resolution
- **Backend-independent** — the compiler output is the same regardless of which backend will run the program
- **Canonical single-qubit IR** — `to_u1q_pass` converts all single-qubit gates to `u1q`, a complete SU(2) element encoded as a unit quaternion; see [Canonical IR (u1q)](compiler/canonical-ir.md)
- **Enables optimization passes** that apply once across all backends

### `rqm-optimize` — Optimization Layer

`rqm-optimize` applies SU(2)-aware circuit optimization and compression to compiled circuits before they are submitted to a backend. It uses quaternion composition from `rqm-core` to fuse, simplify, and reduce gate sequences with geometric correctness.

- **Depends on `rqm-core`** for SU(2) and quaternion primitives
- **Backend-compatible** — accepts circuits in compiler IR form before backend translation
- **Drop-in step** — insert between compilation and execution without restructuring the pipeline

See the [Optimization guide](optimization.md) for details and usage examples.

---

## Circuit Construction

### `rqm-circuits` — Circuit Construction Layer

`rqm-circuits` provides the high-level API for building quantum circuits using gates, registers, and circuit objects. It is the primary interface for composing programs before they are passed to the compiler.

- **Depends on `rqm-core`** for gate definitions and SU(2) primitives
- **Decoupled from execution** — circuits are backend-agnostic objects
- **Composes with `rqm-compiler`** — circuits are lowered to the `u1q` IR by the compiler

---

## API Layer

### `rqm-api` — User-Facing API

`rqm-api` is the top-level interface for submitting programs and retrieving results. It coordinates circuit construction, compilation, optimization, and backend dispatch in a single unified API.

- **Depends on `rqm-circuits`, `rqm-compiler`, and the execution backends**
- **Backend dispatch** — accepts a backend name or object and routes execution accordingly
- **Result contract** — returns normalized results regardless of which backend was used

---

## Execution Backends

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

### `rqm-pennylane` — PennyLane Integration

`rqm-pennylane` provides a PennyLane integration layer, exposing RQM circuits as PennyLane devices and supporting differentiable quantum workflows.

- **Depends on `rqm-compiler`** for the normalized IR
- **Exposes an RQM PennyLane device** compatible with PennyLane's execution and differentiation pipeline
- **Returns normalized results** compatible with the RQM result contract

---

## Learning

### `rqm-notebooks` — Demos and Learning

`rqm-notebooks` is a curated collection of Jupyter notebooks that guide users from first principles through practical quantum circuit execution.

- **Depends on `rqm-core` and execution backends**
- **Structured as a learning path** — notebooks are numbered and build on each other
- **Conceptual** — notebooks illustrate ideas and workflows, not production deployment patterns

---

## UI

### `rqm-studio` — Visual Interface

RQM Studio is the UI layer on top of `rqm-api`. It provides a visual interface for circuit optimization, execution preparation, and result inspection.

- **Integrates with `rqm-api`** — every Studio action corresponds to an API call
- **Supports optimization workflows** — upload, optimize, inspect, and compare circuits
- **Execution UI** — configure and submit circuits to Qiskit or Braket backends; display results
- **Execution UI is enabled as backend support evolves**

---

## Architecture Diagram

How data flows through the stack:

```
┌───────────────────────────────────────────────────────────────────┐
│                          UI Layer                                 │
│                        rqm-studio                                 │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                         User Layer                                │
│                  rqm-api          rqm-circuits                    │
└────────────────────────┬──────────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────────┐
│                      Compiler Layer                               │
│              rqm-compiler        rqm-optimize                     │
└──────┬────────────────────────────────────────┬────────────────────┘
       │                      │                 │
┌──────▼──────┐    ┌──────────▼────┐   ┌────────▼──────────┐
│ rqm-qiskit  │    │  rqm-braket   │   │  rqm-pennylane    │
│  (Qiskit)   │    │  (AWS Braket) │   │   (PennyLane)     │
└─────────────┘    └───────────────┘   └───────────────────┘
┌───────────────────────────────────────────────────────────────────┐
│                       Foundation Layer                            │
│                           rqm-core                                │
└───────────────────────────────────────────────────────────────────┘
```

```
User program (rqm-circuits)
    │
    ▼
rqm-api
  ├── rqm-compiler (gate resolution → u1q IR)
  │     └── rqm-optimize (optional: gate fusion, compression)
  │
  ├──────────────────────┬────────────────────┐
  ▼                      ▼                    ▼
rqm-qiskit          rqm-braket          rqm-pennylane
(Qiskit circuit)    (Braket circuit)    (PennyLane device)
  │                      │                    │
  └──────────────────────┴────────────────────┘
                          │
                    result.counts
```

---

## Navigating the Stack

| Goal | Where to go |
|---|---|
| Build a circuit | [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) + [Circuits API](api/rqm-circuits-api.md) |
| Optimize a circuit | [`rqm-api`](https://github.com/RQM-Technologies-dev/rqm-api) + [API Quickstart](api/quickstart.md) |
| Execute on Qiskit | [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) + [Execution reference](api/execution.md) |
| Execute on Braket | [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) + [Execution reference](api/execution.md) |
| Use the visual UI | [RQM Studio](https://rqmtechnologies.com) + [Studio docs](applications/index.md) |
| Understand the compiler | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) + [Architecture](architecture.md) |
| Understand the math | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) + [Concepts](concepts.md) |
| Run on PennyLane | [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) + [Backends overview](api/backends.md) |
| Optimize circuits (SDK) | [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) + [Optimization guide](optimization.md) |
| Learn interactively | [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) + [Notebooks guide](notebooks.md) |
| Read architecture rationale | [Architecture page](architecture.md) |
| Install packages | [Installation guide](installation.md) |
