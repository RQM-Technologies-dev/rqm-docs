# RQM API — Reference

`rqm-api` is the HTTP service for geometry-aware quantum circuit optimization and execution. It is the primary entry point to the RQM platform: submit a circuit, optimize it, and execute it on a real backend — all through a single service.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-lightning-bolt: API Quickstart](quickstart.md){ .md-button }

---

## Core Endpoints

### `POST /v1/circuits/optimize`

The primary optimization endpoint. Upload a quantum circuit. Get back a measurably better one.

What you get back:

- **Optimized circuit** — fewer gates, lower depth
- **Gate count reduction** — before and after
- **Depth reduction** — before and after
- **Canonical structure** — SU(2)-normalized gate representation
- **Optimization report** — structured summary of all transformations applied

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize \
  -H "Content-Type: application/json" \
  -d @example.json
```

Use `GET /v1/circuits/example` to get a valid `example.json` payload.

---

## Support Endpoints

### `GET /v1/circuits/example`

Returns a ready-to-use example circuit payload. Use this to test `/optimize` or the execution endpoints without constructing a circuit manually.

```bash
curl https://rqm-api.onrender.com/v1/circuits/example
```

### `POST /v1/circuits/validate`

Checks whether a circuit payload is well-formed. Use this before submitting to `/optimize` if you are constructing circuits programmatically.

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/validate \
  -H "Content-Type: application/json" \
  -d @example.json
```

### `POST /v1/circuits/analyze`

Returns a structural analysis of the circuit (gate count, depth, gate types) without optimizing it.

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/analyze \
  -H "Content-Type: application/json" \
  -d @example.json
```

---

## Execution Endpoints

RQM supports circuit execution via IBM Qiskit and Amazon Braket. Send an optimized circuit to a backend and retrieve results.

### `POST /v1/execute/qiskit`

Execute a circuit on IBM Qiskit (Aer simulator or IBM hardware).

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

### `POST /v1/execute/braket`

Execute a circuit on Amazon Braket (local simulator or AWS hardware).

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/braket \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

### `GET /v1/execute/braket/devices`

List available Amazon Braket devices.

```bash
curl https://rqm-api.onrender.com/v1/execute/braket/devices
```

### `GET /v1/execute/braket/{job_id}`

Retrieve the result of an async Braket job by job ID.

```bash
curl https://rqm-api.onrender.com/v1/execute/braket/{job_id}
```

For full endpoint details, see the [Execution reference](execution.md).

---

## Role of `rqm-api`

`rqm-api` is the top of the stack. It coordinates circuit intake, compilation, optimization, execution, and result delivery:

```
circuit input (JSON)
    → rqm-api
        ├── rqm-compiler (gate resolution → u1q IR)
        ├── rqm-optimize (gate fusion, compression)
        ├── rqm-qiskit  (IBM execution)
        ├── rqm-braket  (AWS execution)
        └── result: optimized circuit + execution report
```

Its responsibilities:

1. **Circuit intake** — accept and validate circuit payloads
2. **Pipeline coordination** — invoke the compiler and optimizer
3. **Backend dispatch** — route execution to Qiskit or Braket
4. **Result delivery** — return a structured response with optimized circuit and execution report

---

## Python SDK

The API is also accessible via the Python SDK. See [SDK Quickstart](../quickstart.md) for setup.

```python
from rqm_api import run

result = run(qc, backend="qiskit", optimize=True)
print(result.counts)
```

**Parameters**:
- `circuit` — a `rqm_circuits.Circuit` object (or compatible gate list).
- `backend` — string backend name (`"qiskit"`, `"braket"`) or a backend instance.
- `shots` — optional number of measurement shots (default: `1024`).
- `optimize` — optional boolean; if `True`, runs optimization before execution (default: `False`).
- `device` — optional device identifier for hardware execution (default: local simulator).

**Returns**: `rqm_api.result.Result` object.

---

## Troubleshooting

**Error: `"instructions": ["string"]`**

This is the default Swagger placeholder. The `instructions` field must contain structured gate objects, not plain strings.

**Fix:** Use `GET /v1/circuits/example` to get a valid payload, then send that to `POST /v1/circuits/optimize`.

---

!!! note "Full schema"
    For request/response schemas and field-level documentation, use the [Swagger UI](https://rqm-api.onrender.com/docs). Auto-generated Python API docs are planned for a future release. In the meantime, refer to the source code in the [`rqm-api` repository](https://github.com/RQM-Technologies-dev/rqm-api).
