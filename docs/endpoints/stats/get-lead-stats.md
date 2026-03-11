# Get Lead Stats

Retrieve detailed statistics about leads, including breakdowns by signal, score tier, company size, and top companies.

## Endpoint

`GET /v1/stats/leads`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |

## Response

### Success (200 OK)

```json
{
  "bySignal": [
    { "signal": "hiring-surge", "count": 87 },
    { "signal": "funding-round", "count": 64 },
    { "signal": "product-launch", "count": 45 }
  ],
  "byScore": [
    { "tier": "high", "range": "8-10", "count": 120 },
    { "tier": "medium", "range": "5-7", "count": 340 },
    { "tier": "low", "range": "0-4", "count": 382 }
  ],
  "byCompanySize": [
    { "size": "enterprise", "count": 210 },
    { "size": "mid-market", "count": 380 },
    { "size": "startup", "count": 252 }
  ],
  "topCompanies": [
    { "company": "Acme Corp", "lead_count": 12, "avg_score": 8.3 },
    { "company": "Beta Inc", "lead_count": 9, "avg_score": 7.1 },
    { "company": "Gamma Ltd", "lead_count": 7, "avg_score": 6.8 }
  ]
}
```

### Errors

| Code | Error |
|------|-------|
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/stats/leads" \
  -H "X-API-Key: your-api-key"
```

## Notes

- This endpoint is restricted to admin users only.
- `bySignal` shows lead counts per signal, sorted by count descending.
- `byScore` groups leads into tier brackets: high (8-10), medium (5-7), and low (0-4).
- `byCompanySize` segments leads by their company's size classification.
- `topCompanies` lists companies with the most leads, including their average lead score.
