# Delete Creator

Delete a creator and remove all associated data including list memberships, team assignments, and tags. Only the user who originally added the creator can perform deletion.

## Endpoint

`DELETE /v1/creators/:id`

## Authentication

Required. Team-scoped — only the creator's original adder can delete.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Creator ID |

## Response

### Success (200)

```json
{
  "message": "Creator deleted successfully"
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | User is not the original adder of this creator |
| 404 | Not Found | Creator with given ID does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/creators/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "X-API-Key: your-api-key"
```

## Notes

- This action is irreversible. The following associated data is removed:
  - List memberships (creator is removed from all lists)
  - Team assignments (`team_creators` junction records)
  - Tags associated with the creator
- Only the user who originally added the creator can delete it. Other team members will receive a `403 Forbidden` response.
- Posts associated with the creator may also be removed depending on cascade configuration.
