# Execution

Execution in RQM is a **routed service surface**, not a blanket promise of backend availability. The current API distinguishes Qiskit paths, Braket local paths, and held-job hardware flows, and clients should consult capabilities before offering any of them.

**Base URL:** `https://rqm-api.onrender.com`

[:material-clipboard-check-outline: Execution Capabilities](execution-capabilities.md){ .md-button .md-button--primary }
[:material-book-open-variant: API Overview](rqm-api-api.md){ .md-button }

---

## Current endpoints

| Endpoint | Method | Role |
|---|---|---|
| `/v1/execute/qiskit` | `POST` | Qiskit local / IBM execution path |
| `/v1/execute/braket` | `POST` | Braket local simulator path and managed submission surface |
| `/v1/execute/braket/held/{job_id}` | `POST` | Held-job hardware submission flow |
| `/v1/execute/braket/devices` | `GET` | Device discovery for Braket-facing workflows |
| `/v1/execute/braket/{job_id}` | `GET` | Job status / result lookup |
| `/v1/execute/capabilities` | `GET` | Readiness inspection before offering execution options |

---

## Recommended order of operations

1. **Validate or optimize the circuit**
2. **Check `GET /v1/execute/capabilities`**
3. **Inspect Braket devices if relevant**
4. **Choose a provider path intentionally**
5. **For billed hardware, complete quote/hold readiness first**
6. **Submit execution and poll or continue the held-job flow as needed**

This order matters because capability, credentials, provider availability, and billing state can all affect what should be shown to the user.

---

## Qiskit: local / IBM path

### `POST /v1/execute/qiskit`

Use this path when you are routing through the Qiskit side of the platform.

What to document honestly:

- local Qiskit execution and IBM-oriented execution share the same endpoint surface
- actual availability depends on deployment configuration and credentials
- the endpoint should not be described as universal instant IBM hardware access

Typical use:

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

---

## Braket: local simulator path

### `POST /v1/execute/braket`

This endpoint covers the Braket-facing execution path. In the current release, it should be documented as the entry point for Braket local simulation and managed Braket submission workflows.

Typical use:

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/braket \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

Related inspection endpoints:

- `GET /v1/execute/braket/devices`
- `GET /v1/execute/braket/{job_id}`

---

## Held-job billed hardware flow

### `POST /v1/execute/braket/held/{job_id}`

Use this when a hardware-oriented workflow requires an explicit hold before execution. This is the clearest place to distinguish RQM's managed hardware submission flow from ordinary local simulation.

Documented conservatively, this flow depends on:

- provider/backend readiness
- valid credentials and account state
- hardware quote / hold state
- billing state
- circuit validation and any execution-policy checks

A hold is therefore an operational readiness step, not a guarantee that the provider path will execute successfully under all conditions.

---

## Capability inspection is part of execution

### `GET /v1/execute/capabilities`

This endpoint should be treated as part of the execution contract, not optional decoration. Use it before rendering provider options in Studio or any client.

Why it matters:

- it helps separate available from unavailable routes
- it keeps clients from advertising hardware options prematurely
- it supports clearer distinction between local, managed, and billed execution surfaces

See [Execution Capabilities](execution-capabilities.md).

---

## Device and job inspection

### `GET /v1/execute/braket/devices`

Use this to inspect Braket-facing device inventory or readiness metadata relevant to the current deployment.

### `GET /v1/execute/braket/{job_id}`

Use this to poll or inspect job state after asynchronous or managed execution submission.

---

## What execution docs should not imply

- Billing readiness is not hardware entitlement
- Capability presence is not the same as guaranteed provider uptime
- Studio availability is not a substitute for API readiness checks
- Backend hints during optimization are not the same thing as execution routing
