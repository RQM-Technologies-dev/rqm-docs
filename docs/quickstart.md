# Quickstart

> **Write once. Run on any quantum backend.**

Get up and running with the RQM platform in a few minutes.

---

## 1. Install

Install the top-level API and the circuit construction layer, plus the execution backend of your choice:

```bash
pip install rqm-api rqm-circuits rqm-qiskit
```

To use the AWS Braket backend instead:

```bash
pip install rqm-api rqm-circuits rqm-braket
```

To use PennyLane:

```bash
pip install rqm-api rqm-circuits rqm-pennylane
```

Each backend package pulls in `rqm-core` and `rqm-compiler` automatically.

!!! tip "Virtual environment recommended"
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    pip install rqm-api rqm-circuits rqm-qiskit
    ```

---

## 2. Create a Circuit

Build a circuit using `rqm-circuits`:

```python
from rqm_circuits import Circuit, Gate

qc = Circuit(num_qubits=2)
qc.add(Gate("H", target=0))
qc.add(Gate("CNOT", control=0, target=1))
```

---

## 3. Run the Circuit

Submit the circuit via `rqm-api` and choose your backend:

```python
from rqm_api import run

result = run(qc, backend="qiskit")
print(result.counts)
# {"00": 512, "11": 512}
```

!!! note "Same circuit, different backend"
    Swapping backends requires only changing the `backend` argument:
    ```python
    result = run(qc, backend="braket")
    print(result.counts)
    ```
    The circuit and compilation pipeline are identical — only the execution target changes.

---

## 4. How It Works

When you call `run(qc, backend="qiskit")`, the platform executes this pipeline:

```
rqm-circuits (circuit object)
    → rqm-compiler  (normalize gates → u1q IR)
    → rqm-qiskit    (map IR to Qiskit circuit)
    → local simulator
    → result.counts
```

`rqm-core` provides the underlying math (quaternions, spinors, SU(2)) that the compiler uses during gate normalization. The canonical IR (`u1q`) is the single-qubit representation passed to all backends.

---

## 5. Work Directly with the Math Layer

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
| Understand how the layers connect | [Ecosystem](ecosystem.md) |
| Full architecture rationale | [Architecture](architecture.md) |
| Full install options (editable, from GitHub) | [Installation](installation.md) |
| Circuit construction API | [rqm-circuits API](api/rqm-circuits-api.md) |
| User-facing API reference | [rqm-api API](api/rqm-api-api.md) |
| Backend options | [Backends overview](api/backends.md) |
| Math API reference | [rqm-core API](api/rqm-core-api.md) |
