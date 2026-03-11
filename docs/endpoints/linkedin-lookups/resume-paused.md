# Resume Paused LinkedIn Lookups

Resume all paused LinkedIn lookups for the current team. Lookups are paused when the team runs out of credits.

## Endpoint

`POST /v1/linkedin-lookups/resume-paused`

## Authentication

Required. Team-scoped.

## Request

No request body required.

## Response

### Success

```json
{
  "resumed": 5
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits to resume lookups   |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/linkedin-lookups/resume-paused" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Requires a positive credit balance to resume.
- Resumes all paused lookups for the team in a single call.
- The `resumed` count reflects how many lookups were moved from `paused` back to `pending`.
- If no lookups are paused, returns `{ "resumed": 0 }`.
