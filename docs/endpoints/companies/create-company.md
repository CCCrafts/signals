# Create Company

Create a new company record.

## Endpoint

`POST /v1/companies`

## Authentication

Required. Pass your API key via the `X-API-Key` header.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |
| Content-Type | Yes | `application/json` |

### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Company name (must be unique) |
| domain | string | No | Company domain |
| linkedin_url | string | No | LinkedIn company page URL |
| website | string | No | Company website URL |
| industry | string | No | Industry classification |
| country | string | No | Country |
| description | string | No | Company description |

```json
{
  "name": "Acme Corp",
  "domain": "acme.com",
  "linkedin_url": "https://linkedin.com/company/acme",
  "website": "https://acme.com",
  "industry": "Technology",
  "country": "United States",
  "description": "Leading provider of innovative solutions"
}
```

## Response

### Success

`201 Created`

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
    "description": "Leading provider of innovative solutions",
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Missing required `name` field or company name already exists |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Insufficient permissions |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/companies" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "domain": "acme.com",
    "industry": "Technology",
    "country": "United States"
  }'
```

## Notes

- The `name` field must be unique. A `400` error is returned if a company with the same name already exists.
- Use the [Get Company Fields](get-fields.md) endpoint to discover all editable fields.
