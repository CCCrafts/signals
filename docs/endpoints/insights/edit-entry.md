# Edit Insight Entry

Update the content of an existing insight entry. Only the entry creator can edit it.

## Endpoint

`PUT /v1/creators/:id/insights/entries/:entryId`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | The creator ID    |
| entryId   | string | Yes      | The entry ID      |

### Body

| Field   | Type   | Required | Description                             |
|---------|--------|----------|-----------------------------------------|
| content | string | Yes      | Updated entry content (1-50,000 characters) |

```json
{
  "content": "Updated notes from the Berlin summit. Partnership deal confirmed for Q2."
}
```

## Response

### Success

```json
{
  "id": "ent_444",
  "insight_id": "ins_abc123",
  "content": "Updated notes from the Berlin summit. Partnership deal confirmed for Q2.",
  "entry_type": "meeting_note",
  "created_at": "2026-03-10T14:00:00Z",
  "updated_at": "2026-03-10T16:30:00Z"
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 400  | Content is required            |
| 401  | Missing or invalid API key     |
| 403  | Only the entry creator can edit |
| 404  | Entry not found                |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/creators/cr_def456/insights/entries/ent_444" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "Updated notes from the Berlin summit."}'
```

## Notes

- Only the user who created the entry can edit it.
- The `entry_type` cannot be changed after creation.
