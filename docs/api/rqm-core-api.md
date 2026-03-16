# rqm-core API Guide

`rqm-core` is the canonical math engine for the RQM ecosystem. This page provides an overview of its primary modules and key functions. It is an API guide, not auto-generated reference documentation — full generated docs will be added in a future release.

---

## Modules

`rqm-core` is organized into three primary modules:

| Module | Responsibility |
|---|---|
| `rqm_core.spinor` | Spinor normalization, manipulation, and inter-format conversion |
| `rqm_core.bloch` | Bloch vector computation and visualization utilities |
| `rqm_core.su2` | SU(2) matrix construction and quaternion-group operations |

---

## `rqm_core.spinor`

### `normalize_spinor`

Normalizes a two-component complex spinor to unit magnitude.

```python
from rqm_core.spinor import normalize_spinor

psi = [0.6, 0.8]
psi_norm = normalize_spinor(psi)
# |psi_norm[0]|² + |psi_norm[1]|² == 1.0
```

**Parameters**: `psi` — array-like of shape `(2,)`, complex or real.  
**Returns**: Normalized spinor as a NumPy array.

---

### `spinor_to_quaternion`

Converts a normalized spinor to a unit quaternion representation.

```python
from rqm_core.spinor import spinor_to_quaternion

psi = [1.0, 0.0]
q = spinor_to_quaternion(psi)
# q is a quaternion [w, x, y, z] with |q| == 1
```

**Parameters**: `psi` — normalized spinor of shape `(2,)`.  
**Returns**: Quaternion as a NumPy array `[w, x, y, z]`.

---

### Additional Spinor Utilities

| Function | Description |
|---|---|
| `spinor_inner_product(psi1, psi2)` | Compute the inner product `⟨ψ₁&#124;ψ₂⟩` |
| `spinor_overlap(psi1, psi2)` | Compute the probability overlap `&#124;⟨ψ₁&#124;ψ₂⟩&#124;²` |
| `random_spinor()` | Generate a uniformly random normalized spinor |

---

## `rqm_core.bloch`

### `state_to_bloch`

Converts a normalized spinor to its Bloch vector `(x, y, z)`.

```python
from rqm_core.bloch import state_to_bloch

psi = [1.0, 0.0]           # |0⟩
bloch = state_to_bloch(psi)
# bloch == [0.0, 0.0, 1.0]  (north pole)
```

**Parameters**: `psi` — normalized spinor of shape `(2,)`.  
**Returns**: Bloch vector as a NumPy array `[x, y, z]`, with `|n| == 1`.

---

### Additional Bloch Utilities

| Function | Description |
|---|---|
| `bloch_to_spinor(bloch)` | Invert `state_to_bloch`; returns a canonical spinor |
| `bloch_angle_between(b1, b2)` | Angular distance between two Bloch vectors (radians) |

---

## `rqm_core.su2`

### `quaternion_to_su2`

Constructs the 2×2 SU(2) matrix corresponding to a unit quaternion.

```python
from rqm_core.su2 import quaternion_to_su2

q = [1.0, 0.0, 0.0, 0.0]  # identity quaternion
U = quaternion_to_su2(q)
# U == [[1+0j, 0+0j], [0+0j, 1+0j]]
```

**Parameters**: `q` — unit quaternion `[w, x, y, z]`.  
**Returns**: 2×2 complex NumPy array.

---

### Additional SU(2) Utilities

| Function | Description |
|---|---|
| `su2_to_quaternion(U)` | Extract the quaternion from an SU(2) matrix |
| `su2_compose(U1, U2)` | Compose two SU(2) rotations (equivalent to matrix multiplication) |
| `su2_rotation(axis, angle)` | Construct an SU(2) element from axis and rotation angle |

---

## Usage Example

```python
import numpy as np
from rqm_core.spinor import normalize_spinor, spinor_to_quaternion
from rqm_core.bloch import state_to_bloch
from rqm_core.su2 import quaternion_to_su2

# Define a state
psi_raw = [1.0, 1.0j]
psi = normalize_spinor(psi_raw)

# Convert to Bloch vector
bloch = state_to_bloch(psi)
print("Bloch vector:", bloch)

# Convert to quaternion and then to SU(2)
q = spinor_to_quaternion(psi)
U = quaternion_to_su2(q)
print("SU(2) matrix:\n", U)
```

---

!!! note "Full API Reference"
    Auto-generated API documentation with full signatures, type annotations, and docstrings is planned for a future release. In the meantime, refer to the source code in the [`rqm-core` repository](https://github.com/RQM-Technologies-dev/rqm-core).
