# Get Company Creators

Retrieve a paginated list of creators associated with a specific company.

## Endpoint

`GET /v1/companies/:id/creators`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are scoped to creators belonging to your team.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Company ID |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 20 | Results per page |

## Response

### Success

`200 OK`

```json
{
  "data": [
    {
      "id": 101,
      "name": "Jane Smith",
      "linkedin_url": "https://linkedin.com/in/janesmith",
      "headline": "VP of Engineering at Acme Corp",
      "follower_count": 5000,
      "engagement_rate": 4.2
    },
    {
      "id": 102,
      "name": "John Doe",
      "linkedin_url": "https://linkedin.com/in/johndoe",
      "headline": "Senior Developer at Acme Corp",
      "follower_count": 1200,
      "engagement_rate": 2.8
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2,
    "total_pages": 1
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Company not accessible to your team |
| 404 | Not Found | Company does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/companies/42/creators?page=1&limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only creators that belong to your team and are linked to this company are returned.
- This endpoint returns the same data as the `employees` field in the Get Company response, but as a standalone paginated resource.
