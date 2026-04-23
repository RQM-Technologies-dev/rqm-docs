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

## Vercel deployment posture

This repository is configured for static publishing on Vercel.

- **Install command:** `pip install -r requirements.txt`
- **Build command:** `mkdocs build --strict`
- **Output directory:** `site`

Connect this repository in Vercel and use standard static project settings. The `vercel.json` file in this repository encodes the expected build posture.

---

## Legacy GitHub Actions note

If a GitHub Actions workflow exists in this repo, treat it as optional legacy automation. The primary publishing posture for this repo is Vercel static deployment.
