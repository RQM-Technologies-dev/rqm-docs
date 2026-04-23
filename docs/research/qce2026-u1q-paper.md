# QCE 2026 paper draft

This page tracks the current draft research narrative for `u1q`, the canonical internal single-qubit IR used by the RQM optimization engine.

---

## Draft focus

- define `u1q` as an internal canonical IR for single-qubit optimization
- document separation between public circuit boundary and internal canonicalization
- evaluate optimization effects across Qiskit, Braket, and PennyLane bridge targets
- keep claims conservative and verification-oriented

---

## Working abstract

RQM treats optimization as a canonicalization-and-verification problem rather than a gate-name rewrite problem. Public payloads remain at the canonical external circuit IR boundary, while internal optimization uses `u1q` for normalized single-qubit reasoning. This separation supports backend-agnostic interchange, explicit backend lowering, and a fail-closed optimization posture.

---

## Notes

- This is an in-progress draft research surface.
- Product documentation claims should remain grounded in deployed repository behavior.
