# Delete List

Permanently delete a list, including all its shares and member associations.

## Endpoint

`DELETE /v1/lists/:id`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

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
| 403  | Forbidden. Only the list owner can delete a list. |
| 404  | List not found. |

## Example

```bash
curl -X DELETE https://api.signals.actor/v1/lists/lst_abc123 \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only the list owner can delete a list. Users with shared access cannot delete it.
- Deleting a list also removes all shares and member associations. The underlying creators are not deleted.
- This action is irreversible.
