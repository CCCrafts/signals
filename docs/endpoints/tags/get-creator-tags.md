# Get Creator Tags

Retrieve all tags associated with a specific creator.

## Endpoint

`GET /v1/tags/creators/:creatorId`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description    |
|-----------|--------|----------|----------------|
| creatorId | string | Yes      | The creator ID |

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
| 401  | Unauthorized. Missing or invalid API key. |
| 404  | Creator not found. |

## Example

```bash
curl https://api.signals.actor/v1/tags/creators/crt_001 \
  -H "X-API-Key: your-api-key"
```

## Notes

- Results are scoped to the authenticated user's team. Only tags the user has access to (owned, shared, or team-shared) are returned.
- `is_owner` indicates whether the authenticated user owns each tag.
