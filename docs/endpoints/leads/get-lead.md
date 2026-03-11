# Get Lead

Retrieve a single lead by its ID.

## Endpoint

`GET /v1/leads/:id`

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
| id | string | Lead ID |

## Response

### Success (200 OK)

```json
{
  "id": "lead_abc123",
  "name": "Jane Smith",
  "company": "Acme Corp",
  "score": 8.5,
  "qualified": true,
  "qualification_tags": ["high-intent", "enterprise"],
  "persona": "VP of Engineering",
  "signal_name": "hiring-surge",
  "is_exported": false,
  "created_at": "2026-03-01T12:00:00Z",
  "updated_at": "2026-03-05T09:30:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — lead does not exist |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/leads/lead_abc123" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns the full lead object including all metadata fields.
