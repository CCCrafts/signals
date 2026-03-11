# Add Creators to Tag

Associate creators with a tag by their IDs.

## Endpoint

`POST /v1/tags/:id/creators`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

### Body

| Field       | Type     | Required | Description                            |
|-------------|----------|----------|----------------------------------------|
| creator_ids | string[] | Yes      | Array of creator IDs to tag (1-100)    |

```json
{
  "creator_ids": ["crt_001", "crt_002", "crt_003"]
}
```

## Response

### Success

```json
{
  "requested": 3,
  "total": 18
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
curl -X POST https://api.signals.actor/v1/tags/tag_abc123/creators \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"creator_ids": ["crt_001", "crt_002", "crt_003"]}'
```

## Notes

- Requires write access (ownership or write share permission).
- Only creators accessible to the authenticated user's team can be added. Inaccessible creator IDs are silently skipped.
- Duplicate associations are ignored; creators already tagged are not added again.
- `requested` is the number of creator IDs submitted. `total` is the updated creator count for the tag.
- Maximum of 100 creator IDs per request.
