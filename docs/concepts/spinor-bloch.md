# Spinors and the Bloch Sphere

A spinor is a two-component complex vector that represents the state of a quantum two-level system (a qubit). The Bloch sphere is the geometric surface on which all such states can be visualized. Understanding the relationship between the two is essential for working with the RQM ecosystem.

---

## The Spinor State

A qubit state is written as a spinor:

```
|ψ⟩ = α|0⟩ + β|1⟩
```

where **α** and **β** are complex amplitudes satisfying:

```
|α|² + |β|² = 1
```

In column vector notation:

```
|ψ⟩ = [α, β]ᵀ
```

This is a two-component complex vector — a spinor in the language of representation theory.

---

## The Bloch Sphere

Every normalized spinor can be mapped to a point on the unit sphere in three dimensions. This is the **Bloch sphere**.

The mapping uses spherical coordinates (θ, φ):

```
α = cos(θ/2)
β = e^(iφ) sin(θ/2)
```

The corresponding Bloch vector is:

```
n = (sin θ cos φ, sin θ sin φ, cos θ)
```

Key observations:

- The north pole **(0, 0, 1)** corresponds to `|0⟩`.
- The south pole **(0, 0, −1)** corresponds to `|1⟩`.
- Points on the equator correspond to equal superpositions.
- The **interior** of the sphere represents mixed states (not pure spinors).

---

## The Half-Angle Factor

The spinor parameterization uses **θ/2**, not **θ**. This means:

- A rotation by **2π** (360°) around the Bloch sphere takes `|ψ⟩ → −|ψ⟩`.
- A rotation by **4π** (720°) returns `|ψ⟩` to itself.

This is the spinor double cover discussed in the [Quaternion Intuition](quaternion-intuition.md) page. The two-to-one relationship between spinor states and Bloch vectors is a fundamental feature of quantum mechanics, not an artifact.

---

## Global Phase

The states `|ψ⟩` and `e^(iφ)|ψ⟩` map to the **same point** on the Bloch sphere, because global phase has no physical effect on measurement outcomes. See the [Global Phase](global-phase.md) page for more detail.

---

## Connection to the Ecosystem

In `rqm-core`:

- `spinor.normalize_spinor(psi)` ensures `|α|² + |β|² = 1`.
- `bloch.state_to_bloch(psi)` converts a spinor to its `(x, y, z)` Bloch vector.
- `spinor.spinor_to_quaternion(psi)` converts the spinor to a quaternion representation.

These functions form the core of the conversion pipeline that `rqm-qiskit` uses to prepare Qiskit circuit states from geometric descriptions.

---

!!! info "Next steps"
    Continue to [SU(2) Geometry](su2-geometry.md) to see how spinor transformations are represented as group elements.
