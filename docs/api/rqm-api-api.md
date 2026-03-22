# RQM Optimization API — Reference

`rqm-api` is the HTTP service for geometry-aware quantum circuit optimization. The primary endpoint is `POST /v1/circuits/optimize`.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-lightning-bolt: API Quickstart](quickstart.md){ .md-button }

---

## Primary Endpoint: `/v1/circuits/optimize`

**`POST /v1/circuits/optimize`**

Upload a quantum circuit. Get back a measurably better one.

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

Returns a ready-to-use example circuit payload. Use this to test `/optimize` without constructing a circuit manually.

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

## Role of `rqm-api`

`rqm-api` is the top of the stack. It coordinates circuit intake, compilation, optimization, and result delivery:

```
circuit input (JSON)
    → rqm-api
        ├── rqm-compiler (gate resolution → u1q IR)
        ├── rqm-optimize (gate fusion, compression)
        └── result: optimized circuit + report
```

Its responsibilities:

1. **Circuit intake** — accept and validate circuit payloads
2. **Pipeline coordination** — invoke the compiler and optimizer
3. **Result delivery** — return a structured response with optimized circuit and report

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
- `backend` — string backend name (`"qiskit"`, `"braket"`, `"pennylane"`) or a backend instance.
- `shots` — optional number of measurement shots (default: `1024`).
- `optimize` — optional boolean; if `True`, runs `rqm-optimize` before execution (default: `False`).
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
