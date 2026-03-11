# Update Lead

Update one or more fields on an existing lead.

## Endpoint

`PUT /v1/leads/:id`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |
| Content-Type | Yes | application/json |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Lead ID |

### Body

At least one field is required.

| Field | Type | Description |
|-------|------|-------------|
| score | number | Lead score (0-10) |
| qualified | boolean | Qualification status |
| qualification_tags | string[] | Tags describing qualification criteria |
| persona | string | Lead persona or role description |
| is_exported | boolean | Whether the lead has been exported |

## Response

### Success (200 OK)

```json
{
  "id": "lead_abc123",
  "name": "Jane Smith",
  "company": "Acme Corp",
  "score": 9.0,
  "qualified": true,
  "qualification_tags": ["high-intent", "enterprise"],
  "persona": "VP of Engineering",
  "is_exported": false,
  "created_at": "2026-03-01T12:00:00Z",
  "updated_at": "2026-03-10T14:20:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400 | Bad Request — no fields provided or invalid values |
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |
| 404 | Not Found — lead does not exist |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/leads/lead_abc123" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "score": 9.0,
    "qualified": true,
    "qualification_tags": ["high-intent", "enterprise"]
  }'
```

## Notes

- At least one field must be provided in the request body.
- The `score` field must be between 0 and 10.
- Only the specified fields are updated; all other fields remain unchanged.
