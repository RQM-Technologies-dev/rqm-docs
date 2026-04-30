# Agent Contract

This contract defines when an implementation agent is **RQM-compliant** while building against RQM Platform docs and APIs.

## Contract summary

An RQM-compliant agent must:

- Start from documented agent entrypoints.
- Select work from published manifests and recipes.
- Confirm API route/schema details in Swagger UI when exact request/response shape is required.
- Enforce validate-before-optimize behavior for circuit workflows.
- Preserve reproducible artifacts and metadata.
- Keep production behavior separate from research concepts.

## Required agent behaviors

1. Read `/llms.txt` first.
2. Read `/capabilities.json` and `/agent-tasks.json` before selecting a workflow.
3. Use [Agent Recipes](recipes/index.md) before inventing a custom flow.
4. Confirm routes and schemas in Swagger UI when implementation depends on exact API shape.
5. Validate circuit payloads before optimize/analyze flows.
6. Preserve request/response artifacts.
7. Preserve metadata where available.
8. Label research-only concepts clearly.
9. Avoid claims of physical or quantum advantage unless attached to documented benchmark/output artifacts.

## Forbidden agent behaviors

- Inventing undocumented endpoints.
- Treating internal IR as a public API contract.
- Presenting research concepts as production guarantees.
- Dropping unknown fields silently.
- Claiming performance improvement without reproducible evidence.
- Treating RQM Studio as canonical computation layer.

## Required artifacts

For integration and review, preserve at minimum:

- Request payload JSON.
- Response envelope JSON.
- Validation outcomes and error reports.
- Optimization comparison/diff or metrics artifacts when optimization is used.
- Metadata (request IDs, timestamps, correlation IDs) when available.

## Production vs research handling

- **Production/documented:** implement directly from API docs, boundary docs, and Swagger-confirmed routes.
- **Research/conceptual:** mark clearly as research-only and keep out of production guarantees.
- **Planned/proposed:** do not treat as currently available behavior.

## Validate-before-optimize requirement

For circuit flows, validation is mandatory before analyze/optimize.

If validation fails:

1. Stop downstream optimize/execution steps.
2. Persist failure artifacts.
3. Repair payload against documented public boundary.
4. Re-run validation before continuing.

## Swagger/API confirmation requirement

When coding concrete request/response models, confirm exact route/schema details in Swagger UI.

- Use docs as workflow and boundary guidance.
- Use Swagger UI as route/schema confirmation surface.
- Do not infer missing fields or undocumented variants.

## Public circuit boundary requirement

Use public `rqm-circuits` boundary semantics for external payloads.

- Do not expose internal optimizer IR as public contract.
- Do not treat internal transformations as user-facing schema guarantees.

## RQM Studio workflow-layer boundary

RQM Studio is an orchestration/workflow layer above `rqm-api`.

- Studio coordinates states and user experience.
- API endpoints remain canonical service boundary.
- Studio is not canonical computation layer.

## Trust/verification requirement

Optimization outcomes are trust-sensitive.

- Preserve evidence artifacts.
- Use conservative wording such as “optimization candidate” unless verified by documented outputs.
- Avoid advantage claims without reproducible benchmark/output artifacts.

## Example good agent behavior

- Reads `/llms.txt`, `/capabilities.json`, and `/agent-tasks.json`.
- Selects Validate → Optimize recipe before custom design.
- Confirms exact optimize route/schema in Swagger UI before coding.
- Saves validate/optimize request+response artifacts with metadata.
- Labels research notes as research-only.

## Example bad agent behavior

- Implements an undocumented route.
- Runs optimize before validation.
- Treats internal IR as public payload schema.
- Claims guaranteed advantage without evidence artifacts.
- Presents research concepts as production guarantees.
