# Delete LinkedIn Lookup

Delete a LinkedIn lookup. Refunds credits if the lookup has not yet been processed.

## Endpoint

`DELETE /v1/linkedin-lookups/:id`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description      |
|-----------|--------|----------|------------------|
| id        | string | Yes      | The lookup ID    |

## Response

### Success

```json
{
  "deleted": true,
  "credits_refunded": 10
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 404  | Lookup not found               |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/linkedin-lookups/llq_def456" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Refunds 10 credits if the lookup status is `pending` at time of deletion.
- No credit refund for lookups that have already been processed (searching, completed, etc.).
- Team members can delete any lookup belonging to their team.
