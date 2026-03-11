# Get Creator Stats

Retrieve detailed statistics about creators, including breakdowns by source, region, and top performers.

## Endpoint

`GET /v1/stats/creators`

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
  "bySource": [
    { "source": "linkedin", "count": 820 },
    { "source": "youtube", "count": 310 },
    { "source": "twitter", "count": 120 }
  ],
  "topByFollowers": [
    {
      "id": "creator_abc123",
      "name": "Jane Smith",
      "followers": 250000,
      "source": "linkedin"
    }
  ],
  "topByEngagement": [
    {
      "id": "creator_def456",
      "name": "John Doe",
      "engagement": 48500,
      "source": "youtube"
    }
  ],
  "byRegion": [
    { "region": "North America", "count": 540 },
    { "region": "Europe", "count": 380 },
    { "region": "Asia", "count": 210 }
  ]
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/stats/creators" \
  -H "X-API-Key: your-api-key"
```

## Notes

- All results are team-scoped -- only creators belonging to the authenticated user's team are included.
- `topByFollowers` and `topByEngagement` each return the top 10 creators.
- `bySource` breaks down creator counts by their originating platform.
- `byRegion` groups creators by their geographic region.
