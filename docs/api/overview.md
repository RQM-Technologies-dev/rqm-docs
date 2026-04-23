# API Overview

`rqm-api` is the service boundary for validation, analysis, optimization, execution, billing, auth, and chat/TTS workflows.

**Base URL:** `https://rqm-api.onrender.com`

[:material-book-open-variant: Swagger UI](https://rqm-api.onrender.com/docs){ .md-button .md-button--primary }
[:material-rocket-launch: Quickstart](../getting-started/quickstart.md){ .md-button }

---

## API domains

- [Circuits](circuits.md)
- [Execution](execution.md)
- [Billing & Wallet](billing-and-wallet.md)
- [Auth](authentication.md)
- [Chat & TTS](chat-and-tts.md)
- [Compiler Actions](compiler-actions.md)

---

## Response envelope

Success responses:

```json
{
  "status": "ok",
  "data": {},
  "meta": {}
}
```

Error responses:

```json
{
  "status": "error",
  "error": {},
  "meta": {}
}
```

---

## Boundary notes

- Public integrations should use the public circuit boundary and API endpoints.
- Internal optimizer forms are intentionally not public payload contracts.
- Execution options should be gated by capability checks.
