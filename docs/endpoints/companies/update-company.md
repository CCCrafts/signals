# Update Company

Update an existing company's editable fields.

## Endpoint

`PUT /v1/companies/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Only admins or the user who originally created the company can perform updates.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |
| Content-Type | Yes | `application/json` |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Company ID |

### Body

Include only the fields you want to update. All fields are optional.

| Field | Type | Description |
|-------|------|-------------|
| name | string | Company name |
| domain | string | Company domain |
| linkedin_url | string | LinkedIn company page URL |
| website | string | Company website URL |
| industry | string | Industry classification |
| country | string | Country |
| description | string | Company description |

```json
{
  "industry": "Software",
  "description": "Updated company description"
}
```

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
    "industry": "Software",
    "country": "United States",
    "description": "Updated company description",
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Invalid field values |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Only admins or the original creator can update |
| 404 | Not Found | Company does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/companies/42" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "Software",
    "description": "Updated company description"
  }'
```

## Notes

- Only editable fields can be updated. See the [Get Company Fields](get-fields.md) endpoint for the list of editable fields.
- Only admins or the user who originally created the company record can perform updates. Other users receive a `403` error.
- Partial updates are supported: include only the fields you want to change.
