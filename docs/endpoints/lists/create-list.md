# Create List

Create a new list.

## Endpoint

`POST /v1/lists`

## Authentication

Required. `X-API-Key` header.

## Request

### Body

| Field       | Type   | Required | Description                          |
|-------------|--------|----------|--------------------------------------|
| name        | string | Yes      | List name (1-100 characters)         |
| description | string | No       | List description (max 500 characters) |

```json
{
  "name": "Top Tech Creators",
  "description": "Leading voices in tech"
}
```

## Response

### Success (201 Created)

```json
{
  "id": "lst_abc123",
  "name": "Top Tech Creators",
  "description": "Leading voices in tech",
  "member_count": 0,
  "created_at": "2026-03-10T12:00:00Z",
  "updated_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. Name is required and must be 1-100 characters. Description must be max 500 characters. |
| 401  | Unauthorized. Missing or invalid API key. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "Top Tech Creators", "description": "Leading voices in tech"}'
```

## Notes

- The authenticated user becomes the owner of the created list.
- Lists are created with zero members. Use the add members endpoint to populate the list.
