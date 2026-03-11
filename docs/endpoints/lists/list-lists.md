# List Lists

Retrieve all lists accessible to the authenticated user, grouped by ownership and shared access.

## Endpoint

`GET /v1/lists`

## Authentication

Required. `X-API-Key` header.

## Request

No parameters required.

## Response

### Success

```json
{
  "owned": [
    {
      "id": "lst_abc123",
      "name": "Top Tech Creators",
      "description": "Leading voices in tech",
      "member_count": 42,
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-02-20T14:00:00Z"
    }
  ],
  "shared": [
    {
      "id": "lst_def456",
      "name": "Marketing Leads",
      "description": null,
      "member_count": 18,
      "permission": "read",
      "owner_id": "usr_xyz789",
      "created_at": "2026-01-10T08:00:00Z",
      "updated_at": "2026-02-18T12:00:00Z"
    }
  ]
}
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |

## Example

```bash
curl https://api.signals.actor/v1/lists \
  -H "X-API-Key: your-api-key"
```

## Notes

- `owned` contains lists created by the authenticated user.
- `shared` contains lists shared with the user by others, including a `permission` field (`read` or `write`).
- Each list includes a `member_count` indicating the number of creators in the list.
