# Get Top Engagement Posts

Retrieve the top posts sorted by engagement score.

## Endpoint

`GET /v1/posts/top/engagement`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are scoped to posts from creators belonging to your team.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | integer | 10 | Number of posts to return (max 100) |

## Response

### Success

`200 OK`

```json
{
  "data": [
    {
      "id": 1001,
      "creator_id": 101,
      "platform": "linkedin",
      "text_preview": "Excited to announce our latest product launch...",
      "likes": 1250,
      "comments": 340,
      "reposts": 185,
      "engagement": 1775,
      "posted_at": "2026-03-05T09:15:00Z",
      "creator": {
        "id": 101,
        "name": "Jane Smith",
        "linkedin_url": "https://linkedin.com/in/janesmith"
      }
    },
    {
      "id": 1042,
      "creator_id": 205,
      "platform": "linkedin",
      "text_preview": "Three lessons I learned from scaling a team...",
      "likes": 980,
      "comments": 220,
      "reposts": 150,
      "engagement": 1350,
      "posted_at": "2026-03-06T11:30:00Z",
      "creator": {
        "id": 205,
        "name": "John Doe",
        "linkedin_url": "https://linkedin.com/in/johndoe"
      }
    }
  ]
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/posts/top/engagement?limit=25" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only posts from creators belonging to your team are included.
- The `limit` parameter has a maximum value of 100 and defaults to 10.
- Posts are sorted by total engagement (likes + comments + reposts) in descending order.
