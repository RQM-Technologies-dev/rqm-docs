# SDK / local setup

Use this page when you want local development workflows around the RQM platform.

---

## Choose your integration path

| Goal | Recommended boundary |
|---|---|
| Build an app against hosted services | `rqm-api` (service boundary) |
| Build tooling around external circuit payloads | `rqm-circuits` (public circuit boundary) |
| Work on optimization internals | `rqm-compiler` (internal optimization engine) |
| Build product workflows | `rqm-studio` (workflow layer) |

---

## Local Python setup

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

Install packages based on scope:

```bash
pip install rqm-core rqm-qiskit
```

---

## API-first local workflow

```bash
curl "https://rqm-api.onrender.com/v1/circuits/example?name=bell"
```

Keep API-first workflows as the default unless you specifically need package internals.

---

## Recommended reading order

1. [Platform overview](../platform/overview.md)
2. [API overview](../api/overview.md)
3. [Canonical circuit boundary](../platform/canonical-circuit-boundary.md)
4. [Optimization engine](../platform/optimization-engine.md)
