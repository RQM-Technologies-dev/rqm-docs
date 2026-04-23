# Architecture

The platform is easiest to reason about as a sequence of explicit boundaries.

---

## Layered flow

```text
Client / Studio / SDK
        |
        v
rqm-api                      <- service boundary
        |
        v
rqm-circuits (schema 0.2)    <- public circuit boundary
        |
        v
rqm-compiler                 <- internal optimization engine
        |
        v
execution bridges            <- qiskit / braket / pennylane
        |
        v
providers / simulators
```

`rqm-core` underpins compiler and analysis behavior across layers.

---

## Boundary rules

1. Public callers exchange circuits at the public circuit boundary.
2. Internal canonical forms such as `u1q` stay inside the internal optimization engine.
3. Backend targeting is an explicit execution-bridge concern, not a public payload concern.
4. Studio remains a workflow layer on top of the API.

---

## Trust posture

Optimization is proof-gated and fail-closed:

- verified candidates are committed
- unverified candidates are withheld
- original circuits are returned unchanged when proof is not established
