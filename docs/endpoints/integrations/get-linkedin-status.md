# Get LinkedIn Integration Status

Check the current LinkedIn integration connection status, including available accounts and active connections.

## Endpoint

`GET /v1/integrations/linkedin/status`

## Authentication

Required. Team-scoped.

## Request

No query parameters.

## Response

### Success

```json
{
  "status": "connected",
  "selectedPlatformId": "linkedin-abc123",
  "displayName": "Jane Smith",
  "connections": [
    {
      "platformId": "linkedin-abc123",
      "displayName": "Jane Smith",
      "status": "connected",
      "expiresAt": "2026-06-15T00:00:00Z"
    }
  ],
  "availableAccounts": [
    {
      "platformId": "linkedin-abc123",
      "displayName": "Jane Smith",
      "status": "connected"
    },
    {
      "platformId": "linkedin-def456",
      "displayName": "John Doe",
      "status": "expired"
    }
  ]
}
```

### Status Values

| Status              | Description                                      |
|---------------------|--------------------------------------------------|
| not_connected       | No LinkedIn account connected                    |
| connected           | Active connection                                |
| expiring_soon       | Connection will expire soon, renewal recommended |
| expired             | Connection has expired, re-authentication needed |
| needs_personal_key  | Personal API key required                        |

### Errors

| Code | Error                      |
|------|----------------------------|
| 401  | Missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/integrations/linkedin/status" \
  -H "X-API-Key: your-api-key"
```

## Notes

- LinkedIn accounts are shared across the team.
- The `selectedPlatformId` indicates which account is currently active for actions (reactions, comments).
- The `availableAccounts` list shows all LinkedIn accounts connected by any team member.
