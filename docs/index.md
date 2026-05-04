<div class="rqm-home" markdown="1">

<div class="rqm-card rqm-hero rqm-grid" markdown="1">

# RQM Platform

Agent-ready quantum software for validating, optimizing, and routing quantum circuits through geometry-native tooling.

**Do not learn the whole theory first. Enter through the problem you already have.**

<div class="rqm-button-row" markdown="1">

[:material-tune-variant: Optimize a Circuit](products/optimization-api.md){ .md-button .md-button--primary }
[:material-robot-outline: Connect an Agent](agents/index.md){ .md-button .md-button--primary }
[:material-api: API Overview](api/overview.md){ .md-button }
[:material-rocket-launch: Quickstart](getting-started/quickstart.md){ .md-button }
[:material-domain: Company + Product Map](company-overview.md){ .md-button }
[:material-file-document-outline: Read llms.txt](llms.txt){ .md-button }

</div>

</div>

## What are you trying to improve?

<div class="rqm-cols-3" markdown="1">

<div class="rqm-card" markdown="1">

<h3>1) I optimize quantum circuits</h3>

Circuits are too large, too deep, or hard to reason about. Start by validating circuits, running optimization, and comparing before/after metrics such as gate count and depth where supported.

- [Optimization API](products/optimization-api.md)
- [Quickstart](getting-started/quickstart.md)
- [API Overview](api/overview.md)
- [Optimization Engine](platform/optimization-engine.md)

</div>

<div class="rqm-card" markdown="1">

<h3>2) I build with Qiskit, Braket, PennyLane, or other SDKs</h3>

Use RQM as a geometry-native optimization and routing layer around your existing SDK workflow instead of replacing your stack.

- [Execution Bridges](platform/execution-bridges.md)
- [Execution Workflows](products/execution-workflows.md)
- [SDK Local Setup](getting-started/sdk-local-setup.md)
- [Execution API](api/execution.md)

</div>

<div class="rqm-card" markdown="1">

<h3>3) I am building with agents</h3>

Use machine-readable docs, prompts, contract tests, and recipes that AI coding assistants can execute against.

- [Agent Portal](agents/index.md)
- [Prompt Pack](agents/prompts.md)
- [Contract Tests](agents/contract-tests.md)
- [Agent Recipes](agents/recipes/index.md)
- [llms.txt](llms.txt)

</div>

<div class="rqm-card" markdown="1">

<h3>4) I evaluate, fund, or partner with advanced technology</h3>

See what is production, what is measured, and what remains research. Start from architecture and verification/trust boundaries.

- [Company + Product Map](company-overview.md)
- [Platform Architecture](platform/architecture.md)
- [Verification / Trust](products/verification-trust.md)
- [Production vs Research Boundary](agents/recipes/research-boundary.md)

</div>

<div class="rqm-card" markdown="1">

<h3>5) I want the theory</h3>

Explore quaternionic/SU(2)/spinor geometry after choosing a practical entry path. Theory and research are non-contractual unless shipped in documented APIs.

- [Quaternion Intuition](concepts/quaternion-intuition.md)
- [Spinor-Bloch Mapping](concepts/spinor-bloch.md)
- [SU(2) Geometry](concepts/su2-geometry.md)
- [Global Phase](concepts/global-phase.md)
- [QCE 2026 paper draft](research/qce2026-u1q-paper.md)

</div>

</div>

## The RQM connection model

RQM should be easy to enter from different user contexts. Quantum developers, SDK users, agents, evaluators, and researchers should not all be forced through the same front door.

This homepage is organized around practical connection points first: validate, optimize, integrate, and verify. Theory remains available, but downstream from implementation paths.

## Architecture flow

<div class="rqm-flow" markdown="1">

`Studio / SDK / Agent → rqm-api → rqm-circuits → rqm-compiler → execution bridges`

</div>

## Start by role

| Role | Recommended first door | Start here |
|---|---|---|
| Quantum Developer | 1) Optimize circuits | [Optimization API](products/optimization-api.md), [Quickstart](getting-started/quickstart.md), [Optimization Engine](platform/optimization-engine.md) |
| SDK Integrator | 2) Build with existing SDKs | [Execution Bridges](platform/execution-bridges.md), [Execution Workflows](products/execution-workflows.md), [Execution API](api/execution.md) |
| Coding Agent Builder | 3) Build with agents | [Agent Portal](agents/index.md), [llms.txt](llms.txt), [Contract Tests](agents/contract-tests.md) |
| Evaluator / Partner | 4) Evaluate or partner | [Company + Product Map](company-overview.md), [Platform Architecture](platform/architecture.md), [Verification / Trust](products/verification-trust.md) |
| Researcher | 5) Understand theory | [Quaternion Intuition](concepts/quaternion-intuition.md), [SU(2) Geometry](concepts/su2-geometry.md), [QCE 2026 paper draft](research/qce2026-u1q-paper.md) |

## Documentation posture

Use documentation by maturity level:

- **Production/Beta pages:** implementation surfaces for real integrations, with documented API and boundary behavior.
- **Research/Planned pages:** non-contractual references unless and until behavior is shipped in documented API surfaces.
- **When in doubt:** confirm scope via [Company + Product Map](company-overview.md) and API/product pages tied to your selected door.

</div>
