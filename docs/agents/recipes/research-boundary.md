# Production vs Research Boundary

Use this page to keep implementation work anchored to documented platform behavior.

## Classification table

| Category | What belongs here | Agent handling guidance |
|---|---|---|
| **Production/documented behavior** | Published API routes, response envelope, public circuit boundary (`rqm-circuits`), and documented trust posture. | Implement directly from docs + Swagger; treat as default integration surface. |
| **Beta/documented behavior** | Documented but capability-gated behavior such as execution routing surfaces and bridge-specific workflows. | Implement with capability checks, fallback behavior, and explicit status labeling in UI/logs. |
| **Research/conceptual material** | Conceptual geometry/SU(2) explanations, speculative methods, and non-contractual research narratives. | Keep separate from runtime guarantees; label as research-only when exposed to users. |
| **Planned/proposed material** | MCP plans, future integrations, or design intentions not yet documented as shipped APIs. | Do not implement as available features; track as backlog with “not yet production” tags. |

## Conservative wording rules

- Prefer “documented behavior” over implied guarantees.
- Prefer “optimization candidate” over “proven improvement” unless backed by documented artifacts.
- Prefer “provider route” over provider-specific guarantees.
- Prefer “verification report” over “proof of quantum advantage.”

## Non-goals for production agents

- Do not merge internal compiler IR assumptions into public payload models.
- Do not claim guaranteed quantum advantage without documented benchmark artifacts.
- Do not infer undocumented routes, fields, or status semantics.

## Practical checklist

1. Confirm feature surface in docs and Swagger.
2. Apply category label (production, beta, research, planned).
3. Write implementation notes and UI copy using conservative wording.
4. Attach artifacts (requests/responses/reports) for behavior claims.
