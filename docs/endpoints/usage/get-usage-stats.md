# Get Usage Stats

Retrieve API usage statistics for the current API key, including request counts, error rates, and per-endpoint breakdowns.

## Endpoint

`GET /v1/usage`

## Authentication

Required. Scoped to the current API key.

## Request

### Query Parameters

| Parameter | Type   | Required | Default | Description                              |
|-----------|--------|----------|---------|------------------------------------------|
| period    | string | No       | 7d      | Time period: `24h`, `7d`, `30d`, or `all` |

## Response

### Success

```json
{
  "key_info": {
    "id": "ak_abc123",
    "name": "Production Key",
    "created_at": "2026-01-15T10:00:00Z"
  },
  "summary": {
    "total_requests": 4521,
    "error_count": 12,
    "error_rate": 0.27,
    "avg_response_time_ms": 142
  },
  "by_endpoint": [
    {
      "endpoint": "/v1/creators",
      "method": "GET",
      "total_requests": 1200,
      "error_count": 2,
      "avg_response_time_ms": 95
    }
  ],
  "by_status": [
    {
      "status_code": 200,
      "count": 4509
    },
    {
      "status_code": 401,
      "count": 12
    }
  ]
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 400  | Invalid period value           |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/usage?period=30d" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Statistics are scoped to the authenticated API key only.
- The `error_rate` is expressed as a percentage.
- The `avg_response_time_ms` is the mean response time across all requests in the period.
