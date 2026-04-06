# SDK Quickstart

For the current stack, the fastest reliable way to get started is the **API quickstart**, because `rqm-api` is the canonical service boundary.

If you are evaluating RQM today, start here:

- [API Quickstart](api/quickstart.md)
- [Architecture](architecture.md)
- [Canonical IR (`u1q`)](compiler/canonical-ir.md)

---

## What this page is for

Use this page as a conceptual bridge if you are planning a direct package-level integration and need to understand how the layers fit together before choosing an API, compiler, or math-level entry point.

### Layer choices

| Need | Start with |
|---|---|
| Service integration | `rqm-api` |
| Math and analysis primitives | `rqm-core` |
| Internal optimization and lowering semantics | `rqm-compiler` |
| Visual / managed workflows | `rqm-studio` |

---

## Recommended reading order

1. [API Quickstart](api/quickstart.md)
2. [Ecosystem](ecosystem.md)
3. [Architecture](architecture.md)
4. [rqm-core](api/rqm-core-api.md)
5. [rqm-compiler](api/rqm-compiler-api.md)
