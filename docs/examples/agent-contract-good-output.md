# Example: Good Agent Output

## Sample output

I have read `/llms.txt` and scoped this integration using `/capabilities.json` and `/agent-tasks.json`.

I will follow the **Validate → Optimize** recipe first, then extend only if required by the task.

Implementation plan:

1. Build payload using public circuit boundary guidance.
2. Confirm exact validate/optimize route and schema details in Swagger UI before writing typed request/response models.
3. Run validation first and block optimize flow if validation fails.
4. If validation succeeds, run optimize using documented route.
5. Preserve artifacts for reproducibility:
   - `validation_request.json`
   - `validation_response.json`
   - `optimize_request.json`
   - `optimize_response.json`
   - metrics/diff artifact and metadata index

Claim posture:

- I will describe optimization outputs as candidates unless verification artifacts demonstrate improvement.
- I will not claim physical or quantum advantage without documented benchmark/output evidence.
