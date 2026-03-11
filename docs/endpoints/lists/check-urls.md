# Check LinkedIn URLs

Check whether LinkedIn URLs correspond to existing creators in the system. Returns per-URL status without creating or modifying any records.

## Endpoint

`POST /v1/lists/check-urls`

## Authentication

Required. `X-API-Key` header.

## Request

### Body

| Field         | Type     | Required | Description                                    |
|---------------|----------|----------|------------------------------------------------|
| linkedin_urls | string[] | Yes      | Array of LinkedIn profile URLs (1-100)         |

```json
{
  "linkedin_urls": [
    "https://linkedin.com/in/janesmith",
    "https://linkedin.com/in/johndoe"
  ]
}
```

## Response

### Success

```json
[
  {
    "url": "https://linkedin.com/in/janesmith",
    "username": "janesmith",
    "exists": true,
    "creator": {
      "id": "crt_001",
      "name": "Jane Smith"
    }
  },
  {
    "url": "https://linkedin.com/in/johndoe",
    "username": "johndoe",
    "exists": false,
    "creator": null
  }
]
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `linkedin_urls` must be an array of 1-100 valid LinkedIn URLs. |
| 401  | Unauthorized. Missing or invalid API key. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists/check-urls \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"linkedin_urls": ["https://linkedin.com/in/janesmith", "https://linkedin.com/in/johndoe"]}'
```

## Notes

- This is a read-only operation. No creators are created or modified.
- Results are scoped to the authenticated user's team. A creator that exists but is not accessible to the team will show `exists: false`.
- Useful for previewing an import before committing credits.
- Maximum of 100 URLs per request.
