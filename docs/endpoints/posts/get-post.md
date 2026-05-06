# Get Post

Retrieve a single post by ID, including the full post text and creator information.

## Endpoint

`GET /v1/posts/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. The post's creator must belong to your team (admin keys see everything).

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | uuid | Post ID |

## Response

### Success

`200 OK`

```json
{
  "success": true,
  "data": {
    "id": "0a1b2c3d-...",
    "creator_id": "ff66...",
    "platform": "linkedin",
    "text": "Excited to announce our latest product launch. After months of hard work, our team has built something truly special that will transform how companies approach creator analytics...",
    "text_preview": "Excited to announce our latest product launch...",
    "engagement": 462,
    "likes": 412,
    "comments": 38,
    "reposts": 12,
    "posted_at": 1746489600,
    "created_at": 1746489650,
    "is_repost": 0,
    "linkedin_url": "https://www.linkedin.com/posts/...",
    "linkedin_urn": "urn:li:activity:...",
    "virality_tier_overall": "viral",
    "virality_tier_likes": "strong",
    "virality_tier_comments": "above_average",
    "virality_tier_reposts": null,
    "virality_checked_at": 1746500000,
    "virality_status": "analyzed",
    "creator_name": "Jane Doe",
    "creator_linkedin": "https://www.linkedin.com/in/janedoe",
    "creator_photo": "https://...",
    "creator_ai_tags": "[\"AI\",\"Marketing\"]",
    "creator_company": "Acme",
    "creator_country": "US",
    "creator_location": "San Francisco, California, United States"
  }
}
```

### Field notes

- `text`: full post body. **Only** the single-post endpoint returns this field; the list endpoint returns only `text_preview`.
- `text_preview`: truncated body, included for convenience and parity with the list response.
- `creator_ai_tags`: JSON-encoded string array. Parse with `JSON.parse()`.
- `virality_status`: `'analyzed'` or `'pending'`. When `pending`, all `virality_tier_*` fields are `null` (no analysis run yet). When `analyzed`, `null` on a tier means the post fell below threshold for that dimension.
- `creator_country` / `creator_location`: country code/name and free-text location string from the creator record.
- The envelope is `{ success: true, data: {...} }` with no `meta` object.

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key. |
| 403 | Forbidden | Post not accessible to your team. |
| 404 | Not Found | Post does not exist or its creator is not on your team. |
| 429 | Too Many Requests | Rate limit exceeded (1000 req/hr/key). |
| 500 | Internal Server Error | Server error. |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/posts/0a1b2c3d-..." \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Unlike [`GET /v1/posts`](list-posts.md), this endpoint returns the full `text` field in addition to `text_preview`.
- All other fields match the list-endpoint shape exactly (flat `creator_*` fields, no nested `creator: {...}` object).
- Results are team-scoped: the post's creator must belong to your team.
