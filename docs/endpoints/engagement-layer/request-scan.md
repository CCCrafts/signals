# Request Engagement Scan

Create an on-demand scan job for either direction. Idempotent per
`(team, creator, direction)` — an in-flight duplicate returns the existing job with
`deduped: true` and no extra charge.

## Endpoint

`POST /v1/creators/:id/engagement/scan`

## Body

```json
{
  "direction": "outbound",
  "lookback_months": 2,
  "enrich_profiles": false
}
```

| Field | Notes |
| --- | --- |
| `direction` | required: `inbound` \| `outbound` |
| `lookback_months` | 1–12, default 2 |
| `enrich_profiles` | inbound only: opt the subscription into full-profile engager enrichment (10 credits/engager, once ever) |

## Behavior & billing

- **inbound** — synchronously subscribes your team (audience subscription = the
  read-gate + recurring scanning). Billed `audience_scan` = 1 credit per post,
  factually as scans run. If the creator has no in-window posts, a deep scrape is
  chained first and the job waits for it. Clearly-insufficient balance → `402`.
- **outbound** — flat `engagement_scan` = 1 credit at request time (vendor side is
  ~$0.002 per 100-item page, recorded at actual cost).

## Response

`201` (new) or `200` (deduped):

```json
{
  "success": true,
  "data": {
    "job_id": "uuid", "direction": "outbound", "status": "pending",
    "estimate": { "credits": 1 }
  }
}
```

Inbound estimate: `{ "in_window_posts": 24, "max_credits": 24 }`.
