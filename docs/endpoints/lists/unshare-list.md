# Unshare List

Revoke a user's access to a shared list.

## Endpoint

`DELETE /v1/lists/:id/share`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Body

| Field   | Type   | Required | Description                                |
|---------|--------|----------|--------------------------------------------|
| user_id | string | Yes      | The ID of the user to revoke access from   |

```json
{
  "user_id": "usr_xyz789"
}
```

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
| 400  | Invalid request. `user_id` is required. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the list owner can unshare a list. |
| 404  | List not found. |

## Example

```bash
curl -X DELETE https://api.signals.actor/v1/lists/lst_abc123/share \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "usr_xyz789"}'
```

## Notes

- Only the list owner can revoke sharing.
- Unsharing a user who does not have access is a no-op and returns success.
