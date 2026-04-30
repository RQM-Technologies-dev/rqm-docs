# Validate → Optimize Workflow

## Agent instruction block

```text
Implement a validate-before-optimize pipeline using documented RQM API behavior.
Use the public rqm-circuits boundary first, preserve request/response artifacts,
and treat optimization outputs as trust-sensitive candidates with verification metadata.
If route or schema detail is missing from docs, confirm exact route/schema in Swagger UI before implementation.
```

## Step-by-step flow

1. **Read public circuit boundary docs.**
   - Confirm that payload exchange uses `rqm-circuits` schema target `0.2`.
   - Confirm separation between public payload boundary and internal `u1q` compiler IR.

2. **Prepare public circuit payload.**
   - Build payload from documented boundary expectations.
   - Attach correlation/request metadata for traceability.
   - If field-level schema detail is not present in docs, **confirm exact route/schema in Swagger UI before implementation**.

3. **Validate payload.**
   - Use documented validate route (`POST /v1/circuits/validate`).
   - Expect the standard response envelope (`status`, `data` or `error`, `meta`).

4. **Only if valid, call analyze/optimize route from documented API/Swagger.**
   - Use documented routes (`POST /v1/circuits/analyze`, `POST /v1/circuits/optimize`).
   - Do not call optimize for invalid payloads.
   - Do not invent extra endpoints, inferred sub-routes, or undocumented request fields.

5. **Preserve request/response JSON artifacts.**
   - Save: validate request, validate response, analyze/optimize request, analyze/optimize response.
   - Include timestamp and request ID metadata when available.

6. **Surface verification/trust metadata.**
   - Present optimization outputs as verification-sensitive and fail-closed by posture.
   - Include any before/after metrics and proof/report references returned by documented APIs.

## Failure path (validation errors)

If validation fails:

1. Stop optimize/execution steps.
2. Persist the failing request and error envelope.
3. Classify failure type (schema mismatch, unsupported field, malformed value, unknown).
4. Repair payload against documented/public schema guidance.
5. Re-run validation.
6. Continue only after validation succeeds.

## Conservative example payload guidance

Exact field-level request bodies for circuits endpoints are not fully specified in repository docs.

- Use this fixture entrypoint: [`/examples/agent-circuit-validation.placeholder.json`](../../examples/agent-circuit-validation.placeholder.json)
- For optimize request scaffolding, use: [`/examples/agent-optimization-request.placeholder.json`](../../examples/agent-optimization-request.placeholder.json)

Before coding a concrete payload model, **confirm exact route/schema in Swagger UI before implementation**.
