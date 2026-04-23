# Quaternion intuition

Quaternions provide compact rotation representations and are part of the math foundation used throughout the RQM platform.

---

## Core idea

A quaternion has one real and three imaginary components:

```text
q = w + xi + yj + zk
```

Unit quaternions (`w^2 + x^2 + y^2 + z^2 = 1`) map directly to rotation behavior relevant to single-qubit geometry.

---

## Why it matters here

RQM uses these primitives in `rqm-core` to support consistent geometry-aware analysis and optimization behavior.
