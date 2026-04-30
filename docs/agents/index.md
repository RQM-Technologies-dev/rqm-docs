# Agent Portal

RQM is an agent-ready quantum software and API platform for circuit validation, optimization, execution routing, quaternionic/SU(2) math utilities, geometry-native analysis, and RQM Studio workflows.

Use this portal to ground coding agents in documented schemas, routes, prompts, and workflow boundaries before implementation.

## Agent, read this first

```text
You are implementing against RQM.

1) Read /llms.txt first.
2) Use documented API surfaces from API Overview and Swagger UI.
3) Start from public circuit payloads (rqm-circuits schema 0.2).
4) Validate payloads before optimize/analyze flows.
5) Do not infer internal optimizer IRs (e.g., u1q) as public contracts.
6) Do not invent endpoints, fields, or guarantees that are not documented.
7) Label research concepts as research; keep production claims bounded to documented behavior.
8) Treat RQM Studio as a workflow layer above rqm-api.
9) Generate reproducible artifacts (request payloads, reports, diffs, metrics) whenever possible.
```

## Start links

- [llms.txt](../llms.txt)
- [llms-full.txt](../llms-full.txt)
- [Prompt Pack](prompts.md)
- [Cursor / Codex Setup](cursor.md)
- [MCP Server Plan](mcp.md)
- [API Overview](../api/overview.md)
- [Swagger UI](https://rqm-api.onrender.com/docs)
- [Quickstart](../getting-started/quickstart.md)

## Rules for all agents

- Validate circuit payloads before optimization.
- Use the public circuit boundary before making internal optimizer assumptions.
- Do not invent undocumented endpoints.
- Separate production-supported API behavior from research concepts.
- Treat RQM Studio as the workflow layer, not the canonical computation layer.
- Generate reproducible artifacts where possible.

## Who this portal is for

| Entry path | Use this when you need to |
|---|---|
| Coding agent | Implement or refactor code using only documented RQM contracts |
| Developer | Build clients, integrations, and app features on top of rqm-api |
| RQM Studio builder | Extend workflow UX while preserving API and boundary semantics |
| Quantum circuit evaluator | Compare validation/optimization outputs and trust artifacts |
| Research assistant | Explore concepts while clearly labeling research vs production behavior |
| Partner/evaluator | Review architecture, trust posture, and integration readiness |


## Next: use recipes

- [Agent Recipes](recipes/index.md)
- [Validate → Optimize Workflow](recipes/validate-optimize.md)
- [RQM Studio Agent Workflow](recipes/studio-workflow.md)
- [Generate an RQM API Client](recipes/client-generation.md)
- [Production vs Research Boundary](recipes/research-boundary.md)
- Machine-readable task manifest: [`/agent-tasks.json`](../agent-tasks.json)


## Compliance layer

- [Agent Contract](contract.md)
- [Agent Compliance Checklist](contract-checklist.md)
- [Agent Contract Tests](contract-tests.md)
- Machine-readable contract manifest: [`/agent-contract.json`](../agent-contract.json)
