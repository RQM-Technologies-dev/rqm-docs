# Compiler Actions

Compiler actions are exposed through circuit-facing API endpoints and executed inside the internal optimization engine.

---

## Exposed actions

- validate payloads before optimization
- analyze circuit structure and metrics
- optimize using the canonical internal pass sequence

Public entrypoint:

- `POST /v1/circuits/optimize`

---

## Canonical internal flow

Current pass sequence:

1. `normalize`
2. `canonicalize`
3. `flatten`
4. `to_u1q`
5. `merge_u1q`
6. `sign_canon`
7. `cancel_2q`

Canonical internal 1Q IR: `u1q`.

---

## Trust semantics

- candidate rewrites are verified before commit
- only verified candidates are committed
- original circuits are returned unchanged when verification is not established
