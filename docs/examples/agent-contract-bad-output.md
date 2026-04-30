# Example: Bad Agent Output (Annotated)

## Sample output

We will call `POST /v1/circuits/ultra-optimize` immediately and skip validation for speed.

The public API contract is the internal `u1q` IR, so we can send that directly.

This guarantees quantum advantage in production for all users.

The SU(2) research model is now a production performance guarantee.

## Why this fails

- ❌ Invents an undocumented route (`/v1/circuits/ultra-optimize`).
- ❌ Skips required validation-before-optimize behavior.
- ❌ Treats internal IR (`u1q`) as public API contract.
- ❌ Claims guaranteed quantum advantage without benchmark/output artifacts.
- ❌ Presents research concepts as production guarantees.
