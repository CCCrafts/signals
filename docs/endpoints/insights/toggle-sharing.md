# Toggle Insight Sharing

Toggle the visibility of the current user's insight for a creator. When shared, team members can see the insight.

## Endpoint

`PUT /v1/creators/:id/insights/share`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| id        | string | Yes      | The creator ID  |

### Body

| Field     | Type    | Required | Description                          |
|-----------|---------|----------|--------------------------------------|
| is_shared | boolean | Yes      | Whether the insight is visible to team members |

```json
{
  "is_shared": true
}
```

## Response

### Success

```json
{
  "id": "ins_abc123",
  "creator_id": "cr_def456",
  "is_shared": true,
  "updated_at": "2026-03-10T14:00:00Z"
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 400  | is_shared is required          |
| 401  | Missing or invalid API key     |
| 404  | Insight not found              |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/creators/cr_def456/insights/share" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"is_shared": true}'
```

## Notes

- Only the insight owner can toggle sharing.
- When `is_shared` is `true`, the insight appears in the `shared` array for other team members.
- When `is_shared` is `false`, the insight is only visible to the owner.
