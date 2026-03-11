# List Companies

Retrieve a paginated list of companies. Results are scoped to creators associated with the authenticated user's team.

## Endpoint

`GET /v1/companies`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are filtered to companies linked to creators belonging to your team.

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
| search | string | — | Search by company name |
| industry | string | — | Filter by industry |
| country | string | — | Filter by country |
| sort | string | `name` | Sort field: `employee_count`, `name`, `created_at` |
| order | string | `asc` | Sort order: `asc` or `desc` |

## Response

### Success

`200 OK`

```json
{
  "data": [
    {
      "id": 42,
      "name": "Acme Corp",
      "domain": "acme.com",
      "linkedin_url": "https://linkedin.com/company/acme",
      "industry": "Technology",
      "country": "United States",
      "employee_count": 1500,
      "total_followers": 25000,
      "avg_engagement_rate": 3.45,
      "description": "Leading provider of innovative solutions",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 85,
    "total_pages": 5
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
curl -X GET "https://api.signals.actor/v1/companies?page=1&limit=10&search=acme&sort=employee_count&order=desc" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only companies linked to creators belonging to your team are returned.
- `total_followers` and `avg_engagement_rate` are aggregated from the company's linked creators.
- The `search` parameter performs a case-insensitive partial match on company name.
