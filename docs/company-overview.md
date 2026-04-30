# Company and Product Map

RQM Technologies develops software and API-first capabilities for quantum workflow engineering, with theory-informed methods grounded in quaternionic and SU(2) geometry.

This documentation site focuses on **what is currently documented for production or beta integration**, while keeping research and planned interfaces clearly labeled.

---

## How the pieces relate

```text
RQM Technologies (company)
  ├─ RQM Platform (documentation and integration surface)
  │   ├─ rqm-api (service boundary)
  │   ├─ rqm-circuits (public circuit boundary)
  │   ├─ rqm-compiler (internal optimization engine)
  │   ├─ execution bridges (qiskit / braket / pennylane)
  │   └─ rqm-studio (workflow product layer)
  └─ Research streams (theory notes, drafts, and planned interfaces)
```

---

## Product and platform roles

| Layer / Product | Current role in this docs site | Audience |
|---|---|---|
| **RQM Technologies** | Company umbrella for platform, product, and research efforts | Partners, evaluators, contributors |
| **RQM Platform** | Core integration model and boundary architecture | Developers, coding agents |
| **RQM Studio** | Browser workflow layer built on API services | Product users and workflow builders |
| **rqm-api** | Public service boundary for validate/analyze/optimize/execution and account-linked flows | Integrators, backend/app developers |
| **rqm-circuits** | Canonical public circuit schema and interchange boundary | SDK and API consumers |
| **rqm-compiler** | Internal optimization/canonicalization engine (`u1q` internal) | Compiler engineers |
| **Execution bridges** | Provider-specific lowering/routing surfaces | Teams integrating Qiskit, Braket, PennyLane |
| **Theory / research notes** | Conceptual grounding and in-progress research narrative | Researchers and technical evaluators |

---

## Documentation status model

Use this model to interpret claims consistently:

- **Production**: documented behavior intended for current integration.
- **Beta**: documented, capability-gated behavior requiring explicit checks.
- **Research**: conceptual or draft material; not a runtime contract.
- **Planned/Proposed**: future-facing documentation, not available capability.

If a page discusses research or planned material, treat it as non-contractual unless a production API surface explicitly documents availability.

---

## Where to start

- New to the platform: [Platform Overview](platform/overview.md)
- Building integrations: [Getting Started / Quickstart](getting-started/quickstart.md)
- Implementing with an agent: [Agent Portal](agents/index.md)
- Evaluating trust and claims posture: [Verification / Trust](products/verification-trust.md)
- Reading conceptual background: [Concepts](concepts/quaternion-intuition.md)
- Reading current draft research: [QCE 2026 paper draft](research/qce2026-u1q-paper.md)
