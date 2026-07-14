# Create Engagement

Log a LinkedIn engagement attempt (a reaction or comment your account performed on a creator's post).

## Endpoint

`POST /v1/engagements`

## Authentication

Required. `X-API-Key` header. Scoped to the key's **owning user** — every row is private to that user. Partner service-account keys are rejected with `403`.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |
| Content-Type | Yes | application/json |

### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| account_key | string | Yes | Which of your accounts engaged (e.g. `sergey`, `ccc`) |
| post_urn | string | Yes | LinkedIn activity URN |
| status | string | Yes | `sent`, `failed`, or `skipped` |
| action_type | string | No | Engagement type (default `reaction`) |
| reaction_type | string | No | Free-form (≤50 chars); standard LinkedIn set: `LIKE`, `PRAISE`, `EMPATHY`, `INTEREST`, `APPRECIATION`, `ENTERTAINMENT` |
| source | string | No | `auto` or `manual` (default `auto`) |
| creator_id | string | No | Creator engaged; for non-admin keys must be a creator assigned to your team, else `403` |
| post_id | string | No | The **internal** `posts.id` (`creatorId_postId`), NOT the raw LinkedIn id |
| connection_user_id | string | No | Publora platform id used |
| session_id | string | No | Free-form run/session identifier |
| error_detail | string | No | Failure detail (for `failed` rows) |

```json
{
  "account_key": "sergey",
  "post_urn": "urn:li:activity:7480953918538203136",
  "reaction_type": "LIKE",
  "status": "sent",
  "creator_id": "3ba28e30-b896-4f8e-8ffc-7413c8848b83"
}
```

## Response

### Success (201 Created)

```json
{
  "success": true,
  "data": { "id": "0a59211f-3a08-43df-9e57-c47e3d1064d0" }
}
```

### Deduplicated

At most one `sent` row exists per `(account_key, post_urn, action_type)` per user. A duplicate `sent` engagement returns the existing row instead of inserting a new one:

```json
{
  "success": true,
  "data": { "id": "0a59211f-3a08-43df-9e57-c47e3d1064d0", "deduped": true }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Validation error | Missing `account_key`/`post_urn`/`status` or invalid `status` |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Partner key, or `creator_id` not accessible to your team |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/engagements" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"account_key": "sergey", "post_urn": "urn:li:activity:7480953918538203136", "reaction_type": "LIKE", "status": "sent"}'
```

## Notes

- `failed` and `skipped` rows are exempt from de-duplication so retries can always be logged.
- `post_id` must be the internal deterministic id (`creatorId_postId`); passing a raw LinkedIn id makes [Get Last Touch](/endpoints/engagements/get-last-touch)'s `posts_since` fall back to the touch timestamp.
- `reaction_type` is stored verbatim; the six standard values keep the admin UI's emoji labels consistent.
