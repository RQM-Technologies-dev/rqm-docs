# Installation

This page covers how to install the RQM ecosystem packages for development or use.

---

## Prerequisites

- Python 3.9 or later
- `pip` package manager
- (Optional) A virtual environment manager such as `venv` or `conda`

---

## Installing from PyPI

The packages are published to PyPI and can be installed with `pip`.

```bash
pip install rqm-core
```

```bash
pip install rqm-qiskit
```

```bash
pip install rqm-pennylane
```

Install rqm-core and rqm-qiskit together:

```bash
pip install rqm-core rqm-qiskit
```

---

## Installing from GitHub (Editable)

For development or to track the latest changes, install directly from GitHub in editable mode:

```bash
pip install git+https://github.com/RQM-Technologies-dev/rqm-core.git
```

```bash
pip install git+https://github.com/RQM-Technologies-dev/rqm-qiskit.git
```

To install an editable local clone:

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-core.git
cd rqm-core
pip install -e .
```

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-qiskit.git
cd rqm-qiskit
pip install -e .
```

```bash
pip install git+https://github.com/RQM-Technologies-dev/rqm-pennylane.git
```

To install an editable local clone:

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-pennylane.git
cd rqm-pennylane
pip install -e .
```

---

## Setting Up `rqm-notebooks`

The `rqm-notebooks` repository contains Jupyter notebooks and does not require a separate package install. Clone the repo and install its dependencies:

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-notebooks.git
cd rqm-notebooks
pip install -r requirements.txt
jupyter lab
```

---

## Recommended Path for New Users

If you are new to the ecosystem, install both core packages and then clone the notebooks:

```bash
# 1. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# 2. Install the core packages
pip install rqm-core rqm-qiskit

# 3. Clone the notebooks for interactive learning
git clone https://github.com/RQM-Technologies-dev/rqm-notebooks.git
cd rqm-notebooks
pip install -r requirements.txt
jupyter lab
```

---

## Verifying Your Installation

```python
import rqm_core
import rqm_qiskit
print("RQM ecosystem ready.")
```

---

!!! note "Dependencies"
    `rqm-qiskit` depends on `rqm-core` and will install it automatically if it is not already present. You do not need to install both separately unless you want only the math layer.

    `rqm-pennylane` depends on `rqm-compiler` (and transitively `rqm-core`) and requires [PennyLane](https://pennylane.ai/) (`pip install pennylane`).
