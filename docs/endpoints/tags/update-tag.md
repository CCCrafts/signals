# Update Tag

Update the name and/or color of an existing tag.

## Endpoint

`PUT /v1/tags/:id`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

### Body

| Field | Type   | Required | Description                        |
|-------|--------|----------|------------------------------------|
| name  | string | No       | Tag name (1-50 characters)         |
| color | string | No       | Hex color string (e.g., `#3498DB`) |

```json
{
  "name": "High Priority",
  "color": "#3498DB"
}
```

## Response

### Success

```json
{
  "id": "tag_abc123",
  "name": "High Priority",
  "color": "#3498DB",
  "creator_count": 15,
  "is_owner": true,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. Name must be 1-50 characters. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Requires write access to the tag. |
| 404  | Tag not found. |

## Example

```bash
curl -X PUT https://api.signals.actor/v1/tags/tag_abc123 \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "High Priority", "color": "#3498DB"}'
```

## Notes

- Requires write access (ownership or write share permission).
- At least one field (`name` or `color`) must be provided.
