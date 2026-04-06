# RQM Studio

RQM Studio is the **visual and workflow layer** for the RQM platform. It sits on top of `rqm-api` and organizes product workflows around theory, optimization, execution-oriented operations, jobs, and account surfaces.

Studio is broader than a visualization demo, but it is also **not** the API. The canonical service boundary remains `rqm-api`.

---

## What Studio covers

| Workflow area | What Studio adds |
|---|---|
| Theory and geometry | A visual interface for quaternionic / SU(2) ideas, Bloch intuition, and circuit interpretation |
| Optimization | Intake, optimize, compare, and verification-oriented views over compiler results |
| Execution-oriented workflows | Capability-aware execution setup, provider selection, and managed flow entry points |
| Jobs and reporting | Job status, results inspection, and report-friendly workflow surfaces |
| Import and intake | Circuit intake paths built on the public `rqm-circuits` boundary exposed through `rqm-api` |
| Pro / account / billing | Account-bound surfaces for wallet, dashboard, spend controls, and managed readiness |

---

## The boundary that matters

Studio does not replace the API contract.

```text
Studio
  ↓
rqm-api
  ↓
rqm-circuits 0.2
  ↓
rqm-compiler / u1q / backend lowering
```

That separation keeps UI workflows flexible while preserving a stable service boundary for integrations.

---

## What Studio is good for now

- understanding the model through a geometry-aware interface
- bringing in a circuit and checking whether it is valid and analyzable
- running optimization workflows and reviewing what changed
- moving from optimization toward execution using capability-aware choices
- tracking jobs, reports, and account-bound operational surfaces

---

## What Studio should not imply

- Studio is not a guarantee of backend or hardware availability
- Studio is not the public wire-format definition
- Studio is not the internal optimization engine
- Studio billing readiness does not by itself guarantee hardware execution

---

## Next steps

| Goal | Page |
|---|---|
| Understand Studio by workflow | [Studio Workflows](studio-workflows.md) |
| Understand theory-facing surfaces | [Optimization Theory](optimization-theory.md) |
| Understand Pro/account surfaces | [Studio Pro](studio-pro.md) |
| Understand the API behind Studio | [API Overview](../api/rqm-api-api.md) |
