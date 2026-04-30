# Agent Compliance Checklist

Use this checklist to evaluate whether an agent-generated RQM integration is contract-compliant.

## Preflight

- [ ] Agent output states `/llms.txt` was read first.
- [ ] Agent output references `/capabilities.json` before workflow selection.
- [ ] Agent output references `/agent-tasks.json` before workflow selection.
- [ ] Agent selected an existing recipe before proposing custom flow.

## API route usage

- [ ] All used endpoints are documented in API docs/Swagger.
- [ ] No undocumented routes are introduced.
- [ ] Exact request/response schema assumptions are confirmed in Swagger when needed.

## Payload handling

- [ ] Public circuit boundary is used for payload modeling.
- [ ] Validation occurs before optimize/analyze.
- [ ] Unknown fields are not silently dropped.
- [ ] Request/response envelope metadata is preserved when present.

## Optimization/trust behavior

- [ ] Optimization outputs are framed as candidates unless verified by artifacts.
- [ ] Claims of improvements are tied to reproducible evidence.
- [ ] Verification/trust artifacts are captured and referenced.

## RQM Studio workflow behavior

- [ ] Studio is treated as workflow/orchestration layer.
- [ ] `rqm-api` remains canonical service boundary in design.
- [ ] Studio is not treated as canonical computation contract.

## Research-language safety

- [ ] Research/conceptual content is labeled clearly.
- [ ] Planned/proposed behavior is not presented as shipped.
- [ ] No production guarantees are made from research-only material.

## Artifact/reproducibility

- [ ] Validation request/response artifacts are preserved.
- [ ] Optimize/analyze request/response artifacts are preserved when applicable.
- [ ] Metadata (request ID/timestamp/correlation ID) is preserved when available.
- [ ] Evidence bundle is sufficient for third-party replay/review.

## Pass/fail criteria

- [ ] **Pass:** all required checks above are satisfied; no forbidden behavior present.
- [ ] **Fail:** any forbidden behavior is present.
- [ ] **Fail:** validation-before-optimize rule is violated.
- [ ] **Fail:** undocumented endpoint usage is detected.
