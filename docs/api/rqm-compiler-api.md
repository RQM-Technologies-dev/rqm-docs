# rqm-compiler API Guide

`rqm-compiler` is the instruction compiler for the RQM ecosystem. It accepts backend-agnostic circuits and produces the canonical `u1q` IR that any execution backend can consume. This page provides an overview of its primary modules and key functions.

---

## Role of `rqm-compiler`

`rqm-compiler` sits between the circuit construction layer and the execution backends:

```
rqm-circuits (circuit objects)
    → rqm-compiler (gate resolution, to_u1q_pass → u1q IR)
    → rqm-qiskit / rqm-braket / rqm-pennylane
```

Its responsibilities:

1. **Gate resolution** — look up unitary matrices for named gates using `rqm-core`
2. **IR lowering** — convert all single-qubit gates to the canonical `u1q` form via `to_u1q_pass`
3. **Validation** — enforce unit-norm and non-degenerate constraints on quaternion parameters

See [Canonical IR (u1q)](../compiler/canonical-ir.md) for the full design and gate mapping table.

---

## Modules

| Module | Responsibility |
|---|---|
| `rqm_compiler.compiler` | Top-level compiler entry point |
| `rqm_compiler.passes` | Compiler passes (including `to_u1q_pass`) |
| `rqm_compiler.ir` | IR types and the `CANONICAL_SINGLE_QUBIT_GATE` constant |

---

## `rqm_compiler.compiler`

### `compile`

Compiles a list of gate instructions to the canonical `u1q` IR.

```python
from rqm_compiler.compiler import compile

program = [
    {"gate": "H", "target": 0},
    {"gate": "CNOT", "control": 0, "target": 1},
]

ir = compile(program)
# ir is a list of normalized instruction dicts:
# [{"gate": "u1q", "target": 0, "params": {"w": ..., "x": ..., "y": ..., "z": ...}},
#  {"gate": "cx", "control": 0, "target": 1}]
```

**Parameters**: `program` — list of gate instruction dicts.  
**Returns**: Compiled IR as a list of instruction dicts.

---

## `rqm_compiler.passes`

### `to_u1q_pass`

Converts all single-qubit gates in an IR to `u1q` using exact quaternion mappings.

```python
from rqm_compiler.passes import to_u1q_pass

raw_ir = [{"gate": "H", "target": 0}]
canonical_ir = to_u1q_pass(raw_ir)
# [{"gate": "u1q", "target": 0, "params": {"w": 0.707, "x": -0.707, "y": 0.0, "z": 0.0}}]
```

**Parameters**: `ir` — list of gate instruction dicts.  
**Returns**: IR with all single-qubit gates replaced by `u1q`.

---

## `rqm_compiler.ir`

### `CANONICAL_SINGLE_QUBIT_GATE`

The string constant identifying the canonical gate name across passes, translators, and optimizers.

```python
from rqm_compiler.ir import CANONICAL_SINGLE_QUBIT_GATE

print(CANONICAL_SINGLE_QUBIT_GATE)  # "u1q"
```

---

## Usage Example

```python
from rqm_compiler.compiler import compile

program = [
    {"gate": "rx", "target": 0, "params": {"theta": 1.5708}},
    {"gate": "CNOT", "control": 0, "target": 1},
]

ir = compile(program)
for instruction in ir:
    print(instruction)
# {"gate": "u1q", "target": 0, "params": {"w": 0.707, "x": -0.707, "y": 0.0, "z": 0.0}}
# {"gate": "cx", "control": 0, "target": 1}
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-compiler` repository](https://github.com/RQM-Technologies-dev/rqm-compiler).
