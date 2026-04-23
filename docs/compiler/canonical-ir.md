# Canonical IR (`u1q`)

`u1q` is the canonical internal single-qubit IR used by the internal optimization engine.

---

## What `u1q` is for

- normalize single-qubit structure after public circuit intake
- support deterministic optimization passes
- keep backend lowering as a later explicit stage

---

## Boundary reminder

`u1q` is intentionally internal. Public callers should exchange circuits using the canonical external circuit IR (`rqm-circuits`).

---

## Relationship to pipeline

```text
public circuit boundary -> internal optimization engine -> u1q canonicalization -> backend lowering
```

This separation preserves stable public contracts while enabling optimizer evolution.
