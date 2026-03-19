# Concepts

<div style="float: right; width: 240px; margin: 0 0 2em 2em; padding: 1em 1.25em; border-left: 3px solid var(--md-primary-fg-color, #536dfe); background: var(--md-code-bg-color, #f5f5f5); border-radius: 4px; font-size: 0.9em;" markdown>

**Deep Dive: Mathematical Foundations**

- [Complete Quaternion Theory](concepts/quaternion-theory.md)
- [SU(2) Geometry](concepts/su2-geometry.md)
- [Spinors and the Bloch Sphere](concepts/spinor-bloch.md)
- [Quaternion Intuition](concepts/quaternion-intuition.md)
- [Global Phase](concepts/global-phase.md)

</div>

### Mathematical Foundations

The RQM platform is grounded in a precise mathematical layer. Before exploring the architecture, readers seeking a deeper understanding of the underlying theory can start here:

- [Complete Quaternion Theory](concepts/quaternion-theory.md) — the source of truth for the SU(2) ↔ quaternion correspondence
- [SU(2) Geometry](concepts/su2-geometry.md) — group structure of single-qubit gates
- [Spinors and the Bloch Sphere](concepts/spinor-bloch.md) — state geometry and the Hopf fibration

---

This page explains the key design ideas behind the RQM platform: why it is built as a compiler-first system, what backend abstraction means in practice, and how the canonical lowering path works.

---

## Mental Model

Think of RQM as three distinct responsibilities:

- **`rqm-core`** → defines the physics (quaternions, spinors, SU(2))
- **`rqm-compiler`** → defines how programs are constructed
- **backends** → define where programs run

You write programs once at the compiler layer, and choose execution at the backend layer. The physics layer never changes regardless of which backend you use.

This separation is why the same program runs on Qiskit and Braket without modification.

---

## Compiler-First Design

Most quantum frameworks couple the program representation tightly to a single execution backend. RQM takes a different approach: the program is compiled first, then executed.

The compiler layer (`rqm-compiler`) sits between the math layer and the execution backends. Its job is to:

- Accept a backend-agnostic program (a list of `RQMGate` instructions)
- Normalize the instruction set to a canonical intermediate representation (IR)
- Produce an IR that any registered backend can consume

This means the same program description is valid input for any backend. The backends do not need to understand each other — they only need to implement the IR contract.

**Why this matters:**

- Programs are portable. A program written for Braket works on Qiskit without modification.
- Optimization passes can be applied at the compiler level, once, for all backends.
- Adding a new backend means implementing one interface, not rewriting programs.

---

## Backend Abstraction

RQM currently ships two execution backends:

| Backend | Package | Runtime |
|---|---|---|
| Qiskit | [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | IBM Qiskit / Aer simulator |
| AWS Braket | [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) | Amazon Braket local and cloud |

Both backends expose the same interface. Swapping backends is a one-line change:

```python
# Braket
from rqm_braket import BraketBackend
backend = BraketBackend()

# Qiskit
from rqm_qiskit import QiskitBackend
backend = QiskitBackend()

# Same program works with either backend
result = backend.run_local(program)
```

The execution backend is responsible for:

- Translating the compiler IR into the native circuit format (Qiskit `QuantumCircuit` or Braket `Circuit`)
- Submitting the circuit to a local simulator or a cloud device
- Returning results in a normalized format (`result.counts`, `result.statevector`)

---

## Canonical Lowering Path

The full pipeline from program to result:

```
RQMGate list  -->  rqm-compiler IR  -->  backend circuit  -->  results
```

**Step 1: Program definition**

Programs are written as lists of `RQMGate` objects. Gates carry logical names (`"H"`, `"CNOT"`, `"RZ"`) and qubit targets. They do not reference any specific backend.

**Step 2: Compiler normalization**

`rqm-compiler` resolves each logical gate to a canonical matrix representation using the math primitives in `rqm-core` (quaternions, SU(2) matrices). It produces a normalized IR where all gates have explicit unitary matrices and explicit qubit mappings.

**Step 3: Backend translation**

The selected backend reads the normalized IR and constructs its native circuit representation. It does not perform any gate resolution or math — that work is already done.

**Step 4: Execution and result**

The backend runs the circuit and returns a result object. Results are normalized across backends so that `result.counts` and `result.statevector` are available regardless of which backend was used.

---

## The Math Foundation

`rqm-core` provides the mathematical primitives that the compiler uses:

- **Quaternions** — encode 3D rotations in four numbers; the primary representation for single-qubit gates
- **Spinors** — two-component complex vectors representing quantum states
- **SU(2) matrices** — 2×2 unitary matrices derived from quaternions; the gate representation consumed by backends
- **Bloch vectors** — geometric representation of qubit state on the unit sphere

These are defined once in `rqm-core` and shared across the entire stack. No backend reimplements them.

---

!!! tip "Start with the code"
    The [Quickstart](quickstart.md) shows a working end-to-end example before any theory. Read that first if you prefer code over concepts.
