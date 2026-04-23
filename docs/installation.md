# Installation

This page covers local setup for the docs site and a minimal developer environment for RQM package-level work.

---

## Docs site (MkDocs + Material)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Local docs URL: `http://127.0.0.1:8000`

Strict static build:

```bash
mkdocs build --strict
```

Build output: `site/`

---

## RQM package-level environment (optional)

If you are evaluating package-level integration, install the packages you need for your workflow:

```bash
pip install rqm-core
pip install rqm-qiskit
```

Or install from source for active development:

```bash
git clone https://github.com/RQM-Technologies-dev/rqm-core.git
cd rqm-core
pip install -e .
```

Repeat for other repositories as needed.
