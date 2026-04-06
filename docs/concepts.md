# Concepts

RQM is built around a simple conceptual split:

- **math** lives in `rqm-core`
- **public circuits** cross the service boundary as `rqm-circuits`
- **optimization** happens inside `rqm-compiler`
- **service workflows** live in `rqm-api`
- **visual/product workflows** live in `rqm-studio`

---

## Mental model

Think of RQM as a geometry-aware stack rather than a monolithic SDK:

- `rqm-core` gives the platform its quaternionic / SU(2) identity
- `rqm-compiler` gives the platform its compiler-first optimization engine
- `rqm-api` exposes that engine through a stable service boundary
- Studio makes the resulting workflows easier to use and inspect

---

## Why the separation matters

This separation is what lets RQM stay:

- backend-agnostic at the public circuit boundary
- serious about internal optimization trust
- able to expose analysis, execution, and product workflows without collapsing everything into one layer

---

## Start from here

<div style="float: right; width: 240px; margin: 0 0 2em 2em; padding: 1em 1.25em; border-left: 3px solid var(--md-primary-fg-color, #536dfe); background: var(--md-code-bg-color, #f5f5f5); border-radius: 4px; font-size: 0.9em;" markdown>

**Deep dives**

- [Complete Quaternion Theory](concepts/quaternion-theory.md)
- [SU(2) Geometry](concepts/su2-geometry.md)
- [Spinors and the Bloch Sphere](concepts/spinor-bloch.md)
- [Quaternion Intuition](concepts/quaternion-intuition.md)
- [Global Phase](concepts/global-phase.md)

</div>

If you want the platform view first, continue with:

- [Ecosystem](ecosystem.md)
- [Architecture](architecture.md)
- [Optimization](optimization.md)
