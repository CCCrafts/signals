# Get Coverage

Per-creator freshness/completeness rollup for both directions — decide
fresh-vs-refetch without spending a scan.

## Endpoint

`GET /v1/creators/:id/engagement/coverage`

Gate: creator in your `team_creators` or an audience subscription (admin: any).

## Response

```json
{
  "success": true,
  "data": {
    "inbound": {
      "subscribed": true, "status": "active", "cadence": "auto",
      "lookback_months": 2, "enrich_profiles": false,
      "last_scanned_at": "…", "posts_tracked": 24,
      "engagers_total": 158, "edges_total": 342, "last_edge_seen_at": "…"
    },
    "outbound": {
      "subscribed": false, "cadence": null, "scanned": true,
      "status": "done", "scan_count": 3, "last_scanned_at": "…",
      "edges_total": 123, "distinct_authors": 37, "last_edge_seen_at": "…"
    }
  }
}
```
