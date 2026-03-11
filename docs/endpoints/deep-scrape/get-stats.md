# Get Deep Scrape Stats

Retrieve aggregated status counts for the deep scrape queue belonging to the current team.

## Endpoint

`GET /v1/deep-scrape-queue/stats`

## Authentication

Required. Team-scoped.

## Request

No query parameters.

## Response

### Success

```json
{
  "pending": 8,
  "processing": 2,
  "completed": 156,
  "failed": 5,
  "completed_today": 12,
  "failed_today": 1
}
```

### Errors

| Code | Error                      |
|------|----------------------------|
| 401  | Missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/deep-scrape-queue/stats" \
  -H "X-API-Key: your-api-key"
```

## Notes

- All counts are scoped to the authenticated user's team.
- `completed_today` and `failed_today` reflect entries updated within the current UTC day.
