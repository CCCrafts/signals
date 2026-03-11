# Delete Signal

Permanently delete a signal by its ID.

## Endpoint

`DELETE /v1/signals/:id`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Signal ID |

## Response

### Success (200 OK)

```json
{
  "success": true,
  "message": "Signal deleted"
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — signal does not exist |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/signals/sig_abc123" \
  -H "X-API-Key: your-api-key"
```

## Notes

- This action is permanent and cannot be undone.
- Deleting a signal does not delete its associated leads; they remain in the system without a signal association.
