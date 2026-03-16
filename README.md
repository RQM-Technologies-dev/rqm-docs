# rqm-docs

**Official documentation hub for the RQM quantum geometry ecosystem.**

This site is built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/) and is deployed to GitHub Pages.

---

## The RQM Ecosystem

| Repository | Role |
|---|---|
| [`rqm-core`](https://github.com/RQM-Technologies-dev/rqm-core) | Canonical math engine: quaternions, spinors, Bloch vectors, SU(2) |
| [`rqm-qiskit`](https://github.com/RQM-Technologies-dev/rqm-qiskit) | Execution bridge: Qiskit circuits, gates, and simulators |
| [`rqm-notebooks`](https://github.com/RQM-Technologies-dev/rqm-notebooks) | Guided learning: Jupyter notebooks and demos |
| [`rqm-docs`](https://github.com/RQM-Technologies-dev/rqm-docs) | This documentation site |

---

## Local Development

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

Live site: `https://rqm-technologies-dev.github.io/rqm-docs/`

---

## Why This Repo Exists

As the RQM ecosystem has grown across multiple repositories — a core math library, a Qiskit execution bridge, and a suite of learning notebooks — the need for a unified documentation layer has become clear.

`rqm-docs` exists to:

- **Improve usability** — give users a single entry point to understand and navigate the full stack.
- **Improve credibility** — a professional documentation site signals that the ecosystem is maintained and production-worthy.
- **Improve discoverability** — clear docs help new users find the right repo for their needs, whether that is math, execution, or learning.
- **Improve adoption** — lower the barrier to entry by providing installation guides, concept explanations, API overviews, and a structured learning path.

This repo does not introduce new math, algorithms, or notebook content. Its role is to organize, explain, and guide.
