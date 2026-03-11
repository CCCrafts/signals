# Get Virality Stats

Retrieve virality analysis statistics, including breakdowns by tier and engagement type.

## Endpoint

`GET /v1/posts/virality/stats`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Stats are computed from posts by creators belonging to your team.

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
  "data": {
    "total_analyzed": 1500,
    "by_tier": {
      "exceptional": 12,
      "viral": 45,
      "strong": 180,
      "above_average": 420
    },
    "by_type": {
      "likes": 850,
      "comments": 320,
      "reposts": 210,
      "overall": 120
    }
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
curl -X GET "https://api.signals.actor/v1/posts/virality/stats" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only posts from creators belonging to your team are analyzed.
- Virality tiers represent how a post's engagement compares to the creator's typical performance:
  - **exceptional** -- top-tier outlier performance
  - **viral** -- significantly above normal
  - **strong** -- notably above average
  - **above_average** -- moderately above average
- The `by_type` breakdown shows which engagement types triggered virality flags.
