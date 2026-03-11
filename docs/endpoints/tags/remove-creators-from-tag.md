# Remove Creators from Tag

Remove the association between creators and a tag.

## Endpoint

`DELETE /v1/tags/:id/creators`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

### Body

| Field       | Type     | Required | Description                              |
|-------------|----------|----------|------------------------------------------|
| creator_ids | string[] | Yes      | Array of creator IDs to untag (1-100)    |

```json
{
  "creator_ids": ["crt_001", "crt_002"]
}
```

## Response

### Success

```json
{
  "removed": 2,
  "total": 16
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `creator_ids` must be an array of 1-100 strings. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Requires write access to the tag. |
| 404  | Tag not found. |

## Example

```bash
curl -X DELETE https://api.signals.actor/v1/tags/tag_abc123/creators \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"creator_ids": ["crt_001", "crt_002"]}'
```

## Notes

- Requires write access (ownership or write share permission).
- `removed` reflects the number of associations actually removed. IDs not associated with the tag are silently ignored.
- `total` is the updated creator count for the tag.
- Maximum of 100 creator IDs per request.
