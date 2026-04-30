# Cursor / Codex Setup

Use this guide to configure Cursor, Codex, and similar repository agents for safe, reproducible RQM work.

## Recommended `.cursorrules` / agent instructions

```text
You are an agent working in the RQM docs/code ecosystem.

Always:
- Read /llms.txt first.
- Verify API behavior via API Overview and Swagger UI.
- Use documented payload examples before drafting new payloads.
- Run validate-before-optimize flows for circuit workflows.

Never:
- Invent undocumented endpoints or undocumented schema fields.
- Treat internal optimizer IRs as public payload contracts.
- Present research hypotheses as production guarantees.

Output quality:
- Keep production behavior and research notes clearly separated.
- Add reproducible artifacts when possible (request examples, output reports, diffs, tests).
```

## File reading order

1. `/llms.txt`
2. `/docs/api/overview.md`
3. `/docs/platform/canonical-circuit-boundary.md`
4. `/docs/platform/optimization-engine.md`
5. `/docs/platform/execution-bridges.md`
6. `/docs/products/rqm-studio.md`
7. Relevant domain page(s) and examples

## Safe edit boundaries

- Safe: docs copy, examples, guides, SDK snippets, integration recipes, testing docs.
- Caution: API route names, request/response schemas, and trust-language claims.
- Do not modify: production guarantees or endpoint inventories unless those changes are explicitly documented and verified.

## Expected implementation behavior for RQM client code

- Start from documented public payload contracts.
- Perform validation before optimization or execution routing.
- Keep backend-specific assumptions in explicit bridge layers.
- Surface verification/trust artifacts whenever available.
- Fail conservatively when inputs are invalid or capabilities are unknown.

## Testing expectations

- Run project checks (for this repo, `mkdocs build --strict`).
- Keep examples runnable or clearly marked as pseudocode.
- Ensure links, endpoint names, and payload fields match documentation.

## Adding examples without inventing endpoints

- Pull endpoint names from API Overview and Swagger UI.
- Reuse documented payload shapes and adapt only values, not schema structure.
- If a needed endpoint is absent, document a gap and propose it as planned instead of fabricating it.
