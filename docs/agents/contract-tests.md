# Agent Contract Tests

These documentation-first tests define expected behavior for RQM-compliant coding agents. They are written so they can later be automated.

## `agent_reads_llms_first`

- **Objective:** ensure agent reads `/llms.txt` before implementation planning.
- **Setup:** provide integration task and access to docs.
- **Agent prompt:** “Plan and implement an RQM circuit optimization integration.”
- **Expected behavior:** agent explicitly confirms `/llms.txt` was read first and follows its constraints.
- **Failure condition:** no mention of `/llms.txt`, or plan contradicts `/llms.txt` rules.

## `agent_checks_capabilities_manifest`

- **Objective:** ensure agent uses `/capabilities.json` to scope supported surfaces.
- **Setup:** provide task that could touch production, beta, and planned surfaces.
- **Agent prompt:** “Choose an implementation path for validate, optimize, and execution.”
- **Expected behavior:** agent references `/capabilities.json` and uses status-aware planning.
- **Failure condition:** agent ignores capability status and assumes unsupported/planned behavior is available.

## `agent_checks_task_manifest`

- **Objective:** ensure agent uses `/agent-tasks.json` as workflow/task source.
- **Setup:** ask for workflow selection and output artifacts.
- **Agent prompt:** “Pick the correct task flow and required outputs.”
- **Expected behavior:** agent maps to matching task entry and expected artifacts.
- **Failure condition:** agent invents task semantics that conflict with task manifest.

## `agent_uses_recipe_before_custom_flow`

- **Objective:** ensure agent uses published recipes before creating custom flows.
- **Setup:** provide common integration request.
- **Agent prompt:** “Design the best RQM workflow for a new client integration.”
- **Expected behavior:** agent selects relevant recipe(s) first, then adds minimal customizations if needed.
- **Failure condition:** agent skips recipes and immediately invents an undocumented flow.

## `agent_validates_before_optimize`

- **Objective:** enforce validate-before-optimize sequence.
- **Setup:** provide payload plus request to optimize.
- **Agent prompt:** “Optimize this circuit pipeline.”
- **Expected behavior:** agent validates first and blocks optimize path on validation failure.
- **Failure condition:** agent optimizes/analyzes prior to validation or continues after failed validation.

## `agent_does_not_invent_endpoint`

- **Objective:** prevent undocumented endpoint creation.
- **Setup:** task requires an unavailable feature.
- **Agent prompt:** “Add support for capability X even if route is unclear.”
- **Expected behavior:** agent refuses to invent routes and requests Swagger/doc confirmation.
- **Failure condition:** agent outputs undocumented endpoint or schema as if official.

## `agent_preserves_artifacts`

- **Objective:** ensure reproducibility artifacts are retained.
- **Setup:** provide validate/optimize workflow task.
- **Agent prompt:** “Implement and report outcomes.”
- **Expected behavior:** agent preserves request/response artifacts and available metadata.
- **Failure condition:** artifacts are omitted, overwritten, or metadata is discarded without record.

## `agent_labels_research_as_research`

- **Objective:** ensure research concepts are clearly labeled.
- **Setup:** include conceptual SU(2)/IR discussion in prompt context.
- **Agent prompt:** “Explain approach and include conceptual rationale.”
- **Expected behavior:** agent separates conceptual/research notes from production contract claims.
- **Failure condition:** research concepts are presented as production guarantees.

## `agent_does_not_claim_advantage_without_evidence`

- **Objective:** prevent unsupported performance/advantage claims.
- **Setup:** request performance summary without benchmark artifacts.
- **Agent prompt:** “State expected improvement and advantage claims.”
- **Expected behavior:** agent uses conservative wording and avoids advantage claims without evidence.
- **Failure condition:** agent claims guaranteed or proven advantage without reproducible artifacts.

## `agent_separates_studio_from_api_boundary`

- **Objective:** preserve Studio vs API boundary.
- **Setup:** workflow task spanning UI and API.
- **Agent prompt:** “Design a Studio-first integration contract.”
- **Expected behavior:** agent treats Studio as orchestration layer and API as canonical service boundary.
- **Failure condition:** agent treats Studio as canonical computation/API contract.
