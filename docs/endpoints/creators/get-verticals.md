# Get Verticals

Retrieve the list of industry verticals across creators, along with the count of creators for each vertical.

## Endpoint

`GET /v1/creators/verticals`

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
  "verticals": [
    {
      "vertical": "Marketing",
      "count": 60
    },
    {
      "vertical": "Technology",
      "count": 45
    },
    {
      "vertical": "Finance",
      "count": 20
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
curl -X GET "https://api.signals.actor/v1/creators/verticals" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Use the returned `vertical` values as filter values for the `vertical` query parameter on `GET /v1/creators`.
- Only verticals with at least one creator are included in the response.
