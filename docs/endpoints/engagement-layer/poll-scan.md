# Poll a Scan Job

## Endpoint

`GET /v1/engagement/scan/:job_id`

Scoped to the requesting team (admin keys see all). Status flow:
`pending → processing → completed | failed`. Jobs that can never settle time out
(48 h touched / 96 h hard cap) as `failed` with an explanatory `error_message`.

## Response

```json
{
  "success": true,
  "data": {
    "job_id": "uuid", "creator_id": "uuid", "direction": "outbound",
    "status": "completed", "lookback_months": 2, "enrich_profiles": false,
    "edges_found": 123, "new_edges": 23, "error_message": null,
    "created_at": "…", "updated_at": "…", "completed_at": "…"
  }
}
```
