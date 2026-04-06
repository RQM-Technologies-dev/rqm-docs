# Chat & TTS

`rqm-api` also exposes media-oriented endpoints for grounded chat and text-to-speech.

**Base URL:** `https://rqm-api.onrender.com`

---

## Current endpoints

- `POST /v1/chat`
- `POST /v1/tts`

---

## `POST /v1/chat`

The chat surface is best documented as **grounded chat with optional history and context**, not as a replacement for the core circuit APIs.

Use cases may include:

- contextual help inside Studio
- workflow guidance over current account or job context
- product or theory assistance grounded in supplied context

Availability can depend on deployment configuration.

---

## `POST /v1/tts`

The TTS endpoint turns supported text responses into an audio-oriented output surface.

The transport can vary by deployment and client expectation, so document it conservatively:

- some clients may consume binary/audio responses directly
- some may consume JSON wrappers carrying base64-encoded content or metadata

Treat response handling as configuration-sensitive rather than assuming a single universal shape.

---

## Relationship to the rest of the platform

These endpoints sit beside the main service surface. They are useful product features, but the canonical RQM service boundary still centers on circuits, analysis, execution, auth, and billing.
