# Studio Workflows

This page organizes Studio around user workflows rather than route trivia.

---

## 1. Understand the model

Studio starts with the RQM identity: quaternionic / SU(2)-native reasoning for single-qubit structure, paired with workflow surfaces that make optimization and execution easier to inspect.

Typical tasks here:

- explore theory and geometry views
- build intuition for Bloch, spinor, and SU(2) structure
- inspect how canonicalization changes representation without changing meaning

---

## 2. Bring in a circuit

Studio intake should be understood as a workflow over the API's public circuit boundary.

Typical tasks here:

- import or paste a circuit payload
- validate against the current public `rqm-circuits` schema
- analyze before optimization when you need structural context first

This is where the boundary between public wire format and internal optimization IR matters most.

---

## 3. Optimize

Studio optimization workflows sit on top of `POST /v1/circuits/optimize`.

Typical tasks here:

- choose an optimization profile
- review before/after metrics
- inspect optimization reports and preservation signals
- understand that the compiler commits only verified optimization candidates

If verification is not established, the safe behavior is to keep the original circuit unchanged.

---

## 4. Move toward execution

Studio should guide users through readiness-aware execution, not present hardware as unconditional.

Typical tasks here:

- inspect `GET /v1/execute/capabilities`
- review available provider paths
- choose between Qiskit-facing and Braket-facing workflows
- continue into hardware-oriented flows only when readiness conditions are satisfied

---

## 5. Inspect jobs and results

Studio's job/reporting layer makes the operational side of execution easier to follow.

Typical tasks here:

- view job state and result summaries
- inspect reports generated around optimization or execution
- return to analysis or optimization if a workflow needs another pass

---

## 6. Move into Pro/account surfaces

Some workflows naturally continue into account-bound areas.

Typical tasks here:

- identity and session handling
- dashboard and wallet views
- spend controls and recovery information
- quote / hold / release actions for hardware-oriented operations

See [Studio Pro](studio-pro.md).
