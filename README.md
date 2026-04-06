# rqm-docs

**Official documentation hub for the current RQM Technologies stack.**

This site is built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/) and is deployed from this repository.

Canonical docs URL: **[https://docs.rqmtechnologies.com/](https://docs.rqmtechnologies.com/)**

---

## Scope

`rqm-docs` documents the current platform layers reflected in this site:

- `rqm-core` — mathematical spine
- `rqm-compiler` — internal optimization and rewriting engine
- `rqm-api` — canonical service boundary
- `rqm-studio` — visual and workflow layer
- `rqm-docs` — documentation layer

---

## How to Run Locally

```bash
pip install -r requirements.txt
mkdocs serve
```

The site will be available at `http://127.0.0.1:8000`.

To build the static site:

```bash
mkdocs build --strict
```

Output is written to the `site/` directory (excluded from version control).

---

## Deployment

The site is built and deployed by the GitHub Actions workflow in `.github/workflows/deploy.yml`.
