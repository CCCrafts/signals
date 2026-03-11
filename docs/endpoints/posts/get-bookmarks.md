# Get Bookmarks

Retrieve the list of post IDs bookmarked by the authenticated user.

## Endpoint

`GET /v1/posts/bookmarks`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Returns bookmarks for the authenticated user only.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

## Response

### Success

`200 OK`

```json
{
  "data": [1001, 1042, 1187, 1203, 1455]
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/posts/bookmarks" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Returns an array of post IDs, not full post objects. Use the [List Posts](list-posts.md) or [Get Post](get-post.md) endpoints to retrieve post details.
- Bookmarks are user-scoped: each user has their own bookmark list.
- Maximum of 1000 bookmarked post IDs are returned.
- Use the [Toggle Bookmark](toggle-bookmark.md) endpoint to add or remove bookmarks.
