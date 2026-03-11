# Bulk Create LinkedIn Lookups

Submit multiple LinkedIn lookup requests in a single call. Automatically deduplicates against existing team lookups.

## Endpoint

`POST /v1/linkedin-lookups/bulk`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field    | Type   | Required | Description                                  |
|----------|--------|----------|----------------------------------------------|
| lookups  | array  | Yes      | Array of lookup objects (1-500 items)        |
| listId   | string | No       | ID of an existing list to add lookups to     |
| listName | string | No       | Name for a new list to create                |

Each lookup object:

| Field    | Type   | Required | Description                        |
|----------|--------|----------|------------------------------------|
| fullName | string | Yes      | Full name of the person to look up |
| company  | string | No       | Company name to narrow the search  |

```json
{
  "lookups": [
    { "fullName": "Jane Smith", "company": "Acme Corp" },
    { "fullName": "John Doe", "company": "TechStart" },
    { "fullName": "Alice Johnson" }
  ],
  "listName": "Q1 Prospects"
}
```

## Response

### Success

```json
{
  "total": 3,
  "created": 2,
  "duplicates": 1,
  "lookups": [
    {
      "id": "llq_def456",
      "full_name": "Jane Smith",
      "company": "Acme Corp",
      "status": "pending",
      "created_at": "2026-03-10T12:00:00Z"
    },
    {
      "id": "llq_ghi789",
      "full_name": "Alice Johnson",
      "company": null,
      "status": "pending",
      "created_at": "2026-03-10T12:00:00Z"
    }
  ]
}
```

### Errors

| Code | Error                                          |
|------|------------------------------------------------|
| 400  | lookups array is required (1-500 items)        |
| 400  | Each lookup must have a fullName               |
| 401  | Missing or invalid API key                     |
| 402  | Insufficient credits (requires 10 per new lookup) |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/linkedin-lookups/bulk" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "lookups": [
      {"fullName": "Jane Smith", "company": "Acme Corp"},
      {"fullName": "John Doe", "company": "TechStart"}
    ],
    "listName": "Q1 Prospects"
  }'
```

## Notes

- Deducts 10 credits (GOOGLE_LOOKUP) per new (non-duplicate) lookup.
- Maximum of 500 lookups per request.
- Deduplication is performed against all existing lookups for the team, regardless of status.
- Duplicate lookups are silently skipped and reflected in the `duplicates` count.
- Credits are only charged for newly created lookups, not duplicates.
