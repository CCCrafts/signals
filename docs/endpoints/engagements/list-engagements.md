# List Engagements

Retrieve a paginated list of your logged engagements, newest first.

## Endpoint

`GET /v1/engagements`

## Authentication

Required. `X-API-Key` header. Returns only the key owner's own engagement rows. Partner service-account keys are rejected with `403`.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 20 | Results per page (max 100) |
| creator_id | string | — | Filter by creator |
| account_key | string | — | Filter by engaging account |
| status | string | — | `sent`, `failed`, or `skipped` |
| since | integer | — | Unix **seconds**; only engagements at/after this time (millisecond values are rejected) |

## Response

### Success (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "0a59211f-3a08-43df-9e57-c47e3d1064d0",
      "account_key": "sergey",
      "creator_id": "3ba28e30-b896-4f8e-8ffc-7413c8848b83",
      "post_urn": "urn:li:activity:7480953918538203136",
      "action_type": "reaction",
      "reaction_type": "LIKE",
      "status": "sent",
      "source": "auto",
      "session_id": "20260712-run-1",
      "created_at": "2026-07-12T00:18:35.197Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 42, "totalPages": 3 }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Validation error | `since` out of range, or invalid `status` |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Partner service-account key |

## Example

```bash
curl "https://api.signals.actor/v1/engagements?account_key=sergey&status=sent&limit=20" \
  -H "X-API-Key: your-api-key"
```

## Notes

- `since` is unix **seconds**, not milliseconds — a `Date.now()` value is rejected with `400`.
- Rows are ordered by `created_at` descending, with a stable id tiebreaker.
