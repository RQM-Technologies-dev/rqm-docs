# Execution Reference

RQM supports circuit execution via IBM Qiskit and Amazon Braket. After optimizing a circuit with `POST /v1/circuits/optimize`, you can submit it directly to a backend for measurement.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }

---

## Overview

| Endpoint | Method | Backend | Description |
|---|---|---|---|
| `/v1/execute/qiskit` | `POST` | IBM Qiskit | Execute on Qiskit Aer simulator or IBM hardware |
| `/v1/execute/braket` | `POST` | Amazon Braket | Execute on Braket local simulator or AWS hardware |
| `/v1/execute/braket/devices` | `GET` | Amazon Braket | List available Braket devices |
| `/v1/execute/braket/{job_id}` | `GET` | Amazon Braket | Retrieve result of an async Braket job |

---

## Qiskit Execution

### `POST /v1/execute/qiskit`

Execute a circuit on IBM Qiskit. By default, uses the Aer local simulator.

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

**Request body fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `circuit` | object | Yes | Circuit payload (use output from `/v1/circuits/optimize` or `/v1/circuits/example`) |
| `shots` | integer | No | Number of measurement shots (default: 1024) |
| `device` | string | No | IBM device identifier for hardware execution |

**Response:**

```json
{
  "counts": {"00": 512, "11": 512},
  "shots": 1024,
  "backend": "qiskit",
  "device": "aer_simulator"
}
```

---

## Braket Execution

### `POST /v1/execute/braket`

Execute a circuit on Amazon Braket. By default, uses the local Braket simulator.

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/braket \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

**Request body fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `circuit` | object | Yes | Circuit payload |
| `shots` | integer | No | Number of measurement shots (default: 1024) |
| `device_arn` | string | No | AWS Braket device ARN for hardware execution |

**Response (synchronous):**

```json
{
  "counts": {"00": 510, "11": 514},
  "shots": 1024,
  "backend": "braket",
  "job_id": null
}
```

**Response (async job):**

When a hardware device is specified, the response includes a `job_id` that you can use to retrieve the result later:

```json
{
  "job_id": "arn:aws:braket:us-east-1:123456789:quantum-task/abc123",
  "status": "QUEUED",
  "backend": "braket"
}
```

### `GET /v1/execute/braket/devices`

List available Amazon Braket devices.

```bash
curl https://rqm-api.onrender.com/v1/execute/braket/devices
```

**Response:**

```json
{
  "devices": [
    {"name": "local_simulator", "arn": null, "status": "available"},
    {"name": "IonQ Harmony", "arn": "arn:aws:braket:::device/qpu/ionq/Harmony", "status": "available"}
  ]
}
```

### `GET /v1/execute/braket/{job_id}`

Retrieve the result of an async Braket job by job ID.

```bash
curl https://rqm-api.onrender.com/v1/execute/braket/{job_id}
```

**Response (completed):**

```json
{
  "job_id": "arn:aws:braket:...",
  "status": "COMPLETED",
  "counts": {"00": 510, "11": 514},
  "shots": 1024
}
```

**Response (in progress):**

```json
{
  "job_id": "arn:aws:braket:...",
  "status": "RUNNING",
  "counts": null
}
```

---

## Synchronous vs Asynchronous Execution

| Mode | Backends | Behavior |
|---|---|---|
| Synchronous | Qiskit (local), Braket (local) | Response includes results immediately |
| Asynchronous | Braket (hardware) | Response includes a `job_id`; poll for results |

For local simulators, results are returned synchronously in the response body.

For hardware execution on Braket, the API returns a `job_id`. Use `GET /v1/execute/braket/{job_id}` to poll for the result until `status` is `"COMPLETED"`.

---

## End-to-End Example

Optimize and execute a circuit in two steps:

```bash
# Step 1: fetch an example circuit
curl https://rqm-api.onrender.com/v1/circuits/example > example.json

# Step 2: optimize it
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize \
  -H "Content-Type: application/json" \
  -d @example.json > optimized.json

# Step 3: execute on Qiskit
curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

---

## Python SDK

Execution is also available via the Python SDK:

```python
from rqm_api import run

# Optimize and execute in one call
result = run(qc, backend="qiskit", optimize=True, shots=1024)
print(result.counts)
# {"00": 512, "11": 512}

# Braket backend
result = run(qc, backend="braket", optimize=True)
print(result.counts)
```

---

!!! note "See also"
    - [API Quickstart](quickstart.md) — get started in 30 seconds
    - [rqm-api reference](rqm-api-api.md) — full endpoint documentation
    - [Backends overview](backends.md) — SDK backend details
