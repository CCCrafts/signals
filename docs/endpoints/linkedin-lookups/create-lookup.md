# Create LinkedIn Lookup

Submit a single LinkedIn lookup request. The system searches for the person's LinkedIn profile using their name and optional company.

## Endpoint

`POST /v1/linkedin-lookups`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| fullName | string | Yes      | Full name of the person to look up |
| company  | string | No       | Company name to narrow the search  |
| listId   | string | No       | ID of an existing list to add to   |
| listName | string | No       | Name for a new list to create      |

```json
{
  "fullName": "Jane Smith",
  "company": "Acme Corp",
  "listId": "lst_abc123"
}
```

## Response

### Success

```json
{
  "id": "llq_def456",
  "full_name": "Jane Smith",
  "company": "Acme Corp",
  "status": "pending",
  "source": "google_ad",
  "team_id": "team_abc",
  "list_id": "lst_abc123",
  "created_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | Missing required field: fullName         |
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits (requires 10 credits) |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/linkedin-lookups" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"fullName": "Jane Smith", "company": "Acme Corp"}'
```

## Notes

- Deducts 10 credits (GOOGLE_LOOKUP) before the lookup is queued.
- Credits are refunded if the lookup fails due to a system error.
- If both `listId` and `listName` are provided, `listId` takes precedence.
- The lookup progresses through statuses: pending -> searching -> url_found -> enriching -> completed.
