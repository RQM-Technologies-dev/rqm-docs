# Optimization Theory

RQM optimization starts from a geometric premise: single-qubit structure is most naturally handled in SU(2), and the compiler's canonical internal form should reflect that.

---

## Why the theory matters in product workflows

Studio does not need to expose raw internal IR to help users understand what optimization is doing. It can instead explain the main trust story:

- named single-qubit gates are lowered into a canonical internal form
- canonicalization makes equivalent structure easier to compare and merge
- optimization is verified before commit
- backend-targeted lowering happens later and explicitly

---

## The central idea

The canonical internal single-qubit IR is `u1q`, a quaternionic SU(2)-native representation used by `rqm-compiler`.

That choice matters because it lets the optimizer reason in terms of normalized structure instead of carrying many named one-qubit forms through later passes.

---

## Why this is useful in Studio

A user-facing workflow can show:

- the original public circuit
- the optimized public circuit returned by the service
- trust signals about what changed
- theory views that connect the result back to SU(2), Bloch, and quaternionic reasoning

Studio therefore makes the compiler-first story legible without collapsing public interchange, internal IR, and backend execution into one layer.
