# RQM Studio Agent Workflow

RQM Studio should be implemented as an orchestration and UX layer that sits above documented API behavior.

## Boundary model for agents

- **Studio is workflow/UI layer:** collect inputs, sequence API calls, and present artifacts.
- **`rqm-api` is service boundary:** validation, analysis, optimization, and execution traffic should pass through documented API routes.
- **`rqm-circuits` is public circuit contract:** use it for payload exchange and persisted fixtures.
- **`rqm-compiler` internals are not public payload contracts:** internal IR details (for example `u1q`) should not appear as public request contracts.
- **Execution bridges handle provider-specific lowering:** keep backend-specific behavior behind bridge-aware execution workflows.
- **Verification/trust surfaces should be exposed to users:** make report artifacts and metadata visible in UI states.

## Suggested Studio workflow states

1. Payload draft
2. Payload validated
3. Optimization candidate generated
4. Verification report attached
5. Provider route selected
6. Execution submitted
7. Result + artifacts archived

## UX copy guidelines

Use conservative, product-safe labels:

- “optimization candidate”
- “validated payload”
- “verification report”
- “provider route”
- “documented behavior”

Avoid overclaiming:

- Do **not** claim guaranteed quantum advantage.
- Do **not** imply undocumented hardware or performance guarantees.
- Do **not** present research concepts as production behavior.

## Research labeling guidance

When showing conceptual material (e.g., quaternionic/SU(2) interpretation or internal IR discussions), label it clearly as:

- research-only,
- conceptual,
- planned/proposed,

and keep it separate from production workflow instructions.
