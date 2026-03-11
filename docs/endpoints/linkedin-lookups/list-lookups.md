# List LinkedIn Lookups

Retrieve a paginated list of LinkedIn lookups for the current team.

## Endpoint

`GET /v1/linkedin-lookups`

## Authentication

Required. Team-scoped.

## Request

### Query Parameters

| Parameter | Type    | Required | Default    | Description                                                                                      |
|-----------|---------|----------|------------|--------------------------------------------------------------------------------------------------|
| status    | string  | No       | —          | Filter by status: `pending`, `searching`, `enriching`, `url_found`, `completed`, `no_results`, `failed`, `enrichment_failed`, `paused` |
| source    | string  | No       | google_ad  | Filter by source: `google_ad` or `direct_url`                                                   |
| limit     | integer | No       | 50         | Number of results to return (1-200)                                                              |
| offset    | integer | No       | 0          | Number of results to skip for pagination                                                         |

## Response

### Success

```json
{
  "lookups": [
    {
      "id": "llq_def456",
      "full_name": "Jane Smith",
      "company": "Acme Corp",
      "status": "completed",
      "source": "google_ad",
      "linkedin_url": "https://linkedin.com/in/janesmith",
      "creator_id": "cr_abc123",
      "retry_count": 0,
      "list_id": "lst_abc123",
      "created_at": "2026-03-10T12:00:00Z",
      "updated_at": "2026-03-10T12:05:00Z"
    }
  ],
  "total": 145,
  "limit": 50,
  "offset": 0
}
```

### Errors

| Code | Error                      |
|------|----------------------------|
| 400  | Invalid status value       |
| 400  | Invalid limit (must be 1-200) |
| 401  | Missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/linkedin-lookups?status=completed&limit=20" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Results are scoped to the authenticated user's team.
- Results are ordered by creation date descending (newest first).
- Completed lookups include `linkedin_url` and `creator_id` fields.
