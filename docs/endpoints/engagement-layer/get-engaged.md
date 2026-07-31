# Get Engaged (outbound)

What this creator engaged with, newest first. Each row carries the engaged post and its
author card (authors are auto-registered as lightweight creators).

## Endpoint

`GET /v1/creators/:id/engaged`

## Authentication

Required. `X-API-Key`. The creator must be in your team (`team_creators`) or hold an
audience subscription. Partner keys allowed.

## Query parameters

Same as [Get Engagers](./get-engagers): `page`, `limit`, `action_type`, `since`.

## Response

```json
{
  "success": true,
  "data": [{
    "action_type": "comment", "reaction_type": null,
    "comment_text": "Congrats! 🎉", "engaged_at": "2026-07-30T…",
    "post_url": "https://www.linkedin.com/posts/…", "is_shadow": true,
    "author_id": "uuid", "author_name": "Henry B.",
    "author_headline": "Founder @ …", "author_linkedin_url": "…"
  }],
  "coverage": { "scanned": true, "last_scanned_at": "…", "scan_count": 3, "status": "done" },
  "meta": { "page": 1, "limit": 50, "total": 123 }
}
```

`coverage.status` values: `never_requested`, `requested` (job filed, worker pending),
`pending` / `processing` / `done` / `failed` (queue states). `is_shadow: true` marks posts
discovered via outbound scanning that we have not (yet) scraped in full.
