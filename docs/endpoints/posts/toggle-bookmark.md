# Toggle Bookmark

Toggle a bookmark on or off for a specific post. If the post is not bookmarked, it will be added; if already bookmarked, it will be removed.

## Endpoint

`POST /v1/posts/:id/bookmark`

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
  "bookmarked": true
}
```

Or, if the bookmark was removed:

```json
{
  "bookmarked": false
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
curl -X POST "https://api.signals.actor/v1/posts/1001/bookmark" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- This endpoint acts as a toggle: calling it on an already-bookmarked post removes the bookmark.
- Bookmarks are user-scoped: each user manages their own bookmarks independently.
- The post must belong to a creator in your team (team-scoped access).
- No request body is needed.
