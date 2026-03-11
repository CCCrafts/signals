# List Leads

Retrieve a paginated list of leads with optional filtering and sorting.

## Endpoint

`GET /v1/leads`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 20 | Results per page |
| search | string | — | Search leads by name or company |
| qualified | boolean | — | Filter by qualification status |
| signal_name | string | — | Filter by signal name |
| min_score | number | — | Minimum score threshold (0-10) |
| company | string | — | Filter by company name |
| sort | string | score | Sort field: `score`, `created_at`, `lead_created`, `name` |
| order | string | desc | Sort order: `asc`, `desc` |

## Response

### Success (200 OK)

```json
{
  "leads": [
    {
      "id": "lead_abc123",
      "name": "Jane Smith",
      "company": "Acme Corp",
      "score": 8.5,
      "qualified": true,
      "qualification_tags": ["high-intent", "enterprise"],
      "persona": "VP of Engineering",
      "signal_name": "hiring-surge",
      "is_exported": false,
      "created_at": "2026-03-01T12:00:00Z",
      "updated_at": "2026-03-05T09:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/leads?qualified=true&min_score=7&sort=score&order=desc&limit=10" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Results are paginated; use `page` and `limit` to navigate.
- The `search` parameter performs a partial match on lead name and company.
- Combine multiple filters to narrow results (e.g., `qualified=true&min_score=7&company=Acme`).
