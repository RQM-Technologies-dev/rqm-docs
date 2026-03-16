# Quickstart

Get up and running with the RQM ecosystem in a few minutes.

---

## 1. Install the Packages

Install `rqm-core` (the math engine) and `rqm-qiskit` (the Qiskit execution bridge) from PyPI:

```bash
pip install rqm-core
pip install rqm-qiskit
```

Or install both together:

```bash
pip install rqm-core rqm-qiskit
```

!!! tip "Virtual environment recommended"
    Use a virtual environment to keep your project dependencies isolated:
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows: .venv\Scripts\activate
    pip install rqm-core rqm-qiskit
    ```

---

## 2. Work with Spinors

Normalize a qubit spinor and compute its Bloch vector:

```python
from rqm_core.spinor import normalize_spinor
from rqm_core.bloch import state_to_bloch

# Define a raw spinor (does not need to be pre-normalized)
psi_raw = [1.0, 1.0]

# Normalize to unit magnitude
psi = normalize_spinor(psi_raw)
print("Normalized spinor:", psi)
# → [0.70710678, 0.70710678]

# Convert to a Bloch vector
bloch = state_to_bloch(psi)
print("Bloch vector:", bloch)
# → [1.0, 0.0, 0.0]  (points along +x, the |+⟩ state)
```

---

## 3. Convert to SU(2)

Map the spinor through a quaternion to an SU(2) rotation matrix:

```python
from rqm_core.spinor import spinor_to_quaternion
from rqm_core.su2 import quaternion_to_su2

q = spinor_to_quaternion(psi)
print("Quaternion:", q)

U = quaternion_to_su2(q)
print("SU(2) matrix:\n", U)
```

---

## 4. Prepare a Qiskit Circuit

Use `rqm-qiskit` to prepare a Qiskit state from your spinor and simulate it:

```python
from rqm_qiskit.state import prepare_state_circuit
from rqm_qiskit.simulator import run_and_get_bloch

# Build a circuit that prepares |psi⟩
qc = prepare_state_circuit(psi)
qc.draw()

# Simulate and recover the Bloch vector
result = run_and_get_bloch(qc)
print("Simulated Bloch vector:", result)
```

---

## 5. Learn Interactively with Notebooks

The [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) repository provides a structured series of Jupyter notebooks that walk through every concept and workflow in depth.

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-notebooks.git
cd rqm-notebooks
pip install -r requirements.txt
jupyter lab
```

Open the notebooks in numbered order. See the [Notebooks guide](notebooks.md) for the full learning path.

---

## Next Steps

| Goal | Where to go |
|---|---|
| Full install options (editable, from GitHub) | [Installation](installation.md) |
| Understand how the repos relate | [Ecosystem](ecosystem.md) |
| Build quaternion / spinor intuition | [Concepts](concepts/quaternion-intuition.md) |
| API function reference | [rqm-core API](api/rqm-core-api.md) |
| Qiskit execution reference | [rqm-qiskit API](api/rqm-qiskit-api.md) |
