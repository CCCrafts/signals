# Delete Lead

Permanently delete a lead by its ID.

## Endpoint

`DELETE /v1/leads/:id`

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
| id | string | Lead ID |

## Response

### Success (200 OK)

```json
{
  "success": true,
  "message": "Lead deleted"
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — lead does not exist |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/leads/lead_abc123" \
  -H "X-API-Key: your-api-key"
```

## Notes

- This action is permanent and cannot be undone.
- Deleting a lead removes it from all signal associations.
