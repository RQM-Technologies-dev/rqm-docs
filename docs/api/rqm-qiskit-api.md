# rqm-qiskit API Guide

`rqm-qiskit` is the execution bridge that connects the mathematical objects in `rqm-core` to Qiskit circuits, gates, and simulators. This page provides an overview of its public surface. It is an API guide, not auto-generated reference documentation — full generated docs will be added in a future release.

---

## Role of `rqm-qiskit`

`rqm-qiskit` does not reimplement any math. Its responsibility is:

1. **State preparation** — converting RQM spinors into Qiskit-compatible initial states.
2. **Gate construction** — building custom Qiskit gates from SU(2) matrices.
3. **Simulator helpers** — running circuits and extracting results in formats compatible with `rqm-core`.

---

## Modules

| Module | Responsibility |
|---|---|
| `rqm_qiskit.state` | State preparation utilities |
| `rqm_qiskit.gates` | Custom gate construction from RQM objects |
| `rqm_qiskit.simulator` | Circuit execution and result extraction |

---

## `rqm_qiskit.state`

### `spinor_to_statevector`

Converts an `rqm-core` spinor to a Qiskit `Statevector` object.

```python
from rqm_core.spinor import normalize_spinor
from rqm_qiskit.state import spinor_to_statevector

psi = normalize_spinor([1.0, 1.0j])
sv = spinor_to_statevector(psi)
# sv is a qiskit.quantum_info.Statevector
```

**Parameters**: `psi` — normalized spinor of shape `(2,)`.  
**Returns**: `qiskit.quantum_info.Statevector`.

---

### `prepare_state_circuit`

Creates a single-qubit `QuantumCircuit` that prepares a given spinor state from `|0⟩`.

```python
from rqm_qiskit.state import prepare_state_circuit

psi = [0.6, 0.8]
qc = prepare_state_circuit(psi)
qc.draw()
```

**Parameters**: `psi` — spinor (normalized internally if needed).  
**Returns**: `qiskit.QuantumCircuit` with one qubit initialized to `psi`.

---

### Additional State Utilities

| Function | Description |
|---|---|
| `bloch_to_circuit(bloch)` | Prepare state from a Bloch vector `(x, y, z)` |
| `quaternion_to_circuit(q)` | Prepare state from a unit quaternion |

---

## `rqm_qiskit.gates`

### `su2_to_gate`

Wraps an SU(2) matrix from `rqm-core` as a named Qiskit `Gate`.

```python
from rqm_core.su2 import quaternion_to_su2
from rqm_qiskit.gates import su2_to_gate

q = [0.707, 0.0, 0.707, 0.0]   # 90° rotation around y-axis
U = quaternion_to_su2(q)
gate = su2_to_gate(U, label="Ry90")
```

**Parameters**:
- `U` — 2×2 complex NumPy array (SU(2) matrix).
- `label` — optional string name for the gate.

**Returns**: `qiskit.circuit.Gate`.

---

### Additional Gate Utilities

| Function | Description |
|---|---|
| `rotation_gate(axis, angle)` | Create a Qiskit gate for an axis-angle rotation |
| `spinor_rotation_gate(psi_initial, psi_target)` | Gate that rotates from one spinor state to another |

---

## `rqm_qiskit.simulator`

### `run_statevector`

Executes a `QuantumCircuit` using the Qiskit statevector simulator and returns the result as a NumPy array.

```python
from rqm_qiskit.simulator import run_statevector

qc = prepare_state_circuit([1.0, 0.0])
sv = run_statevector(qc)
# sv is a complex NumPy array of shape (2,)
```

**Parameters**: `qc` — `QuantumCircuit`.  
**Returns**: Statevector as a complex NumPy array.

---

### `run_and_get_bloch`

Executes a circuit and returns the resulting Bloch vector.

```python
from rqm_qiskit.simulator import run_and_get_bloch

qc = prepare_state_circuit([1.0, 0.0])
bloch = run_and_get_bloch(qc)
# bloch == [0.0, 0.0, 1.0]
```

**Parameters**: `qc` — `QuantumCircuit`.  
**Returns**: Bloch vector as a NumPy array `[x, y, z]`.

---

### Additional Simulator Utilities

| Function | Description |
|---|---|
| `run_shots(qc, shots)` | Run circuit with measurement sampling |
| `get_expectation(qc, observable)` | Compute expectation value of a Pauli observable |

---

## End-to-End Example

```python
from rqm_core.spinor import normalize_spinor
from rqm_core.bloch import state_to_bloch
from rqm_qiskit.state import prepare_state_circuit
from rqm_qiskit.simulator import run_and_get_bloch

# Define and normalize a spinor
psi = normalize_spinor([1.0, 1.0j])
print("Input Bloch vector:", state_to_bloch(psi))

# Prepare a Qiskit circuit and simulate
qc = prepare_state_circuit(psi)
result_bloch = run_and_get_bloch(qc)
print("Simulated Bloch vector:", result_bloch)
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-qiskit` repository](https://github.com/RQM-Technologies-dev/rqm-qiskit).
