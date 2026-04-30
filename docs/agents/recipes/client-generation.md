# Generate an RQM API Client

## Prompt template for an agent

```text
Generate a typed RQM API client using only documented routes and schemas from /api/overview/ and Swagger UI.
Never generate undocumented methods.
Use typed request/response models where possible and preserve response envelope metadata.
Include a validate-before-optimize helper and tests that cover documented examples only.
If schema detail is unclear in docs, confirm exact route/schema in Swagger UI before implementation.
```

## Expected modules

- `rqm_client/config`
- `rqm_client/http`
- `rqm_client/circuits`
- `rqm_client/optimization`
- `rqm_client/execution`
- `rqm_client/errors`
- `tests/fixtures`

## Requirements

1. **Source routes from Swagger/API docs.**
   - Use `/api/overview/` and linked route docs.
   - Confirm route and payload shapes in Swagger UI before code generation.

2. **Never generate undocumented methods.**
   - If a desired feature is not documented, create a TODO with “confirm in Swagger UI” note.

3. **Use typed request/response models where possible.**
   - Represent success/error envelope (`status`, `data`/`error`, `meta`).
   - Keep optional fields explicit rather than inferred.

4. **Preserve request IDs / metadata.**
   - Bubble up `meta` in all client return types.
   - Keep correlation IDs in logs and test artifacts.

5. **Include validate-before-optimize helper.**
   - Helper must block optimize requests when validation fails.
   - Helper should return structured validation errors.

6. **Add tests around documented examples only.**
   - Use fixtures grounded in docs.
   - For missing schema detail, use placeholder fixtures with explicit “confirm schema in Swagger UI” warnings.

## Implementation caution

If endpoint details in repository docs and Swagger differ, treat Swagger as the current implementation source and annotate version/date in generated client notes.
