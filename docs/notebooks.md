# Notebooks and Learning Path

[`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) is the primary learning interface for the RQM ecosystem. It provides a structured sequence of Jupyter notebooks that guide users from first principles through practical quantum circuit execution.

---

## Role of `rqm-notebooks`

The notebooks serve three purposes:

1. **Demonstration** — show how `rqm-core` and `rqm-qiskit` work together in realistic scenarios.
2. **Explanation** — provide prose, equations, and visualizations that connect the math to the code.
3. **Exploration** — offer runnable examples that users can modify and extend.

Notebooks are the main learning interface for the ecosystem. They are not a substitute for the API documentation, but they are the best starting point for building intuition.

---

## Learning Path

Follow this structured sequence to move from introductory concepts to full circuit execution.

### Step 1: Foundations (Notebooks 00–02)

These notebooks introduce the core mathematical objects: quaternions, spinors, and Bloch vectors. No Qiskit knowledge is required.

| Notebook | Topic |
|---|---|
| `00_quaternion_basics.ipynb` | Quaternion representation and multiplication |
| `01_spinors_and_bloch.ipynb` | Spinor states and their Bloch sphere interpretation |
| `02_su2_rotations.ipynb` | SU(2) group elements and rotation matrices |

**Goal**: Understand the objects that `rqm-core` operates on.

!!! tip "Theory reference"
    Notebook `00_quaternion_basics` demonstrates that quaternion multiplication composes rotations. For the exact mathematical basis — including why this is equivalent to gate composition on S³ — see [Complete Quaternion Theory, Section 10: Why quaternion multiplication models gate composition](concepts/quaternion-theory.md#10-why-quaternion-multiplication-models-gate-composition).

---

### Step 2: Core Library Workflows (Notebooks 03–05)

These notebooks demonstrate the `rqm-core` API directly — normalization, conversion, and geometric operations.

| Notebook | Topic |
|---|---|
| `03_spinor_normalization.ipynb` | Using `spinor.normalize_spinor` and related utilities |
| `04_bloch_conversions.ipynb` | Converting between spinors, Bloch vectors, and quaternions |
| `05_su2_construction.ipynb` | Building SU(2) matrices from quaternion parameters |

**Goal**: Become fluent with the `rqm-core` API.

---

### Step 3: Ecosystem Architecture (Notebook 10)

This notebook provides a high-level tour of the full ecosystem stack — how the repos relate to each other and how data flows from `rqm-core` through `rqm-qiskit` to a circuit result.

| Notebook | Topic |
|---|---|
| `10_ecosystem_architecture.ipynb` | Full stack walkthrough: core → qiskit → circuit |

**Goal**: Understand the architecture in code, not just diagrams.

---

### Step 4: Qiskit Execution Workflows

These notebooks use `rqm-qiskit` to prepare states, construct circuits, and run simulations.

| Notebook | Topic |
|---|---|
| `20_state_preparation.ipynb` | Preparing Qiskit states from RQM spinors |
| `21_gate_construction.ipynb` | Building custom gates from SU(2) matrices |
| `22_simulation_and_results.ipynb` | Running circuits and interpreting results |

**Goal**: Execute real quantum circuits using RQM geometry objects.

---

## Running the Notebooks

Clone the repository and launch Jupyter:

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-notebooks.git
cd rqm-notebooks
pip install -r requirements.txt
jupyter lab
```

Open notebooks in the numbered order for the best learning experience.

---

!!! tip "Prerequisites"
    Steps 1 and 2 require only `rqm-core`. Steps 3 and 4 require both `rqm-core` and `rqm-qiskit`. See the [installation guide](installation.md) for setup instructions.
