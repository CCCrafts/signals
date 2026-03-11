# Get Company

Retrieve a single company by ID, including aggregated stats and a paginated list of employees (linked creators).

## Endpoint

`GET /v1/companies/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. The company must be linked to a creator belonging to your team.

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
| page | integer | 1 | Page number for employees list |
| limit | integer | 20 | Employees per page |

## Response

### Success

`200 OK`

```json
{
  "data": {
    "id": 42,
    "name": "Acme Corp",
    "domain": "acme.com",
    "linkedin_url": "https://linkedin.com/company/acme",
    "website": "https://acme.com",
    "industry": "Technology",
    "country": "United States",
    "employee_count": 1500,
    "total_followers": 25000,
    "avg_engagement_rate": 3.45,
    "description": "Leading provider of innovative solutions",
    "created_at": "2026-01-15T10:30:00Z",
    "employees": {
      "data": [
        {
          "id": 101,
          "name": "Jane Smith",
          "linkedin_url": "https://linkedin.com/in/janesmith",
          "headline": "VP of Engineering at Acme Corp",
          "follower_count": 5000
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 3,
        "total_pages": 1
      }
    }
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
curl -X GET "https://api.signals.actor/v1/companies/42?page=1&limit=10" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: the company must be linked to at least one creator in your team.
- The `employees` field contains a paginated list of creators associated with the company.
- Use the `page` and `limit` query parameters to paginate through employees.
