# Get Source Types

Retrieve the list of distinct source types across creators, along with the count of creators for each type.

## Endpoint

`GET /v1/creators/sources`

## Authentication

Required. Team-scoped — counts reflect only creators assigned to the authenticated user's team.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

## Response

### Success (200)

```json
{
  "sources": [
    {
      "source_type": "linkedin",
      "count": 85
    },
    {
      "source_type": "manual",
      "count": 32
    },
    {
      "source_type": "csv_import",
      "count": 18
    }
  ]
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | User does not belong to a team |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/sources" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Use the returned `source_type` values as filter values for the `source_type` query parameter on `GET /v1/creators`.
- Only source types with at least one creator are included in the response.
