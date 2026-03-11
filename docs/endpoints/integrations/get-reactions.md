# Get LinkedIn Reactions

Retrieve the current user's reactions on a set of LinkedIn posts.

## Endpoint

`GET /v1/integrations/linkedin/reactions`

## Authentication

Required. Team-scoped.

## Request

### Query Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| post_ids  | string | Yes      | Comma-separated list of post IDs (max 50)      |

## Response

### Success

```json
{
  "urn:li:activity:7654321098765": "LIKE",
  "urn:li:activity:7654321098766": "PRAISE",
  "urn:li:activity:7654321098767": null
}
```

### Errors

| Code | Error                              |
|------|------------------------------------|
| 400  | post_ids is required               |
| 400  | Maximum 50 post IDs allowed        |
| 401  | Missing or invalid API key         |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/integrations/linkedin/reactions?post_ids=urn:li:activity:7654321098765,urn:li:activity:7654321098766" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns a map of post ID to reaction type.
- Posts with no reaction from the current user return `null`.
- Maximum of 50 post IDs per request.
- Only returns reactions for posts belonging to creators within the team's scope.
