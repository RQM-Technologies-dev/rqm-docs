# API Quickstart

A concise path through the current `rqm-api` surface using the live service boundary.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-file-tree: API Overview](rqm-api-api.md){ .md-button }

---

## 1. Get example circuits

The current example endpoint supports named examples:

- `bell`
- `ghz`
- `optimizable`

Omitting `name` returns all examples.

```bash
curl "https://rqm-api.onrender.com/v1/circuits/example?name=bell"
```

To retrieve the full set:

```bash
curl "https://rqm-api.onrender.com/v1/circuits/example"
```

The current public wire format is **`rqm-circuits` schema `0.2`**. Legacy `0.1` may still be accepted for compatibility, but `0.2` is the current target.

---

## 2. Validate or analyze

Validate first if you are generating payloads yourself:

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/validate \
  -H "Content-Type: application/json" \
  -d @example.json
```

Analyze when you want structure and compatibility enrichment without changing the circuit:

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/analyze \
  -H "Content-Type: application/json" \
  -d @example.json
```

`/v1/circuits/analyze` includes compatibility entanglement enrichment where available.

---

## 3. Optimize with profile and backend hints

`/v1/circuits/optimize` supports:

- `profile`: `safe`, `balanced` (default), `aggressive`
- `backend`: `generic`, `qiskit`, `braket`

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "circuit": { ... },
    "profile": "balanced",
    "backend": "generic"
  }'
```

Documented conservatively: some profile/backend combinations are reserved or equivalent in the current release. Treat the hints as part of a stable request contract, not as a guarantee of materially different output in every case.

---

## 4. Inspect coupling or preservation

Use the coupling surfaces when you need trust signals around entangling structure or before/after preservation:

```bash
curl -X POST https://rqm-api.onrender.com/v1/analysis/coupling \
  -H "Content-Type: application/json" \
  -d @example.json
```

```bash
curl -X POST https://rqm-api.onrender.com/v1/analysis/coupling/compare \
  -H "Content-Type: application/json" \
  -d '{"original": { ... }, "candidate": { ... }}'
```

Measured analysis is intentionally limited. Outside supported scope, the platform falls back to qualitative signals instead of fabricating measured claims.

---

## 5. Inspect execution capabilities first

Before showing users backend options, inspect readiness:

```bash
curl https://rqm-api.onrender.com/v1/execute/capabilities
```

Use this endpoint before offering Qiskit, Braket local, or billed hardware flows in a client or Studio workflow.

---

## 6. Execute

### Qiskit path

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/qiskit \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

### Braket local / managed path

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/braket \
  -H "Content-Type: application/json" \
  -d @optimized.json
```

### Held-job hardware flow

```bash
curl -X POST https://rqm-api.onrender.com/v1/execute/braket/held/{job_id}
```

Do not assume universal instant hardware access. Hardware submission depends on provider readiness, credentials, billing state, validation, and any required quote/hold flow.

---

## 7. Authenticated and Pro surfaces

Unauthenticated circuit workflows are only part of the platform surface. Authenticated sessions matter for:

- account identity and diagnostics
- Pro/account state
- wallet and billing visibility
- held-job and hardware-oriented flows
- dashboard and recovery surfaces

See:

- [Authentication](authentication.md)
- [Billing & Wallet](billing-and-wallet.md)
- [Execution Capabilities](execution-capabilities.md)
