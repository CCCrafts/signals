# Get Engagement Counters

Per-account count of `sent` engagements for a single UTC calendar day. Powers daily send-rate pacing.

## Endpoint

`GET /v1/engagements/counters`

## Authentication

Required. `X-API-Key` header. Counts only the key owner's own engagements. Partner service-account keys are rejected with `403`.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| date | string | today | Calendar day in `YYYY-MM-DD` (UTC) |

## Response

### Success (200 OK)

A map of `account_key` → count of `sent` engagements on that day.

```json
{
  "success": true,
  "data": { "sergey": 6, "ccc": 4, "publora": 1 }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Validation error | `date` is not a valid `YYYY-MM-DD` calendar date (e.g. `2026-02-31`) |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Partner service-account key |

## Example

```bash
curl "https://api.signals.actor/v1/engagements/counters?date=2026-07-12" \
  -H "X-API-Key: your-api-key"
```

## Notes

- The day window is a UTC calendar day (`00:00:00Z` to the next `00:00:00Z`), independent of server timezone.
- Only `status = sent` rows are counted.
