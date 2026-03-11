# Delete Post

Delete a post. This action is restricted to admin users only.

## Endpoint

`DELETE /v1/posts/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Only admin users can delete posts.

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
  "message": "Post deleted successfully"
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Only admin users can delete posts |
| 404 | Not Found | Post does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/posts/1001" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- This endpoint is restricted to admin users. Non-admin users receive a `403 Forbidden` error.
- Deletion is permanent and cannot be undone.
- Associated bookmarks for the deleted post are also removed.
