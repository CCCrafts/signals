# Get Engagers (inbound)

People who engaged with this creator's posts, ranked by warmth (`times_seen` desc, recency).

## Endpoint

`GET /v1/creators/:id/engagers`

## Authentication

Required. `X-API-Key`. Your team must hold an audience subscription for the creator
(created by an inbound [scan](./request-scan) or [subscribe](./subscribe)); otherwise
`404` with a hint. Partner keys allowed.

## Query parameters

| Param | Type | Notes |
| --- | --- | --- |
| `page` | int | default 1 |
| `limit` | int | default 50, max 100 |
| `action_type` | `reaction` \| `comment` | filter |
| `since` | unix seconds | only edges seen after |

## Response

```json
{
  "success": true,
  "data": [{
    "id": "uuid", "name": "Jane Doe", "headline": "…", "company": "…",
    "linkedin_url": "…", "linkedin_username": "janedoe", "profile_photo": "…",
    "enriched": false,
    "engagements": 5, "reactions": 3, "comments": 2, "times_seen": 8,
    "first_seen_at": "2026-07-30T…", "last_seen_at": "2026-07-31T…"
  }],
  "meta": { "page": 1, "limit": 50, "total": 158 }
}
```
