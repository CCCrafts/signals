# Update Signal

Update one or more fields on an existing signal.

## Endpoint

`PUT /v1/signals/:id`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |
| Content-Type | Yes | application/json |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Signal ID |

### Body

Any combination of fields to update.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Signal name |
| type | string | Signal type classification |
| color | string | Hex color code (e.g., `#4CAF50`) |
| contents | string | Description of the signal |
| keywords | string[] | Keywords associated with the signal |
| active | boolean | Whether the signal is active |

## Response

### Success (200 OK)

```json
{
  "id": "sig_abc123",
  "name": "hiring-surge",
  "type": "intent",
  "color": "#FF9800",
  "contents": "Updated description of the signal",
  "keywords": ["hiring", "engineering", "scaling", "growth"],
  "active": true,
  "lead_count": 87,
  "created_at": "2026-01-15T08:00:00Z",
  "updated_at": "2026-03-10T14:30:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400 | Bad Request — invalid data |
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — signal does not exist |
| 409 | Conflict — signal with this name already exists |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/signals/sig_abc123" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "color": "#FF9800",
    "keywords": ["hiring", "engineering", "scaling", "growth"]
  }'
```

## Notes

- Only the specified fields are updated; all other fields remain unchanged.
- If updating `name`, the new name must be unique across all signals.
