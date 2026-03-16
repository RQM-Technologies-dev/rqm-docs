# Quaternion Intuition

Quaternions are a number system that extends complex numbers to four dimensions. In the RQM ecosystem, they are the primary representation for rotations and quantum state orientations.

This page builds geometric intuition before introducing any formal definitions.

---

## Why Not Just Use Rotation Matrices?

A 3D rotation can be represented as a 3×3 matrix. This works, but it has drawbacks:

- Matrices are verbose (nine numbers to represent three degrees of freedom).
- Composing two rotations by multiplying matrices can accumulate numerical errors.
- There is no obvious way to interpolate smoothly between two rotations using matrices.

Quaternions solve all three problems. They encode a 3D rotation in four numbers, compose cleanly, and interpolate naturally.

---

## The Four Components

A quaternion **q** has one real part and three imaginary parts:

```
q = w + xi + yj + zk
```

where `i`, `j`, `k` are imaginary units satisfying:

```
i² = j² = k² = ijk = −1
```

The real part `w` controls the rotation angle. The vector part `(x, y, z)` defines the rotation axis.

---

## Unit Quaternions and Rotations

A **unit quaternion** has magnitude 1:

```
|q|² = w² + x² + y² + z² = 1
```

Every unit quaternion represents a 3D rotation. Specifically, a rotation by angle **θ** around a unit axis **n = (nx, ny, nz)** is:

```
q = cos(θ/2) + sin(θ/2) · (nx·i + ny·j + nz·k)
```

Note the factor of one-half: a full rotation (360°) corresponds to **θ = 2π**, so `q = −1`. You need to go around twice in quaternion space to return to the identity. This half-angle relationship is central to the connection between quaternions and quantum mechanics.

---

## Double Cover

Both `q` and `−q` represent the same physical rotation. This two-to-one mapping from unit quaternions to 3D rotations is called the **double cover** of SO(3) by SU(2).

In quantum mechanics, this doubling is not a bug — it is the feature that encodes spin-1/2 physics. A spin-1/2 particle acquires a sign change (global phase) under a 360° rotation and returns to its original state only after a 720° rotation.

---

## Connection to the Ecosystem

In `rqm-core`:

- Quaternions are stored as normalized four-component arrays `[w, x, y, z]`.
- Functions like `spinor_to_quaternion` convert between spinor and quaternion representations.
- Functions like `quaternion_to_su2` construct the corresponding SU(2) matrix.

Understanding quaternions as "signed rotations" is the key intuition needed to work effectively with the rest of the ecosystem.

---

!!! info "Next steps"
    Continue to [Spinors and the Bloch Sphere](spinor-bloch.md) to see how quaternion states map to quantum two-level systems.
