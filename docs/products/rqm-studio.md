# RQM Studio

RQM Studio is the browser workflow layer for the platform.

---

## What Studio provides

- guided intake for circuit workflows
- optimization and comparison workflows on top of the API
- execution-oriented workflow orchestration
- account, job, and reporting views

Studio sits above the API and does not replace the service boundary.

---

## Boundary model

```text
Studio (workflow layer)
        |
        v
rqm-api (service boundary)
        |
        v
public circuit boundary -> internal optimization engine -> execution bridges
```
