# Company and Product Map

RQM Technologies develops software and API-first capabilities that give engineers and scientists a better coordinate system for waves and quantum states.

This documentation site focuses on **what is currently documented for production or beta integration**, while keeping research and planned interfaces clearly labeled.

---

## How the pieces relate

```text
RQM Technologies (company)
  ├─ Foundations
  │   ├─ QSG: Quaternionic Spectral Geometry, the math foundation
  │   └─ RQM: Resonant Quantum Mechanics, the quantum physics foundation
  ├─ Product platforms
  │   ├─ WaveEngine: signal-processing platform
  │   └─ RQM Studio: quantum-computing platform
  ├─ Developer libraries
  │   ├─ rqm-* repositories for quantum workflows
  │   └─ rqm-wave-* repositories for wave and signal workflows
  └─ Internal theory work
      └─ spectral-core: S³/SU(2) quantum-mechanics proof program
```

---

## Product and platform roles

| Layer / Product | Current role in this docs site | Audience |
|---|---|---|
| **RQM Technologies** | Company umbrella for platform, product, and research efforts | Partners, evaluators, contributors |
| **QSG** | Mathematical foundation for wave shape, phase, rotation, polarization, spectra, and structure | Researchers, technical evaluators, proposal reviewers |
| **RQM** | Quantum physics foundation for quantum-state structure and quantum workflows | Quantum researchers, compiler engineers, technical evaluators |
| **WaveEngine** | Signal-processing product platform for signal propagation, EM propagation, wave analysis, channel awareness, and multichannel recovery | Signal, wireless, imaging, and wave-system teams |
| **RQM Studio** | Browser workflow layer for compiler chat, circuit workflows, execution testing, and quantum scientist interfaces | Product users and workflow builders |
| **rqm-api** | Public service boundary for validate/analyze/optimize/execution and account-linked flows | Integrators, backend/app developers |
| **rqm-circuits** | Canonical public circuit schema and interchange boundary | SDK and API consumers |
| **rqm-compiler** | Internal optimization/canonicalization engine (`u1q` internal) | Compiler engineers |
| **Execution bridges** | Provider-specific lowering/routing surfaces | Teams integrating Qiskit, Braket, PennyLane |
| **spectral-core** | Internal theory/proof program for S³/SU(2), resonance shells, spectral lines, and quantum-mechanics foundations | Research and proposal development |
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

## Language posture

Use practical ecosystem language first. Prefer terms such as signal propagation, EM propagation, wave shape, phase, rotation, polarization, spectra, quantum states, compiler diagnostics, and execution workflows.

QSG/RQM theory can be introduced after the user's job-to-be-done is clear.

---

## Where to start

- New to the platform: [Platform Overview](platform/overview.md)
- Building integrations: [Getting Started / Quickstart](getting-started/quickstart.md)
- Implementing with an agent: [Agent Portal](agents/index.md)
- Evaluating trust and claims posture: [Verification / Trust](products/verification-trust.md)
- Reading conceptual background: [Concepts](concepts/quaternion-intuition.md)
- Reading current draft research: [QCE 2026 paper draft](research/qce2026-u1q-paper.md)
