# RQM Optimization API

**Geometry-aware quantum circuit optimization as a network service**

> Upload a quantum circuit. Get back a measurably better one.

**Public endpoint:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Open API Docs](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Try It in 30 Seconds

No install required. Use the live Swagger UI.

**Step 1 — Open the API docs**

[https://rqm-api.onrender.com/docs](https://rqm-api.onrender.com/docs)

**Step 2 — Fetch an example circuit**

```
GET /v1/circuits/example
```

**Step 3 — Copy the returned JSON**

The response is a valid circuit payload ready to optimize.

**Step 4 — Paste into the optimize endpoint**

```
POST /v1/circuits/optimize
```

**Step 5 — Execute and observe**

- reduced gate count
- reduced depth
- structured optimization report

---

## What You Get

| Output | Description |
|---|---|
| Optimized circuit | The transformed circuit with fewer gates |
| Gate count reduction | Before/after gate count |
| Depth reduction | Before/after circuit depth |
| Canonical structure | SU(2)-normalized gate representation |
| Optimization report | Structured summary of all transformations applied |

---

## Before / After Example

The following illustrates the structure of an optimization result. Actual reductions depend on the input circuit.

!!! note "Example structure"
    This is representative of the response format. Use `GET /v1/circuits/example` and `POST /v1/circuits/optimize` on the live API to see real results.

| Metric | Input | Output |
|---|---|---|
| Gate count | 12 | 7 |
| Depth | 8 | 5 |
| Structure | raw gate sequence | SU(2) canonical form |

---

## Who This Is For

- **Quantum developers** evaluating circuit optimization tooling
- **Researchers** wanting geometry-correct, reproducible optimization
- **SDK users** working with Qiskit, Braket, or PennyLane circuits
- **Internal tooling teams** integrating optimization into a build pipeline
- **Evaluators** — labs, government programs, and enterprise teams assessing quantum middleware

---

## Troubleshooting

**Common error:** `"instructions": ["string"]`

This is a Swagger placeholder. The `instructions` field must be a list of structured gate objects, not plain strings.

**Fix:** Use `GET /v1/circuits/example` to get a valid payload, then submit that to `POST /v1/circuits/optimize`.

---

## Platform Overview

The Optimization API is the primary entry point to the RQM platform. The underlying stack:

| Layer | Package | Responsibility |
|---|---|---|
| API | [`rqm-api`](https://github.com/RQM-Technologies-dev/rqm-api) | HTTP service: circuit intake, optimization, results |
| Compiler | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Gate normalization and `u1q` canonical IR |
| Optimizer | [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) | SU(2)-aware gate fusion and compression |
| Foundation | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Quaternion math, spinors, Bloch vectors |

For architecture details and theory, see [Concepts](concepts.md) and [Ecosystem](ecosystem.md).

---

🌐 **Website:** [https://rqmtechnologies.com](https://rqmtechnologies.com)
