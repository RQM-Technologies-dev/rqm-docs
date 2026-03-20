# rqm-circuits API Guide

`rqm-circuits` is the circuit construction layer for the RQM ecosystem. It provides the interface for building quantum circuits using gates, registers, and circuit objects. This page provides an overview of its primary modules and key functions.

---

## Role of `rqm-circuits`

`rqm-circuits` is the primary interface for composing programs before they reach the compiler:

```
rqm-circuits (circuit construction)
    → rqm-compiler (gate resolution → u1q IR)
    → rqm-qiskit / rqm-braket / rqm-pennylane
```

Its responsibilities:

1. **Circuit construction** — define quantum registers and add gates to a circuit object
2. **Backend-agnostic representation** — circuits are not tied to any specific backend
3. **Compiler input** — circuits are the primary input format consumed by `rqm-compiler`

---

## Modules

| Module | Responsibility |
|---|---|
| `rqm_circuits.circuit` | `Circuit` class and circuit construction API |
| `rqm_circuits.gate` | `Gate` class representing individual quantum operations |
| `rqm_circuits.register` | `QuantumRegister` and `ClassicalRegister` types |

---

## `rqm_circuits.circuit`

### `Circuit`

The primary circuit object. Manages qubits, classical bits, and the sequence of gate operations.

```python
from rqm_circuits import Circuit, Gate

qc = Circuit(num_qubits=2)
qc.add(Gate("H", target=0))
qc.add(Gate("CNOT", control=0, target=1))
qc.add(Gate("measure", target=0, classical=0))
qc.add(Gate("measure", target=1, classical=1))
```

**Parameters**:
- `num_qubits` — number of qubits in the circuit.
- `num_classical` — optional number of classical bits (defaults to `num_qubits`).

**Key methods**:

| Method | Description |
|---|---|
| `add(gate)` | Append a gate to the circuit |
| `depth()` | Return the circuit depth (number of layers) |
| `num_qubits` | Number of qubits |
| `gates` | List of gate operations in order |

---

## `rqm_circuits.gate`

### `Gate`

Represents a single quantum gate operation.

```python
from rqm_circuits import Gate

h_gate = Gate("H", target=0)
rx_gate = Gate("rx", target=1, params={"theta": 1.5708})
cnot_gate = Gate("CNOT", control=0, target=1)
```

**Parameters**:
- `name` — gate name string (`"H"`, `"rx"`, `"CNOT"`, etc.)
- `target` — target qubit index
- `control` — optional control qubit index (for two-qubit gates)
- `params` — optional dict of gate parameters (e.g., `{"theta": 1.5708}`)

---

## Usage Example

```python
from rqm_circuits import Circuit, Gate

# Build a Bell state circuit
qc = Circuit(num_qubits=2)
qc.add(Gate("H", target=0))
qc.add(Gate("CNOT", control=0, target=1))
qc.add(Gate("measure", target=0, classical=0))
qc.add(Gate("measure", target=1, classical=1))

print(f"Circuit depth: {qc.depth()}")
print(f"Number of qubits: {qc.num_qubits}")
```

---

## Passing a Circuit to the Compiler

Circuits built with `rqm-circuits` are passed directly to `rqm-api` or `rqm-compiler`:

```python
from rqm_circuits import Circuit, Gate
from rqm_api import run

qc = Circuit(num_qubits=2)
qc.add(Gate("H", target=0))
qc.add(Gate("CNOT", control=0, target=1))

result = run(qc, backend="qiskit")
print(result.counts)
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-circuits` repository](https://github.com/RQM-Technologies-dev/rqm-circuits).
