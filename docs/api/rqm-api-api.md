# rqm-api API Guide

`rqm-api` is the user-facing API layer for the RQM ecosystem. It coordinates circuit intake, compilation, optional optimization, and backend dispatch in a single unified interface. This page provides an overview of its primary functions and usage patterns.

---

## Role of `rqm-api`

`rqm-api` is the top of the stack. It is the primary entry point for users who want to run circuits without managing individual layers:

```
rqm-circuits (circuit object)
    → rqm-api
        ├── rqm-compiler (gate resolution → u1q IR)
        ├── [optional] rqm-optimize (gate fusion, compression)
        └── backend dispatch
              ├── rqm-qiskit
              ├── rqm-braket
              └── rqm-pennylane
    → result
```

Its responsibilities:

1. **Backend dispatch** — route execution to the correct backend based on the `backend` argument
2. **Pipeline coordination** — invoke the compiler and optionally the optimizer before execution
3. **Result normalization** — return a consistent result object regardless of backend

---

## Modules

| Module | Responsibility |
|---|---|
| `rqm_api.run` | Top-level `run()` function for circuit execution |
| `rqm_api.result` | `Result` type returned by `run()` |
| `rqm_api.backends` | Backend registry and backend selection helpers |

---

## `rqm_api.run`

### `run`

Compiles and executes a circuit on the specified backend.

```python
from rqm_api import run

result = run(qc, backend="qiskit")
print(result.counts)
# {"00": 512, "11": 512}
```

**Parameters**:
- `circuit` — a `rqm_circuits.Circuit` object (or compatible gate list).
- `backend` — string backend name (`"qiskit"`, `"braket"`, `"pennylane"`) or a backend instance.
- `shots` — optional number of measurement shots (default: `1024`).
- `optimize` — optional boolean; if `True`, runs `rqm-optimize` before execution (default: `False`).
- `device` — optional device identifier for hardware execution (default: local simulator).

**Returns**: `rqm_api.result.Result` object.

---

## `rqm_api.result`

### `Result`

The normalized result object returned by `run()`.

```python
from rqm_api import run

result = run(qc, backend="braket")

print(result.counts)    # {"00": 512, "11": 512}
print(result.backend)   # "braket"
print(result.shots)     # 1024
```

**Key attributes**:

| Attribute | Description |
|---|---|
| `counts` | Dict mapping bitstring to observation count |
| `backend` | Backend name used for execution |
| `shots` | Number of measurement shots |
| `metadata` | Dict with additional backend-specific metadata |

---

## Usage Examples

### Bell state on Qiskit

```python
from rqm_circuits import Circuit, Gate
from rqm_api import run

qc = Circuit(num_qubits=2)
qc.add(Gate("H", target=0))
qc.add(Gate("CNOT", control=0, target=1))

result = run(qc, backend="qiskit", shots=1024)
print(result.counts)
```

### Same circuit on Braket

```python
result = run(qc, backend="braket", shots=1024)
print(result.counts)
```

### Same circuit on PennyLane

```python
result = run(qc, backend="pennylane", shots=1024)
print(result.counts)
```

### With optimization

```python
result = run(qc, backend="qiskit", shots=1024, optimize=True)
print(result.counts)
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-api` repository](https://github.com/RQM-Technologies-dev/rqm-api).
