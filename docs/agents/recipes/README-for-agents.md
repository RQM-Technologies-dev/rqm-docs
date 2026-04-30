# Recipe Index for Agents

Use this page to pick the right recipe quickly. Read `/llms.txt` and `/agent-contract.json` first, then select a task path below.

## Task → recipe map

| If your task is... | Use this recipe first | Then check |
|---|---|---|
| Validate and optimize a circuit safely | [Validate → Optimize](validate-optimize.md) | [Circuits API](../../api/circuits.md) |
| Build an RQM Studio orchestration flow | [RQM Studio Workflow](studio-workflow.md) | [RQM Studio](../../products/rqm-studio.md) |
| Generate SDK/client code from public APIs | [API Client Generation](client-generation.md) | [API Overview](../../api/overview.md) |
| Explain boundaries for research-facing work | [Production vs Research Boundary](research-boundary.md) | [Verification / Trust](../../products/verification-trust.md) |
| Browse all workflow patterns | [Recipe Overview](index.md) | [Agent Portal](../index.md) |

## Usage rules

- Use documented API routes/schemas only.
- Validate before optimize.
- Do not use internal IR (`u1q`) as public contract.
- Label research claims as research.
- Produce reproducible artifacts (payloads, outputs, diffs, reports).
