# rqm-pennylane API Guide

`rqm-pennylane` is the differentiable and variational workflow layer of the RQM platform. It exposes the RQM compiler and execution pipeline through [PennyLane](https://pennylane.ai/)'s device interface, enabling gradient-based optimization, quantum machine learning (QML), and variational circuit workflows such as VQE and QAOA. This page provides an overview of its public surface. It is an API guide, not auto-generated reference documentation — full generated docs will be added in a future release.

---

## Role of `rqm-pennylane`

`rqm-pennylane` does not reimplement math or compilation logic. Its responsibility is:

1. **Device interface** — providing a PennyLane-compatible device backed by the RQM compiler and execution pipeline.
2. **Variational workflows** — supporting `QNode`, parameter-shift gradients, and PennyLane optimizers over RQM circuits.
3. **Interoperability** — bridging RQM's geometry-correct math with PennyLane's automatic differentiation engine.

---

## Modules

| Module | Responsibility |
|---|---|
| `rqm_pennylane.device` | PennyLane device backed by the RQM stack |
| `rqm_pennylane.ops` | RQM-native gate operations exposed as PennyLane operators |
| `rqm_pennylane.workflows` | Convenience helpers for variational algorithms |

---

## `rqm_pennylane.device`

### `RQMDevice`

A PennyLane `Device` subclass that routes circuit execution through `rqm-compiler` and the chosen RQM backend.

```python
import pennylane as qml
from rqm_pennylane.device import RQMDevice

dev = RQMDevice(wires=2, backend="qiskit")

@qml.qnode(dev)
def circuit(theta):
    qml.RY(theta, wires=0)
    qml.CNOT(wires=[0, 1])
    return qml.expval(qml.PauliZ(0))

print(circuit(0.5))
```

**Constructor parameters**:
- `wires` — number of qubits (int) or a list of wire labels.
- `backend` — RQM execution backend to use: `"qiskit"` (default) or `"braket"`.
- `shots` — number of measurement shots (int or `None` for analytic mode).

**Returns**: PennyLane `Device` instance compatible with `qml.QNode`.

---

## `rqm_pennylane.ops`

RQM-native gates are available as PennyLane operators, built on the SU(2) primitives from `rqm-core`.

| Operator | Description |
|---|---|
| `RQMRot(phi, theta, omega, wires)` | Arbitrary single-qubit SU(2) rotation parameterized by Euler angles |
| `RQMQuaternionGate(q, wires)` | Single-qubit gate defined by a unit quaternion `q = [w, x, y, z]` |

```python
from rqm_pennylane.ops import RQMRot

@qml.qnode(dev)
def variational_layer(params):
    RQMRot(params[0], params[1], params[2], wires=0)
    return qml.expval(qml.PauliZ(0))
```

---

## `rqm_pennylane.workflows`

### `vqe`

Runs a Variational Quantum Eigensolver (VQE) using a given ansatz and Hamiltonian, backed by `RQMDevice`.

```python
from rqm_pennylane.workflows import vqe
import pennylane as qml

H = qml.Hamiltonian([1.0, 0.5], [qml.PauliZ(0), qml.PauliX(1)])
result = vqe(hamiltonian=H, wires=2, steps=100, stepsize=0.1)

print("Ground state energy:", result.energy)
print("Optimal parameters:", result.params)
```

**Parameters**:
- `hamiltonian` — PennyLane `Hamiltonian` object.
- `wires` — number of qubits.
- `steps` — number of optimizer steps.
- `stepsize` — gradient descent step size.
- `backend` — RQM backend to use (default: `"qiskit"`).

**Returns**: object with `.energy` and `.params` attributes.

---

### Additional Workflow Helpers

| Function | Description |
|---|---|
| `qaoa_circuit(graph, p, wires)` | Build a QAOA ansatz circuit for a given graph and depth `p` |
| `parameter_shift_grad(qnode, params)` | Compute gradients using the parameter-shift rule |

---

## End-to-End Example

```python
import pennylane as qml
from pennylane import numpy as np
from rqm_pennylane.device import RQMDevice

dev = RQMDevice(wires=1, backend="qiskit")

@qml.qnode(dev)
def circuit(theta):
    qml.RY(theta, wires=0)
    return qml.expval(qml.PauliZ(0))

# Compute gradient using PennyLane's parameter-shift rule
grad_fn = qml.grad(circuit)
theta = np.array(0.5, requires_grad=True)

print("Expectation value:", circuit(theta))
print("Gradient:", grad_fn(theta))
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-pennylane` repository](https://github.com/RQM-Technologies-dev/rqm-pennylane).
