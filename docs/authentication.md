# Authentication

All API requests require a valid API key passed in the `X-API-Key` header.

## API Key Format

Keys follow the format `sk_` followed by 32 hexadecimal characters:

```
sk_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

## Making Authenticated Requests

Include the key in every request:

```bash
curl https://api.signals.actor/v1/creators \
  -H "X-API-Key: sk_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"
```

## Roles

### Admin

- Full access to all resources across all teams
- Can manage plans, teams, billing, and system configuration
- No team-scoping restrictions

### Team User

- Sees only creators assigned to their team (via the `team_creators` junction table)
- Lists and tags follow an owner + shared model
- Team scoping is applied automatically by middleware -- no extra parameters needed

## Team Scoping

When a team user authenticates, the middleware resolves their team from the API key and automatically filters all queries. You do not need to pass a team ID; it is derived from the key.

See [Team Scoping](guides/team-scoping.md) for details.

## Usage Tracking

API keys automatically track usage. Each request increments the key's usage counter. You can check your current usage and credit balance via `GET /v1/usage`.

## Error Responses

### 401 -- Missing API Key

```json
{
  "success": false,
  "error": "Missing API key"
}
```

Returned when the `X-API-Key` header is absent.

### 401 -- Invalid API Key

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

Returned when the key does not match any active key in the system.

### 403 -- Admin Required

```json
{
  "success": false,
  "error": "Admin access required"
}
```

Returned when a team user attempts to access an admin-only endpoint (e.g., plan management, system configuration).
