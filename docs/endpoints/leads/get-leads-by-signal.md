# Get Leads by Signal

Retrieve leads associated with a specific signal, sorted by score.

## Endpoint

`GET /v1/leads/by-signal/:signalName`

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
| signalName | string | Signal name (URL-encoded if it contains spaces) |

## Response

### Success (200 OK)

```json
{
  "signal_name": "hiring-surge",
  "leads": [
    {
      "id": "lead_abc123",
      "name": "Jane Smith",
      "company": "Acme Corp",
      "score": 9.2,
      "qualified": true,
      "qualification_tags": ["high-intent"],
      "persona": "VP of Engineering",
      "is_exported": false,
      "created_at": "2026-03-01T12:00:00Z"
    }
  ],
  "total": 45
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
curl -X GET "https://api.signals.actor/v1/leads/by-signal/hiring-surge" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns up to 100 leads sorted by score in descending order.
- The `signalName` path parameter must be URL-encoded if it contains special characters.
