# rqm-docs

Official documentation hub for the RQM platform.

This site is built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

Canonical docs URL: **[https://docs.rqmtechnologies.com/](https://docs.rqmtechnologies.com/)**

---

## Scope

`rqm-docs` documents the current platform layers reflected in this site:

- `rqm-core` — mathematical spine
- `rqm-circuits` — canonical external circuit IR boundary
- `rqm-compiler` — internal optimization engine
- `rqm-api` — service boundary
- `rqm-studio` — workflow layer

---

## Local development

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

The site is available at `http://127.0.0.1:8000`.

To build the static site:

```bash
mkdocs build --strict
```

Build output is written to `site/`.

---

## Vercel deployment

This repository is a static MkDocs site and is deployed on Vercel using a project-local virtual environment.

Vercel's Python runtime may be externally managed (for example by `uv`), so direct system-level `pip install` can fail. Creating and using `.venv` keeps dependency installation isolated from the managed system Python and avoids `externally-managed-environment` errors.

- **Framework preset:** `Other` (`"framework": null` in `vercel.json`)
- **Install command:** `python -m venv .venv && . .venv/bin/activate && python -m pip install --upgrade pip && pip install -r requirements.txt`
- **Build command:** `. .venv/bin/activate && mkdocs build --strict`
- **Output directory:** `site/`

The `site/` directory is the published static output from MkDocs.

---

## Legacy GitHub Actions note

If a GitHub Actions workflow exists in this repo, treat it as optional legacy automation. The primary publishing posture for this repo is Vercel static deployment.
