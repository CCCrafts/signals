# List Signals

Retrieve all active signals, sorted by lead count.

## Endpoint

`GET /v1/signals`

## Authentication

Required. `X-API-Key` header. Available to **all authenticated users**.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key |

## Response

### Success (200 OK)

```json
{
  "signals": [
    {
      "id": "sig_abc123",
      "name": "hiring-surge",
      "type": "intent",
      "color": "#4CAF50",
      "contents": "Companies rapidly expanding their engineering teams",
      "keywords": ["hiring", "engineering", "scaling"],
      "active": true,
      "lead_count": 87,
      "created_at": "2026-01-15T08:00:00Z",
      "updated_at": "2026-03-01T12:00:00Z"
    }
  ],
  "total": 12
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/signals" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only active signals are returned.
- Results are sorted by `lead_count` in descending order.
- Available to all authenticated users, not just admins.
