# Execution Capabilities

`GET /v1/execute/capabilities` is the **readiness endpoint** clients should consult before exposing execution options.

**Base URL:** `https://rqm-api.onrender.com`

---

## Endpoint

- `GET /v1/execute/capabilities`

```bash
curl https://rqm-api.onrender.com/v1/execute/capabilities
```

---

## Why this endpoint matters

Execution in the RQM stack is not a single always-on surface. Different routes can depend on different conditions, including:

- local execution availability
- provider integration state
- deployment configuration
- credentials
- account or billing readiness
- quote / hold requirements for hardware-oriented flows

Because of that, **capabilities should be checked before execution choices are shown** in Studio, internal tools, or customer clients.

---

## Recommended client behavior

Use capabilities to decide whether to show or suppress:

- Qiskit execution options
- Braket local simulator options
- Braket hardware-oriented flows
- held-job continuation actions
- hardware quote / hold affordances that would otherwise dead-end

This keeps the product honest and avoids presenting hardware access as unconditional.

---

## Relationship to other execution endpoints

A typical execution sequence is:

1. `POST /v1/circuits/validate` or `POST /v1/circuits/optimize`
2. `GET /v1/execute/capabilities`
3. optional `GET /v1/execute/braket/devices`
4. `POST /v1/execute/qiskit` or `POST /v1/execute/braket`
5. if needed, `POST /v1/execute/braket/held/{job_id}`
6. `GET /v1/execute/braket/{job_id}`

---

## Operational guidance

Capabilities should be read together with:

- [Execution](execution.md)
- [Billing & Wallet](billing-and-wallet.md)

Even when payment and wallet surfaces are ready, hardware execution still depends on backend/provider readiness and policy checks.
