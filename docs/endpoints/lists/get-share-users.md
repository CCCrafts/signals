# Get Shareable Users for List

Retrieve users available for sharing a list with. Excludes users who already have access.

## Endpoint

`GET /v1/lists/:id/share/users`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Query Parameters

| Parameter | Type   | Default | Description                     |
|-----------|--------|---------|---------------------------------|
| search    | string | —       | Filter users by name or email   |

## Response

### Success

```json
[
  {
    "id": "usr_xyz789",
    "name": "John Doe",
    "email": "john@example.com"
  },
  {
    "id": "usr_abc456",
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }
]
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Only the list owner can view shareable users. |
| 404  | List not found. |

## Example

```bash
curl "https://api.signals.actor/v1/lists/lst_abc123/share/users?search=john" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only the list owner can access this endpoint.
- Non-admin users see only members of their own team.
- Admin users see all users in the system.
- Users who already have access to the list are excluded from the results.
- Use the `search` parameter to filter by name or email for large teams.
