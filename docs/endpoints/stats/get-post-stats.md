# Get Post Stats

Retrieve detailed statistics about posts, including platform breakdowns, top posts, and recent daily activity.

## Endpoint

`GET /v1/stats/posts`

## Authentication

Required. `X-API-Key` header. Available to **all authenticated users**. Results are team-scoped.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key |

## Response

### Success (200 OK)

```json
{
  "byPlatform": [
    { "platform": "linkedin", "count": 28500 },
    { "platform": "youtube", "count": 12400 },
    { "platform": "twitter", "count": 4420 }
  ],
  "topPosts": [
    {
      "id": "post_abc123",
      "creator_name": "Jane Smith",
      "platform": "linkedin",
      "engagement": 15200,
      "published_at": "2026-03-05T10:00:00Z"
    }
  ],
  "recentActivity": [
    { "date": "2026-03-10", "count": 145 },
    { "date": "2026-03-09", "count": 132 },
    { "date": "2026-03-08", "count": 98 }
  ]
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/stats/posts" \
  -H "X-API-Key: your-api-key"
```

## Notes

- All results are team-scoped -- only posts from creators belonging to the authenticated user's team are included.
- `topPosts` returns the top 10 posts by engagement.
- `recentActivity` provides daily post counts for the last 30 days, sorted by date descending.
- `byPlatform` breaks down total post counts by originating platform.
