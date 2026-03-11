# Send LinkedIn Comment

Post a comment on a LinkedIn post using the connected LinkedIn account via Publora API.

## Endpoint

`POST /v1/integrations/linkedin/comment`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field            | Type   | Required | Description                                      |
|------------------|--------|----------|--------------------------------------------------|
| postId           | string | Yes      | LinkedIn post ID                                 |
| message          | string | Yes      | Comment text (1-1,250 characters)                |
| connectionUserId | string | No       | Specific LinkedIn account to use (platformId)    |

```json
{
  "postId": "urn:li:activity:7654321098765",
  "message": "Great insights on the future of AI in healthcare!"
}
```

## Response

### Success

```json
{
  "commentId": "urn:li:comment:(activity:7654321098765,7654321098766)"
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | postId and message are required          |
| 400  | Message must be 1-1,250 characters       |
| 401  | Missing or invalid API key               |
| 404  | No connected LinkedIn account            |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/integrations/linkedin/comment" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"postId": "urn:li:activity:7654321098765", "message": "Great insights!"}'
```

## Notes

- Uses the currently selected LinkedIn account unless `connectionUserId` is specified.
- Maximum comment length is 1,250 characters (LinkedIn's limit).
- Comments are posted via the Publora API.
