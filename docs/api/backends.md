# Execution Backends

RQM supports multiple execution backends. All backends consume the same `u1q` IR produced by `rqm-compiler`, so the same program runs on any backend without modification.

---

## Available Backends

| Backend | Package | Runtime |
|---|---|---|
| `"qiskit"` | `rqm-qiskit` | Qiskit Aer simulator / IBM hardware |
| `"braket"` | `rqm-braket` | Amazon Braket local simulator / AWS hardware |
| `"pennylane"` | `rqm-pennylane` | PennyLane default device / hardware plugins |

---

## Selecting a Backend

Pass the backend name string to `rqm_api.run`:

```python
from rqm_api import run

result = run(qc, backend="qiskit")
result = run(qc, backend="braket")
result = run(qc, backend="pennylane")
```

Or use a backend instance directly:

```python
from rqm_qiskit import QiskitBackend

backend = QiskitBackend()
result = run(qc, backend=backend)
```

---

## rqm-qiskit

[`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) translates the `u1q` IR into Qiskit circuits and executes them on the Aer simulator or IBM hardware.

**Install:**

```bash
pip install rqm-qiskit
```

**Key class:** `QiskitBackend`

```python
from rqm_qiskit import QiskitBackend

backend = QiskitBackend()
result = backend.run_local(program)    # local Aer simulator
result = backend.run_device(program, device="ibm_nairobi")  # IBM hardware
```

**IR mapping:** `u1q` → Qiskit `U` gate (ZYZ decomposition)

---

## rqm-braket

[`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) translates the `u1q` IR into Amazon Braket circuits and executes them locally or on AWS quantum hardware.

**Install:**

```bash
pip install rqm-braket
```

**Key class:** `BraketBackend`

```python
from rqm_braket import BraketBackend

backend = BraketBackend()
result = backend.run_local(program)    # local simulator
result = backend.run_device(program, device_arn="arn:...")  # AWS hardware
```

**IR mapping:** `u1q` → Braket arbitrary rotation gate

---

## rqm-pennylane

[`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) provides a PennyLane integration, exposing RQM circuits as PennyLane devices and supporting differentiable quantum workflows.

**Install:**

```bash
pip install rqm-pennylane
```

**Key class:** `PennyLaneBackend`

```python
from rqm_pennylane import PennyLaneBackend

backend = PennyLaneBackend()
result = backend.run_local(program)
```

**IR mapping:** `u1q` → PennyLane native rotation operation

---

## Backend Interface Contract

All backends implement the same interface:

| Method | Description |
|---|---|
| `run_local(program)` | Execute on a local simulator |
| `run_device(program, **kwargs)` | Execute on hardware |

All backends return a `Result` object with a `counts` attribute:

```python
result.counts  # {"00": 512, "11": 512}
```

This normalized contract means programs are fully portable across backends.

---

## Swapping Backends

Swapping backends requires only one change:

```python
# Before
result = run(qc, backend="qiskit")

# After
result = run(qc, backend="braket")
```

The circuit, compiler pipeline, and result interface are identical in both cases.

---

!!! tip "See also"
    - [Quickstart](../quickstart.md) — minimal working example
    - [rqm-api API guide](rqm-api-api.md) — full `run()` function reference
    - [Canonical IR (u1q)](../compiler/canonical-ir.md) — how backends consume the IR
