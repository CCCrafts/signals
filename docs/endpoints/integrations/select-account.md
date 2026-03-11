# Select LinkedIn Account

Select which connected LinkedIn account to use for actions (reactions, comments).

## Endpoint

`POST /v1/integrations/linkedin/select-account`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field      | Type   | Required | Description                                          |
|------------|--------|----------|------------------------------------------------------|
| platformId | string | Yes      | The LinkedIn platform ID to select (must start with `linkedin-`) |

```json
{
  "platformId": "linkedin-abc123"
}
```

## Response

### Success

```json
{
  "success": true,
  "selectedPlatformId": "linkedin-abc123"
}
```

### Errors

| Code | Error                                          |
|------|------------------------------------------------|
| 400  | platformId is required                         |
| 400  | platformId must start with 'linkedin-'         |
| 401  | Missing or invalid API key                     |
| 404  | Account not found in available accounts        |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/integrations/linkedin/select-account" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"platformId": "linkedin-abc123"}'
```

## Notes

- The `platformId` must correspond to an account listed in the `availableAccounts` from the status endpoint.
- The selected account is used for all subsequent LinkedIn actions (reactions, comments) unless overridden with `connectionUserId`.
- The `platformId` must start with `linkedin-`.
