# Share Tag

Share a tag with a specific user or an entire team, granting read or write access.

## Endpoint

`POST /v1/tags/:id/share`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The tag ID  |

### Body

| Field      | Type   | Required | Description                                      |
|------------|--------|----------|--------------------------------------------------|
| user_id    | string | No       | The ID of the user to share with. Provide `user_id` or `team_id`. |
| team_id    | string | No       | The ID of the team to share with. Provide `user_id` or `team_id`. |
| permission | string | Yes      | Access level: `read` or `write`                  |

Share with a user:

```json
{
  "user_id": "usr_xyz789",
  "permission": "write"
}
```

Share with a team:

```json
{
  "team_id": "team_abc123",
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
| 400  | Invalid request. Must provide `user_id` or `team_id`, and `permission` must be `read` or `write`. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the tag owner can share. Non-admin users can only share within their own team. |
| 404  | Tag not found. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/tags/tag_abc123/share \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"team_id": "team_abc123", "permission": "read"}'
```

## Notes

- Only the tag owner can share the tag.
- Non-admin users can only share with users or teams they belong to.
- Admin users can share with any user or team.
- Sharing with a user or team that already has access will update their permission level.
- Provide exactly one of `user_id` or `team_id`, not both.
