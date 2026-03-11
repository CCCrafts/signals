# List Tags

Retrieve all tags accessible to the authenticated user, grouped by ownership, shared access, and team.

## Endpoint

`GET /v1/tags`

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
      "id": "tag_abc123",
      "name": "VIP",
      "color": "#FF5733",
      "creator_count": 15,
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "shared": [
    {
      "id": "tag_def456",
      "name": "Priority",
      "color": "#3498DB",
      "creator_count": 8,
      "permission": "read",
      "created_at": "2026-01-10T08:00:00Z"
    }
  ],
  "team": [
    {
      "id": "tag_ghi789",
      "name": "Outreach",
      "color": "#2ECC71",
      "creator_count": 22,
      "created_at": "2026-02-01T12:00:00Z"
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
curl https://api.signals.actor/v1/tags \
  -H "X-API-Key: your-api-key"
```

## Notes

- `owned` contains tags created by the authenticated user.
- `shared` contains tags shared directly with the user, including a `permission` field.
- `team` contains tags shared with the user's team.
- Each tag includes a `creator_count` indicating the number of creators associated with it.
