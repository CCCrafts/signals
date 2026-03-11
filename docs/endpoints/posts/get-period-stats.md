# Get Period Stats

Retrieve post statistics for a given date range, including total posts, personal posts, and reposts.

## Endpoint

`GET /v1/posts/stats/period`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Stats are computed from posts by creators belonging to your team.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date_from | integer | Yes | Start of period as Unix timestamp (seconds) |
| date_to | integer | Yes | End of period as Unix timestamp (seconds) |
| list_id | integer | No | Filter by creator list ID |

## Response

### Success

`200 OK`

```json
{
  "data": {
    "total_posts": 245,
    "personal_posts": 198,
    "reposts": 47
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Missing or invalid `date_from` / `date_to` parameters |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/posts/stats/period?date_from=1709251200&date_to=1709856000&list_id=5" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only posts from creators belonging to your team are counted.
- The `date_from` and `date_to` parameters must be Unix timestamps in seconds.
- `personal_posts` are original posts; `reposts` are shared/reposted content. Together they equal `total_posts`.
- Use the optional `list_id` parameter to narrow stats to a specific creator list.
