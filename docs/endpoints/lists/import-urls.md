# Import LinkedIn URLs to List

Import creators by LinkedIn URLs into a specific list. Creates new creator records for unknown URLs, queues them for enrichment, and adds all to the list and team.

## Endpoint

`POST /v1/lists/:id/import`

## Authentication

Required. `X-API-Key` header.

## Request

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| id        | string | Yes      | The list ID |

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
  "total": 44
}
```

### Errors

| Code | Error |
|------|-------|
| 400  | Invalid request. `linkedin_urls` must be an array of 1-100 valid LinkedIn URLs. |
| 401  | Unauthorized. Missing or invalid API key. |
| 402  | Insufficient credits. Not enough credits to import new creators. |
| 403  | Forbidden. Requires ownership or write share permission. |
| 404  | List not found. |

## Example

```bash
curl -X POST https://api.signals.actor/v1/lists/lst_abc123/import \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"linkedin_urls": ["https://linkedin.com/in/janesmith", "https://linkedin.com/in/johndoe"]}'
```

## Notes

- **Credit cost**: 10 credits per new creator (LINKEDIN_PROFILE action). Existing creators are free.
- A pre-flight credit check is performed before processing. If the team lacks sufficient credits, the request is rejected with a 402 error.
- `created` is the number of new creator records created. `existing` is the number of creators already in the system.
- `skipped` counts URLs that could not be processed (e.g., invalid format). Details are in the `errors` array.
- New creators are automatically queued for LinkedIn profile enrichment.
- All creators (new and existing) are added to both the specified list and the team.
- Maximum of 100 URLs per request.
