# rqm-docs

**Official documentation hub for the RQM quantum computing platform.**

This site is built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/) and is deployed to GitHub Pages.

Live site: **[https://rqm-technologies-dev.github.io/rqm-docs/](https://rqm-technologies-dev.github.io/rqm-docs/)**

---

## The RQM Ecosystem

RQM is a compiler-first quantum software platform. The ecosystem is organized as a layered stack:

```
┌─────────────────────────────────────────────┐
│              User Layer                     │
│         rqm-api · rqm-circuits              │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Compiler Layer                   │
│       rqm-compiler · rqm-optimize           │
└──────┬──────────────────────┬───────────────┘
       │                      │
┌──────▼──────┐  ┌────────────▼──┐  ┌────────────────┐
│ rqm-qiskit  │  │  rqm-braket   │  │ rqm-pennylane  │
│  (Qiskit)   │  │  (AWS Braket) │  │  (PennyLane)   │
└─────────────┘  └───────────────┘  └────────────────┘
┌─────────────────────────────────────────────┐
│            Foundation Layer                 │
│                 rqm-core                    │
└─────────────────────────────────────────────┘
```

| Repository | Layer | Role |
|---|---|---|
| [`rqm-api`](https://github.com/RQM-Technologies-dev/rqm-api) | User | High-level API for program submission and results |
| [`rqm-circuits`](https://github.com/RQM-Technologies-dev/rqm-circuits) | User | Circuit construction: gates, registers, circuit objects |
| [`rqm-compiler`](https://github.com/RQM-Technologies-dev/rqm-compiler) | Compiler | IR generation, gate normalization, `u1q` canonical lowering |
| [`rqm-optimize`](https://github.com/RQM-Technologies-dev/rqm-optimize) | Compiler | SU(2)-aware gate fusion and circuit optimization |
| [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Execution | Qiskit execution backend |
| [`rqm-braket`](https://github.com/RQM-Technologies-dev/rqm-braket) | Execution | AWS Braket execution backend |
| [`rqm-pennylane`](https://github.com/RQM-Technologies-dev/rqm-pennylane) | Execution | PennyLane integration backend |
| [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Foundation | Canonical math: quaternions, spinors, Bloch vectors, SU(2) |
| [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) | Learning | Jupyter notebooks: demos and guided learning path |
| [`rqm-docs`](https://github.com/RQM-Technologies-dev/rqm-docs) | Docs | This documentation site |

---

## Why This Repo Exists

As the RQM ecosystem has grown across multiple repositories, the need for a unified documentation layer has become clear.

`rqm-docs` exists to:

- **Improve usability** — give users a single entry point to understand and navigate the full stack.
- **Improve credibility** — a professional documentation site signals that the ecosystem is maintained and production-worthy.
- **Improve discoverability** — clear docs help new users find the right repo for their needs.
- **Improve adoption** — lower the barrier to entry through installation guides, concept explanations, API overviews, and a structured learning path.

This repo does not introduce new math, algorithms, or notebook content. Its role is to organize, explain, and guide.

---

## How to Run Locally

Install dependencies and run the local development server:

```bash
pip install -r requirements.txt
mkdocs serve
```

The site will be available at `http://127.0.0.1:8000`.

To build the static site:

```bash
mkdocs build
```

Output is written to the `site/` directory (excluded from version control).

---

## Deployment

The site is automatically built and deployed to GitHub Pages on every push to `main` via the workflow in `.github/workflows/deploy.yml`.
