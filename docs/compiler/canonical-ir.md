# Canonical IR: `u1q` and `to_u1q_pass`

This page documents the canonical single-qubit intermediate representation (IR) used by `rqm-compiler` and the compiler pass that enforces it.

---

## What Changed

Before this feature, `rqm-compiler` worked with a fragmented gate set:

```text
rx, ry, rz, h, s, t, ...
```

After introducing `u1q` and `to_u1q_pass`, all single-qubit operations are normalized to a single canonical form:

```text
u1q
```

This is a different class of compiler. It no longer reasons about named gates — it reasons about geometry.

---

## `u1q`: The Canonical Single-Qubit Gate

`u1q` is the canonical representation for all single-qubit operations in the RQM compiler IR. It encodes a complete element of SU(2) as a unit quaternion:

```python
{"gate": "u1q", "params": {"w": ..., "x": ..., "y": ..., "z": ...}}
```

The four parameters `(w, x, y, z)` satisfy:

```text
w² + x² + y² + z² = 1
```

This is the quaternion representation of SU(2):

```text
q = cos(φ) + u sin(φ)
```

where `u` is a unit vector in 3D space and `φ` is the half-angle of the rotation. Every single-qubit gate that can be expressed as a rotation maps exactly to a unit quaternion — and therefore exactly to `u1q`.

### Why quaternions?

Quaternions provide a clean algebraic structure for composing rotations:

- **Composition is multiplication:** `q_total = q₂ · q₁`
- **Inversion is conjugation:** `q⁻¹ = q*` (for unit quaternions)
- **No gimbal lock, no singularities**
- **Numerically stable under repeated composition**

SU(2) double-covers SO(3): `q` and `-q` represent the same physical rotation. The compiler canonicalizes by requiring `w ≥ 0` to ensure a unique representation.

---

## `to_u1q_pass`: The Canonicalization Pass

`to_u1q_pass` is a compiler pass that converts every single-qubit gate in a circuit to `u1q`. It runs as part of the standard compiler pipeline.

### What it does

```text
{rx, ry, rz, h, s, t, ...}
          ↓
        u1q
```

After `to_u1q_pass`, the IR contains only:

- **`u1q`** for all single-qubit operations
- **`cx`, `cy`, `cz`, `swap`, `iswap`** for two-qubit operations

This is a complete and minimal IR: every circuit can be expressed in this form, and no gate in this set is redundant.

### Canonical gate mappings

The pass uses exact quaternion mappings derived from the SU(2) correspondence `q = cos(θ/2) + u sin(θ/2)`:

| Gate | `w` | `x` | `y` | `z` |
|---|---|---|---|---|
| `rx(θ)` | `cos(θ/2)` | `-sin(θ/2)` | `0` | `0` |
| `ry(θ)` | `cos(θ/2)` | `0` | `-sin(θ/2)` | `0` |
| `rz(θ)` | `cos(θ/2)` | `0` | `0` | `-sin(θ/2)` |
| `h` | `1/√2` | `-1/√2` | `0` | `0` |
| `s` | `1/√2` | `0` | `0` | `-1/√2` |
| `t` | `cos(π/8)` | `0` | `0` | `-sin(π/8)` |
| `identity` | `1` | `0` | `0` | `0` |

Sign conventions follow `q = cos(φ) + u sin(φ)` with `θ = 2φ`, preserving SU(2) structure and axis alignment throughout.

### Normalization and validation

The pass enforces a strict normalization boundary:

- **Validation** — rejects quaternions with norm outside tolerance (`|norm - 1| < 1e-9`)
- **Renormalization** — optionally rescales near-unit quaternions to exactly unit norm
- **Zero-vector rejection** — rejects degenerate inputs where all components are zero

Validation and normalization are kept separate by design. Validation is a correctness check; normalization is an optional transformation. The system never silently fixes invalid inputs.

---

## The Canonical Constant

```python
CANONICAL_SINGLE_QUBIT_GATE = "u1q"
```

This constant is the single point of reference for the canonical gate name across passes, translators, and optimizers. Future changes to the canonical gate name require only one update, not ripples through many files.

---

## What This Unlocks

### 1. Quaternion fusion

Once all single-qubit gates are `u1q`, consecutive gates on the same qubit can be fused by quaternion multiplication:

```python
q_total = q2 * q1
```

Three `u1q` gates in sequence collapse to one. This is the foundation of the quaternion fusion optimization pass.

### 2. Geodesic (shortest-path) optimization

Because SU(2) double-covers SO(3), `q ≡ -q` as physical rotations. Enforcing `w ≥ 0` selects the shorter arc:

```text
if w < 0: q = -q
```

This guarantees the compiler always chooses the shortest rotation — geometrically, the geodesic on SU(2).

### 3. Backend-aware decomposition

With a canonical IR, backends perform a clean, well-defined mapping:

```text
u1q → native basis
```

Examples:

- **Qiskit** → `U` gate / ZYZ decomposition
- **Amazon Braket** → arbitrary rotation gate
- **IonQ** → native rotation

No guessing or re-analysis of gate semantics is required at the backend level.

### 4. Deterministic circuit identity

Two circuits with identical `u1q` sequences (up to global phase) are guaranteed equivalent. This enables:

- Equivalence checking
- Result caching
- Deduplication
- Compiler correctness proofs

---

## Position in the Stack

`to_u1q_pass` runs inside `rqm-compiler`, between program intake and IR output:

```
RQMGate list
    │
    ▼
rqm-compiler
  ├── gate resolution (rqm-core)
  ├── to_u1q_pass  ← single-qubit gates → u1q
  └── IR output: {u1q + two-qubit ops}
    │
    ├──────────────────┐
    ▼                  ▼
rqm-qiskit        rqm-braket
(u1q → U gate)    (u1q → rotation gate)
    │                  │
    └────────┬─────────┘
             ▼
        rqm-optimize
  (quaternion fusion, shortest-path)
```

The pass produces a normalized IR. The backends and optimizer operate on that IR — they do not re-derive gate semantics.

---

## Architectural Significance

This feature aligns three layers of the RQM platform into one coherent structure:

| Layer | Representation |
|---|---|
| Geometry | `q = cos(φ) + u sin(φ)` |
| Group theory | SU(2) |
| Compiler IR | `{"gate": "u1q", "params": {w, x, y, z}}` |

Most quantum compilers operate as:

```text
gate → matrix → decomposition
```

The RQM compiler now operates as:

```text
geometry → quaternion → canonical IR → execution
```

That is a fundamentally different approach — one grounded in the mathematical structure of the operations rather than a registry of named gates.

---

!!! note "Next: Quaternion Fusion Pass"
    The natural next step built on this foundation is the **quaternion fusion pass**: collapsing consecutive `u1q` gates into a single `u1q` via quaternion multiplication. See the [Optimization guide](../optimization.md) for how `rqm-optimize` applies geometry-correct gate fusion.

!!! tip "Mathematical background"
    For the full SU(2) ↔ quaternion correspondence, see [Complete Quaternion Theory](../concepts/quaternion-theory.md) and [SU(2) Geometry](../concepts/su2-geometry.md).
