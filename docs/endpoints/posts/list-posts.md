# List Posts

Retrieve a paginated list of LinkedIn posts. Results are scoped to creators visible to the caller's team.

## Endpoint

`GET /v1/posts`

## Authentication

Required. Pass your API key via the `X-API-Key` header. Non-admin keys only see posts from creators on their team; admin keys see everything.

## Request

### Headers

| Header | Required | Description |
|--------|----------|-------------|
| X-API-Key | Yes | Your API key |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number, 1-based. |
| `limit` | integer | `20` | Page size, max `100`. |
| `search` | string | — | Case-insensitive substring match (ILIKE) over `posts.text_preview`. |
| `creator_id` | uuid | — | Restrict to a single creator. |
| `platform` | string | — | Exact match on `posts.platform` (e.g. `linkedin`). |
| `post_type` | enum | — | One of `post`, `article`, `repost`. |
| `min_engagement` | integer | — | Only posts with `engagement >= min_engagement`. |
| `list_id` | uuid | — | Restrict to creators in a single list. Mutually exclusive with `multi_list`. |
| `multi_list` | csv of uuid | — | Restrict to creators in any of these lists (union). |
| `ai_tags` | csv | — | Any-of match against `creators.ai_tags`. Example: `ai_tags=AI,Marketing`. |
| `ai_tag` | string | — | **Deprecated.** Single-tag alias for `ai_tags`. Prefer `ai_tags`. |
| `exclude_ai_tags` | csv | — | None-of match against `creators.ai_tags`. |
| `country` | csv | — | Allowlist of creator countries. ISO-2 or common name. See [country normalization](#country-normalization). |
| `exclude_country` | csv | — | Denylist of creator countries. |
| `virality_tier_overall` | csv | — | Whitelist of overall virality tiers: `above_average`, `strong`, `viral`, `exceptional`. |
| `is_repost` | `0` \| `1` \| `all` | `0` | `0` excludes reposts (new default). `1` only reposts. `all` both. |
| `since` | unix int | — | Only posts with `posted_at >= since` (unix seconds). |
| `sort` | enum | `posted_at` | One of `posted_at`, `created_at`, `engagement`, `likes`. |
| `order` | `asc` \| `desc` | `desc` | Sort direction. |

### Rejected parameters (HTTP 400)

These parameters are explicitly rejected with `400 Bad Request` so callers fail fast rather than silently get wrong data.

| Parameter | Replacement |
|-----------|-------------|
| `q` | Use `search`. The old `q` was undefined behavior. |
| `hours` | Use `since`. Compute client-side: `Math.floor(Date.now()/1000) - hours*3600`. |
| `offset` | Use `page` + `limit`. Offset-based pagination is no longer supported in v1. |

Example error response:

```json
{ "success": false, "error": "Use 'since=<unix>' instead of 'hours'" }
```

## Response

### Success

`200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": "0a1b2c3d-...",
      "creator_id": "ff66...",
      "platform": "linkedin",
      "text_preview": "Excited to announce our latest product launch...",
      "engagement": 462,
      "likes": 412,
      "comments": 38,
      "reposts": 12,
      "posted_at": 1746489600,
      "created_at": 1746489650,
      "is_repost": 0,
      "linkedin_url": "https://www.linkedin.com/posts/...",
      "linkedin_urn": "urn:li:activity:...",
      "virality_tier_overall": "viral",
      "virality_tier_likes": "strong",
      "virality_tier_comments": "above_average",
      "virality_tier_reposts": null,
      "virality_band": "viral",
      "virality_checked_at": 1746500000,
      "virality_status": "analyzed",
      "creator_name": "Jane Doe",
      "creator_linkedin": "https://www.linkedin.com/in/janedoe",
      "creator_photo": "https://...",
      "creator_ai_tags": "[\"AI\",\"Marketing\"]",
      "creator_company": "Acme",
      "creator_country": "US",
      "creator_country_iso": "US",
      "creator_location": "San Francisco, California, United States"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1842,
    "totalPages": 93,
    "applied_filters": {
      "is_repost": "0",
      "country": ["US", "GB"],
      "virality_tier_overall": ["viral", "exceptional"],
      "min_engagement": 100
    }
  }
}
```

### Field notes

- `text_preview`: truncated post body. The full `posts.text` is **not** returned by the list endpoint — use [`GET /v1/posts/:id`](get-post.md) to retrieve it.
- `creator_ai_tags`: JSON-encoded string array (e.g. `"[\"AI\",\"Marketing\"]"`). Parse with `JSON.parse()` before use.
- `virality_status`: `'analyzed'` or `'pending'`, derived from `posts.virality_checked_at`. When `pending`, all four `virality_tier_*` fields are `null` because no analysis has run yet — this is **not** the same as a tier of "below threshold". When `analyzed`, the tier fields are authoritative; `null` means the post fell below the threshold for that dimension.
- `virality_tier_*`: one of `above_average`, `strong`, `viral`, `exceptional`, or `null`.
- `virality_band`: explicit, never-null counterpart to `virality_tier_overall`. One of `pending`, `regular`, `above_average`, `strong`, `viral`, `exceptional`. Logic: `'pending'` when `virality_status='pending'`; otherwise `virality_tier_overall` if non-empty; otherwise `'regular'` (analyzed but below the `above_average` threshold). Use this when you want a single field that disambiguates "not yet analyzed" from "analyzed but below threshold". About 93% of analyzed posts fall into `regular`.
- `creator_country`: ISO-2 or longer name as stored on the creator (raw value, may be `'US'`, `'USA'`, `'United States'`, `'united states'`, etc). Use the country normalization table below to filter consistently.
- `creator_country_iso`: ISO-3166-1 alpha-2 normalization of `creator_country`. `'United States' → 'US'`, `'Portugal' → 'PT'`, `'Czech Republic' → 'CZ'`, `'PRT' → 'PT'`. Alpha-3 codes are also accepted as input. Returns `null` when the stored value isn't recognizable. Prefer this for client-side grouping or charting.
- `creator_location`: free-text city / region / country string.
- `is_repost`: integer `0` or `1`.
- The envelope is `{ success: true, data: [...], meta: { page, limit, total, totalPages, applied_filters } }`. There is no nested `creator: {...}` object — creator fields are flattened with a `creator_` prefix.

> **Note:** `virality_tier_reposts: null` while `virality_status: "analyzed"` is normal. It means the post was analyzed but fell below the "above_average" threshold for the reposts dimension. `null` on an analyzed post means "below threshold", not "missing data".

### Filter transparency

::: tip meta.applied_filters
The response echoes back which filters actually contributed to the WHERE clause via `meta.applied_filters`. Use it to confirm a filter took effect rather than guessing from total counts (e.g. "did my `country=PT` get parsed, or does the empty result mean no PT posts exist?").

- `is_repost` is always present (it has a default of `0`).
- Other keys appear only when the client passed a non-empty value.
- `min_engagement` only appears when truthy (i.e. omitted when `0` or unset).
- CSV-valued filters (`country`, `exclude_country`, `ai_tags`, `exclude_ai_tags`, `virality_tier_overall`, `multi_list`) appear as arrays of the parsed tokens.
:::

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Rejected parameter (`q`, `hours`, `offset`), malformed CSV, invalid uuid, invalid `is_repost` value, etc. |
| 401 | Unauthorized | Missing or invalid `X-API-Key`. |
| 403 | Forbidden | Insufficient permissions. |
| 429 | Too Many Requests | Rate limit exceeded (1000 req/hr/key). |
| 500 | Internal Server Error | Server error. |

## Country normalization

The `country` and `exclude_country` filters apply an alias map server-side. Each input token is expanded into the full set of `creators.country` strings that should match it, then the expansion is used in a SQL `IN (...)` clause. The DB is messy (some rows are `'US'`, some `'USA'`, some `'United States'`, some lowercase) and the alias map smooths that over.

Lookup is case-insensitive. Unknown tokens are passed through as a single exact-match value (no expansion).

| Input aliases the API accepts | DB country-column values that match |
|-------------------------------|-------------------------------------|
| `US`, `USA`, `United States`, `United States of America`, `U.S.`, `U.S.A.`, `America` | `US`, `USA`, `United States`, `United States of America`, `united states`, `usa` |
| `GB`, `UK`, `United Kingdom`, `Great Britain`, `Britain`, `England` | `GB`, `UK`, `United Kingdom`, `Great Britain`, `united kingdom`, `uk`, `gb` |
| `DE`, `DEU`, `Germany`, `Deutschland` | `DE`, `DEU`, `Germany`, `germany` |

## Examples

```bash
# 1. All posts in a single list, page 2
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?list_id=8e2f...&page=2&limit=50"

# 2. Posts from US/UK/Canadian creators only
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?country=US,GB,CA"

# 3. Exclude India / Pakistan / Singapore
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?exclude_country=IN,PK,SG"

# 4. Last 24 hours (since = now - 86400)
SINCE=$(( $(date +%s) - 86400 ))
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?since=$SINCE"

# 5. AI/Marketing creators with viral or exceptional posts, no reposts
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?ai_tags=AI,Marketing&virality_tier_overall=viral,exceptional&is_repost=0"

# 6. Combine multiple lists into one query
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?multi_list=8e2f...,1a90...,c4d2..."

# 7. Search post text
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?search=AI%20agents&limit=20"

# 8. Verify which filters were applied via meta.applied_filters
curl -H "X-API-Key: $KEY" \
  "https://api.signals.actor/v1/posts?country=US,GB&virality_tier_overall=viral,exceptional&min_engagement=100&limit=1"
```

The response from example 8 includes:

```json
{
  "success": true,
  "data": [ /* ... */ ],
  "meta": {
    "page": 1,
    "limit": 1,
    "total": 312,
    "totalPages": 312,
    "applied_filters": {
      "is_repost": "0",
      "country": ["US", "GB"],
      "virality_tier_overall": ["viral", "exceptional"],
      "min_engagement": 100
    }
  }
}
```

## Breaking changes

::: warning is_repost default changed
`is_repost` now defaults to `0` (reposts excluded). Previously the endpoint included reposts by default. To restore prior behavior pass `is_repost=all`; to retrieve only reposts pass `is_repost=1`.
:::

::: warning Rejected parameters
`q`, `hours`, and `offset` are now rejected with `400`. Migrate to `search`, `since`, and `page`+`limit` respectively.
:::

## Notes

- Results are team-scoped for non-admin keys.
- Multiple filters can be combined freely (e.g. `country` + `ai_tags` + `virality_tier_overall` + `since`).
- The `engagement` field is the sum of likes, comments, and reposts.
- Pagination is page-based only; `offset` is rejected with `400`.
