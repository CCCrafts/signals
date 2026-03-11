# Get Industries

Retrieve a list of unique industries with the number of companies in each. Results are scoped to the authenticated user's team.

## Endpoint

`GET /v1/companies/industries`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Results are filtered to companies linked to creators belonging to your team.

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
  "data": [
    {
      "industry": "Technology",
      "count": 42
    },
    {
      "industry": "Healthcare",
      "count": 18
    },
    {
      "industry": "Finance",
      "count": 12
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
curl -X GET "https://api.signals.actor/v1/companies/industries" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- Results are team-scoped: only industries from companies linked to your team's creators are included.
- Companies with a `NULL` or empty industry value are excluded from the results.
- Useful for populating filter dropdowns in the UI.
