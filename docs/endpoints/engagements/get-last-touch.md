# Get Last Touch

Last `sent` engagement per account for one creator, plus `posts_since` — how many posts that creator published after the touched one. This is the per-creator engagement-spacing rule in a single call.

## Endpoint

`GET /v1/engagements/last`

## Authentication

Required. `X-API-Key` header. Reads only the key owner's own engagements. Partner service-account keys are rejected with `403`.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| creator_id | string | — | **Required.** Creator to look up |

## Response

### Success (200 OK)

A map of `account_key` → the last touch from that account, with `posts_since`.

```json
{
  "success": true,
  "data": {
    "sergey": {
      "post_id": "3ba28e30-b896-4f8e-8ffc-7413c8848b83_7480953918538203136",
      "post_urn": "urn:li:activity:7480953918538203136",
      "created_at": "2026-07-12T00:18:35.197Z",
      "posts_since": 2
    }
  }
}
```

Returns an empty object (`{ "success": true, "data": {} }`) if the creator is not visible to your team.

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Validation error | Missing `creator_id` |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Partner service-account key |

## Example

```bash
curl "https://api.signals.actor/v1/engagements/last?creator_id=3ba28e30-b896-4f8e-8ffc-7413c8848b83" \
  -H "X-API-Key: your-api-key"
```

## Notes

- `posts_since` counts the creator's posts published after the touched post. When `post_id` is unknown (or a raw LinkedIn id was logged instead of the internal `posts.id`), it anchors on the engagement's own timestamp instead.
- Use this to enforce a spacing rule (e.g. only re-engage a creator after N new posts) without a second request.
