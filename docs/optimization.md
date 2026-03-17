# rqm-optimize

`rqm-optimize` is the optimization layer of the RQM platform. It sits above the execution backends and applies SU(2)-aware circuit transformations to reduce gate count, circuit depth, and backend resource usage — before the circuit is submitted to a simulator or hardware device.

---

## What It Does

`rqm-optimize` accepts a compiled quantum circuit (produced by `rqm-compiler` and translated to a backend format by `rqm-qiskit` or `rqm-braket`) and applies a sequence of geometry-aware optimization passes:

- **SU(2) gate fusion** — merges consecutive single-qubit rotations into a single SU(2) operation using exact quaternion composition
- **Redundancy elimination** — detects and removes gate pairs that compose to the identity
- **Depth reduction** — reorders commuting operations to minimize circuit depth without changing the program semantics
- **Compression** — collapses equivalent gate sequences into canonical forms defined by `rqm-core`

All passes are geometry-aware: they use the quaternion and SU(2) primitives from `rqm-core` to reason about gate equivalence exactly, not approximately.

---

## When to Use It

Use `rqm-optimize` when:

- You want to reduce the number of gates before submitting to hardware (fewer gates → less decoherence)
- You are running on a backend with a limited native gate set and want to minimize transpilation overhead
- You have long circuits with repeated rotation patterns that can be fused
- You want reproducible, geometry-correct optimization rather than heuristic transpilation

`rqm-optimize` is optional. If you are running on a simulator and circuit depth is not a concern, you can skip it. For hardware runs, it is recommended.

---

## Example

```python
from rqm_compiler import compile_circuit
from rqm_qiskit import compiled_circuit_to_qiskit
from rqm_optimize import optimize

# Step 1: compile the program to a backend-agnostic IR
qc = compile_circuit(program)

# Step 2: translate to a Qiskit circuit
qc = compiled_circuit_to_qiskit(qc)

# Step 3: apply SU(2)-aware optimization
qc = optimize(qc)

# Step 4: run on a backend as usual
result = backend.run(qc)
```

The `optimize()` call is a drop-in step. It accepts and returns the same circuit type, so it can be inserted into any existing workflow without restructuring the pipeline.

---

## Position in the Stack

`rqm-optimize` operates after compilation and translation, and before execution:

```
rqm-core       → canonical math (quaternions, spinors, SU(2))
rqm-compiler   → circuit construction and IR lowering
rqm-qiskit     → execution bridge (Qiskit)
rqm-braket     → execution bridge (AWS Braket)
rqm-optimize   → optimization layer (SU(2)-aware gate fusion and compression)
```

It depends on `rqm-core` for geometry primitives and operates on circuits already in a backend format. It does not re-enter the compiler pipeline.

---

!!! tip "Optimization is geometry-correct"
    Unlike heuristic transpilers, `rqm-optimize` uses exact SU(2) arithmetic from `rqm-core` to determine gate equivalences. Two gates are fused only when their quaternion product is provably correct — never based on floating-point approximation alone.
