# Get Usage Errors

Retrieve recent API errors for the current API key from the last 30 days.

## Endpoint

`GET /v1/usage/errors`

## Authentication

Required. Scoped to the current API key.

## Request

### Query Parameters

| Parameter | Type    | Required | Default | Description                  |
|-----------|---------|----------|---------|------------------------------|
| limit     | integer | No       | 20      | Number of errors to return (1-50) |

## Response

### Success

```json
{
  "errors": [
    {
      "endpoint": "/v1/creators",
      "method": "GET",
      "status_code": 500,
      "response_time_ms": 2340,
      "timestamp": "2026-03-09T14:22:10Z"
    },
    {
      "endpoint": "/v1/linkedin-lookups",
      "method": "POST",
      "status_code": 402,
      "response_time_ms": 45,
      "timestamp": "2026-03-08T09:11:03Z"
    }
  ]
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 400  | Invalid limit value (must be 1-50) |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/usage/errors?limit=10" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only errors from the last 30 days are returned.
- Results are ordered by timestamp descending (most recent first).
- Scoped to the authenticated API key only.
