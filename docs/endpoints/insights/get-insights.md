# Get Creator Insights

Retrieve insights for a creator, including the current user's own insight and any shared insights from team members.

## Endpoint

`GET /v1/creators/:id/insights`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| id        | string | Yes      | The creator ID  |

## Response

### Success

```json
{
  "own": {
    "id": "ins_abc123",
    "creator_id": "cr_def456",
    "content": "Key account - strong engagement with our content.",
    "is_shared": true,
    "created_at": "2026-03-01T10:00:00Z",
    "updated_at": "2026-03-09T15:30:00Z",
    "entries": [
      {
        "id": "ent_111",
        "content": "Met at conference in Berlin.",
        "entry_type": "manual",
        "created_at": "2026-03-05T09:00:00Z"
      },
      {
        "id": "ent_222",
        "content": "{\"bio\": \"...\", \"interesting_facts\": [...]}",
        "entry_type": "ai_research",
        "created_at": "2026-03-08T11:00:00Z"
      }
    ]
  },
  "shared": [
    {
      "id": "ins_xyz789",
      "creator_id": "cr_def456",
      "content": "Interested in partnership opportunities.",
      "is_shared": true,
      "created_by_name": "Alex Johnson",
      "created_at": "2026-02-20T08:00:00Z",
      "updated_at": "2026-03-07T12:00:00Z",
      "entries": []
    }
  ]
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 404  | Creator not found              |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/cr_def456/insights" \
  -H "X-API-Key: your-api-key"
```

## Notes

- `own` contains the authenticated user's insight for this creator (null if none exists).
- `shared` contains insights from other team members who have enabled sharing.
- Each insight includes its associated entries.
