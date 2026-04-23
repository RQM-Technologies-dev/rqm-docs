# SU(2) geometry

SU(2) is the group structure behind single-qubit unitary rotations and is central to RQM's geometric foundations.

---

## Definition

A matrix `U` is in SU(2) when:

```text
U†U = I
 det(U) = 1
```

---

## Practical takeaway

RQM uses the SU(2)-quaternion relation in `rqm-core` to keep optimization and analysis grounded in consistent geometry.
