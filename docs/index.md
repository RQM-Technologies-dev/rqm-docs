# RQM Platform

**Geometry-aware quantum optimization and execution platform**

> Upload a circuit → optimize it → execute it → get results

**Public endpoint:** `https://rqm-api.onrender.com`

[:material-lightning-bolt: Try API](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-monitor: Open Studio](https://rqmtechnologies.com){ .md-button }
[:material-book-open-variant: View Docs](api/quickstart.md){ .md-button }

---

## What RQM Does

RQM is a quantum optimization and execution platform. It sits between circuit creation and hardware execution, providing:

| Component | Package | Role |
|---|---|---|
| Circuit IR | [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) | Canonical, backend-agnostic circuit representation |
| Optimization engine | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) + [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) | SU(2)-aware gate fusion and circuit compression |
| Execution + orchestration | [`rqm-api`](https://github.com/RQM-Technologies-dev/rqm-api) | HTTP service: optimize, execute, retrieve results |
| UI interface | [RQM Studio](https://rqmtechnologies.com) | Visual layer for circuit workflows |

---

## Platform Architecture

```
User circuit (JSON or SDK)
        │
        ▼
   ┌─────────┐
   │ rqm-api │  ← service layer: optimize + execute
   └────┬────┘
        │
   ┌────▼─────────┐
   │ rqm-circuits │  ← canonical IR layer
   └────┬─────────┘
        │
   ┌────▼──────────────────┐
   │ rqm-compiler          │  ← optimization
   │ + rqm-optimize        │
   └────┬──────────────────┘
        │
   ┌────┴───────────────────────┐
   │                            │
   ▼                            ▼
rqm-qiskit                 rqm-braket
(IBM / Qiskit execution)   (AWS Braket execution)
        │                            │
        └────────────┬───────────────┘
                     ▼
               result + report
```

RQM Studio provides a UI on top of `rqm-api`, enabling visual circuit workflows and result inspection.

For a full walkthrough of the stack, see [Ecosystem](ecosystem.md) and [Architecture](architecture.md).

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

The response is a valid circuit payload ready to use.

**Step 4 — Optimize the circuit**

```
POST /v1/circuits/optimize
```

**Step 5 — Observe the result**

- reduced gate count
- reduced depth
- structured optimization report

**Step 6 — Execute (optional)**

Send the optimized circuit to a real backend:

```
POST /v1/execute/qiskit
```

or

```
POST /v1/execute/braket
```

---

## Execution

RQM supports circuit execution via two backends:

| Backend | Endpoint | Runtime |
|---|---|---|
| IBM Qiskit | `POST /v1/execute/qiskit` | Qiskit Aer simulator / IBM hardware |
| Amazon Braket | `POST /v1/execute/braket` | Braket local simulator / AWS hardware |

Execution requests accept an optimized circuit and a shot count. Responses include measurement results and job metadata.

For full endpoint details, see the [Execution reference](api/execution.md).

---

## What You Get

| Output | Description |
|---|---|
| Optimized circuit | The transformed circuit with fewer gates |
| Gate count reduction | Before/after gate count |
| Depth reduction | Before/after circuit depth |
| Canonical structure | SU(2)-normalized gate representation |
| Optimization report | Structured summary of all transformations applied |
| Execution results | Measurement counts from Qiskit or Braket |

---

## Where RQM Fits

RQM sits between circuit creation and hardware execution:

```
user circuit  →  RQM optimize  →  RQM execute  →  backend (IBM / AWS)
```

RQM does not own hardware. It enhances Qiskit and Braket by providing a geometry-aware optimization layer before execution.

---

## Who This Is For

- **Quantum developers** evaluating circuit optimization tooling
- **Researchers** wanting geometry-correct, reproducible optimization
- **Labs and government evaluators** assessing quantum middleware
- **Companies building quantum pipelines** that need optimization before execution

---

## What RQM Is NOT

- **Not a hardware provider** — RQM does not own or operate quantum hardware
- **Not a simulator vendor** — RQM delegates simulation to Qiskit and Braket
- **Not replacing Qiskit or Braket** — RQM enhances those systems with geometry-aware optimization
- **Not a visualization tool** — the optimization and execution pipeline is the core product; visualization is secondary

---

## Future Roadmap

Planned capabilities:

- Backend-aware optimization (topology-informed gate scheduling)
- Asynchronous optimization jobs
- Batch circuit execution
- Hardware topology support
- Performance benchmarks and reproducibility reports

---

## Troubleshooting

**Common error:** `"instructions": ["string"]`

This is a Swagger placeholder. The `instructions` field must be a list of structured gate objects, not plain strings.

**Fix:** Use `GET /v1/circuits/example` to get a valid payload, then submit that to `POST /v1/circuits/optimize`.

---

🌐 **Website:** [https://rqmtechnologies.com](https://rqmtechnologies.com)
