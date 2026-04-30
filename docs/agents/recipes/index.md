# Agent Recipes

Use these copy/paste workflows to build RQM Platform and RQM Studio integrations without guessing undocumented behavior.

> Always read `/llms.txt`, `/api/overview/`, and Swagger UI first. Prefer documented routes and schemas over inferred behavior.

## Recipe cards

### Validate a circuit payload
- **Goal:** confirm a circuit payload is acceptable at the public boundary before downstream steps.
- **Inputs:** `rqm-circuits` schema-aligned payload target (`0.2`), API base URL, request metadata.
- **Expected outputs:** validation status, response envelope, error details (if invalid), stored request/response artifact JSON.
- **Docs to read first:** [Circuits API](../../api/circuits.md), [Canonical Circuit Boundary](../../platform/canonical-circuit-boundary.md), [API Overview](../../api/overview.md).
- **Safety/caution:** do not call optimize on unvalidated payloads; confirm exact schema in Swagger UI before implementation.

### Analyze a circuit
- **Goal:** run documented analysis on validated payloads.
- **Inputs:** validated circuit payload, analysis route confirmed in docs/Swagger, request ID.
- **Expected outputs:** analysis data and metadata in standard envelope, archived JSON artifacts.
- **Docs to read first:** [Circuits API](../../api/circuits.md), [API Overview](../../api/overview.md).
- **Safety/caution:** never invent analysis fields not present in response; preserve `meta`.

### Optimize a circuit safely
- **Goal:** request optimization under trust-sensitive, proof-gated posture.
- **Inputs:** validated payload, confirmed optimize route/schema, optional execution intent.
- **Expected outputs:** optimization candidate output, before/after metrics when available, verification/trust metadata.
- **Docs to read first:** [Circuits API](../../api/circuits.md), [Optimization Engine](../../platform/optimization-engine.md), [Verification / Trust](../../products/verification-trust.md).
- **Safety/caution:** use conservative claims; do not claim guaranteed advantage or undocumented speedups.

### Generate a verification/trust report
- **Goal:** expose reproducible trust artifacts for optimization outcomes.
- **Inputs:** request/response JSON artifacts, reported metrics, documented trust principles.
- **Expected outputs:** verification report bundle (inputs, outputs, diffs, metadata), auditable summary.
- **Docs to read first:** [Verification / Trust](../../products/verification-trust.md), [API Overview](../../api/overview.md).
- **Safety/caution:** treat optimization as candidate behavior unless verified by documented outputs.

### Route execution through a provider bridge
- **Goal:** route validated/optimized payloads through documented execution workflows.
- **Inputs:** execution target/provider, validated payload, documented execution API behavior.
- **Expected outputs:** execution request artifact, provider route metadata, response status.
- **Docs to read first:** [Execution API](../../api/execution.md), [Execution Bridges](../../platform/execution-bridges.md), [API Overview](../../api/overview.md).
- **Safety/caution:** execution options are capability-gated; confirm provider-specific requirements before submission.

### Build an RQM Studio workflow
- **Goal:** build UX flows that orchestrate API calls while preserving platform boundaries.
- **Inputs:** Studio use case, API routes, boundary rules, trust requirements.
- **Expected outputs:** workflow states, user-facing labels, artifacts linked to each step.
- **Docs to read first:** [Agent Portal](../index.md), [RQM Studio](../../products/rqm-studio.md), [Canonical Circuit Boundary](../../platform/canonical-circuit-boundary.md).
- **Safety/caution:** Studio is workflow/UI, not the canonical computation contract.

### Generate an API client
- **Goal:** scaffold typed integration code from documented surfaces only.
- **Inputs:** Swagger/API routes, response envelope contract, documented examples.
- **Expected outputs:** typed modules, error handling, fixture-based tests, validate-before-optimize helper.
- **Docs to read first:** [API Overview](../../api/overview.md), [Circuits API](../../api/circuits.md), [Agent recipe: API Client Generation](client-generation.md).
- **Safety/caution:** never generate undocumented methods or inferred schemas.

### Debug a failed payload
- **Goal:** isolate request construction vs schema vs route mismatch errors.
- **Inputs:** failing request/response, endpoint docs, schema target, correlation/request metadata.
- **Expected outputs:** root-cause note, corrected payload candidate, regression fixture.
- **Docs to read first:** [Circuits API](../../api/circuits.md), [API Overview](../../api/overview.md), [Validate → Optimize](validate-optimize.md).
- **Safety/caution:** keep failure artifacts; do not “fix” by silently dropping unknown fields.

### Separate production API behavior from research concepts
- **Goal:** keep implementation claims grounded in shipped/documented surfaces.
- **Inputs:** feature description, source docs, status label (production/beta/research/planned).
- **Expected outputs:** boundary classification, safe implementation notes, user-facing wording.
- **Docs to read first:** [Production vs Research Boundary](research-boundary.md), [Verification / Trust](../../products/verification-trust.md), [Canonical IR](../../compiler/canonical-ir.md).
- **Safety/caution:** label research-only ideas explicitly and avoid production guarantees.
