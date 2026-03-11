# Get Companies List (Posts)

Retrieve a list of companies with their associated post counts. Useful for filtering posts by company.

## Endpoint

`GET /v1/posts/companies/list`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are scoped to your team's creators.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| search | string | — | Search by company name |
| limit | integer | 50 | Maximum results (max 200) |

## Response

### Success

`200 OK`

```json
{
  "data": [
    {
      "id": 42,
      "name": "Acme Corp",
      "post_count": 156
    },
    {
      "id": 15,
      "name": "TechStart Inc",
      "post_count": 89
    }
  ]
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
curl -X GET "https://api.signals.actor/v1/posts/companies/list?search=acme&limit=20" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only companies linked to creators in your team are returned.
- The `limit` parameter has a maximum value of 200 and defaults to 50.
- The `post_count` reflects the number of posts from creators associated with each company.
- Useful for populating company filter dropdowns in the posts view.
