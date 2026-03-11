# Export Leads

Export leads as a CSV file. Optionally specify lead IDs to export a subset.

## Endpoint

`POST /v1/leads/export`

## Authentication

Required. `X-API-Key` header. **Admin only.**

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | API key with admin scope |
| Content-Type | Yes | application/json |

### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| ids | string[] | No | Lead IDs to export (max 500) |

## Response

### Success (200 OK)

Returns a CSV file with `Content-Type: text/csv` and `Content-Disposition: attachment` headers.

```
name,company,score,qualified,persona,signal_name,created_at
Jane Smith,Acme Corp,8.5,true,VP of Engineering,hiring-surge,2026-03-01T12:00:00Z
John Doe,Beta Inc,7.2,true,CTO,funding-round,2026-02-28T10:15:00Z
```

### Errors

| Code | Error |
|------|-------|
| 400 | Bad Request — more than 500 IDs provided |
| 401 | Unauthorized — missing or invalid API key |
| 403 | Forbidden — admin access required |

## Example

```bash
# Export specific leads
curl -X POST "https://api.signals.actor/v1/leads/export" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"ids": ["lead_abc123", "lead_def456"]}' \
  -o leads.csv

# Export all leads (up to 5000)
curl -X POST "https://api.signals.actor/v1/leads/export" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -o leads.csv
```

## Notes

- When `ids` is omitted or empty, exports up to 5000 leads.
- When `ids` is provided, a maximum of 500 IDs are accepted per request.
- Exported leads are automatically marked as `is_exported: true`.
- Use the `-o` flag with curl to save the CSV output to a file.
