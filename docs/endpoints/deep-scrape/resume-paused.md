# Resume Paused Deep Scrape Entries

Resume all paused deep scrape queue entries for the current team. Entries are paused when the team runs out of credits.

## Endpoint

`POST /v1/deep-scrape-queue/resume-paused`

## Authentication

Required. Team-scoped.

## Request

No request body required.

## Response

### Success

```json
{
  "resumed": 3
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits to resume entries   |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/deep-scrape-queue/resume-paused" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Requires a positive credit balance to resume.
- Resumes all paused entries for the team in a single call.
- If no entries are paused, returns `{ "resumed": 0 }`.
