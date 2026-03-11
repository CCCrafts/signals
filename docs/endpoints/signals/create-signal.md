# Create Signal

Create a new signal.

## Endpoint

`POST /v1/signals`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |
| Content-Type | Yes | application/json |

### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Signal name (must be unique) |
| type | string | No | Signal type classification |
| color | string | No | Hex color code (e.g., `#4CAF50`) |
| contents | string | No | Description of the signal |
| keywords | string[] | No | Keywords associated with the signal |
| active | boolean | No | Whether the signal is active (default: `true`) |

## Response

### Success (201 Created)

```json
{
  "id": "sig_xyz789",
  "name": "funding-round",
  "type": "event",
  "color": "#2196F3",
  "contents": "Companies that recently closed a funding round",
  "keywords": ["funding", "series", "investment"],
  "active": true,
  "lead_count": 0,
  "created_at": "2026-03-10T14:00:00Z",
  "updated_at": "2026-03-10T14:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400 | Bad Request — missing required `name` field or invalid data |
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 409 | Conflict — signal with this name already exists |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/signals" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "funding-round",
    "type": "event",
    "color": "#2196F3",
    "contents": "Companies that recently closed a funding round",
    "keywords": ["funding", "series", "investment"],
    "active": true
  }'
```

## Notes

- The `name` field is required and must be unique across all signals.
- Returns `201 Created` on success, not `200 OK`.
