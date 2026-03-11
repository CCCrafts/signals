# Add Insight Entry

Add a new entry to the current user's insight for a creator. Auto-creates a parent insight if one does not exist.

## Endpoint

`POST /v1/creators/:id/insights/entries`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| id        | string | Yes      | The creator ID  |

### Body

| Field      | Type   | Required | Description                                   |
|------------|--------|----------|-----------------------------------------------|
| content    | string | Yes      | Entry content (1-50,000 characters)           |
| entry_type | string | No       | Type label for the entry (max 50 characters). Default: `manual` |

```json
{
  "content": "Had a great conversation at the Berlin summit. Interested in partnership.",
  "entry_type": "meeting_note"
}
```

## Response

### Success

```json
{
  "id": "ent_444",
  "insight_id": "ins_abc123",
  "content": "Had a great conversation at the Berlin summit. Interested in partnership.",
  "entry_type": "meeting_note",
  "created_at": "2026-03-10T14:00:00Z"
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | Content is required (1-50,000 characters) |
| 400  | entry_type exceeds 50 characters         |
| 401  | Missing or invalid API key               |
| 404  | Creator not found                        |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/creators/cr_def456/insights/entries" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "Met at Berlin summit.", "entry_type": "meeting_note"}'
```

## Notes

- If no parent insight exists for this creator, one is automatically created.
- The default `entry_type` is `manual`.
- Entries are associated with the authenticated user's insight, not shared insights.
