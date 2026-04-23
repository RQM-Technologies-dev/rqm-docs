# Circuits

Circuit endpoints handle public payload intake, analysis, and optimization.

**Base URL:** `https://rqm-api.onrender.com`

---

## Endpoints

- `GET /v1/circuits/example`
- `POST /v1/circuits/validate`
- `POST /v1/circuits/analyze`
- `POST /v1/circuits/optimize`

---

## Public circuit boundary

- canonical external circuit IR: `rqm-circuits`
- current schema target: `0.2`

This boundary is distinct from the internal optimization engine.

---

## Typical request flow

1. fetch or build a public circuit payload
2. validate and analyze
3. optimize
4. route to execution workflows
