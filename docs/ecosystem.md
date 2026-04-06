# Ecosystem

The current RQM stack is best understood through the repositories that define its main layers today.

---

## The current stack

| Layer | Repository | Current responsibility |
|---|---|---|
| Mathematical spine | [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Quaternion, spinor, SU(2), Bloch, validation, linear algebra, and coupling-analysis primitives |
| Documentation layer | [`rqm-docs`](https://github.com/RQM-Technologies-dev/rqm-docs) | Canonical documentation across the stack |
| Internal optimization engine | [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Internal optimization, rewriting, canonical `u1q`, and explicit backend lowering |
| Service boundary | `rqm-api` | Circuit intake, analysis, optimization, execution readiness/routing, auth, billing, chat, TTS |
| Visual/workflow layer | `rqm-studio` | Theory, optimization, execution-oriented workflows, jobs, and Pro/account surfaces |

---

## How the layers relate

```text
rqm-studio            ← workflow layer
        ↓
rqm-api               ← service boundary
        ↓
rqm-circuits 0.2      ← public wire format boundary
        ↓
rqm-compiler          ← internal optimization engine
        ↓
backend-targeted lowering / execution routing
        ↑
rqm-core              ← mathematical and analysis spine
```

`rqm-core` underpins both optimization and analysis. `rqm-compiler` transforms circuits after the public boundary. `rqm-api` exposes the stack as a service. `rqm-studio` packages those capabilities into product workflows.

---

## What is distinctive about RQM

- **Quaternionic / SU(2)-native identity** rather than generic gate-registry branding
- **Compiler-first architecture** with optimization as a central capability
- **Backend-agnostic public boundary** via `rqm-circuits`
- **Explicit later backend lowering** instead of mixing public interchange with target-specific IR
- **Trust surfaces** that include proof-gated optimization and coupling / preservation analysis
- **Studio workflows** that extend beyond visualization into operational product surfaces

---

## Operational truths to preserve

- `rqm-api` is the canonical service boundary
- Studio is broader than visualization, but it is not the API
- billing readiness is not hardware entitlement
- measured coupling analysis is real but limited in scope
- optimization is fail-closed when proof is not established
