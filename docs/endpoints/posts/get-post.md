# Get Post

Retrieve a single post by ID, including the full post text and creator information.

## Endpoint

`GET /v1/posts/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. The post must belong to a creator in your team.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Post ID |

## Response

### Success

`200 OK`

```json
{
  "data": {
    "id": 1001,
    "creator_id": 101,
    "platform": "linkedin",
    "text": "Excited to announce our latest product launch. After months of hard work, our team has built something truly special that will transform how companies approach creator analytics...",
    "likes": 342,
    "comments": 58,
    "reposts": 27,
    "engagement": 427,
    "posted_at": "2026-03-08T14:20:00Z",
    "created_at": "2026-03-08T15:00:00Z",
    "creator": {
      "id": 101,
      "name": "Jane Smith",
      "linkedin_url": "https://linkedin.com/in/janesmith",
      "headline": "VP of Engineering at Acme Corp"
    }
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Post not accessible to your team |
| 404 | Not Found | Post does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/posts/1001" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Unlike the list endpoint, this returns the full `text` field rather than a truncated `text_preview`.
- Results are team-scoped: the post's creator must belong to your team.
