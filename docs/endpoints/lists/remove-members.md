# Remove Members from List

Remove creators from a list by their IDs.

## Endpoint

`DELETE /v1/lists/:id/members`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Body

| Field       | Type     | Required | Description                              |
|-------------|----------|----------|------------------------------------------|
| creator_ids | string[] | Yes      | Array of creator IDs to remove (1-100)   |

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
  "total": 40
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
curl -X DELETE https://api.signals.actor/v1/lists/lst_abc123/members \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"creator_ids": ["crt_001", "crt_002"]}'
```

## Notes

- `removed` reflects the number of creators actually removed. IDs not in the list are silently ignored.
- `total` is the updated member count for the list.
- Maximum of 100 creator IDs per request.
