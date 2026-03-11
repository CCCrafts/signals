# Get Signal

Retrieve a single signal by its ID.

## Endpoint

`GET /v1/signals/:id`

## Authentication

Required. `X-API-Key` header. Available to **all authenticated users**.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Signal ID |

## Response

### Success (200 OK)

```json
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
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 404 | Not Found — signal does not exist |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/signals/sig_abc123" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Available to all authenticated users, not just admins.
