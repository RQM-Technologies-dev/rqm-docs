# Agent Portal

**Agents: start here before writing code.**

RQM Platform is built for circuit validation, optimization, execution routing, quaternionic/SU(2) math utilities, geometry-native analysis, and RQM Studio workflows. Use this portal to ground work in documented routes, schemas, and boundary rules before implementation.

## Agent, read this first

```text
You are implementing against RQM.

1) Read /llms.txt first.
2) Read /agents/ to choose a task path and constraints.
3) Check /agent-contract.json before proposing payloads, routes, or claims.
4) Use documented API surfaces from API Overview and Swagger UI.
5) Start from public circuit payloads (rqm-circuits schema 0.2).
6) Validate payloads before optimize/analyze/execution flows.
7) Do not infer internal optimizer IRs (e.g., u1q) as public contracts.
8) Do not invent endpoints, fields, or guarantees that are not documented.
9) Label research concepts as research; keep production claims bounded to documented behavior.
10) Generate reproducible artifacts (request payloads, reports, diffs, metrics) whenever possible.
```

## Choose Your Task

| Task | Start page | Why this page |
|---|---|---|
| Validate a circuit | [Validate → Optimize](recipes/validate-optimize.md) | Validation-first flow with artifact expectations. |
| Optimize a circuit | [Validate → Optimize](recipes/validate-optimize.md) | Keeps optimization on documented, validated inputs. |
| Generate an API client | [API Client Generation](recipes/client-generation.md) | Typed-client guidance from documented API surfaces. |
| Build an RQM Studio workflow | [RQM Studio Workflow](recipes/studio-workflow.md) | Studio-specific workflow sequencing and boundaries. |
| Compare execution bridges | [Execution Bridges](../platform/execution-bridges.md) | Provider bridge model and routing expectations. |
| Explore research concepts safely | [Production vs Research Boundary](recipes/research-boundary.md) | Clear boundary language for production vs research. |

## Start links

- [llms.txt](../llms.txt)
- [llms-full.txt](../llms-full.txt)
- [Prompt Pack](prompts.md)
- [Cursor / Codex Setup](cursor.md)
- [MCP Server Plan](mcp.md)
- [Recipe Index for Agents](recipes/README-for-agents.md)
- [API Overview](../api/overview.md)
- [Swagger UI](https://rqm-api.onrender.com/docs)
- [Quickstart](../getting-started/quickstart.md)

## Rules for all agents

- Validate circuit payloads before optimization.
- Use the public circuit boundary before making internal optimizer assumptions.
- Do not invent undocumented endpoints.
- Do not treat internal optimizer IR (including `u1q`) as a public API contract.
- Separate production-supported API behavior from research concepts.
- Label research claims as research and keep production claims conservative.
- Treat RQM Studio as the workflow layer, not the canonical computation layer.
- Generate reproducible artifacts where possible.

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
