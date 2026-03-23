# API Quickstart

Get your first optimized and executed circuit in under 30 seconds.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Open Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Endpoints Overview

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/circuits/optimize` | `POST` | **Primary** — optimize a circuit |
| `/v1/circuits/example` | `GET` | Fetch a ready-to-use example circuit |
| `/v1/circuits/validate` | `POST` | Validate a circuit payload |
| `/v1/circuits/analyze` | `POST` | Analyze a circuit without optimizing |
| `/v1/execute/qiskit` | `POST` | Execute on IBM Qiskit |
| `/v1/execute/braket` | `POST` | Execute on Amazon Braket |
| `/v1/execute/braket/devices` | `GET` | List available Braket devices |
| `/v1/execute/braket/{job_id}` | `GET` | Retrieve async Braket job result |

---

## Step 1 — Fetch an example circuit

```bash
curl https://rqm-api.onrender.com/v1/circuits/example
```

Copy the returned JSON. It is a valid input for the `/optimize` and execution endpoints.

---

## Step 2 — Optimize the circuit

Save the example JSON to a file:

```bash
curl https://rqm-api.onrender.com/v1/circuits/example > example.json
```

Then submit it for optimization:

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize \
  -H "Content-Type: application/json" \
  -d @example.json
```

The response includes the optimized circuit, gate count, depth, and an optimization report.

---

## Step 3 — Read the result

The response is structured as:

```json
{
  "optimized_circuit": { ... },
  "gate_count_before": 12,
  "gate_count_after": 7,
  "depth_before": 8,
  "depth_after": 5,
  "report": { ... }
}
```

Refer to the [Swagger UI](https://rqm-api.onrender.com/docs) for the current response schema.

---

## Step 4 — Execute (optional)

Send the optimized circuit to a backend:

=== "Qiskit"

    ```bash
    curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
      -H "Content-Type: application/json" \
      -d @optimized.json
    ```

=== "Braket"

    ```bash
    curl -X POST https://rqm-api.onrender.com/v1/execute/braket \
      -H "Content-Type: application/json" \
      -d @optimized.json
    ```

For full execution options, see the [Execution reference](execution.md).

---

## Support Endpoints

### `POST /v1/circuits/validate`

Checks whether a circuit payload is well-formed before submitting for optimization.

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/validate \
  -H "Content-Type: application/json" \
  -d @example.json
```

### `POST /v1/circuits/analyze`

Returns a structural analysis of the circuit (gate count, depth, gate types) without modifying it.

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/analyze \
  -H "Content-Type: application/json" \
  -d @example.json
```

---

## Troubleshooting

**Error: `"instructions": ["string"]`**

This is the default Swagger placeholder. The `instructions` field must contain structured gate objects, not plain strings.

**Fix:** Use `GET /v1/circuits/example` to get a valid payload, then send that to `/optimize`.

---

## Next Steps

| Goal | Where to go |
|---|---|
| Full API schema | [Swagger UI](https://rqm-api.onrender.com/docs) |
| API reference overview | [rqm-api docs](rqm-api-api.md) |
| Execution endpoints | [Execution reference](execution.md) |
| Platform architecture | [Ecosystem](../ecosystem.md) |
| Theory and deep dives | [Concepts](../concepts.md) |
| Python SDK quickstart | [SDK Quickstart](../quickstart.md) |
