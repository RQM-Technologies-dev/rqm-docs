# Agent Prompt Pack

Copy/paste these prompts to keep agent output aligned with documented RQM contracts.

## Use RQM API safely

```text
You are an implementation agent for RQM Platform.

Before coding:
- Read /llms.txt.
- Read /agents/ for task framing and boundary rules.
- Check /agent-contract.json for required constraints.
- Confirm routes and schemas in /api/overview/ and Swagger UI.

Execution requirements:
- Use documented API routes only.
- Avoid undocumented fields and inferred response keys.
- Keep public circuit payloads at the documented boundary.
- Do not treat internal IR (including u1q) as public contract.
- Label research-only content as research.
- Produce reproducible artifacts (payload JSON, responses, diffs, reports).
```

## Validate then optimize a circuit

```text
Implement a validate-then-optimize workflow for RQM.

Required prep:
1) Read /llms.txt.
2) Read /agents/recipes/validate-optimize/.
3) Check /agent-contract.json.
4) Verify exact validate/optimize routes in API docs or Swagger.

Rules:
- Never run optimize before a successful validation step.
- Use only documented request/response fields.
- Preserve response metadata.
- If route/schema details are missing, stop and report the gap.

Deliverables:
- Reproducible request payload(s).
- Captured validation and optimization outputs.
- Short diff/report showing what changed.
```

## Generate a typed client from documented API surfaces

```text
Generate a typed RQM API client from documented API surfaces only.

Required prep:
- Read /llms.txt.
- Read /agents/recipes/client-generation/.
- Check /agent-contract.json.
- Confirm routes/schemas in /api/overview/ and Swagger.

Rules:
- Include methods only for documented endpoints.
- Do not include undocumented fields in models.
- Include validate-before-optimize helper flow.
- Mark uncertain/undocumented behavior explicitly instead of inferring.

Deliverables:
- Typed models and client methods.
- Fixture payloads based on documented schemas.
- Reproducible tests or request examples.
```

## Build an RQM Studio workflow

```text
Design and implement an RQM Studio workflow that orchestrates documented API calls.

Required prep:
- Read /llms.txt.
- Read /agents/recipes/studio-workflow/.
- Check /agent-contract.json.
- Confirm route/schema details in API docs or Swagger.

Rules:
- Treat Studio as a workflow layer above rqm-api.
- Keep workflow state transitions explicit and auditable.
- Use documented fields only.
- Separate production behavior from research notes in UI/content.

Deliverables:
- Workflow step map.
- Reproducible payloads and outputs per step.
- Artifact bundle (logs, JSON payloads, diffs, or report).
```

## Explain RQM research concepts without overclaiming

```text
Explain RQM research concepts conservatively.

Required prep:
- Read /llms.txt.
- Read /agents/recipes/research-boundary/.
- Check /agent-contract.json.
- Ground production references in documented API routes/schemas.

Rules:
- Label speculative or research-only statements as research.
- Do not present research concepts as production guarantees.
- Avoid performance/physical advantage claims without benchmark evidence.
- Separate shipped behavior from exploratory ideas.

Deliverables:
- Structured explanation with explicit production vs research labels.
- Citations to relevant docs/pages used.
```

## Audit a PR for RQM contract compliance

```text
Audit this PR for RQM agent contract compliance.

Required prep:
- Read /llms.txt.
- Read /agents/contract/, /agents/contract-checklist/, and /agents/contract-tests/.
- Check /agent-contract.json.
- Verify API routes/schemas in API docs or Swagger where touched.

Audit checks:
- Any invented endpoints or undocumented fields?
- Any use of internal IR presented as public contract?
- Validation-before-optimization flow preserved?
- Production vs research boundary language preserved?
- Reproducible artifacts included for behavior claims?

Deliverables:
- Pass/fail checklist with evidence.
- Precise remediation notes and file-level diffs needed.
```
