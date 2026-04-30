<div class="rqm-home" markdown="1">

<div class="rqm-card rqm-hero rqm-grid" markdown="1">

# RQM Platform

Agent-ready quantum software documentation for circuit validation, optimization, execution routing, and geometry-native analysis.

<div class="rqm-button-row" markdown="1">

[:material-robot-outline: Connect an Agent](agents/index.md){ .md-button .md-button--primary }
[:material-file-document-outline: Read llms.txt](llms.txt){ .md-button }
[:material-api: API Overview](api/overview.md){ .md-button }
[:material-domain: Company + Product Map](company-overview.md){ .md-button }
[:material-rocket-launch: Quickstart](getting-started/quickstart.md){ .md-button }

</div>

</div>

## Built for agents and developers

RQM keeps the public integration boundary explicit while giving developers and coding agents clear paths to validate circuits, run optimization workflows, and route execution through documented bridges.

<div class="rqm-cols-3" markdown="1">

<div class="rqm-card" markdown="1">

<h3>Agent Connect</h3>

Start with machine-readable docs and implementation guidance for coding assistants.

- [Agent Portal](agents/index.md)
- [Prompt Pack](agents/prompts.md)
- [Contract Tests](agents/contract-tests.md)

</div>

<div class="rqm-card" markdown="1">

<h3>API + Circuit Boundary</h3>

Build against the documented API and canonical public circuit schema.

- [API Overview](api/overview.md)
- [Canonical Circuit Boundary](platform/canonical-circuit-boundary.md)
- [Optimization API](products/optimization-api.md)

</div>

<div class="rqm-card" markdown="1">

<h3>Verification + Trust</h3>

Use trust and verification pages to understand proof-gated and fail-closed behavior.

- [Verification / Trust](products/verification-trust.md)
- [Production vs Research Boundary](agents/recipes/research-boundary.md)
- [Platform Architecture](platform/architecture.md)

</div>

</div>

## Architecture flow

<div class="rqm-flow" markdown="1">

`Studio / SDK / Agent → rqm-api → rqm-circuits → rqm-compiler → execution bridges`

</div>

## Start by role

| Role | Start here |
|---|---|
| Coding Agent | [Agent Portal](agents/index.md), [llms.txt](llms.txt), and [Contract Tests](agents/contract-tests.md) |
| Developer | [Quickstart](getting-started/quickstart.md) and [API Overview](api/overview.md) |
| Studio Builder | [RQM Studio](products/rqm-studio.md) and [Execution Workflows](products/execution-workflows.md) |
| Evaluator / Partner | [Platform Architecture](platform/architecture.md) and [Verification / Trust](products/verification-trust.md) |
| Research Assistant | [QCE 2026 paper draft](research/qce2026-u1q-paper.md) and [SU(2) geometry](concepts/su2-geometry.md) |

</div>


## Documentation posture

This site separates production, beta, research, and planned material so integrations stay grounded in documented behavior.

- Production and beta: use for implementation with route/schema checks.
- Research and planned: treat as non-contractual unless shipped in documented API surfaces.
- Start with [Company + Product Map](company-overview.md) for entity/layer relationships.
