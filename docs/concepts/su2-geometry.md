# SU(2) Geometry

SU(2) is the group of 2×2 unitary matrices with determinant 1. It is the mathematical structure that underlies qubit rotations and, more broadly, the geometry of the Bloch sphere. Every qubit gate that preserves the norm of a state is an SU(2) element.

---

## What is SU(2)?

A matrix **U** belongs to SU(2) if:

```
U†U = I    (unitary)
det(U) = 1 (special)
```

The general form of an SU(2) element is:

```
U = [ α   -β* ]
    [ β    α* ]
```

where **α, β ∈ ℂ** and **|α|² + |β|² = 1**.

This looks exactly like a spinor — and that is not a coincidence.

---

## SU(2) and Quaternions

Every unit quaternion `q = w + xi + yj + zk` corresponds to an SU(2) matrix:

```
U(q) = [  w + iz    y + ix  ]
       [ -y + ix    w - iz  ]
```

This is the connection `rqm-core` formalizes in `su2.quaternion_to_su2`. The mapping is:

```
unit quaternion  ──►  SU(2) matrix  ──►  rotation of the Bloch sphere
```

---

## SU(2) as Rotations of the Bloch Sphere

Every SU(2) element acts as a rotation of the Bloch sphere via the adjoint action. A rotation by angle **θ** around axis **n** is:

```
U = cos(θ/2)·I − i·sin(θ/2)·(n · σ)
```

where **σ = (σ_x, σ_y, σ_z)** are the Pauli matrices.

Standard quantum gates are SU(2) elements:

| Gate | SU(2) Description |
|---|---|
| X | π rotation around x-axis |
| Y | π rotation around y-axis |
| Z | π rotation around z-axis |
| H | π rotation around the (x+z)/√2 axis |
| Rz(θ) | θ rotation around z-axis |

---

## The Double Cover: SU(2) → SO(3)

Both `U` and `−U` produce the same rotation of the Bloch sphere. This is the same double cover encountered in the [Quaternion Intuition](quaternion-intuition.md) page, now stated in group theory terms:

```
SU(2) / {I, −I}  ≅  SO(3)
```

SU(2) covers SO(3) twice. This is why spin-1/2 particles behave differently from classical objects under rotation — the state picks up a sign under a 360° rotation.

---

## Connection to the Ecosystem

In `rqm-core`:

- `su2.quaternion_to_su2(q)` converts a quaternion to its SU(2) matrix.
- `su2.su2_to_quaternion(U)` inverts this mapping.
- `bloch.state_to_bloch(psi)` computes the Bloch vector for visualization.

In `rqm-qiskit`:

- SU(2) matrices produced by `rqm-core` are used to construct custom Qiskit gates.
- State preparation utilities accept spinors and apply the corresponding SU(2) transformation to the circuit.

---

!!! info "Next steps"
    Continue to [Global Phase](global-phase.md) to understand why two distinct SU(2) elements can represent the same physical state.
