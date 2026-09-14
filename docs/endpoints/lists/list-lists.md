# List Lists

Retrieve all lists accessible to the authenticated user, grouped by ownership and shared access.

## Endpoint

`GET /v1/lists`

## Authentication

Required. Pass your API key via the `X-API-Key` header.

## Request

No parameters required.

## Response

### Success

`200 OK`

```json
{
  "success": true,
  "data": {
    "owned": [
      {
        "id": "lst_abc123",
        "name": "Top Tech Creators",
        "description": "Leading voices in tech",
        "user_id": "usr_owner",
        "member_count": "42",
        "is_owner": 1,
        "created_at": 1737020400,
        "updated_at": 1740060000
      }
    ],
    "shared": [
      {
        "id": "lst_def456",
        "name": "Marketing Leads",
        "description": null,
        "user_id": "usr_xyz789",
        "member_count": "18",
        "is_owner": 0,
        "permission": "read",
        "shared_by": "usr_xyz789",
        "shared_by_name": "Alex Sharer",
        "created_at": 1736582400,
        "updated_at": 1739880000
      }
    ]
  }
}
```

### Canonical fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | string (uuid) | List id. |
| `name` | string | |
| `description` | string \| null | |
| `user_id` | string (uuid) | Owner. |
| `created_at` | number | Unix seconds. |
| `updated_at` | number | Unix seconds. |
| `member_count` | **string** | Count of creators in the list. **String-encoded** for legacy reasons; parse with `parseInt(...)`. |
| `is_owner` | `0` \| `1` | |
| `shared_by` | string \| null | Owner user id (only on entries in `shared`). |
| `shared_by_name` | string \| null | |
| `permission` | `'read'` \| `'write'` \| null | Only on entries in `shared`. |

> **`member_count` is the canonical field.** There is no `itemCount` field. Earlier consumer documentation may have referenced `itemCount` — it never existed in the API. Use `member_count` (and remember to `parseInt` it).

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key. |
| 429 | Too Many Requests | Rate limit exceeded (1000 req/hr/key). |
| 500 | Internal Server Error | Server error. |

## Example

```bash
curl https://api.signals.actor/v1/lists \
  -H "X-API-Key: your-api-key"
```

## Notes

- `owned` contains lists created by the authenticated user.
- `shared` contains lists shared with the user by others, including a `permission` field (`read` or `write`) and `shared_by` / `shared_by_name`.
- `member_count` is **string-encoded** — apply `parseInt()` before doing arithmetic on it.
- The envelope is `{ success: true, data: { owned, shared } }`.

## Partner member lists

`GET /v1/partner/teams/:id/members/:mid/lists` uses `X-Partner-Key: pk_...`
and returns the specified active member's `owned` and `shared` lists. The
partner must own the active team. Owned lists are ordered by update time;
shared lists by sharing time, newest first.

| Query parameter | Values | Default | Description |
| --- | --- | --- | --- |
| `include_readiness` | `true`, `false`, `1`, `0` | `true` | Include profile/post processing summaries. Set `false` for quota checks or list selectors that only need metadata and counts. |

```bash
curl -H "X-Partner-Key: pk_..." \
  "https://api.signals.actor/v1/partner/teams/team-id/members/member-id/lists?include_readiness=false"
```

With `false` or `0`, each list still contains its exact, string-encoded
`member_count`, but has no `readiness` field. This mode does not inspect
profile or post queues. With the default `true`, `readiness` contains `total`,
`ready`, `processing`, `failed`, `no_posts`, `not_tracked`, `queued`,
`profile_loading`, `posts_loading`, and `ready_percent`. Readiness describes
the team's accessible profiles; `member_count` counts all list members.

The response also includes `meta.team_id` and `meta.member_id`. Invalid flag
values return `400`; an inactive team returns `403`; an inaccessible team or
missing/inactive member returns `404`.
