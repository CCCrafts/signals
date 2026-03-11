# Share List

Share a list with another user, granting them read or write access.

## Endpoint

`POST /v1/lists/:id/share`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Body

| Field      | Type   | Required | Description                          |
|------------|--------|----------|--------------------------------------|
| user_id    | string | Yes      | The ID of the user to share with     |
| permission | string | Yes      | Access level: `read` or `write`      |

```json
{
  "user_id": "usr_xyz789",
  "permission": "read"
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
| 400  | Invalid request. `user_id` and `permission` are required. Permission must be `read` or `write`. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the list owner can share a list. Non-admin users can only share within their team. |
| 404  | List not found. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists/lst_abc123/share \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "usr_xyz789", "permission": "read"}'
```

## Notes

- Only the list owner can share the list.
- Non-admin users can only share with members of their own team.
- Admin users can share with any user.
- Sharing with a user who already has access will update their permission level.
