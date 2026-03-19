# Complete Theory: Quaternion Form for Quantum States and Quantum Gates

This page gives a thorough mathematical treatment of why unit quaternions are the natural representation for single-qubit gates and states in the RQM ecosystem.

---

## 1. Core Idea

In ordinary quantum computing, a single qubit is represented by a normalized complex 2-component vector:

```
|ψ⟩ = [α, β]ᵀ    α, β ∈ ℂ,    |α|² + |β|² = 1
```

A single-qubit gate is represented by a 2×2 unitary matrix of determinant 1 — an element of SU(2) up to global phase.

The key fact is:

```
SU(2) ≅ S³
```

The space of special unitary single-qubit operations is exactly the 3-sphere, which is also the space of unit quaternions.

A unit quaternion

```
q = cos φ + u sin φ
```

with `|u| = 1` is not an arbitrary analogy. It is a mathematically exact way to represent a single-qubit rotation operator, and it is closely tied to the geometry of single-qubit states.

This is the foundation of quaternionic quantum compilation and visualization.

---

## 2. What `q = cos φ + u sin φ` Means

A quaternion has the form:

```
q = a + bi + cj + dk
```

with `i² = j² = k² = ijk = −1`.

A unit quaternion satisfies:

```
a² + b² + c² + d² = 1
```

Every unit quaternion can be written in axis-angle form:

```
q = cos φ + u sin φ
```

where:

- `φ ∈ ℝ` is a half-angle parameter
- `u = ux·i + uy·j + uz·k` is a unit pure imaginary quaternion with `|u| = 1`

This is the quaternion analogue of Euler's formula. It says that every unit quaternion is a rotation object with:

- a scalar part: `cos φ`
- a directional imaginary part: `u sin φ`

Geometrically:

- `u` gives the rotation axis
- `2φ` gives the physical rotation angle in 3D Bloch-space

That factor of 2 matters enormously in quantum computing.

---

## 3. Why the Half-Angle Appears

For 3D rotations, a unit quaternion `q = cos φ + u sin φ` acts as a rotation of angle:

```
θ = 2φ
```

So if a quantum gate is described as a rotation by angle `θ` about axis `n̂`, the corresponding quaternion parameter is:

```
q = cos(θ/2) + u sin(θ/2)
```

where `u` corresponds to the axis `n̂`.

This is exactly parallel to the standard quantum gate formula:

```
U(n̂, θ) = exp(−i (θ/2) n̂ · σ)
```

where `σ = (σx, σy, σz)` are the Pauli matrices.

The quaternion angle `φ` is the spinor half-angle, while the visible Bloch-sphere rotation is `2φ`.

---

## 4. The State-Side vs Gate-Side Distinction

### Gate-Side

A unit quaternion directly represents a single-qubit SU(2) gate. That is exact.

### State-Side

A single pure qubit state is not the whole of SU(2); it is a ray in ℂ², or equivalently a point on the Bloch sphere after removing global phase.

A unit quaternion can represent a state in two different ways:

**A. As a state-preparation operator**

A state is represented by the quaternion/gate that carries a reference state `|0⟩` to the target state.

**B. As an orientation object**

A state is represented by the Bloch vector obtained from a quaternionic orientation.

This means:

- quaternions represent gates directly
- states are represented through the action of those gates or through the induced Bloch orientation

!!! warning "Important distinction"
    Do not confuse "unit quaternion = state" in the naive sense. The rigorous statement is:

    > A single-qubit pure state can be represented by an equivalence class of unit quaternions modulo the stabilizer/global-phase freedom of the reference state.

    That is why a visualizer can use quaternions to encode the live state geometry, but the compiler must remain aware of gauge/global-phase distinctions.

---

## 5. Mapping Between Complex Spinors and Quaternions

A normalized qubit state:

```
|ψ⟩ = [α, β]ᵀ
```

with `α = a₀ + a₁i` and `β = b₀ + b₁i` can be mapped to a quaternion:

```
q_ψ = a₀ + a₁i + b₀j + b₁k
```

This is the canonical embedding of a 2-component complex spinor into quaternion coordinates:

- the first complex component becomes the scalar + `i` part
- the second complex component becomes the `j` + `k` part

Because the qubit is normalized:

```
|α|² + |β|² = a₀² + a₁² + b₀² + b₁² = 1
```

so `q_ψ` lies on the unit 3-sphere S³.

This is one of the deepest reasons quaternions are natural for single-qubit physics: normalized spinors already live on S³ before projective quotienting.

---

## 6. Global Phase and Why States Reduce from S³ to S²

A normalized state vector lives on S³, but quantum states are rays — overall complex phase does not matter:

```
|ψ⟩ ~ e^(iγ) |ψ⟩
```

After quotienting out that phase, pure single-qubit states become points on the Bloch sphere S².

| Object | Geometry |
|---|---|
| Normalized spinors | S³ |
| Pure states modulo global phase | S² |

This is the Hopf fibration viewpoint: `S³ → S²` with fiber S¹.

In practice this means:

- the quaternion contains more information than the Bloch vector
- the extra degree of freedom is phase/gauge-like
- a compiler may care about some phase structure
- a measurement visualizer usually projects to Bloch-space

A quaternionic studio should display both:

1. the full unit quaternion / hypersphere object
2. the induced Bloch vector / measurement orientation

---

## 7. Exact Relation to SU(2)

Every SU(2) matrix can be written as:

```
U(q) = [  w + iz    y + ix  ]
       [ -y + ix    w - iz  ]
```

with `w² + x² + y² + z² = 1` and `q = w + xi + yj + zk`.

This is the same mapping used in `rqm-core`'s `su2.quaternion_to_su2`. See also [SU(2) Geometry](su2-geometry.md).

There is a one-to-one correspondence between unit quaternions and SU(2) single-qubit gates (up to sign conventions depending on the chosen mapping). This is an exact algebraic isomorphism, not a heuristic.

Quaternion multiplication corresponds to gate composition. If gate `G₁` corresponds to quaternion `q₁` and gate `G₂` corresponds to quaternion `q₂`, then the combined gate `G₂G₁` corresponds to quaternion multiplication `q₂q₁` (in the corresponding order convention).

The codebase fixes one convention and uses it consistently.

---

## 8. Pauli Matrices and Quaternion Axes

The standard Pauli matrices are:

```
X = σx = [ 0  1 ]    Y = σy = [ 0  −i ]    Z = σz = [ 1   0 ]
         [ 1  0 ]             [ i   0 ]             [ 0  −1 ]
```

A general single-qubit rotation is:

```
R_n̂(θ) = exp(−i (θ/2) n̂ · σ)
        = cos(θ/2) · I − i sin(θ/2) · (nx·X + ny·Y + nz·Z)
```

The quaternionic analogue is:

```
q = cos(θ/2) + u sin(θ/2)
```

where `u` is the imaginary quaternion corresponding to the chosen rotation axis.

!!! note "Sign convention"
    The standard quantum gate formula uses `exp(−i θ/2 n̂·σ)`, which expands to `cos(θ/2)I − i sin(θ/2)(n̂·σ)`. The quaternion form uses positive imaginary parts (`+u sin(θ/2)`). The sign difference is absorbed into the mapping between quaternion imaginary axes (`i`, `j`, `k`) and the physical rotation directions under the chosen SU(2) ↔ quaternion correspondence. The gate table in section 9 uses the positive-sign quaternion convention throughout. The codebase must fix one sign convention and apply it consistently everywhere.

In visualization terms:

- `i`, `j`, `k` are the three independent imaginary directions
- they play the role of structured noncommuting axes
- these axes correspond to X, Y, Z-type rotation directions

A standard mapping is:

| Quaternion axis | Gate direction |
|---|---|
| `i` | X-rotation |
| `j` | Y-rotation |
| `k` | Z-rotation |

This mapping must remain consistent everywhere: math layer, gate library, visualization, compiler, and docs.

---

## 9. Standard Gates in Quaternion Form

For a rotation by angle `θ` about unit axis `u`:

```
q = cos(θ/2) + u sin(θ/2)
```

| Gate | Quaternion form | Notes |
|---|---|---|
| Identity | `q = 1` | No rotation |
| Pauli X | `q = i` | π-rotation about x-axis |
| Pauli Y | `q = j` | π-rotation about y-axis |
| Pauli Z | `q = k` | π-rotation about z-axis |
| Rx(θ) | `cos(θ/2) + i sin(θ/2)` | |
| Ry(θ) | `cos(θ/2) + j sin(θ/2)` | |
| Rz(θ) | `cos(θ/2) + k sin(θ/2)` | |
| S gate | `cos(π/4) + k sin(π/4)` | ~ Rz(π/2) up to global phase |
| T gate | `cos(π/8) + k sin(π/8)` | ~ Rz(π/4) up to global phase |
| Hadamard | `(i + k) / √2` | π-rotation about (x+z)/√2 axis |

The Hadamard gate is one of the big advantages of quaternion form: it becomes an axis-angle rotation object rather than just a matrix with mixed entries.

---

## 10. Why Quaternion Multiplication Models Gate Composition

Quaternion multiplication is associative and noncommutative, just like single-qubit rotation composition.

If `q₁ = cos φ₁ + u₁ sin φ₁` and `q₂ = cos φ₂ + u₂ sin φ₂`, then `q₂q₁` gives the combined gate.

This captures essential quantum behavior:

- rotations about different axes do not commute
- order matters
- repeated gates fuse naturally into one quaternion

That makes quaternions ideal for compiler passes such as:

- same-axis angle fusion
- inverse cancellation
- shortest-geodesic canonicalization
- reduction of multi-step 1-qubit runs into one canonical gate

---

## 11. State Evolution Under Gates

If the system begins in `|0⟩` and a sequence of gates has quaternion forms `q₁, q₂, …, qn`, then the full single-qubit evolution is:

```
q_total = qn · q(n-1) · … · q₁
```

under the chosen multiplication convention.

The physical state can be recovered by acting on the reference state.

**Two useful views:**

| View | Description |
|---|---|
| Operator view | Keep `q_total` as the accumulated SU(2) operator |
| Geometric state view | Convert `q_total` into the induced Bloch vector |

This gives a clean design for a studio: the compiler accumulates and simplifies quaternions, while the renderer turns the current quaternion into a vector/path/orientation.

---

## 12. Bloch Sphere from Quaternion Orientation

A pure state can be described by a Bloch vector `r ∈ ℝ³` with `|r| = 1`.

Given a unit quaternion `q`, obtain the rotated reference z-axis by conjugation:

```
r' = q · r₀ · q⁻¹
```

where `r₀` is the pure imaginary quaternion corresponding to the reference axis (typically `k`).

This is the standard quaternion rotation action.

For visualization:

1. choose a reference axis for `|0⟩`
2. apply the current quaternion by conjugation
3. render the resulting 3D vector as the Bloch/state vector

---

## 13. Why a Quaternionic Compiler Is Natural

A standard matrix-based compiler for 1-qubit gates often manipulates 2×2 complex matrices, Euler-angle decompositions, and symbolic gate identities.

Quaternion form gives a more geometric and compact representation.

A contiguous single-qubit gate segment can be reduced to one quaternion:

1. initialize `q = 1`
2. multiply in each gate quaternion
3. normalize
4. convert back to a canonical gate form

**Benefits:**

- less arithmetic overhead than repeated matrix multiplication
- direct access to axis-angle form
- easy fusion of adjacent rotations
- shortest-path canonicalization on S³
- natural visualization

The quaternion form is not just a display trick — it is a useful compiler-native representation for single-qubit segments.

---

## 14. Canonicalization and Shortest Geodesic

A unit quaternion `q` and `−q` represent the same physical rotation in SO(3), but as spinor objects in SU(2) they differ by a 2π lift structure.

For practical compiler simplification, canonicalize by selecting the representative with nonnegative scalar part:

```
w = Re(q) ≥ 0
```

This keeps the quaternion in the shortest representative on S³, giving:

- minimal half-angle `φ ∈ [0, π/2]` when appropriate
- more stable numerical behavior
- cleaner visualization
- consistent output for fused gates

**In code:**

```python
q = normalize(q)
if q.w < 0:
    q = -q
axis, angle = extract_axis_angle(q)
```

---

## 15. Extracting Axis-Angle from a Quaternion

Given `q = w + xi + yj + zk` with `|q| = 1`, define:

```
φ = arccos(w)
```

If `sin φ ≠ 0`, then:

```
u = (xi + yj + zk) / sin φ
```

The physical rotation angle is:

```
θ = 2φ
```

**Special cases:**

- if `q ≈ 1`, then `θ ≈ 0` and the axis is arbitrary
- if `q ≈ −1`, this corresponds to the spinorial antipode and requires careful canonical handling

These formulas should live in the math layer and be used by inspector panels, compiler summaries, gate emitters, and animation logic.

---

## 16. From Quaternion Back to Named Gates

After fusing a sequence into a quaternion, the compiler may emit:

1. a named exact gate if it matches one
2. a rotation gate Rx(θ), Ry(θ), or Rz(θ) if the axis is aligned
3. a generic axis-angle gate otherwise
4. an Euler decomposition if targeting a hardware basis

**Typical flow:**

1. accumulate segment quaternion
2. canonicalize
3. inspect axis
4. if axis approximately equals x, y, or z, emit Rx, Ry, or Rz
5. if quaternion matches a special gate within tolerance, emit X, Y, Z, H, S, or T
6. otherwise decompose into the chosen backend basis

---

## 17. Measurement Meaning

Measurement probabilities are computed from the state amplitudes, not directly from the quaternion alone unless one first maps back to a state or Bloch vector.

For a pure state with Bloch vector `r`, the probability of measuring `|0⟩` in the computational basis is:

```
P(0) = (1 + rz) / 2
P(1) = (1 − rz) / 2
```

A visualizer can:

- use the quaternion to derive the Bloch vector
- use the Bloch vector to compute basis measurement probabilities

---

## 18. Exactness and Scope

### Exact and rigorous

The quaternion representation is exact for:

- single-qubit SU(2) gates
- normalized spinor geometry on S³
- Bloch-sphere rotations
- single-qubit gate fusion and canonicalization

### Not directly sufficient alone

For:

- multi-qubit full state spaces
- entangling gates as single quaternions
- full SU(2ⁿ) compression into one quaternion

For multi-qubit systems, quaternionic single-qubit logic still applies locally to each wire segment, but entangling gates break the single-SU(2) description.

A compiler should treat:

- 1-qubit segments quaternionically
- 2-qubit gates explicitly as separators/boundaries

---

## 19. Compiler Architecture

### A. Circuit Segmentation

Split each wire into maximal contiguous 1-qubit segments between entangling gates.

### B. Quaternion Accumulation

For each 1-qubit segment:

1. map each gate to a quaternion
2. multiply in circuit order
3. normalize/canonicalize
4. emit optimized representation

### C. Entanglement Boundary

Do not attempt to compress across CNOT/CZ/other 2-qubit gates as though the entire system were one quaternion.

This yields a mathematically honest and computationally efficient compiler.

---

## 20. Visual Studio Layer Model

For RQM Studio, the visual model shows three linked layers:

### Layer 1 — Algebraic

- current gate symbol
- current quaternion
- current axis-angle
- current canonical form

### Layer 2 — Geometric

- unit hypersphere / S³-inspired state object
- axis of rotation
- geodesic trajectory
- Bloch vector projection

### Layer 3 — Compiler

- original segment
- accumulated quaternion
- reduced gate form
- optimization notes

This lets the user see that gates are geometric rotations, compilation is geometric simplification, and state evolution and compiler transformation are the same underlying math viewed at different levels.

---

## 21. Practical Formulas

### Quaternion normalization

```
|q| = sqrt(w² + x² + y² + z²)
q_norm = q / |q|
```

### Quaternion product

For `q₁ = (w₁, x₁, y₁, z₁)` and `q₂ = (w₂, x₂, y₂, z₂)`:

```
q₂q₁ = (
  w₂w₁ − x₂x₁ − y₂y₁ − z₂z₁,
  w₂x₁ + x₂w₁ + y₂z₁ − z₂y₁,
  w₂y₁ − x₂z₁ + y₂w₁ + z₂x₁,
  w₂z₁ + x₂y₁ − y₂x₁ + z₂w₁
)
```

### Axis-angle to quaternion

For axis `n̂ = (nx, ny, nz)` and angle `θ`:

```
q = (cos(θ/2), nx·sin(θ/2), ny·sin(θ/2), nz·sin(θ/2))
```

### Quaternion to axis-angle

```
θ = 2 arccos(w)
```

If `sqrt(1 − w²) > ε`:

```
n̂ = (x, y, z) / sqrt(1 − w²)
```

### Rotate Bloch vector by quaternion

Represent vector `v = (vx, vy, vz)` as a pure quaternion:

```
p = 0 + vx·i + vy·j + vz·k
```

Then:

```
p' = q · p · q⁻¹
```

This is the basis for the visual state vector in RQM Studio.

---

## 22. Core Conceptual Statement

> In single-qubit quantum computing, every special unitary gate is exactly representable as a unit quaternion `q = cos φ + u sin φ`, where `u` is the rotation axis and `2φ` is the physical Bloch-space rotation angle. Normalized qubit spinors naturally live on the same unit 3-sphere S³, so quaternion form provides a unified language for state geometry, gate action, compiler fusion, and visual interpretation. In the compiler, contiguous one-qubit gate segments are accumulated as quaternion products and then canonicalized into optimized forms. In the visualizer, the same quaternion drives the state trajectory, Bloch projection, and gate explanation. This makes quaternionic compilation both mathematically exact for single-qubit structure and visually natural.

**Treat the quaternion not as decoration, but as the actual single-qubit computational object.**

---

!!! info "Related pages"
    - [Quaternion Intuition](quaternion-intuition.md) — build geometric intuition first
    - [Spinors and the Bloch Sphere](spinor-bloch.md) — the state geometry
    - [SU(2) Geometry](su2-geometry.md) — the group structure
    - [Global Phase](global-phase.md) — why states reduce from S³ to S²
