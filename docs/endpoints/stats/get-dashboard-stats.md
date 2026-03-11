# Get Dashboard Stats

Retrieve high-level dashboard statistics. Some fields are admin-only; creator and post counts are team-scoped.

## Endpoint

`GET /v1/stats`

## Authentication

Required. `X-API-Key` header. Available to **all authenticated users** (some fields admin-only).

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key |

## Response

### Success (200 OK)

```json
{
  "creators": 1250,
  "posts": 45320,
  "leads": 842,
  "qualifiedLeads": 215,
  "signals": 12,
  "companies": 378,
  "totalFollowers": 8750000,
  "totalEngagement": 2340000
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/stats" \
  -H "X-API-Key: your-api-key"
```

## Notes

- The `creators` and `posts` counts are team-scoped -- they reflect only creators and posts belonging to the authenticated user's team.
- The `leads`, `qualifiedLeads`, and `companies` fields are only included for admin users. Non-admin responses omit these fields.
- `totalFollowers` and `totalEngagement` are aggregated across all creators visible to the user.
