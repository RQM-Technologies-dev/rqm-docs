# Global Phase

Global phase is one of the most important — and most frequently misunderstood — concepts in quantum mechanics. This page explains what it is, why it does not affect measurements, and why it still matters when working with multi-qubit systems or SU(2) representations.

---

## What is Global Phase?

Given a quantum state `|ψ⟩`, the state `e^(iφ)|ψ⟩` — where φ is any real number — is called a **global phase shift** of `|ψ⟩`.

The factor `e^(iφ)` is a complex number of magnitude 1. It scales every amplitude uniformly and does not change the relative weights of any superposition.

---

## Why Global Phase is Unobservable

All measurable quantities in quantum mechanics are **expectation values** of the form:

```
⟨ψ|Â|ψ⟩
```

Under a global phase shift:

```
⟨e^(iφ)ψ| Â |e^(iφ)ψ⟩ = e^(-iφ) e^(iφ) ⟨ψ|Â|ψ⟩ = ⟨ψ|Â|ψ⟩
```

The phases cancel exactly. No measurement can distinguish `|ψ⟩` from `e^(iφ)|ψ⟩`.

---

## Global Phase on the Bloch Sphere

On the Bloch sphere, global phase is completely invisible. The map from spinors to Bloch vectors:

```
|ψ⟩  ──►  (x, y, z)
```

treats `|ψ⟩` and `e^(iφ)|ψ⟩` as identical — they land on the same point.

This is why the Bloch sphere has a well-defined geometric meaning: it factors out all global phase freedom and represents only the physically distinct states.

---

## When Global Phase Matters

Global phase becomes physically meaningful as soon as it becomes **relative phase**. In a two-qubit system, a phase applied to only one component is no longer global — it is relative, and it affects measurement outcomes.

For example, in the Bell state:

```
|Φ⟩ = (|00⟩ + |11⟩) / √2
```

applying a phase to `|00⟩` only changes the state to:

```
|Φ'⟩ = (e^(iφ)|00⟩ + |11⟩) / √2
```

which is a measurably different state.

---

## Global Phase and SU(2)

In the SU(2) representation, global phase corresponds to the difference between SU(2) and U(1):

- SU(2) matrices have determinant exactly 1.
- A global phase `e^(iφ)` applied to a 2×2 unitary multiplies the determinant by `e^(2iφ)`.
- Removing global phase freedom is exactly what the `det = 1` constraint imposes.

The double cover `SU(2) → SO(3)` is equivalent to saying: rotations of the Bloch sphere do not distinguish global phase, but spinor evolution in SU(2) tracks it.

---

## Connection to the Ecosystem

In `rqm-core`:

- Spinors are normalized to remove magnitude freedom, but global phase is preserved in the representation.
- Functions that convert to Bloch vectors (`bloch.state_to_bloch`) implicitly factor out global phase.
- Functions that work in SU(2) preserve the full phase structure.

Understanding global phase is important when interpreting the output of `rqm-qiskit` simulations: statevector outputs preserve global phase, but measurement probabilities and Bloch vector visualizations do not.

---

!!! summary
    Global phase is unobservable in single-qubit measurements but becomes significant in multi-qubit entangled systems. The Bloch sphere representation factors out global phase; the SU(2) representation preserves it.
