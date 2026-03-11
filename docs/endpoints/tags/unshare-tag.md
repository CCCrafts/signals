# Unshare Tag

Revoke a user's or team's access to a shared tag.

## Endpoint

`DELETE /v1/tags/:id/share`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

### Body

| Field   | Type   | Required | Description                                              |
|---------|--------|----------|----------------------------------------------------------|
| user_id | string | No       | The ID of the user to revoke access from. Provide `user_id` or `team_id`. |
| team_id | string | No       | The ID of the team to revoke access from. Provide `user_id` or `team_id`. |

Revoke from a user:

```json
{
  "user_id": "usr_xyz789"
}
```

Revoke from a team:

```json
{
  "team_id": "team_abc123"
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
| 400  | Invalid request. Must provide `user_id` or `team_id`. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the tag owner can unshare a tag. |
| 404  | Tag not found. |

## Example

```bash
curl -X DELETE https://api.signals.actor/v1/tags/tag_abc123/share \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"user_id": "usr_xyz789"}'
```

## Notes

- Only the tag owner can revoke sharing.
- Provide exactly one of `user_id` or `team_id`, not both.
- Unsharing a user or team that does not have access is a no-op and returns success.
