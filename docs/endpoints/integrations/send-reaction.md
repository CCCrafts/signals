# Send LinkedIn Reaction

React to a LinkedIn post using the connected LinkedIn account via Publora API.

## Endpoint

`POST /v1/integrations/linkedin/react`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field            | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| postId           | string | Yes      | LinkedIn post ID                                 |
| reactionType     | string | Yes      | Reaction type (see values below)                 |
| connectionUserId | string | No       | Specific LinkedIn account to use (platformId)    |

### Reaction Types

`LIKE`, `PRAISE`, `EMPATHY`, `INTEREST`, `APPRECIATION`, `ENTERTAINMENT`

```json
{
  "postId": "urn:li:activity:7654321098765",
  "reactionType": "LIKE"
}
```

## Response

### Success

```json
{
  "success": true
}
```

### Errors

| Code | Error                              |
|------|------------------------------------|
| 400  | postId and reactionType are required |
| 400  | Invalid reactionType               |
| 401  | Missing or invalid API key         |
| 403  | Post does not belong to team       |
| 404  | No connected LinkedIn account      |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/integrations/linkedin/react" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"postId": "urn:li:activity:7654321098765", "reactionType": "LIKE"}'
```

## Notes

- Uses the currently selected LinkedIn account unless `connectionUserId` is specified.
- The post must belong to a creator within the team's scope.
- Reactions are sent via the Publora API.
