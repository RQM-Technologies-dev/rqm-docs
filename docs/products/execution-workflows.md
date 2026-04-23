# Execution Workflows

Execution workflows route optimized circuits to provider-facing paths with explicit readiness checks.

---

## Workflow sequence

1. Validate or optimize a circuit.
2. Query execution capabilities.
3. Select a route (Qiskit or Braket) based on readiness.
4. Submit and track execution jobs.

---

## Why readiness-first matters

Execution availability depends on deployment and provider conditions. Capability checks help clients avoid offering routes that are not currently available.
