# Welcome to RQM Documentation

**RQM** is a modular Python ecosystem for quantum geometry, built around quaternion algebra, spinor representations, SU(2) group theory, and Bloch sphere visualization.

This site is the unified documentation hub for the entire ecosystem.

---

## The Ecosystem Stack

| Repository | Role |
|---|---|
| [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Canonical math engine: quaternions, spinors, Bloch vectors, SU(2) |
| [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Execution bridge: connects RQM math to Qiskit circuits and simulators |
| [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) | Guided learning: Jupyter notebooks for demos, tutorials, and exploration |
| [`rqm-docs`](https://github.com/RQM-Technologies-dev/rqm-docs) | Official documentation (this site) |

---

## Start Here

If you are new to the ecosystem, follow this path:

1. **[Install the packages](installation.md)** — get `rqm-core` and `rqm-qiskit` set up in your environment.
2. **[Understand the ecosystem](ecosystem.md)** — see how the repos fit together and when to use each one.
3. **[Explore the concepts](concepts/quaternion-intuition.md)** — build intuition around quaternions, spinors, SU(2), and global phase.
4. **[Work through the notebooks](notebooks.md)** — follow the structured learning path in `rqm-notebooks`.
5. **[Browse the API guides](api/rqm-core-api.md)** — reference the key modules and functions.

---

## What is RQM?

RQM is a software project that brings quantum geometric structures — quaternion rotations, spinor states, SU(2) group elements, and Bloch sphere coordinates — together into a coherent, composable Python library stack.

The emphasis is on:

- **Mathematical clarity**: `rqm-core` defines canonical representations with no duplication across the stack.
- **Practical execution**: `rqm-qiskit` maps those representations onto real Qiskit circuits.
- **Accessible learning**: `rqm-notebooks` guides users from first principles to working quantum circuits.
- **Unified documentation**: this site ties it all together.

---

!!! tip "New to quaternions or spinors?"
    Start with the [Quaternion Intuition](concepts/quaternion-intuition.md) concept page for a beginner-friendly introduction before diving into the API or notebooks.
