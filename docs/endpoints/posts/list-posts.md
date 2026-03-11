# List Posts

Retrieve a paginated list of posts with creator information. Results are scoped to creators belonging to the authenticated user's team.

## Endpoint

`GET /v1/posts`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are filtered to posts from creators belonging to your team.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 20 | Results per page |
| search | string | — | Search within post text |
| creator_id | integer | — | Filter by creator ID |
| platform | string | — | Filter by platform (e.g., `linkedin`) |
| min_engagement | number | — | Minimum engagement score |
| list_id | integer | — | Filter by creator list ID |
| ai_tag | string | — | Filter by AI-generated tag |
| sort | string | `posted_at` | Sort field: `engagement`, `likes`, `posted_at`, `created_at` |
| order | string | `desc` | Sort order: `asc` or `desc` |

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
      "likes": 342,
      "comments": 58,
      "reposts": 27,
      "engagement": 427,
      "posted_at": "2026-03-08T14:20:00Z",
      "created_at": "2026-03-08T15:00:00Z",
      "creator": {
        "id": 101,
        "name": "Jane Smith",
        "linkedin_url": "https://linkedin.com/in/janesmith"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 520,
    "total_pages": 26
  }
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
curl -X GET "https://api.signals.actor/v1/posts?page=1&limit=10&creator_id=101&sort=engagement&order=desc" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only posts from creators belonging to your team are returned.
- The `text_preview` field is a truncated version of the full post text. Use the [Get Post](get-post.md) endpoint for the complete text.
- The `engagement` field is the sum of likes, comments, and reposts.
- Multiple filters can be combined (e.g., `creator_id` + `min_engagement` + `ai_tag`).
