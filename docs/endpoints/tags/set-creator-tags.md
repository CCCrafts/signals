# Set Creator Tags

Replace all writable tags for a specific creator with a new set of tags.

## Endpoint

`POST /v1/tags/creators/:creatorId`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description    |
|-----------|--------|----------|----------------|
| creatorId | string | Yes      | The creator ID |

### Body

| Field   | Type     | Required | Description                           |
|---------|----------|----------|---------------------------------------|
| tag_ids | string[] | Yes      | Array of tag IDs to assign (max 50)   |

```json
{
  "tag_ids": ["tag_abc123", "tag_def456"]
}
```

## Response

### Success

```json
[
  {
    "id": "tag_abc123",
    "name": "VIP",
    "color": "#FF5733",
    "is_owner": true
  },
  {
    "id": "tag_def456",
    "name": "Outreach",
    "color": "#2ECC71",
    "is_owner": false
  }
]
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `tag_ids` must be an array of up to 50 strings. |
| 401  | Unauthorized. Missing or invalid API key. |
| 404  | Creator not found. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/tags/creators/crt_001 \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"tag_ids": ["tag_abc123", "tag_def456"]}'
```

## Notes

- This is a **replace** operation for writable tags only. All tags the user has write access to are removed from the creator, then the specified tags are applied.
- Tags the user has read-only access to are not affected.
- Pass an empty array to remove all writable tags from the creator.
- Returns the complete updated list of tags for the creator.
- Maximum of 50 tag IDs per request.
