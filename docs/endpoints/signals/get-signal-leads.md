# Get Signal Leads

Retrieve a signal along with its associated leads.

## Endpoint

`GET /v1/signals/:id/leads`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |

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
  "leads": [
    {
      "id": "lead_abc123",
      "name": "Jane Smith",
      "company": "Acme Corp",
      "score": 9.2,
      "qualified": true,
      "persona": "VP of Engineering",
      "created_at": "2026-03-01T12:00:00Z"
    }
  ],
  "lead_count": 87,
  "created_at": "2026-01-15T08:00:00Z",
  "updated_at": "2026-03-01T12:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — signal does not exist |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/signals/sig_abc123/leads" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns the full signal object with an embedded `leads` array.
- Leads are sorted by score in descending order.
