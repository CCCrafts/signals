# Import LinkedIn URLs

Import creators by LinkedIn URLs without adding them to a specific list. Creates new creator records for unknown URLs, queues them for enrichment, and assigns them to the team.

## Endpoint

`POST /v1/lists/import-urls`

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
{
  "added": 2,
  "created": 1,
  "existing": 1,
  "skipped": 0,
  "errors": [],
  "total": 2
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `linkedin_urls` must be an array of 1-100 valid LinkedIn URLs. |
| 401  | Unauthorized. Missing or invalid API key. |
| 402  | Insufficient credits. Not enough credits to import new creators. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists/import-urls \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"linkedin_urls": ["https://linkedin.com/in/janesmith", "https://linkedin.com/in/johndoe"]}'
```

## Notes

- Functions identically to the list-specific import endpoint, but does not add creators to any list.
- **Credit cost**: 10 credits per new creator (LINKEDIN_PROFILE action). Existing creators are free.
- A pre-flight credit check is performed before processing.
- New creators are queued for LinkedIn profile enrichment and assigned to the team.
- Maximum of 100 URLs per request.
