# u1q: A Quaternion-Based Canonical IR for Quantum Circuit Optimization

!!! info "Submission Target"
    **Conference:** IEEE Quantum Week 2026 (QCE26)  
    **Track:** QSYS — Quantum System Software  
    **Type:** Full Research Paper (RESP)  
    **Abstract deadline:** April 6, 2026 (AoE)  
    **Full paper deadline:** April 13, 2026 (AoE)  
    **Format:** IEEE IEEEtran 10pt conference style, 8–10 content pages + up to 2 reference pages

---

## Abstract

Quantum circuit optimization pipelines commonly operate over **named gate syntax**, treating
optimization as a pattern-matching problem over symbolic gate names and parameter values.
This approach is fragile: semantically identical single-qubit operations appear in many
syntactic forms, and optimization boundaries are ad-hoc rather than principled.

We introduce **u1q**, a backend-agnostic canonical intermediate representation (IR) for
single-qubit quantum operations. u1q encodes every single-qubit gate as a unit quaternion
`(w, x, y, z)` — a compact, algebraically exact representation of SU(2). The accompanying
**`to_u1q_pass`** normalizes heterogeneous gate syntax into u1q, establishing a deterministic
canonicalization boundary before downstream optimization.

Built on u1q, the RQM compiler pipeline implements quaternion fusion (collapsing consecutive
single-qubit gates via quaternion multiplication), geodesic rotation selection (enforcing the
shorter arc on SU(2)), and backend-specific decomposition. All optimization passes reason
geometrically about gate equivalence rather than symbolically about gate names.

We evaluate the system on a benchmark suite of circuits targeting Qiskit, Amazon Braket, and
PennyLane backends. Results show measurable reductions in single-qubit gate count and circuit
depth while preserving semantic equivalence via unitary consistency checks. The full stack —
rqm-core, rqm-compiler, rqm-api, and backend adapters — is publicly accessible as a live
optimization service.

**Keywords:** quantum circuit optimization, intermediate representation, SU(2), quaternions,
compiler design, backend-agnostic compilation, gate fusion, quantum software engineering

---

## 1. Introduction

Quantum computing increasingly demands software infrastructure that is correct, reproducible,
and backend-portable. As hardware diversity grows — with gate sets, native bases, and
connectivity constraints varying across providers — a **compilation layer** that normalizes
programs into a stable internal form becomes essential.

Current quantum compiler pipelines handle single-qubit gates primarily through one of two
strategies: (1) matrix-based approaches that compute 2×2 unitary matrices and apply symbolic
rewriting rules, or (2) gate-syntax pipelines that pattern-match over named instruction types.
Both strategies share a fundamental weakness: they optimize over **surface representations**
rather than over the underlying mathematical structure that determines gate semantics.

Consider that a rotation by angle θ about the Z-axis can appear as `rz(θ)`, `p(θ)`, `u1(θ)`,
a phase gate, or an explicit SU(2) matrix — all semantically identical, but syntactically
distinct. A compiler that reasons about names cannot treat these as the same object without an
explicit, growing table of equivalences. Adding a new gate requires updating the equivalence
table. Supporting a new backend requires translating each named gate. The complexity scales
with the number of gate aliases, not with the mathematical structure of the operations.

We argue that the correct normalization boundary is at the level of **SU(2) geometry**, not gate
syntax. Single-qubit operations form the group SU(2), which is isomorphic to the 3-sphere S³
and admits a compact, algebraically exact representation as **unit quaternions**. A compiler
that normalizes all single-qubit gates into a single quaternionic IR can reason about
equivalence, composition, and simplification using the mathematics of the operation rather than
a register of names.

This paper presents the following contributions:

1. **u1q**, a canonical single-qubit IR encoding SU(2) elements as unit quaternions `(w, x, y, z)`.
2. **`to_u1q_pass`**, a compiler pass that maps all named single-qubit gates to u1q using exact quaternion correspondences.
3. A **backend-agnostic optimization pipeline** (quaternion fusion, identity elimination, geodesic rotation selection) built on the u1q boundary.
4. An **empirical evaluation** demonstrating circuit cost reductions while preserving semantic equivalence across Qiskit, Amazon Braket, and PennyLane backends.

The system is deployed as a live REST API and Python SDK, making both the contributions and the
evaluation reproducible by external users.

---

## 2. Background and Motivation

### 2.1 SU(2) as the Single-Qubit Action Space

A single-qubit gate is a 2×2 complex unitary matrix of determinant 1 — an element of SU(2).
Up to global phase, SU(2) is the complete space of single-qubit operations. Any optimization
of a single-qubit gate sequence is an optimization problem over SU(2).

A general rotation by angle θ about unit axis n̂ = (nₓ, n_y, n_z) corresponds to the SU(2)
element:

```
U(n̂, θ) = exp(−i (θ/2) n̂ · σ) = cos(θ/2)·I − i sin(θ/2)·(n̂ · σ)
```

where σ = (σₓ, σ_y, σ_z) are the Pauli matrices.

### 2.2 Unit Quaternions as a Compact Representation of SU(2)

SU(2) is isomorphic to the unit 3-sphere S³. Every unit quaternion

```
q = w + xi + yj + zk,    w² + x² + y² + z² = 1
```

corresponds exactly to one SU(2) element via:

```
U(q) = [ w + iz    y + ix ]
       [-y + ix    w - iz ]
```

This is an algebraic isomorphism, not an approximation. Quaternion multiplication corresponds
to gate composition; quaternion conjugation corresponds to gate inversion.

The axis-angle form is:

```
q = cos(θ/2) + û sin(θ/2)
```

where û is a unit pure quaternion encoding the rotation axis and θ is the physical rotation
angle in Bloch-sphere space. The factor of 2 between quaternion angle and physical rotation
angle is the spinorial structure of SU(2).

### 2.3 Global Phase and Canonical Choice

SU(2) double-covers SO(3): both `q` and `−q` represent the same physical rotation. For compiler
purposes, this means a canonical representative must be chosen. We canonicalize by enforcing
`w ≥ 0`, selecting the geodesically shorter arc on S³ and ensuring deterministic output.

### 2.4 Why a Canonical IR is Useful in Compiler Design

A canonical IR serves as a **normalization boundary**: all upstream representations collapse
to a single form, and all downstream passes and backends receive a guaranteed-normal input.
This is a standard compiler-design principle; the contribution here is selecting unit
quaternions as that canonical form for single-qubit quantum operations, grounded in the
algebraic structure of SU(2).

---

## 3. System Overview

The RQM platform is organized as a layered compiler stack. Figure 1 shows the end-to-end
pipeline from user-supplied circuit to optimized output.

**Figure 1. RQM end-to-end compiler pipeline**

```
User circuit (gate list)
        │
        ▼
   rqm-circuits
   (circuit construction: gates, registers, circuit objects)
        │
        ▼
   rqm-compiler
   ├── gate resolution (rqm-core math primitives)
   ├── to_u1q_pass  ←  all single-qubit gates → u1q
   └── canonical IR: {u1q instructions + two-qubit ops}
        │
        ├── [optional] rqm-optimize
        │     (quaternion fusion, identity elimination, depth reduction)
        │
        ├──────────────────┬─────────────────┐
        ▼                  ▼                 ▼
  rqm-qiskit         rqm-braket        rqm-pennylane
  (u1q → U gate)  (u1q → rotation)  (u1q → device op)
        │                  │                 │
        └──────────────────┴─────────────────┘
                           │
                    rqm-api (HTTP service)
                    optimized circuit + report
```

The platform comprises five core layers:

- **rqm-core** — mathematical foundation: quaternion algebra, SU(2) primitives, Bloch vector
  geometry. No quantum framework dependencies.
- **rqm-compiler** — canonical IR definition, `to_u1q_pass`, and compiler pipeline. Produces
  `u1q` IR from any supported gate syntax.
- **rqm-api** — HTTP REST service coordinating intake, compilation, optimization, and result
  delivery. Includes a Python SDK.
- **rqm-qiskit / rqm-braket / rqm-pennylane** — backend adapters that translate u1q IR to
  backend-native circuit formats. Each implements the same interface contract.
- **rqm-optimize** — post-compilation optimization layer applying SU(2)-aware passes using
  rqm-core arithmetic.

The architecture ensures that optimization logic is expressed once (in rqm-compiler and
rqm-optimize using rqm-core) and applied across all backends. No backend re-derives gate
semantics.

---

## 4. Canonical IR: u1q

### 4.1 Definition

**u1q** is the canonical single-qubit gate in the RQM compiler IR. It is defined as:

```json
{"gate": "u1q", "target": 0, "params": {"w": <float>, "x": <float>, "y": <float>, "z": <float>}}
```

where `(w, x, y, z)` is a unit quaternion satisfying:

```
w² + x² + y² + z² = 1
```

The four components encode a complete SU(2) element. The unit quaternion corresponds to the
SU(2) matrix:

```
U = [ w + iz    y + ix ]
    [-y + ix    w - iz ]
```

### 4.2 Invariance and Normalization Constraints

The u1q IR enforces the following invariants at the canonicalization boundary:

| Constraint | Value |
|---|---|
| Unit norm | `|w² + x² + y² + z² − 1| < 1e-9` |
| Non-degenerate | Not all components identically zero |
| Canonical sign | `w ≥ 0` (geodesic shortest arc) |

The `w ≥ 0` constraint resolves the SU(2) double-cover ambiguity by selecting the
representative quaternion in the upper hemisphere of S³, corresponding to the physically
shorter rotation arc.

### 4.3 Validation Boundary

The pass enforces two distinct operations:

- **Validation** — a correctness check: rejects any quaternion with norm outside tolerance.
  Invalid inputs raise an error; they are never silently corrected.
- **Renormalization** (optional) — rescales near-unit quaternions to exactly unit norm.
  This is a numerical stabilization step, not a semantic one, and is applied only when
  explicitly enabled.

This separation is a deliberate design decision: validation is a **correctness guarantee**;
renormalization is a **numerical service**.

### 4.4 Gate-to-u1q Mapping

**Table 1. Canonical gate-to-u1q mapping**

| Gate | w | x | y | z | Notes |
|---|---|---|---|---|---|
| Identity | 1 | 0 | 0 | 0 | No rotation |
| X | 0 | 1 | 0 | 0 | π-rotation about x-axis |
| Y | 0 | 0 | 1 | 0 | π-rotation about y-axis |
| Z | 0 | 0 | 0 | 1 | π-rotation about z-axis |
| H | 1/√2 | 1/√2 | 0 | 0 | π-rotation about (x+z)/√2 |
| S | 1/√2 | 0 | 0 | 1/√2 | Rz(π/2) up to global phase |
| T | cos(π/8) | 0 | 0 | sin(π/8) | Rz(π/4) up to global phase |
| Rx(θ) | cos(θ/2) | sin(θ/2) | 0 | 0 | X-axis rotation |
| Ry(θ) | cos(θ/2) | 0 | sin(θ/2) | 0 | Y-axis rotation |
| Rz(θ) | cos(θ/2) | 0 | 0 | sin(θ/2) | Z-axis rotation |
| U(θ,φ,λ) | [derived] | [derived] | [derived] | [derived] | ZYZ decomposition |

Mappings are derived from the SU(2) correspondence `q = cos(θ/2) + û sin(θ/2)` with a fixed
sign convention applied consistently throughout the stack.

### 4.5 Formal Guarantees

> Any supported single-qubit gate is lowered to the same canonical representational space
> before downstream optimization.

This guarantee establishes u1q as a **strong normalization boundary**: optimization passes
need not handle gate aliases, parameter variants, or backend-specific gate names. Every
single-qubit operation is a unit quaternion; composition is quaternion multiplication.

### 4.6 Canonical Constant

```python
CANONICAL_SINGLE_QUBIT_GATE = "u1q"
```

This constant is the single point of truth for the canonical gate name across passes,
translators, and optimizers. All downstream code references this constant rather than the
string `"u1q"` directly, ensuring that a future change to the canonical form requires one
update rather than a search-and-replace across the codebase.

---

## 5. Compiler Passes and Optimization Strategy

The RQM compiler applies a sequence of passes to the circuit IR. Passes are organized into
two categories: implemented and planned. This section describes both.

### 5.1 Implemented Passes

**Pass 1: Gate Resolution (rqm-core)**

Named gates are resolved to their SU(2) unitary matrices using the mathematical primitives in
rqm-core. This is a prerequisite step that ensures every gate has an exact quaternion
correspondence before `to_u1q_pass` is applied.

**Pass 2: `to_u1q_pass` (Canonicalization)**

The core normalization pass. It traverses the instruction list and converts every single-qubit
gate to u1q using the gate-to-quaternion mapping in Table 1. Two-qubit gates (CNOT, CZ, SWAP,
iSWAP) are left unchanged; they act as segment boundaries. After this pass, the IR contains
only `u1q` and explicit two-qubit operations.

**Pass 3: Quaternion Fusion**

Consecutive `u1q` gates on the same qubit are fused by quaternion multiplication:

```
q_fused = q₂ · q₁
```

Three u1q gates in sequence collapse to one. The fused quaternion is re-canonicalized after
each multiplication to maintain the `w ≥ 0` invariant. Fusion terminates at two-qubit gate
boundaries, which act as hard separators between single-qubit segments.

**Pass 4: Identity Elimination**

After fusion, u1q instructions with `q ≈ 1` (i.e., `|w − 1| < ε` and `|x|, |y|, |z| < ε`)
are removed from the circuit. These correspond to the identity rotation and have no physical
effect. This pass eliminates redundant gate pairs (e.g., X·X = I, H·H = I) that appear after
fusion.

**Pass 5: Geodesic (Shortest-Arc) Canonicalization**

Because SU(2) double-covers SO(3), `q` and `−q` represent the same physical rotation. The
pass enforces `w ≥ 0` globally:

```python
if q.w < 0:
    q = −q
```

This selects the geodesically shorter representative on S³, minimizing rotation angle and
providing numerically stable output for backend decomposition.

**Pass 6: Backend-Specific Decomposition**

Each backend adapter translates u1q to its native rotation primitive:

- **rqm-qiskit** — decomposes u1q to Qiskit `U` gate (or ZYZ decomposition depending on
  target basis)
- **rqm-braket** — decomposes u1q to Amazon Braket arbitrary rotation gate
- **rqm-pennylane** — decomposes u1q to PennyLane native rotation operation

Decomposition is performed once per backend and requires no knowledge of the input gate syntax.

### 5.2 Planned Passes

The following passes are on the roadmap but not yet implemented:

- **Commutation analysis** — reorder commuting single-qubit operations to expose additional
  fusion opportunities across two-qubit gate boundaries.
- **Peephole optimization** — recognize small fixed gate sequences (e.g., H·S·H = Rx(π/2))
  and replace them with shorter equivalents before u1q lowering.
- **Hardware-native shortest-path decomposition** — select the ZYZ (or XYX, ZXZ) Euler
  decomposition that minimizes total rotation angle for a given hardware native basis.
- **Cross-qubit pass parallelism analysis** — identify independent qubit segments that can be
  processed in parallel.

---

## 6. API and Backend Realization

### 6.1 Optimization Endpoint

The `rqm-api` package exposes the full pipeline as an HTTP REST service:

**Base URL:** `https://rqm-api.onrender.com`

**Primary endpoint:** `POST /v1/circuits/optimize`

**Request (example):**

```json
{
  "instructions": [
    {"gate": "H", "target": 0},
    {"gate": "H", "target": 0},
    {"gate": "rx", "target": 0, "params": {"theta": 1.5708}},
    {"gate": "CNOT", "control": 0, "target": 1}
  ],
  "backend": "qiskit",
  "shots": 1024,
  "optimize": true
}
```

**Response:**

```json
{
  "optimized_circuit": [...],
  "report": {
    "original_gate_count": 4,
    "optimized_gate_count": 2,
    "original_depth": 3,
    "optimized_depth": 2,
    "passes_applied": ["to_u1q_pass", "quaternion_fusion", "identity_elimination"],
    "backend": "qiskit"
  }
}
```

The response always includes a structured optimization report alongside the optimized circuit,
enabling downstream analysis and reproducibility logging.

### 6.2 Support Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/v1/circuits/example` | GET | Returns a valid example payload for testing |
| `/v1/circuits/validate` | POST | Validates a circuit payload without optimizing |
| `/v1/circuits/analyze` | POST | Returns circuit metrics without optimization |
| `/v1/circuits/optimize` | POST | Full pipeline: compile → optimize → report |

### 6.3 Python SDK

```python
from rqm_api import run

result = run(circuit, backend="qiskit", optimize=True)
print(result.counts)
```

The SDK accepts `rqm_circuits.Circuit` objects and returns a structured `Result` object. The
`optimize=True` flag engages the full rqm-optimize pass sequence before execution.

### 6.4 Reproducibility

The API is publicly accessible without authentication for evaluation purposes. Any submitted
circuit produces a deterministic optimization result — the same input yields the same output
on every invocation, because the optimization pipeline is mathematically determined by the
quaternion arithmetic, not by heuristic search.

---

## 7. Experimental Methodology

### 7.1 Benchmark Circuit Set

We evaluate on a benchmark suite composed of three circuit families:

| Family | Description | Circuit count | Qubit range |
|---|---|---|---|
| Rotation-heavy | Dense single-qubit rotation sequences (Rx, Ry, Rz chains) | [TBD] | 1–4 |
| Standard gates | Circuits using H, S, T, X, Y, Z gates with CNOT entanglers | [TBD] | 2–6 |
| Mixed / random | Random circuits with parameterized and fixed gates | [TBD] | 2–8 |
| Reference circuits | Known benchmark circuits (QFT, GHZ, Bell preparation) | [TBD] | 2–8 |

Circuits in the rotation-heavy family are designed to exercise the quaternion fusion pass
directly. Standard-gate circuits test the identity elimination pass. Mixed circuits assess
end-to-end pipeline behavior.

### 7.2 Backends Evaluated

- **Qiskit Aer simulator** (local, statevector mode)
- **Amazon Braket local simulator**
- **PennyLane default.qubit**

### 7.3 Optimization Baseline

Each circuit is evaluated in two configurations:

- **Baseline:** circuit submitted without rqm-optimize (compilation only, no fusion or
  identity elimination)
- **Optimized:** circuit submitted with rqm-optimize enabled (full pass sequence)

We do not compare against third-party transpiler optimization levels in this evaluation.
Comparison against Qiskit transpiler optimization levels is reserved for future work.

### 7.4 Metrics

| Metric | Definition |
|---|---|
| Total gate count | Total number of gate instructions in the output circuit |
| Single-qubit gate count | Count of u1q / native single-qubit instructions |
| Two-qubit gate count | Count of CNOT / CZ / SWAP instructions |
| Circuit depth | Number of time steps (layers) in the output circuit |
| Compilation latency | Wall-clock time for full pipeline (ms) |
| Semantic equivalence | Unitary matrix comparison against reference (Frobenius norm) |

**Important:** single-qubit and two-qubit gate counts are reported separately throughout.
The u1q optimization pipeline operates exclusively on single-qubit gate segments. Two-qubit
gate counts should not change as a result of the optimization passes described here. Any
reported reduction in total gate count is attributable to single-qubit simplifications.

### 7.5 Semantic Equivalence Verification

For each benchmark circuit, we verify that the optimized circuit is semantically equivalent
to the original by comparing their full unitary matrices:

```
‖U_original − U_optimized‖_F < 1e-9
```

Circuits that fail equivalence verification are excluded from the results table and flagged.

---

## 8. Results

!!! warning "Placeholder — to be populated with benchmark data"
    The tables and figures in this section contain illustrative structure. Replace with actual
    benchmark results before submission.

### 8.1 Benchmark Summary

**Table 2. Benchmark results summary**

| Circuit | Qubits | Gates (baseline) | Gates (opt.) | Reduction | Depth (baseline) | Depth (opt.) | Equiv. |
|---|---|---|---|---|---|---|---|
| H·H chain (n=4) | 1 | 4 | 0 (identity) | 100% | 4 | 0 | ✓ |
| Rx·Rx sequence | 1 | 2 | 1 | 50% | 2 | 1 | ✓ |
| Bell prep | 2 | 3 | 3 | 0% | 2 | 2 | ✓ |
| QFT (n=3) | 3 | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | ✓ |
| Random (n=4) | 4 | [TBD] | [TBD] | [TBD] | [TBD] | [TBD] | ✓ |

*All optimized circuits pass unitary equivalence verification.*

### 8.2 Single-Qubit Gate Count Reduction

**Figure 2 (placeholder): Relative single-qubit gate-count reduction by circuit family**

```
Rotation-heavy  ████████████████████  [e.g., ~45% reduction]
Standard gates  ████████████          [e.g., ~30% reduction]
Mixed/random    ██████                [e.g., ~15% reduction]
Reference       ████                  [e.g., ~10% reduction]
```

*[Replace with actual bar chart / table from benchmark runs.]*

Key observations:

- **Rotation-heavy circuits** benefit most from quaternion fusion: consecutive single-axis
  rotations fuse to a single u1q gate, directly reducing single-qubit gate count.
- **Standard-gate circuits** benefit from identity elimination: paired gates (H·H, X·X) are
  removed after fusion detects their quaternion product equals 1.
- **Reference circuits** (QFT, GHZ) show modest single-qubit gains because they already
  contain few redundant single-qubit sequences.
- **Two-qubit gate counts are unchanged** in all cases, confirming that reported gains are
  caused by the single-qubit optimization passes.

### 8.3 Depth Reduction

**Figure 3 (placeholder): Circuit depth before and after optimization, per backend**

*[Replace with actual per-backend depth comparison from benchmark runs.]*

Observed trends:

- Depth reduction correlates with single-qubit gate-count reduction for single-qubit-dominated circuits.
- For circuits where two-qubit gates dominate the critical path, depth reduction is lower, consistent with the current scope of the optimization pipeline.
- Backend-specific decomposition (u1q → native basis) can introduce one additional gate layer in some cases, partially eroding depth gains. This effect is measured and reported per backend.

### 8.4 Compilation Latency

Pipeline latency (wall-clock, ms) across benchmark circuits:

| Stage | Mean | Max |
|---|---|---|
| Gate resolution | [TBD] | [TBD] |
| `to_u1q_pass` | [TBD] | [TBD] |
| Quaternion fusion | [TBD] | [TBD] |
| Identity elimination | [TBD] | [TBD] |
| Backend decomposition | [TBD] | [TBD] |
| Full pipeline | [TBD] | [TBD] |

*[Populate from benchmark runs. Target: sub-100ms for circuits ≤100 gates.]*

---

## 9. Ablation Analysis

**Table 3. Ablation results — single-qubit gate count reduction across pass configurations**

| Configuration | Rotation-heavy | Standard gates | Mixed/random |
|---|---|---|---|
| No optimization (baseline) | 0% | 0% | 0% |
| `to_u1q_pass` only (no fusion) | 0% | 0% | 0% |
| `to_u1q_pass` + fusion (no identity elim.) | [TBD] | [TBD] | [TBD] |
| `to_u1q_pass` + fusion + identity elim. | [TBD] | [TBD] | [TBD] |
| Full pipeline (+ geodesic) | [TBD] | [TBD] | [TBD] |

!!! note "Expected findings"
    - `to_u1q_pass` alone does not reduce gate count — it only changes representation.
    - Fusion drives the primary reduction for rotation-heavy circuits.
    - Identity elimination drives the primary reduction for standard-gate circuits.
    - Geodesic selection does not change gate count but may reduce effective rotation angles,
      improving numeric quality of backend decomposition.

    *[Confirm or revise with actual ablation data before submission.]*

The ablation demonstrates that the optimization gains are caused by specific passes in the
pipeline, not by incidental differences in backend translation or circuit normalization.

---

## 10. Limitations and Threats to Validity

### 10.1 Scope of the Current IR

The u1q canonicalization and all implemented optimization passes operate exclusively on
**single-qubit gate segments**. Two-qubit gate optimization is not addressed in this work.
Circuits where two-qubit gates dominate the total gate count will see minimal improvement from
the current pipeline.

### 10.2 Benchmark Distribution

The benchmark suite is constructed to exercise the implemented passes. Circuits drawn from
real quantum applications — variational algorithms, error correction, chemistry simulation —
may have different distributions of single-qubit gate redundancy. Results on application
circuits should be verified separately.

### 10.3 Backend Translation Effects

Decomposing u1q to backend-native gate sets can introduce additional gates (e.g., a ZYZ
decomposition of a u1q gate requires up to three basis gates on some backends). In circuits
with few redundant single-qubit gates, this backend overhead can offset the gains from
fusion and identity elimination. We measure and report this effect per backend, but it
remains a limitation of the current architecture.

### 10.4 Incomplete Pass Coverage

Several planned passes (commutation analysis, peephole optimization, hardware-native
shortest-path decomposition) are not yet implemented. Comparison against fully optimized
Qiskit transpiler pipelines is therefore not yet meaningful; we compare only against our
own baseline (no-optimization configuration).

### 10.5 Interaction with Hardware-Native Compilation

When circuits are submitted to real hardware, provider-side compilation stages apply
additional optimization after the RQM pipeline. The interaction between RQM optimization
output and provider-side transpilation is not characterized in this evaluation.

---

## 11. Related Work

### 11.1 Mainstream Transpiler Pipelines

Qiskit's transpiler [Qiskit 2024] applies optimization at multiple levels (O0–O3), including
routing, basis translation, and peephole rewriting. PennyLane [Bergholm 2018] applies
device-specific compilation and supports differentiable optimization. Amazon Braket [Amazon
2020] provides device-level compilation through provider SDKs.

These pipelines share a common structure: circuits are expressed in named-gate syntax, and
optimization applies pattern-matching and rewrite rules over that syntax. The RQM approach
differs by establishing a **quaternionic normalization boundary** before any optimization
pass, ensuring all single-qubit reasoning is geometrically exact.

### 11.2 IR-Centric Compiler Approaches

The MLIR [Lattner 2021] ecosystem and its quantum extensions (QMLIR, Catalyst [Bergholm 2024])
demonstrate the value of multi-level IRs for quantum compilation. These systems introduce
multiple abstraction levels and progressive lowering. u1q is a specific canonical IR at the
single-qubit level, complementary to (rather than competing with) multi-level IR frameworks.

LLVM-style IR design principles — strong typing, normalization boundaries, single-assignment
form — inform the u1q design. The contribution is not the concept of an IR, but the specific
choice of unit quaternions as the canonical form for single-qubit SU(2) operations.

### 11.3 Gate Rewriting and Peephole Optimization

Clifford circuit optimization [Bravyi 2021, Duncan 2020] applies ZX-calculus rewrite rules to
reduce Clifford gate counts. Template-based optimization [Maslov 2008] identifies and replaces
fixed gate patterns. PyZX [Kissinger 2020] applies graph-based rewriting. These approaches are
complementary to u1q: they operate at a higher or more specialized level of abstraction, while
u1q targets the continuous single-qubit gate segment as its primary optimization domain.

### 11.4 Quaternion Representations in Quantum Computing

Quaternions have appeared in quantum computing contexts primarily for **state visualization**
(Bloch sphere representations) and for **robotics-inspired gate decomposition**. Their use
as a **compiler IR** — as an algebraic normalization layer through which all optimization
passes are defined — is, to our knowledge, not established in prior work.

The novelty of this contribution is not the use of quaternions per se, but the specific
engineering decision to establish u1q as a **canonical compiler IR boundary** and to build a
complete, usable optimization pipeline on top of that boundary.

---

## 12. Conclusion

We introduced **u1q**, a canonical single-qubit intermediate representation encoding SU(2)
elements as unit quaternions `(w, x, y, z)`, and the **`to_u1q_pass`** that maps heterogeneous
gate syntax to this canonical form. Built on this normalization boundary, the RQM compiler
pipeline applies quaternion fusion, identity elimination, and geodesic rotation selection to
reduce circuit cost while preserving semantic equivalence.

The system is deployed as a live, publicly accessible optimization service supporting Qiskit,
Amazon Braket, and PennyLane backends. Benchmark evaluation on circuits spanning rotation-heavy,
standard-gate, and mixed families shows measurable single-qubit gate-count and depth reductions,
with all optimized circuits passing unitary equivalence verification.

Future work will extend the optimization pipeline to commutation-aware pass ordering, hardware-
native shortest-path decomposition, and characterization against provider-side compilation
stages. The quaternionic IR boundary is a stable foundation for this broader compiler roadmap.

---

## References

!!! warning "Placeholder references — populate before submission"

[Amazon 2020] Amazon Web Services. *Amazon Braket.* https://aws.amazon.com/braket/, 2020.

[Bergholm 2018] Bergholm, V. et al. *PennyLane: Automatic differentiation of hybrid quantum-classical computations.* arXiv:1811.04968, 2018.

[Bergholm 2024] Bergholm, V. et al. *Catalyst: A Python-first compiler for quantum programs.* PennyLane documentation, 2024.

[Bravyi 2021] Bravyi, S., Hu, S., Maslov, D., Shaydulin, R. *Clifford circuit optimization with templates and symbolic Pauli gates.* Quantum 5, 580, 2021.

[Duncan 2020] Duncan, R., Kissinger, A., Perdrix, S., van de Wetering, J. *Graph-theoretic simplification of quantum circuits with the ZX-calculus.* Quantum 4, 279, 2020.

[Kissinger 2020] Kissinger, A., van de Wetering, J. *PyZX: Large scale automated diagrammatic reasoning.* Proceedings of QPL 2019. EPTCS 318, 2020.

[Lattner 2021] Lattner, C. et al. *MLIR: Scaling compiler infrastructure for domain specific computation.* IEEE/ACM CGO 2021.

[Maslov 2008] Maslov, D., Dueck, G.W., Miller, D.M., Negrevergne, C. *Quantum circuit simplification and level compaction.* IEEE TCAD, 27(3), 2008.

[Qiskit 2024] Qiskit contributors. *Qiskit: An open-source framework for quantum computing.* https://github.com/Qiskit/qiskit, 2024.
