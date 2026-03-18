# Architecture

This page explains the layering and dependency philosophy of the RQM platform, and why the stack is organized the way it is.

---

## Design Principles

### 1. Canonical math lives in `rqm-core`

`rqm-core` is the single source of truth for all quaternion algebra, spinor representations, Bloch vector geometry, and SU(2) group operations. No other package in the platform duplicates this logic.

If you need to compute a spinor normalization, convert to a Bloch vector, or construct an SU(2) rotation matrix — that implementation belongs in `rqm-core`.

### 2. Compilation lives in `rqm-compiler`

`rqm-compiler` is the bridge between the math layer and execution backends. It accepts backend-agnostic programs and produces a normalized instruction set that any backend can consume.

The compiler resolves logical gate names to explicit unitary matrices using `rqm-core` primitives. It applies normalization passes to ensure the IR is backend-ready. Backends do not perform gate resolution — that work is done once at the compiler level.

### 3. Execution lives in the backend packages

`rqm-qiskit` and `rqm-braket` are execution backends. They translate the compiler IR into their respective native circuit formats and run them on simulators or hardware.

Neither backend reimplements math or compilation logic. They each implement the same interface contract, which is why the same program runs on either backend without modification.

### 4. Optimization lives in `rqm-optimize`

`rqm-optimize` is the optimization layer. It accepts circuits already translated to a backend format and applies SU(2)-aware passes — gate fusion, redundancy elimination, and depth reduction — using exact quaternion arithmetic from `rqm-core`.

Optimization is a post-compilation, pre-execution step. It is optional for simulation but recommended for hardware runs where gate count directly affects decoherence.

### 5. Differentiable workflows live in `rqm-pennylane`

`rqm-pennylane` exposes the RQM compiler and execution pipeline through [PennyLane](https://pennylane.ai/)'s device interface. It enables gradient-based optimization, quantum machine learning, and variational circuit workflows — such as VQE and QAOA — without leaving the RQM stack.

Variational workflows depend on the compiler and execution layers but do not modify them. `rqm-pennylane` is an additive layer: it does not change how compilation or execution work, it extends the platform to support differentiable programming.

### 6. Documentation lives in `rqm-docs`

`rqm-docs` (this site) organizes and explains the platform. It does not introduce new algorithms, theory, or notebook content. Its job is to make everything else discoverable, understandable, and usable.

---

## Compiler-First Pipeline

The full lowering path from program to result:

```
RQMGate list
    │
    ▼
rqm-compiler
  (normalize gates, resolve matrices, produce IR)
    │
    ├──────────────────┐
    ▼                  ▼
rqm-qiskit        rqm-braket
(Qiskit circuit)  (Braket circuit)
    │                  │
    └────────┬─────────┘
             ▼
        rqm-optimize
  (SU(2) fusion, compression)
             │
    ┌────────┴─────────┐
    ▼                  ▼
simulator/hardware  simulator/hardware
    │                  │
    ▼                  ▼
result.counts      result.counts
```

The program is defined once. The compiler processes it once. Execution backends are interchangeable.

---

## Dependency Graph

```
rqm-braket      ──► rqm-compiler ──► rqm-core
rqm-qiskit      ──► rqm-compiler ──► rqm-core
rqm-pennylane   ──► rqm-compiler ──► rqm-core
rqm-optimize    ──► rqm-core
rqm-notebooks   ──► rqm-qiskit, rqm-braket
```

- `rqm-core` has no ecosystem dependencies.
- `rqm-compiler` depends on `rqm-core`.
- `rqm-qiskit` depends on `rqm-compiler` (and transitively `rqm-core`).
- `rqm-braket` depends on `rqm-compiler` (and transitively `rqm-core`).
- `rqm-pennylane` depends on `rqm-compiler` (and transitively `rqm-core`). It provides a PennyLane device that wraps the RQM compilation and execution pipeline for differentiable and variational workflows.
- `rqm-optimize` depends on `rqm-core` for SU(2) and quaternion primitives. It is applied at runtime to circuits already translated to a backend format — it is not a package-level dependency of `rqm-qiskit` or `rqm-braket`.
- `rqm-notebooks` depends on the execution backends.
- `rqm-docs` references all packages but has no runtime dependency on any of them.

---

## Layer Summary

| Layer | Repository | Responsibility |
|---|---|---|
| Math | `rqm-core` | Defines canonical representations and operations |
| Compiler | `rqm-compiler` | Normalizes programs to a backend-agnostic IR |
| Execution | `rqm-qiskit` | Maps IR to Qiskit circuits and simulators |
| Execution | `rqm-braket` | Maps IR to Braket circuits and simulators |
| Optimization | `rqm-optimize` | SU(2)-aware gate fusion and circuit compression |
| Variational | `rqm-pennylane` | Differentiable and variational workflows via PennyLane |
| Learning | `rqm-notebooks` | Teaches and demonstrates the platform through notebooks |
| Documentation | `rqm-docs` | Explains, organizes, and guides users |

---

## What Belongs Where

| Content Type | Correct Package |
|---|---|
| Quaternion multiplication | `rqm-core` |
| Bloch vector conversion | `rqm-core` |
| SU(2) matrix construction | `rqm-core` |
| Gate normalization and IR lowering | `rqm-compiler` |
| Qiskit circuit from IR | `rqm-qiskit` |
| Braket circuit from IR | `rqm-braket` |
| Circuit execution helpers | `rqm-qiskit` / `rqm-braket` |
| SU(2)-aware gate fusion and compression | `rqm-optimize` |
| Variational algorithms and QML | `rqm-pennylane` |
| PennyLane QNode / gradient interface | `rqm-pennylane` |
| Tutorial notebook | `rqm-notebooks` |
| Concept explanation | `rqm-docs` |
| API reference guide | `rqm-docs` |

---

## Why This Architecture?

Separating math, compilation, and execution into distinct layers provides concrete benefits:

- **`rqm-core` stays dependency-light** and can be tested in isolation without any quantum framework installed.
- **`rqm-compiler` is backend-neutral** — optimization and normalization passes apply once and benefit all backends.
- **Backends evolve independently** — changes to Qiskit's API do not affect the Braket backend, and vice versa.
- **`rqm-optimize` is geometry-correct** — gate fusion uses exact SU(2) arithmetic from `rqm-core`, not floating-point heuristics.
- **`rqm-pennylane` is additive** — it adds differentiable and variational workflows on top of the existing stack without changing compilation or execution.
- **Programs are portable** — the same program description runs on any registered backend.
- **Documentation is independently deployable** — `rqm-docs` has no runtime dependencies on the packages it documents.

For an ecosystem built around mathematical correctness and backend independence, clear layer boundaries are worth the additional structure.
