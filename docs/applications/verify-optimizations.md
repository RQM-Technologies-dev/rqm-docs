# Verify That Nothing Important Broke

Optimization is only useful if you can trust the result. RQM Studio provides clear, structured evidence that the optimized circuit is equivalent to the original — so you know exactly what changed and what stayed the same.

Users get optimization they can trust, with clear evidence of what improved and what remained invariant.

---

## What Verification Means

When RQM Studio optimizes a circuit, it does not modify circuit behavior — it reduces the number of operations needed to express the same computation. Verification gives you the tools to confirm this.

Every optimization response includes a structured report that lets you inspect:

- **Before/after gate count** — how many gates were in the original vs. the optimized circuit
- **Before/after circuit depth** — how the critical path changed
- **Canonical structure** — confirmation that the result is in SU(2) normalized form
- **Optimization trace** — a record of the passes applied and what each one changed

---

## What You Can Inspect

### Circuit Analysis

Use the `/v1/circuits/analyze` endpoint to get a structural breakdown of any circuit before or after optimization:

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/analyze \
  -H "Content-Type: application/json" \
  -d @example.json
```

Returns gate count, circuit depth, and gate type breakdown — without modifying the circuit.

### Circuit Validation

Use `/v1/circuits/validate` to confirm a circuit payload is well-formed before submitting it:

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/validate \
  -H "Content-Type: application/json" \
  -d @example.json
```

### Optimization Report

Every `/v1/circuits/optimize` response includes a `report` field with a structured summary of transformations applied. This report shows which passes ran, what they changed, and what the net effect was.

---

## Why Trust Matters

In quantum computing, silent errors are dangerous. A transpiler that silently changes a circuit's behavior — or produces a result that only looks correct — undermines confidence in the entire optimization step.

RQM Studio avoids this by grounding all optimization in exact SU(2) arithmetic. Gates are fused or eliminated only when their quaternion product is provably equivalent. The result is not an approximation — it is the same unitary, expressed more efficiently.

The verification tooling makes this claim inspectable. You do not have to take it on faith.

---

## Available Today

The analysis and validation endpoints are live at `https://rqm-api.onrender.com`:

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/circuits/optimize` | `POST` | Optimize and receive a verification report |
| `/v1/circuits/analyze` | `POST` | Analyze a circuit without modifying it |
| `/v1/circuits/validate` | `POST` | Validate circuit structure |

[:material-book-open-variant: Open Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Next Steps

| Goal | Where to go |
|---|---|
| Submit your first circuit | [API Quickstart](../api/quickstart.md) |
| Understand the optimization passes | [Optimize Circuits](optimize-circuits.md) |
| Explore circuit behavior visually | [Visualize Quantum Geometry](visualize-quantum-geometry.md) |
| Full API schema | [Swagger UI](https://rqm-api.onrender.com/docs) |
| Platform architecture | [Ecosystem](../ecosystem.md) |
