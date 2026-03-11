# Create Tag

Create a new tag.

## Endpoint

`POST /v1/tags`

## Authentication

Required. `X-API-Key` header.

## Request

### Body

| Field | Type   | Required | Description                                    |
|-------|--------|----------|------------------------------------------------|
| name  | string | Yes      | Tag name (1-50 characters)                     |
| color | string | No       | Hex color string (e.g., `#FF5733`). Auto-assigned if omitted. |

```json
{
  "name": "VIP",
  "color": "#FF5733"
}
```

## Response

### Success (201 Created)

```json
{
  "id": "tag_abc123",
  "name": "VIP",
  "color": "#FF5733",
  "creator_count": 0,
  "is_owner": true,
  "created_at": "2026-03-10T12:00:00Z",
  "updated_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. Name is required (1-50 characters). Duplicate tag name. |
| 401  | Unauthorized. Missing or invalid API key. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/tags \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "VIP", "color": "#FF5733"}'
```

## Notes

- If `color` is not provided, a random color from the predefined palette is automatically assigned. Use `GET /v1/tags/colors` to see available colors.
- Tag names must be unique per user. A 400 error is returned if a tag with the same name already exists.
- The authenticated user becomes the owner of the created tag.
