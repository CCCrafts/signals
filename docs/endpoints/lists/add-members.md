# Add Members to List

Add creators to a list by their IDs.

## Endpoint

`POST /v1/lists/:id/members`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Body

| Field       | Type     | Required | Description                            |
|-------------|----------|----------|----------------------------------------|
| creator_ids | string[] | Yes      | Array of creator IDs to add (1-100)    |

```json
{
  "creator_ids": ["crt_001", "crt_002", "crt_003"]
}
```

## Response

### Success

```json
{
  "added": 3,
  "total": 45
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `creator_ids` must be an array of 1-100 strings. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Requires ownership or write share permission. |
| 404  | List not found. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists/lst_abc123/members \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"creator_ids": ["crt_001", "crt_002", "crt_003"]}'
```

## Notes

- Only creators accessible to the authenticated user's team can be added. Inaccessible creator IDs are silently skipped.
- Duplicate additions are ignored; creators already in the list are not added again.
- `added` reflects the number of creators newly added. `total` is the updated member count for the list.
- Maximum of 100 creator IDs per request.
