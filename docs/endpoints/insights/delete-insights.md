# Delete Creator Insights

Delete the current user's insight for a creator, including all associated entries and history.

## Endpoint

`DELETE /v1/creators/:id/insights`

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
  "deleted": true
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 404  | Insight not found              |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/creators/cr_def456/insights" \
  -H "X-API-Key: your-api-key"
```

## Notes

- This permanently deletes the insight, all its entries, and the full version history.
- Only the insight owner can delete their insight.
- Shared insights from other team members are not affected.
