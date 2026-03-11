# Get LinkedIn Lookup Stats

Retrieve aggregated status counts for LinkedIn lookups belonging to the current team.

## Endpoint

`GET /v1/linkedin-lookups/stats`

## Authentication

Required. Team-scoped.

## Request

### Query Parameters

| Parameter | Type   | Required | Default    | Description                                |
|-----------|--------|----------|------------|--------------------------------------------|
| source    | string | No       | —          | Filter by source: `google_ad` or `direct_url` |

## Response

### Success

```json
{
  "total": 250,
  "pending": 12,
  "searching": 3,
  "completed": 198,
  "no_results": 22,
  "failed": 15
}
```

### Errors

| Code | Error                      |
|------|----------------------------|
| 401  | Missing or invalid API key |
| 400  | Invalid source value       |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/linkedin-lookups/stats?source=google_ad" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Counts are scoped to the authenticated user's team.
- If `source` is omitted, stats include all sources.
