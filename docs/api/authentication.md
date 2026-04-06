# Authentication

`rqm-api` uses a **bearer-session** model for authenticated account surfaces.

**Base URL:** `https://rqm-api.onrender.com`

---

## Current endpoints

- `GET /v1/auth/diagnostics`
- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `GET /v1/auth/me`
- `POST /v1/auth/logout`

---

## Bearer-session model

The current docs describe auth as a session-bearing API surface rather than a public anonymous circuit-only interface.

In practice, authentication matters when a workflow needs:

- account identity
- Pro/account state
- billing and wallet visibility
- dashboard access
- managed execution flows tied to user state

That is why auth belongs in the canonical API overview, not as an afterthought.

---

## Endpoint roles

### `GET /v1/auth/diagnostics`
Use this when checking whether the current deployment and auth configuration are behaving as expected.

### `POST /v1/auth/register`
Creates an account or initiates the account-registration flow.

### `POST /v1/auth/login`
Starts or refreshes an authenticated session.

### `GET /v1/auth/me`
Returns the current authenticated identity and is the natural identity check for clients that need to know whether they should expose account-bound surfaces.

### `POST /v1/auth/logout`
Ends the current authenticated session.

---

## Why auth matters beyond login

Authentication is the bridge between basic circuit workflows and managed product surfaces such as:

- Studio account views
- Pro/account readiness
- billing dashboard and wallet actions
- quote / hold / release flows for hardware-oriented operations

Auth does **not** by itself grant hardware access. It simply establishes the account context required for those flows.
