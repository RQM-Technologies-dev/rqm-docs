# Architecture

This page explains the layering and dependency philosophy of the RQM platform, and why the stack is organized the way it is.

---

## Design Principles

### 1. Canonical math lives in `rqm-core`

`rqm-core` is the single source of truth for all quaternion algebra, spinor representations, Bloch vector geometry, and SU(2) group operations. No other package in the platform duplicates this logic.

If you need to compute a spinor normalization, convert to a Bloch vector, or construct an SU(2) rotation matrix — that implementation belongs in `rqm-core`.

### 2. Circuit construction lives in `rqm-circuits`

`rqm-circuits` provides the interface for composing quantum programs as circuits — defining gates, registers, and circuit objects. Users build programs at this layer. The circuits produced here are backend-agnostic objects that are handed to the compiler.

### 3. Compilation lives in `rqm-compiler`

`rqm-compiler` is the bridge between the circuit layer and execution backends. It accepts backend-agnostic circuits and produces a normalized instruction set that any backend can consume.

The compiler resolves logical gate names to explicit unitary matrices using `rqm-core` primitives. It applies normalization passes to ensure the IR is backend-ready. Backends do not perform gate resolution — that work is done once at the compiler level.

The canonical single-qubit gate in the compiler IR is **`u1q`** — a complete SU(2) element encoded as a unit quaternion `(w, x, y, z)`. The `to_u1q_pass` converts all named single-qubit gates (`rx`, `ry`, `rz`, `h`, `s`, `t`, …) to `u1q` using exact quaternion mappings. See [Canonical IR (u1q)](compiler/canonical-ir.md) for the full design and gate mapping table.

### 4. Execution lives in the backend packages

`rqm-qiskit`, `rqm-braket`, and `rqm-pennylane` are execution backends. They translate the compiler IR into their respective native circuit formats and run them on simulators or hardware.

No backend reimplements math or compilation logic. Each backend implements the same interface contract, which is why the same program runs on any backend without modification.

### 5. Optimization lives in `rqm-optimize`

`rqm-optimize` is the optimization layer. It accepts the compiler IR and applies SU(2)-aware passes — gate fusion, redundancy elimination, and depth reduction — using exact quaternion arithmetic from `rqm-core`.

Optimization is a post-compilation, pre-execution step. It is optional for simulation but recommended for hardware runs where gate count directly affects decoherence.

### 6. The user-facing API lives in `rqm-api`

`rqm-api` coordinates the full pipeline — from circuit intake through compilation, optional optimization, and backend dispatch — and returns normalized results. Users who do not need fine-grained control over individual layers interact primarily with `rqm-api`.

### 7. Documentation lives in `rqm-docs`

`rqm-docs` (this site) organizes and explains the platform. It does not introduce new algorithms, theory, or notebook content. Its job is to make everything else discoverable, understandable, and usable.

---

## Compiler-First Pipeline

The full lowering path from spinor geometry to execution:

```
spinor → quaternion → u1q IR → compiler passes → backend → execution
```

In detail:

```
rqm-circuits
  (circuit construction: gates, registers)
     │
     ▼
rqm-compiler
  (gate resolution via rqm-core, to_u1q_pass → canonical u1q IR)
     │
     ├── [optional] rqm-optimize
     │     (quaternion fusion, compression)
     │
     ├──────────────────────┬────────────────────┐
     ▼                      ▼                    ▼
rqm-qiskit            rqm-braket          rqm-pennylane
(Qiskit circuit)      (Braket circuit)    (PennyLane device)
     │                      │                    │
     └──────────────────────┴────────────────────┘
                             │
                       result.counts
```

The program is defined once. The compiler processes it once. Execution backends are interchangeable.

---

## Dependency Graph

```
rqm-api       ──► rqm-circuits, rqm-compiler, rqm-qiskit/braket/pennylane
rqm-circuits  ──► rqm-core
rqm-compiler  ──► rqm-core
rqm-qiskit    ──► rqm-compiler ──► rqm-core
rqm-braket    ──► rqm-compiler ──► rqm-core
rqm-pennylane ──► rqm-compiler ──► rqm-core
rqm-optimize  ──► rqm-core
rqm-notebooks ──► rqm-qiskit, rqm-braket
```

- `rqm-core` has no ecosystem dependencies.
- `rqm-circuits` depends on `rqm-core`.
- `rqm-compiler` depends on `rqm-core`.
- `rqm-qiskit`, `rqm-braket`, and `rqm-pennylane` each depend on `rqm-compiler`.
- `rqm-optimize` depends on `rqm-core` for SU(2) primitives. It is applied at compile time, not a package-level dependency of the backends.
- `rqm-api` depends on `rqm-circuits`, `rqm-compiler`, and the execution backends.
- `rqm-notebooks` depends on the execution backends.
- `rqm-docs` references all packages but has no runtime dependency on any of them.

---

## Layer Summary

| Layer | Repository | Responsibility |
|---|---|---|
| Foundation | `rqm-core` | Defines canonical representations and operations |
| Circuit | `rqm-circuits` | Circuit construction: gates, registers, circuit objects |
| Compiler | `rqm-compiler` | Normalizes programs to a backend-agnostic `u1q` IR |
| Optimization | `rqm-optimize` | SU(2)-aware gate fusion and circuit compression |
| Execution | `rqm-qiskit` | Maps IR to Qiskit circuits and simulators |
| Execution | `rqm-braket` | Maps IR to Braket circuits and simulators |
| Execution | `rqm-pennylane` | Maps IR to PennyLane devices |
| API | `rqm-api` | Unified user-facing API for program submission and results |
| Learning | `rqm-notebooks` | Teaches and demonstrates the platform through notebooks |
| Documentation | `rqm-docs` | Explains, organizes, and guides users |

---

## What Belongs Where

| Content Type | Correct Package |
|---|---|
| Quaternion multiplication | `rqm-core` |
| Bloch vector conversion | `rqm-core` |
| SU(2) matrix construction | `rqm-core` |
| Gate and circuit definition | `rqm-circuits` |
| Gate normalization and IR lowering | `rqm-compiler` |
| Canonical single-qubit IR (`u1q`) and `to_u1q_pass` | `rqm-compiler` |
| SU(2)-aware gate fusion and compression | `rqm-optimize` |
| Qiskit circuit from IR | `rqm-qiskit` |
| Braket circuit from IR | `rqm-braket` |
| PennyLane device from IR | `rqm-pennylane` |
| User-facing program submission and result retrieval | `rqm-api` |
| Tutorial notebook | `rqm-notebooks` |
| Concept explanation | `rqm-docs` |
| API reference guide | `rqm-docs` |

---

## Why This Architecture?

Separating circuit construction, compilation, optimization, and execution into distinct layers provides concrete benefits:

- **`rqm-core` stays dependency-light** and can be tested in isolation without any quantum framework installed.
- **`rqm-circuits` keeps programs portable** — circuits are not tied to any backend format.
- **`rqm-compiler` is backend-neutral** — optimization and normalization passes apply once and benefit all backends.
- **Backends evolve independently** — changes to Qiskit's API do not affect the Braket or PennyLane backends.
- **`rqm-optimize` is geometry-correct** — gate fusion uses exact SU(2) arithmetic from `rqm-core`, not floating-point heuristics.
- **`rqm-api` simplifies the common case** — users who want to run circuits without managing individual layers have a single entry point.
- **Documentation is independently deployable** — `rqm-docs` has no runtime dependencies on the packages it documents.

For an ecosystem built around mathematical correctness and backend independence, clear layer boundaries are worth the additional structure.
