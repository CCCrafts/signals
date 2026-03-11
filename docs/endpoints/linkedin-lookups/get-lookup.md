# Get LinkedIn Lookup

Retrieve a single LinkedIn lookup by ID, including creator details if the lookup is completed.

## Endpoint

`GET /v1/linkedin-lookups/:id`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description      |
|-----------|--------|----------|------------------|
| id        | string | Yes      | The lookup ID    |

## Response

### Success

```json
{
  "id": "llq_def456",
  "full_name": "Jane Smith",
  "company": "Acme Corp",
  "status": "completed",
  "source": "google_ad",
  "linkedin_url": "https://linkedin.com/in/janesmith",
  "creator_id": "cr_abc123",
  "retry_count": 0,
  "list_id": "lst_abc123",
  "created_at": "2026-03-10T12:00:00Z",
  "updated_at": "2026-03-10T12:05:00Z",
  "creator": {
    "id": "cr_abc123",
    "name": "Jane Smith",
    "linkedin_url": "https://linkedin.com/in/janesmith",
    "headline": "VP of Engineering at Acme Corp",
    "location": "San Francisco, CA",
    "follower_count": 12500
  }
}
```

### Errors

| Code | Error                          |
|------|--------------------------------|
| 401  | Missing or invalid API key     |
| 404  | Lookup not found               |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/linkedin-lookups/llq_def456" \
  -H "X-API-Key: your-api-key"
```

## Notes

- The `creator` object is only included when the lookup status is `completed`.
- The lookup must belong to the authenticated user's team.
