# cURL Quick Start

These examples show common workflows using the signals.actor API with cURL.
All requests require an `X-API-Key` header for authentication.

```bash
# Set your API key once for all examples
export SIGNALS_API_KEY="your-api-key-here"
export BASE_URL="https://api.signals.actor/v1"
```

---

## 1. List Creators with Search and Sorting

Search for creators by name or headline, filter by vertical or follower count, and control sort order.

```bash
# Search for creators matching "marketing", sorted by engagement rate
curl -s "$BASE_URL/creators?search=marketing&sort=engagement&order=desc&limit=10" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Filter by vertical and minimum follower count
curl -s "$BASE_URL/creators?vertical=SaaS&min_followers=5000&sort=followers&order=desc&page=1&limit=20" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Filter by AI tag
curl -s "$BASE_URL/creators?ai_tag=thought%20leader&sort=engagement&limit=10" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get a single creator by ID
curl -s "$BASE_URL/creators/550e8400-e29b-41d4-a716-446655440000" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .
```

**Query parameters:**

| Parameter       | Type   | Default     | Description                                                |
|-----------------|--------|-------------|------------------------------------------------------------|
| `search`        | string | -           | Search name, headline, or LinkedIn URL                     |
| `sort`          | enum   | `followers` | `followers`, `engagement`, `created_at`, `name`, `post_count` |
| `order`         | enum   | `desc`      | `asc` or `desc`                                            |
| `page`          | number | `1`         | Page number (1-based)                                      |
| `limit`         | number | `20`        | Results per page (1-100)                                   |
| `source_type`   | string | -           | Filter by source type                                      |
| `vertical`      | string | -           | Filter by industry vertical                                |
| `ai_tag`        | string | -           | Filter by AI-generated tag                                 |
| `min_followers` | number | -           | Minimum total follower count                               |

---

## 2. Get a Creator's Posts

Fetch paginated posts for a specific creator, ordered by most recent first.

```bash
CREATOR_ID="550e8400-e29b-41d4-a716-446655440000"

# Get the latest 20 posts
curl -s "$BASE_URL/creators/$CREATOR_ID/posts?page=1&limit=20" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get page 2
curl -s "$BASE_URL/creators/$CREATOR_ID/posts?page=2&limit=20" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .
```

**Response includes:**
- `data` -- array of post objects with `text_preview`, `engagement`, `likes`, `comments`, `reposts`, `posted_at`
- `meta` -- pagination info: `page`, `limit`, `total`, `totalPages`

---

## 3. Create a List, Add Members, and Import LinkedIn URLs

### Create a new list

```bash
curl -s -X POST "$BASE_URL/lists" \
  -H "X-API-Key: $SIGNALS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Top SaaS Creators",
    "description": "High-engagement SaaS thought leaders"
  }' | jq .
```

### Add existing creators to the list

```bash
LIST_ID="the-list-id-from-above"

curl -s -X POST "$BASE_URL/lists/$LIST_ID/members" \
  -H "X-API-Key: $SIGNALS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "creator_ids": [
      "creator-uuid-1",
      "creator-uuid-2",
      "creator-uuid-3"
    ]
  }' | jq .
```

### Import creators by LinkedIn URLs

This creates new creator records for unknown URLs and queues them for automatic enrichment.

```bash
curl -s -X POST "$BASE_URL/lists/$LIST_ID/import" \
  -H "X-API-Key: $SIGNALS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "linkedin_urls": [
      "https://www.linkedin.com/in/johndoe",
      "https://www.linkedin.com/in/janedoe",
      "https://www.linkedin.com/in/alexsmith"
    ]
  }' | jq .
```

**Response:**
```json
{
  "success": true,
  "data": {
    "added": 3,
    "created": 2,
    "existing": 1,
    "skipped": 0,
    "errors": [],
    "total": 3
  }
}
```

---

## 4. Search Posts with Filters

Search across all posts with text search, engagement filters, and sorting.

```bash
# Search post text for "product launch"
curl -s "$BASE_URL/posts?search=product%20launch&sort=engagement&order=desc&limit=10" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get posts by a specific creator
curl -s "$BASE_URL/posts?creator_id=550e8400-e29b-41d4-a716-446655440000&sort=posted_at&limit=20" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Filter by minimum engagement and AI tag
curl -s "$BASE_URL/posts?min_engagement=500&ai_tag=startup%20founder&sort=likes&order=desc" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get posts from a specific list
curl -s "$BASE_URL/posts?list_id=$LIST_ID&sort=posted_at&order=desc&limit=50" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get top posts by engagement
curl -s "$BASE_URL/posts/top/engagement?limit=10" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .
```

**Query parameters:**

| Parameter        | Type   | Default     | Description                                        |
|------------------|--------|-------------|----------------------------------------------------|
| `search`         | string | -           | Full-text search in post content                   |
| `creator_id`     | string | -           | Filter by creator UUID                             |
| `platform`       | string | -           | Filter by platform (e.g. `linkedin`)               |
| `min_engagement` | number | -           | Minimum total engagement                           |
| `list_id`        | string | -           | Filter by list membership                          |
| `ai_tag`         | string | -           | Filter by creator's AI tag                         |
| `sort`           | enum   | `posted_at` | `engagement`, `likes`, `posted_at`, `created_at`   |
| `order`          | enum   | `desc`      | `asc` or `desc`                                    |
| `page`           | number | `1`         | Page number                                        |
| `limit`          | number | `20`        | Results per page (1-100)                           |

---

## 5. Create a LinkedIn Lookup

Find someone's LinkedIn profile by their name and company. The system uses Google search to find the matching profile and automatically enriches it.

### Single lookup

```bash
curl -s -X POST "$BASE_URL/linkedin-lookups" \
  -H "X-API-Key: $SIGNALS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Jane Smith",
    "company": "Stripe",
    "listId": "optional-list-id",
    "listName": "optional-list-name"
  }' | jq .
```

### Bulk lookups (up to 500 at once)

```bash
curl -s -X POST "$BASE_URL/linkedin-lookups/bulk" \
  -H "X-API-Key: $SIGNALS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "lookups": [
      { "fullName": "Jane Smith", "company": "Stripe" },
      { "fullName": "Alex Johnson", "company": "Notion" },
      { "fullName": "Sarah Lee" }
    ],
    "listName": "Q1 Prospects"
  }' | jq .
```

### Check lookup status

```bash
# List all lookups with status filter
curl -s "$BASE_URL/linkedin-lookups?status=completed&limit=50" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get lookup stats
curl -s "$BASE_URL/linkedin-lookups/stats" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .
```

**Lookup statuses:** `pending`, `searching`, `enriching`, `url_found`, `completed`, `no_results`, `failed`, `paused`

---

## 6. Check API Usage Stats

Monitor your API key usage, error rates, and response times.

```bash
# Get usage summary for the last 7 days (default)
curl -s "$BASE_URL/usage?period=7d" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get usage for the last 24 hours
curl -s "$BASE_URL/usage?period=24h" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .

# Get recent errors
curl -s "$BASE_URL/usage/errors?limit=10" \
  -H "X-API-Key: $SIGNALS_API_KEY" | jq .
```

**Response example:**
```json
{
  "success": true,
  "data": {
    "key": {
      "name": "My API Key",
      "key_prefix": "sk_live_abc...",
      "created_at": 1709251200,
      "last_used_at": 1709337600,
      "is_active": 1
    },
    "period": "7d",
    "summary": {
      "total_requests": 1247,
      "error_count": 3,
      "error_rate": 0.24,
      "avg_response_time_ms": 85
    },
    "by_endpoint": [
      { "endpoint": "/v1/creators", "method": "GET", "count": 523 },
      { "endpoint": "/v1/posts", "method": "GET", "count": 412 }
    ],
    "by_status": [
      { "status_code": 200, "count": 1244 },
      { "status_code": 404, "count": 3 }
    ]
  }
}
```

**Period options:** `24h`, `7d`, `30d`, `all`
