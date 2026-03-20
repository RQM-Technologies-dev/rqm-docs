# RQM Documentation

**Status:** Active development · Production-ready architecture

> **Write once. Run on any quantum backend.**

RQM is a compiler-first quantum software platform that separates circuit construction, compilation, optimization, and execution across a layered set of focused packages.

---

## Architecture Overview

RQM is structured as a layered stack from the user-facing API down to the mathematical foundation:

```
┌─────────────────────────────────────────────┐
│              User Layer                     │
│         rqm-api · rqm-circuits              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Compiler Layer                   │
│       rqm-compiler · rqm-optimize           │
└──────┬──────────────────────┬───────────────┘
       │                      │
┌──────▼──────┐  ┌────────────▼──┐  ┌────────────────┐
│ rqm-qiskit  │  │  rqm-braket   │  │ rqm-pennylane  │
│  (Qiskit)   │  │  (AWS Braket) │  │  (PennyLane)   │
└─────────────┘  └───────────────┘  └────────────────┘
┌─────────────────────────────────────────────┐
│            Foundation Layer                 │
│                 rqm-core                    │
└─────────────────────────────────────────────┘
```

| Layer | Repository | Responsibility |
|---|---|---|
| User | [`rqm-api`](https://github.com/RQM-Technologies-dev/rqm-api) | High-level user-facing API for program submission and results |
| User | [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) | Circuit construction layer: gates, registers, and circuit objects |
| Compiler | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | IR generation, gate normalization, and `u1q` canonical lowering |
| Compiler | [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) | SU(2)-aware circuit optimization and gate fusion |
| Execution | [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Qiskit circuit execution backend |
| Execution | [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) | AWS Braket execution backend |
| Execution | [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) | PennyLane integration backend |
| Foundation | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Canonical math: quaternions, spinors, Bloch vectors, SU(2) |
| Learning | [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) | Jupyter notebooks: demos and guided learning path |

---

## Start Here

If you are new to the platform, follow this path:

1. **[Quickstart](quickstart.md)** — install and run your first circuit in minutes.
2. **[Ecosystem](ecosystem.md)** — see how each layer connects and what each repo does.
3. **[Concepts](concepts.md)** — understand compiler-first design and backend abstraction.
4. **[Notebooks](notebooks.md)** — explore the guided learning path.

---

## Key Features

!!! tip "Canonical IR (`u1q`)"
    The RQM compiler uses **`u1q`** as its canonical single-qubit gate — a complete SU(2) element encoded as a unit quaternion. The `to_u1q_pass` normalizes all named single-qubit gates (`rx`, `ry`, `rz`, `h`, `s`, `t`, …) to this form, producing a minimal, geometry-grounded IR. See the [Canonical IR guide](compiler/canonical-ir.md).

!!! tip "Multi-backend support"
    The same program runs on **Qiskit**, **AWS Braket**, and **PennyLane** without modification. Swapping backends is a one-line change. See the [Backends overview](api/backends.md).

---

!!! note "🔷 Quaternionic Signal Processing (QSP)"
    RQM also includes **Quaternionic Signal Processing (QSP)** — a framework for applying quaternion-based mathematics to signal processing tasks. See the [QSP Overview](qsp/index.md).

---

🌐 **Website:** [https://rqmtechnologies.com](https://rqmtechnologies.com)
