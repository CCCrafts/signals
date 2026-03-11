# Upsert Creator Insights

Create or update the current user's insight for a creator. Automatically creates a history snapshot on each update.

## Endpoint

`PUT /v1/creators/:id/insights`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| id        | string | Yes      | The creator ID  |

### Body

| Field          | Type   | Required | Description                              |
|----------------|--------|----------|------------------------------------------|
| content        | string | Yes      | Insight content (max 50,000 characters)  |
| change_summary | string | No       | Summary of changes (max 500 characters)  |

```json
{
  "content": "Key account - strong engagement with our content. Recently promoted to VP.",
  "change_summary": "Updated role after promotion"
}
```

## Response

### Success

```json
{
  "id": "ins_abc123",
  "creator_id": "cr_def456",
  "content": "Key account - strong engagement with our content. Recently promoted to VP.",
  "is_shared": false,
  "created_at": "2026-03-01T10:00:00Z",
  "updated_at": "2026-03-10T14:00:00Z"
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | Content is required                      |
| 400  | Content exceeds 50,000 characters        |
| 400  | Change summary exceeds 500 characters    |
| 401  | Missing or invalid API key               |
| 404  | Creator not found                        |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/creators/cr_def456/insights" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"content": "Key account - strong engagement.", "change_summary": "Initial note"}'
```

## Notes

- If no insight exists for this creator, one is created.
- If an insight already exists, it is updated and a history snapshot is saved.
- The `change_summary` is stored in the history entry for audit purposes.
