# Delete Company

Delete a company record. The company must not have any linked creators.

## Endpoint

`DELETE /v1/companies/:id`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Only admins or the user who originally created the company can delete it.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | integer | Company ID |

## Response

### Success

`200 OK`

```json
{
  "message": "Company deleted successfully"
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Company has linked creators and cannot be deleted |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Only admins or the original creator can delete |
| 404 | Not Found | Company does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X DELETE "https://api.signals.actor/v1/companies/42" \
  -H "X-API-Key: YOUR_API_KEY"
```

## Notes

- A company cannot be deleted if it has linked creators. Remove all creator associations first, then delete the company.
- Only admins or the user who originally created the company record can perform deletions. Other users receive a `403` error.
