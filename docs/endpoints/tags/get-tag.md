# Get Tag

Retrieve a specific tag by ID.

## Endpoint

`GET /v1/tags/:id`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

## Response

### Success

```json
{
  "id": "tag_abc123",
  "name": "VIP",
  "color": "#FF5733",
  "creator_count": 15,
  "is_owner": true,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-02-20T14:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. No access to this tag. |
| 404  | Tag not found. |

## Example

```bash
curl https://api.signals.actor/v1/tags/tag_abc123 \
  -H "X-API-Key: your-api-key"
```

## Notes

- `is_owner` indicates whether the authenticated user is the owner of this tag.
- `creator_count` is the number of creators associated with this tag.
- The user must own the tag, have it shared with them, or have it shared with their team.
