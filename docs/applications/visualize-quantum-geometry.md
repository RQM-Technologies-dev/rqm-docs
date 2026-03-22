# Visually Explore Resonant Quantum Mechanics

RQM Studio is not just an API — it provides a geometry-native interface for interacting with quantum circuits and understanding what optimization actually does to them. Users gain a more intuitive understanding of their circuits, making optimization easier to inspect, explain, and adopt.

---

## Why Visual Exploration Matters

Quantum circuits are hard to reason about in the abstract. A list of gate operations tells you what was applied, but not what it means geometrically. RQM Studio exposes the underlying SU(2) structure of gates in a form that is legible — not just to theorists, but to developers and practitioners who want to understand their circuits.

This matters for three reasons:

- **Debugging** — when a circuit does not behave as expected, a geometric view of the gate sequence can reveal the issue immediately
- **Learning** — developers new to quantum computing can build intuition faster by seeing how gates transform state, not just what labels they carry
- **Adoption** — optimization becomes something you can explain and verify, not a black box you are asked to trust

---

## What the Geometry View Shows

RQM's visualization layer is built on the same quaternion and SU(2) primitives that drive optimization. This means what you see is not a simplified approximation — it is the actual geometric representation of the computation.

Key views available through RQM Studio:

- **Gate action as rotation** — every single-qubit gate is a rotation in SU(2) / SO(3). The visualization shows the axis, angle, and effect on the Bloch sphere.
- **Quaternionic representation** — gates are represented as unit quaternions. Composition appears as quaternion multiplication, making fusion operations visible and verifiable.
- **State evolution** — step through a circuit and observe how each gate moves the quantum state through the geometry of the Bloch sphere.
- **Before/after comparison** — see the original and optimized circuit side by side, with the geometric effect of each.

---

## Who This Is For

| Audience | How they use it |
|---|---|
| Quantum developers | Inspect gate behavior, debug unexpected results, verify optimization output |
| Researchers | Explore SU(2) structure, study canonical forms, develop intuition for gate equivalences |
| Learners | Build geometric intuition for quantum gates without starting from abstract formalism |

---

## Available Today

The visualization layer is accessible through RQM Studio. The underlying geometric primitives are documented in the Concepts section:

- [Quaternion Intuition](../concepts/quaternion-intuition.md) — how quaternions represent rotations and gate composition
- [SU(2) Geometry](../concepts/su2-geometry.md) — the group structure behind single-qubit gates
- [Spinors and the Bloch Sphere](../concepts/spinor-bloch.md) — state geometry and how gates move it

For interactive access to the API powering the Studio interface:

[:material-book-open-variant: Open Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Next Steps

| Goal | Where to go |
|---|---|
| Optimize your first circuit | [Optimize Circuits](optimize-circuits.md) |
| Verify optimization results | [Verify Optimizations](verify-optimizations.md) |
| Understand the math | [Concepts](../concepts.md) |
| API Quickstart | [API Quickstart](../api/quickstart.md) |
| Platform overview | [Ecosystem](../ecosystem.md) |
