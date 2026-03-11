# List Deep Scrape Queue

Retrieve a paginated list of deep scrape queue entries for the current team.

## Endpoint

`GET /v1/deep-scrape-queue`

## Authentication

Required. Team-scoped.

## Request

### Query Parameters

| Parameter | Type    | Required | Default | Description                                                    |
|-----------|---------|----------|---------|----------------------------------------------------------------|
| status    | string  | No       | —       | Filter by status: `pending`, `processing`, `completed`, `failed` |
| limit     | integer | No       | 50      | Number of results to return (1-200)                            |
| offset    | integer | No       | 0       | Number of results to skip for pagination                       |

## Response

### Success

```json
{
  "queue": [
    {
      "id": "dsq_xyz789",
      "creator_id": "cr_abc123",
      "status": "completed",
      "retry_count": 0,
      "created_at": "2026-03-10T12:00:00Z",
      "updated_at": "2026-03-10T12:03:00Z",
      "creator": {
        "id": "cr_abc123",
        "name": "Jane Smith",
        "linkedin_url": "https://linkedin.com/in/janesmith"
      }
    }
  ],
  "total": 87,
  "limit": 50,
  "offset": 0
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 400  | Invalid status value           |
| 400  | Invalid limit (must be 1-200)  |
| 401  | Missing or invalid API key     |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/deep-scrape-queue?status=pending&limit=20" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Results are scoped to the authenticated user's team.
- Each queue entry includes basic creator information.
- Results are ordered by creation date descending.
