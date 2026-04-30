# MCP Server Plan

> Status: **Planned / proposed interface documentation**. This page describes a future MCP-facing surface and does **not** claim these tools are currently available unless separately documented as implemented.

## Why an MCP layer

A Model Context Protocol (MCP) interface could provide coding agents with typed access to documented RQM workflows without guessing endpoints or payloads.

## Proposed tools

| Tool | Purpose | Status |
|---|---|---|
| `rqm.validate_circuit` | Validate payloads against the public circuit boundary before downstream workflows | planned |
| `rqm.analyze_circuit` | Return analysis metadata/metrics for a validated circuit | planned |
| `rqm.optimize_circuit` | Run optimization through documented API behavior | planned |
| `rqm.generate_verification_report` | Produce trust/report artifacts for before/after comparison | planned |
| `rqm.convert_qiskit_to_rqm` | Convert selected Qiskit representations into public RQM circuit payloads | proposed |
| `rqm.route_execution` | Route validated/optimized circuits through explicit execution bridge targets | planned |
| `rqm.get_schema` | Return current public schema references and versions | planned |
| `rqm.get_example_payload` | Return documented example payloads for common workflows | planned |
| `rqm.explain_single_qubit_gate` | Explain gate behavior using quaternionic/SU(2) and geometry-native language | proposed |
| `rqm.fuse_single_qubit_segment` | Research-oriented single-qubit segment fusion helper | research |

## Proposed design constraints

- All tools should map to documented production boundaries.
- Validation should be a required first-class step before optimization.
- Internal optimizer details remain internal unless explicitly exposed.
- Tool metadata should mark outputs as production, beta, planned, or research.
- Reproducible artifacts should be preferred for any optimization or trust claim.

## Rollout posture

- Phase 1: Schema/introspection tools (`get_schema`, `get_example_payload`) and validation.
- Phase 2: Analyze/optimize/verification report wrappers.
- Phase 3: Execution routing and selected conversion helpers.
- Research-only helpers remain explicitly labeled and outside production guarantees.
