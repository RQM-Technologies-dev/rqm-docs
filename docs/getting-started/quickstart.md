# Quickstart

This quickstart is API-first and uses the current RQM service boundary.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-api: API Overview](../api/overview.md){ .md-button }

---

## 1) Fetch a valid example circuit

```bash
curl "https://rqm-api.onrender.com/v1/circuits/example?name=optimizable" > circuit.json
```

The current public circuit boundary is `rqm-circuits` schema `0.2`.

---

## 2) Validate and analyze

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/validate   -H "Content-Type: application/json"   -d @circuit.json
```

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/analyze   -H "Content-Type: application/json"   -d @circuit.json
```

---

## 3) Optimize through the internal optimization engine

```bash
curl -X POST https://rqm-api.onrender.com/v1/circuits/optimize   -H "Content-Type: application/json"   -d @circuit.json
```

Optimization runs through the internal optimization engine and returns optimized payloads plus report metadata.

---

## 4) Inspect execution readiness, then route

```bash
curl https://rqm-api.onrender.com/v1/execute/capabilities
```

Then choose an execution route:

- `POST /v1/execute/qiskit`
- `POST /v1/execute/braket`

---

## Next steps

- [SDK / local setup](sdk-local-setup.md)
- [Platform architecture](../platform/architecture.md)
- [Verification / Trust](../products/verification-trust.md)
