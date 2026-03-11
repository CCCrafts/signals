# Pagination and Filtering

All list endpoints support consistent pagination and filtering parameters.

## Pagination Parameters

| Parameter | Type    | Default | Min | Max | Description          |
|-----------|---------|---------|-----|-----|----------------------|
| `page`    | integer | 1       | 1   | --  | Page number          |
| `limit`   | integer | 20      | 1   | 100 | Results per page     |

### Example

```bash
curl -s "https://api.signals.actor/v1/creators?page=2&limit=50" \
  -H "X-API-Key: sk_YOUR_KEY_HERE"
```

## Response Meta

Every paginated response includes a `meta` object:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 2,
    "limit": 50,
    "total": 342,
    "totalPages": 7
  }
}
```

| Field        | Description                            |
|--------------|----------------------------------------|
| `page`       | Current page number                    |
| `limit`      | Results per page                       |
| `total`      | Total matching records                 |
| `totalPages` | Total pages (`ceil(total / limit)`)    |

## Sorting

Sort parameters vary by resource. Common patterns:

| Parameter | Values (example)                        | Default        |
|-----------|-----------------------------------------|----------------|
| `sort`    | `created_at`, `name`, `followers`, etc. | `created_at`   |
| `order`   | `asc`, `desc`                           | `desc`         |

```bash
curl -s "https://api.signals.actor/v1/creators?sort=followers&order=desc&limit=10" \
  -H "X-API-Key: sk_YOUR_KEY_HERE"
```

## Search

Search is LIKE-based (case-insensitive substring match). Use the `search` query parameter:

```bash
curl -s "https://api.signals.actor/v1/creators?search=john" \
  -H "X-API-Key: sk_YOUR_KEY_HERE"
```

The fields searched depend on the resource (e.g., `name` and `headline` for creators, `content` for posts).

## Filtering

Resources support resource-specific filter parameters. Pass them as query string values:

```bash
# Filter creators by vertical
curl -s "https://api.signals.actor/v1/creators?vertical=tech" \
  -H "X-API-Key: sk_YOUR_KEY_HERE"

# Filter posts by creator
curl -s "https://api.signals.actor/v1/posts?creator_id=CREATOR_ID" \
  -H "X-API-Key: sk_YOUR_KEY_HERE"
```

## Iterating All Pages

To iterate through all results, increment `page` until `page > totalPages`:

```bash
page=1
while true; do
  response=$(curl -s "https://api.signals.actor/v1/creators?page=$page&limit=100" \
    -H "X-API-Key: sk_YOUR_KEY_HERE")

  total_pages=$(echo "$response" | jq '.meta.totalPages')
  echo "$response" | jq '.data'

  if [ "$page" -ge "$total_pages" ]; then break; fi
  page=$((page + 1))
done
```
