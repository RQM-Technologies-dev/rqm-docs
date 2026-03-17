# Quickstart

> **Write once. Run on any quantum backend.**

Get up and running with the RQM platform in a few minutes.

---

## 1. Install

Install the execution backend you want to use. Each backend pulls in `rqm-core` and `rqm-compiler` automatically.

**AWS Braket backend:**

```bash
pip install rqm-braket
```

`rqm-braket` installs the full runtime stack — `rqm-core`, `rqm-compiler`, and the Braket execution layer — so this single command is all you need to start running programs.

**Qiskit backend:**

```bash
pip install rqm-qiskit
```

`rqm-qiskit` installs the full runtime stack — `rqm-core`, `rqm-compiler`, and the Qiskit execution layer — so this single command is all you need to start running programs on Qiskit.

**Install both:**

```bash
pip install rqm-braket rqm-qiskit
```

!!! tip "Virtual environment recommended"
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    pip install rqm-braket
    ```

---

## 2. Run Your First Program

Write a program using RQM's backend-agnostic gate model, then execute it:

```python
from rqm_braket import BraketBackend, RQMGate

program = [
    RQMGate("H", target=0),
    RQMGate("CNOT", control=0, target=1),
]

backend = BraketBackend()
result = backend.run_local(program)

print(result.counts)
```

!!! note "Same program, different backend"
    The same `program` list can be executed on a Qiskit backend using the same compiler pipeline:
    ```python
    from rqm_qiskit import QiskitBackend

    backend = QiskitBackend()
    result = backend.run_local(program)
    print(result.counts)
    ```
    Swapping backends requires only changing the import and backend constructor. The program and compiler pipeline are identical.

---

## 3. How It Works

When you call `backend.run_local(program)`, the platform executes this pipeline:

```
program (RQMGate list)
    → rqm-compiler  (normalize and lower to IR)
    → rqm-braket    (map IR to Braket circuits)
    → local simulator
    → result.counts
```

`rqm-core` provides the underlying math (quaternions, spinors, SU(2)) that the compiler uses during instruction normalization.

---

## 4. Work Directly with the Math Layer

If you need direct access to the canonical math layer:

```python
from rqm_core.spinor import normalize_spinor
from rqm_core.bloch import state_to_bloch

psi_raw = [1.0, 1.0]
psi = normalize_spinor(psi_raw)
bloch = state_to_bloch(psi)

print("Normalized spinor:", psi)
print("Bloch vector:", bloch)
# Bloch vector: [1.0, 0.0, 0.0]  (|+⟩ state, points along +x)
```

---

## Next Steps

| Goal | Where to go |
|---|---|
| Understand how the layers connect | [Concepts](concepts.md) |
| Full ecosystem overview | [Ecosystem](ecosystem.md) |
| Full install options (editable, from GitHub) | [Installation](installation.md) |
| Math API reference | [rqm-core API](api/rqm-core-api.md) |
| Qiskit execution reference | [rqm-qiskit API](api/rqm-qiskit-api.md) |
