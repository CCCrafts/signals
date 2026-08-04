# Subscribe (keep-fresh)

Standing subscription that keeps engagement data fresh on a cadence — no one-shot job.

## Endpoints

`POST /v1/creators/:id/engagement/subscribe` — subscribe / update cadence
`DELETE /v1/creators/:id/engagement/subscribe?direction=inbound|outbound` — cancel

## Body (POST)

```json
{
  "direction": "outbound",
  "cadence": "daily",
  "lookback_months": 2,
  "enrich_profiles": false
}
```

| Field | Notes |
| --- | --- |
| `direction` | required |
| `cadence` | inbound: `auto` \| `daily` \| `weekly` (default `auto` — age-decayed); outbound: `daily` \| `weekly` (default `daily`) |
| `enrich_profiles` | inbound only, opt-in |

## Behavior

- **inbound** — same audience subscription an inbound scan creates (read-gate +
  per-post `audience_scan` billing on cadence).
- **outbound** — the person's activity re-scans on cadence. Incremental stop makes
  each re-scan typically 1–2 pages (~$0.004 vendor side).
- **DELETE** — inbound: stops the subscription (read-gate closes, scanning stops);
  outbound: removes **your team** from the shared subscription — the recurrence only
  ends when the **last** subscribed team leaves (collected data stays readable via
  team visibility). One shared scan serves every subscribed team.

## Response

```json
{ "success": true, "data": { "direction": "outbound", "subscribed": true, "cadence": "daily" } }
```
