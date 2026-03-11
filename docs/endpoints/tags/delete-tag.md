# Delete Tag

Permanently delete a tag, including all its creator associations and shares.

## Endpoint

`DELETE /v1/tags/:id`

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
  "success": true
}
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the tag owner can delete a tag. |
| 404  | Tag not found. |

## Example

```bash
curl -X DELETE https://api.signals.actor/v1/tags/tag_abc123 \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only the tag owner can delete a tag.
- Deleting a tag removes all creator-tag associations and shares. The underlying creators are not affected.
- This action is irreversible.
