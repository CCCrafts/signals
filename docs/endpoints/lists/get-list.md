# Get List

Retrieve a specific list with its paginated members (creators).

## Endpoint

`GET /v1/lists/:id`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

### Query Parameters

| Parameter | Type   | Default | Description                        |
|-----------|--------|---------|------------------------------------|
| page      | number | 1       | Page number for member pagination  |
| limit     | number | 20      | Number of members per page (max 100) |

## Response

### Success

```json
{
  "id": "lst_abc123",
  "name": "Top Tech Creators",
  "description": "Leading voices in tech",
  "member_count": 42,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-02-20T14:00:00Z",
  "members": [
    {
      "id": "crt_001",
      "name": "Jane Smith",
      "linkedin_url": "https://linkedin.com/in/janesmith",
      "headline": "VP Engineering at Acme",
      "added_at": "2026-02-01T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "total_pages": 3
  }
}
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |
| 403  | Forbidden. No access to this list. |
| 404  | List not found. |

## Example

```bash
curl "https://api.signals.actor/v1/lists/lst_abc123?page=1&limit=20" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Members are scoped to the authenticated user's team. Only creators accessible to the team are returned.
- The user must be the owner of the list or have it shared with them to access it.
