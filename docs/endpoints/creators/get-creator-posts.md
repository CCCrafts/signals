# Get Creator Posts

Retrieve a paginated list of posts for a specific creator.

## Endpoint

`GET /v1/creators/:id/posts`

## Authentication

Required. Team-scoped — the creator must be assigned to the authenticated user's team.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Creator ID |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number for pagination |
| `limit` | integer | `20` | Number of results per page (max 100) |

## Response

### Success (200)

```json
{
  "posts": [
    {
      "id": "b2c3d4e5-6789-01ab-cdef-234567890abc",
      "creator_id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "content": "Excited to share our latest case study on B2B content marketing...",
      "url": "https://www.linkedin.com/feed/update/urn:li:activity:1234567890",
      "likes": 245,
      "comments": 32,
      "shares": 18,
      "impressions": 12500,
      "posted_at": "2026-03-01T09:15:00Z",
      "scraped_at": "2026-03-01T12:00:00Z"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Creator does not belong to user's team |
| 404 | Not Found | Creator with given ID does not exist |
| 422 | Unprocessable Entity | Invalid query parameters |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/a1b2c3d4-5678-90ab-cdef-1234567890ab/posts?page=1&limit=10" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Posts are returned in reverse chronological order by `posted_at`.
- Post scraping costs 1 credit per post (action: `post_scraped`).
- Posts are scraped automatically for creators with `scrape_posts` enabled.
