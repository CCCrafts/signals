# Get AI Tags

Retrieve the list of AI-generated tags across creators, along with the count of creators for each tag.

## Endpoint

`GET /v1/creators/ai-tags`

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
  "tags": [
    {
      "ai_tag": "thought-leader",
      "count": 45
    },
    {
      "ai_tag": "b2b-marketing",
      "count": 30
    },
    {
      "ai_tag": "startup-founder",
      "count": 22
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
curl -X GET "https://api.signals.actor/v1/creators/ai-tags" \
  -H "X-API-Key: your-api-key"
```

## Notes

- AI tags are generated automatically during the AI enrichment process.
- Use the returned `ai_tag` values as filter values for the `ai_tag` query parameter on `GET /v1/creators`.
- Only tags with at least one creator are included in the response.
- AI enrichment costs 1 credit per creator (action: `ai_enrichment`).
