# Canonical IR: `u1q`

`u1q` is the **canonical internal single-qubit optimization IR** in `rqm-compiler`.

It is central to the current compiler design, but it is intentionally **internal**.

---

## Why `u1q` exists

The compiler needs a canonical single-qubit form that is better suited to optimization than a growing list of named gates.

`u1q` provides that form.

Once named single-qubit gates are lowered into `u1q`, the optimizer can reason over one normalized 1Q representation instead of carrying separate cases for `rx`, `ry`, `rz`, `h`, `s`, `t`, and related forms.

---

## Where `u1q` sits

```text
rqm-circuits 0.2      ← public wire format
        ↓
rqm-compiler          ← internal optimization engine
        ↓
normalize / canonicalize / flatten / to_u1q / merge_u1q / sign_canon / cancel_2q
        ↓
u1q                  ← canonical internal 1Q optimization IR
        ↓
explicit backend lowering
```

That ordering matters. `u1q` is not the public interchange contract, and it is not the backend-native execution format.

---

## Why public callers should still think in `rqm-circuits`

Public callers, API clients, and Studio workflows should author and exchange circuits using the public `rqm-circuits` boundary.

That keeps:

- public interchange stable
- internal optimization details private to the compiler
- backend-targeted lowering free to evolve without changing public payloads

RQM documentation should explain `u1q`, but it should not ask users to treat it as the public API.

---

## Why backend lowering happens after optimization

RQM is compiler-first. The optimizer wants a backend-neutral canonical form before any target-specific decomposition is requested.

That is why explicit lowering functions such as:

- `lower_circuit_for_backend(...)`
- `compile_for_backend(...)`

exist **after** canonical optimization rather than replacing it.

---

## Why canonicalization and sign conventions matter

`sign_canon` and related canonicalization rules are part of the trust story.

They make equivalence comparisons more stable, reduce representation drift, and help the verifier decide whether a candidate rewrite should be committed.

That matters because optimization is proof-gated:

- only verified candidates are committed
- unverified candidates are withheld
- the original circuit is returned unchanged when proof is not established

`u1q` is therefore not just a compact representation. It is part of the reason RQM can keep optimization disciplined and fail-closed.
