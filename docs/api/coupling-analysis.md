# Coupling Analysis

The coupling-analysis surface exposes the part of the RQM stack that looks beyond single-qubit canonicalization and asks whether cross-qubit structure is present, preserved, or measurably supported.

**Base URL:** `https://rqm-api.onrender.com`

---

## Current endpoints

- `POST /v1/analysis/coupling`
- `POST /v1/analysis/coupling/compare`

---

## Why this surface exists

`rqm-core` owns coupling / entanglement analysis primitives as part of the mathematical spine. That matters because optimization trust is not only about gate count reduction; it is also about whether meaningful structure was preserved.

This surface helps answer questions such as:

- does this circuit contain entangling structure?
- is the analysis measured or qualitative?
- did an optimized candidate preserve the relevant structure?

---

## Qualitative vs measured

The docs should keep these modes separate.

### Qualitative mode
Qualitative analysis identifies entangling structure and compatibility signals without claiming a measured entanglement metric outside supported scope.

### Measured mode
Measured analysis uses the currently supported measured scope. It should be documented honestly as limited, not as a generic unrestricted entanglement engine.

---

## Honest scope limitations

The current platform should **not** be described as providing unrestricted measured entanglement analysis for arbitrary circuits.

Instead:

- measured coverage exists where the underlying analysis primitives support it
- unsupported cases fall back to qualitative signals
- limitations are part of the contract, not hidden implementation detail

---

## Why compare/preservation matters

`POST /v1/analysis/coupling/compare` is the natural endpoint for before/after trust checks around optimization. It connects directly to RQM's compiler story:

- optimization candidates are verified before commit
- coupling/preservation analysis offers an additional trust surface for users and workflows
- Studio and reports can use this to explain what changed without blurring it with internal IR
