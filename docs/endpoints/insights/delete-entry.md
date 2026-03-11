# Delete Insight Entry

Delete an insight entry. Only the entry creator can delete it.

## Endpoint

`DELETE /v1/creators/:id/insights/entries/:entryId`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| id        | string | Yes      | The creator ID    |
| entryId   | string | Yes      | The entry ID      |

## Response

### Success

```json
{
  "deleted": true
}
```

### Errors

| Code | Error                            |
|------|----------------------------------|
| 401  | Missing or invalid API key       |
| 403  | Only the entry creator can delete |
| 404  | Entry not found                  |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/creators/cr_def456/insights/entries/ent_444" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Only the user who created the entry can delete it.
- This action is permanent and cannot be undone.
