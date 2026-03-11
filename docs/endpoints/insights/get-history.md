# Get Insight History

Retrieve the version history of the current user's insight for a creator.

## Endpoint

`GET /v1/creators/:id/insights/history`

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
  "history": [
    {
      "id": "ih_001",
      "content": "Key account - strong engagement with our content. Recently promoted to VP.",
      "change_summary": "Updated role after promotion",
      "changed_by_name": "Sarah Connor",
      "created_at": "2026-03-10T14:00:00Z"
    },
    {
      "id": "ih_002",
      "content": "Key account - strong engagement with our content.",
      "change_summary": "Initial note",
      "changed_by_name": "Sarah Connor",
      "created_at": "2026-03-01T10:00:00Z"
    }
  ]
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 404  | Insight not found              |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/cr_def456/insights/history" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns up to 100 history entries, ordered by creation date descending (most recent first).
- Each history entry captures the full content at that point in time.
- The `changed_by_name` field shows who made the change.
