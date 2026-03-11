# Retry LinkedIn Lookup

Retry a failed or no-results LinkedIn lookup. Resets the lookup to pending status for reprocessing.

## Endpoint

`POST /v1/linkedin-lookups/:id/retry`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description      |
|-----------|--------|----------|------------------|
| id        | string | Yes      | The lookup ID    |

## Response

### Success

```json
{
  "id": "llq_def456",
  "full_name": "Jane Smith",
  "company": "Acme Corp",
  "status": "pending",
  "retry_count": 1,
  "updated_at": "2026-03-10T14:00:00Z"
}
```

### Errors

| Code | Error                                          |
|------|-------------------------------------------------|
| 400  | Lookup can only be retried if status is failed or no_results |
| 400  | Maximum retries (3) exceeded                   |
| 401  | Missing or invalid API key                     |
| 404  | Lookup not found                               |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/linkedin-lookups/llq_def456/retry" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only lookups with status `failed` or `no_results` can be retried.
- Maximum of 3 retries per lookup.
- Retries are free -- no additional credit charge is applied.
- The lookup status is reset to `pending` and the `retry_count` is incremented.
