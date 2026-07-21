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
| limit     | number | 20      | Number of members per page (max 100) |
| page      | number | 1       | Page number for member pagination  |
| offset    | number | —       | Row offset for member pagination. Alternative to `page`; when both are supplied, `offset` wins. |

Members are returned in a **stable order** (`added_at` descending, then id), so paginating a large list with `offset`/`page` never duplicates or skips a member — even for bulk-imported lists where many members share the same `added_at`.

To pull an entire list, page with `limit=100` until you have `meta.total` members:

```
GET /v1/lists/{id}?offset=0&limit=100
GET /v1/lists/{id}?offset=100&limit=100
...
```

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
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3
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
# page-based
curl "https://api.signals.actor/v1/lists/lst_abc123?page=1&limit=100" \
  -H "X-API-Key: your-api-key"

# offset-based (equivalent to page=2)
curl "https://api.signals.actor/v1/lists/lst_abc123?offset=100&limit=100" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Members are scoped to the authenticated user's team. Only creators accessible to the team are returned.
- The user must be the owner of the list or have it shared with them to access it.
