# Optimization API

The optimization product surface is exposed through `rqm-api` endpoints and backed by the internal optimization engine.

---

## Core endpoint

- `POST /v1/circuits/optimize`

Companion endpoints:

- `POST /v1/circuits/validate`
- `POST /v1/circuits/analyze`
- `GET /v1/circuits/example`

---

## Product behavior

- accepts circuits at the public circuit boundary
- runs canonical optimization internally
- returns optimized payloads with report metadata
- preserves trust semantics through proof-gated commit behavior
