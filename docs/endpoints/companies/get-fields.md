# Get Company Fields

Retrieve metadata about company fields, including which fields are editable and which are read-only.

## Endpoint

`GET /v1/companies/fields`

## Authentication

Required. Pass your API key via the `X-API-Key` header.

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
  "editable": [
    {
      "field": "name",
      "type": "string",
      "required": true,
      "description": "Company name"
    },
    {
      "field": "domain",
      "type": "string",
      "required": false,
      "description": "Company domain"
    },
    {
      "field": "linkedin_url",
      "type": "string",
      "required": false,
      "description": "LinkedIn company page URL"
    },
    {
      "field": "website",
      "type": "string",
      "required": false,
      "description": "Company website URL"
    },
    {
      "field": "industry",
      "type": "string",
      "required": false,
      "description": "Industry classification"
    },
    {
      "field": "description",
      "type": "string",
      "required": false,
      "description": "Company description"
    }
  ],
  "readonly": [
    {
      "field": "id",
      "type": "integer",
      "description": "Company ID"
    },
    {
      "field": "employee_count",
      "type": "integer",
      "description": "Number of employees"
    },
    {
      "field": "total_followers",
      "type": "integer",
      "description": "Aggregated follower count from linked creators"
    },
    {
      "field": "avg_engagement_rate",
      "type": "number",
      "description": "Average engagement rate across linked creators"
    },
    {
      "field": "created_at",
      "type": "string",
      "description": "ISO 8601 creation timestamp"
    }
  ]
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/companies/fields" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Use this endpoint to discover which fields can be set when creating or updating a company.
- Read-only fields are computed or system-managed and cannot be modified directly.
