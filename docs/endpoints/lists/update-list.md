# Update List

Update the name and/or description of an existing list.

## Endpoint

`PUT /v1/lists/:id`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Body

| Field       | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| name        | string | No       | List name (1-100 characters)         |
| description | string | No       | List description (max 500 characters) |

```json
{
  "name": "Updated List Name",
  "description": "Updated description"
}
```

## Response

### Success

```json
{
  "id": "lst_abc123",
  "name": "Updated List Name",
  "description": "Updated description",
  "member_count": 42,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. Name must be 1-100 characters. Description must be max 500 characters. |
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. Requires ownership or write share permission. |
| 404  | List not found. |

## Example

```bash
curl -X PUT https://api.signals.actor/v1/lists/lst_abc123 \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated List Name"}'
```

## Notes

- Requires ownership of the list or write share permission.
- At least one field (`name` or `description`) must be provided.
