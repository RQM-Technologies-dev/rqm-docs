# Execution

Execution routes circuits through provider-facing paths after readiness checks.

**Base URL:** `https://rqm-api.onrender.com`

---

## Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/execute/capabilities` | `GET` | Readiness and route availability |
| `/v1/execute/qiskit` | `POST` | Qiskit/IBM execution route |
| `/v1/execute/braket` | `POST` | Braket execution route |
| `/v1/execute/braket/held/{job_id}` | `POST` | Held-job continuation |
| `/v1/execute/braket/devices` | `GET` | Braket device discovery |
| `/v1/execute/braket/{job_id}` | `GET` | Braket job status |

---

## Recommended order

1. validate or optimize circuit payloads
2. query `/v1/execute/capabilities`
3. choose a route intentionally
4. submit and monitor execution

---

## Notes

- capability checks should gate UI and client route selection
- billing readiness is not, by itself, hardware entitlement
- backend hints in optimization are not execution routing
