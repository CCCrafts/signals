# Queue Deep Scrape

Queue a creator for deep profile scraping. Performs a full LinkedIn profile scrape to enrich creator data.

## Endpoint

`POST /v1/deep-scrape-queue`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field      | Type   | Required | Description                  |
|------------|--------|----------|------------------------------|
| creator_id | string | Yes      | ID of the creator to scrape  |

```json
{
  "creator_id": "cr_abc123"
}
```

## Response

### Success

```json
{
  "id": "dsq_xyz789",
  "creator_id": "cr_abc123",
  "status": "pending",
  "retry_count": 0,
  "created_at": "2026-03-10T12:00:00Z"
}
```

### Errors

| Code | Error                                      |
|------|--------------------------------------------|
| 400  | Missing required field: creator_id         |
| 400  | Maximum retries (5) exceeded               |
| 401  | Missing or invalid API key                 |
| 402  | Insufficient credits (requires 10 credits) |
| 404  | Creator not found                          |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/deep-scrape-queue" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"creator_id": "cr_abc123"}'
```

## Notes

- Deducts 10 credits (LINKEDIN_PROFILE) before queuing.
- If the creator was previously scraped (completed or failed), they are re-queued with an incremented retry count.
- Maximum of 5 retries per creator.
- Credits are refunded on system failure.
