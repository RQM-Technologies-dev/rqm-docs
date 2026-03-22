# Optimize Circuits for Better Execution

RQM Studio reduces unnecessary operations in a quantum circuit and returns a cleaner version designed for execution. Submit a circuit and receive a more efficient version that preserves behavior while improving execution readiness.

---

## What You Get

| Output | Description |
|---|---|
| Optimized circuit | Transformed circuit with reduced gates and depth |
| Gate count reduction | Before/after gate count |
| Depth reduction | Before/after circuit depth |
| Canonical structure | SU(2)-normalized gate representation |
| Optimization report | Structured summary of all transformations applied |

---

## How It Works

RQM Studio applies a sequence of geometry-aware passes to the input circuit:

- **Gate fusion** — merges consecutive single-qubit rotations into a single SU(2) operation using exact quaternion composition
- **Redundancy elimination** — detects and removes gate pairs that compose to the identity
- **Axis-aware canonicalization** — normalizes gates to a canonical form using SU(2) geometry, not heuristics
- **Depth reduction** — reorders commuting operations to minimize circuit depth without changing program semantics

All passes use the quaternion and SU(2) primitives from `rqm-core` to determine gate equivalences exactly. Two gates are fused only when their composition is provably correct — not based on floating-point approximation alone.

---

## Why It Matters

Every unnecessary gate in a circuit increases the chance of decoherence on real hardware. Reducing gate count and depth directly improves execution fidelity and reduces resource cost on quantum backends.

Unlike heuristic transpilers, RQM's optimization is geometry-correct. The same SU(2) arithmetic that defines the physics also drives the optimization — so the reduced circuit is guaranteed to represent the same operation.

---

## Available Today

The optimization endpoint is live and accessible without installation:

**Base URL:** `https://rqm-api.onrender.com`

```bash
# Fetch a ready-to-use example
curl https://rqm-api.onrender.com/v1/circuits/example > example.json

# Submit for optimization
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize \
  -H "Content-Type: application/json" \
  -d @example.json
```

The response includes the optimized circuit, before/after metrics, and a full optimization report.

[:material-book-open-variant: Open Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Next Steps

| Goal | Where to go |
|---|---|
| Step-by-step API walkthrough | [API Quickstart](../api/quickstart.md) |
| Full optimization reference | [Optimization](../optimization.md) |
| Verify the result | [Verify Optimizations](verify-optimizations.md) |
| Explore circuit behavior visually | [Visualize Quantum Geometry](visualize-quantum-geometry.md) |
| Platform architecture | [Ecosystem](../ecosystem.md) |
