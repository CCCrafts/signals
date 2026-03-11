# Python Quick Start

These examples use the `requests` library.
All requests require an `X-API-Key` header for authentication.

```bash
pip install requests
```

## Setup: Reusable API Class

```python
import requests
import time


class SignalsAPI:
    def __init__(self, api_key, base_url="https://api.signals.actor/v1"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({"X-API-Key": api_key})

    def _request(self, method, path, params=None, json=None):
        url = f"{self.base_url}{path}"
        response = self.session.request(method, url, params=params, json=json)
        response.raise_for_status()
        return response.json()

    def get(self, path, params=None):
        return self._request("GET", path, params=params)

    def post(self, path, json=None):
        return self._request("POST", path, json=json)

    def put(self, path, json=None):
        return self._request("PUT", path, json=json)

    def delete(self, path, json=None):
        return self._request("DELETE", path, json=json)


api = SignalsAPI("your-api-key-here")
```

---

## 1. List Creators

Search, filter, and sort your creator database.

```python
# Search for creators matching "marketing", sorted by engagement
results = api.get("/creators", params={
    "search": "marketing",
    "sort": "engagement",
    "order": "desc",
    "limit": 10,
})

print(f"Found {results['meta']['total']} creators")
for creator in results["data"]:
    print(f"  {creator['name']} - {creator['headline']}")
    print(f"    Followers: {creator['total_followers']}")
    print(f"    Engagement rate: {creator['engagement_rate']}%")

# Filter by vertical and minimum followers
saas_creators = api.get("/creators", params={
    "vertical": "SaaS",
    "min_followers": 5000,
    "sort": "followers",
    "order": "desc",
})

# Get a single creator
creator = api.get("/creators/550e8400-e29b-41d4-a716-446655440000")
print(creator["data"]["name"])

# Get available verticals with counts
verticals = api.get("/creators/verticals")
for v in verticals["data"][:10]:
    print(f"  {v['name']}: {v['count']} creators")
```

---

## 2. Get Creator Posts

Fetch paginated posts for a specific creator.

```python
creator_id = "550e8400-e29b-41d4-a716-446655440000"

# Get the latest 20 posts
posts = api.get(f"/creators/{creator_id}/posts", params={"page": 1, "limit": 20})

print(f"Total posts: {posts['meta']['total']}")
for post in posts["data"]:
    posted = time.strftime("%Y-%m-%d", time.gmtime(post["posted_at"]))
    print(f"  [{posted}] {post['text_preview'][:80]}...")
    print(f"    Engagement: {post['engagement']} | Likes: {post['likes']} | Comments: {post['comments']}")


# Paginate through all posts
def get_all_posts(creator_id):
    all_posts = []
    page = 1
    while True:
        result = api.get(f"/creators/{creator_id}/posts", params={"page": page, "limit": 100})
        all_posts.extend(result["data"])
        if page >= result["meta"]["totalPages"]:
            break
        page += 1
    return all_posts
```

---

## 3. Create a List and Import URLs

Create a list, add existing creators, and import new ones by LinkedIn URL.

```python
# Step 1: Create a new list
new_list = api.post("/lists", json={
    "name": "Top SaaS Creators",
    "description": "High-engagement SaaS thought leaders",
})
list_id = new_list["data"]["id"]
print(f"Created list: {list_id}")

# Step 2: Add existing creators by ID
add_result = api.post(f"/lists/{list_id}/members", json={
    "creator_ids": ["creator-uuid-1", "creator-uuid-2", "creator-uuid-3"],
})
print(f"Added {add_result['data']['added']} creators (total: {add_result['data']['total']})")

# Step 3: Import creators by LinkedIn URL
# Unknown URLs will be automatically enriched
import_result = api.post(f"/lists/{list_id}/import", json={
    "linkedin_urls": [
        "https://www.linkedin.com/in/johndoe",
        "https://www.linkedin.com/in/janedoe",
        "https://www.linkedin.com/in/alexsmith",
    ],
})

print("Import results:")
print(f"  Added: {import_result['data']['added']}")
print(f"  New creators: {import_result['data']['created']}")
print(f"  Already existed: {import_result['data']['existing']}")
print(f"  Skipped: {import_result['data']['skipped']}")

# Step 4: Check which URLs already exist (optional pre-check)
check_result = api.post("/lists/check-urls", json={
    "linkedin_urls": [
        "https://www.linkedin.com/in/johndoe",
        "https://www.linkedin.com/in/unknown-person",
    ],
})

for entry in check_result["data"]:
    status = "exists" if entry["exists"] else "not found"
    print(f"  {entry['url']}: {status}")
```

---

## 4. Search Posts

Search and filter posts across all creators.

```python
# Search post content
posts = api.get("/posts", params={
    "search": "product launch",
    "sort": "engagement",
    "order": "desc",
    "limit": 10,
})

for post in posts["data"]:
    print(f"{post['creator_name']} ({post.get('creator_company', 'N/A')})")
    print(f"  {post['text_preview']}")
    print(f"  Engagement: {post['engagement']} | Likes: {post['likes']}")

# Get posts filtered by list
list_posts = api.get("/posts", params={
    "list_id": list_id,
    "sort": "posted_at",
    "order": "desc",
    "limit": 50,
})

# Get top posts by engagement
top_posts = api.get("/posts/top/engagement", params={"limit": 10})

# Get post statistics for a date range
now = int(time.time())
stats = api.get("/posts/stats/period", params={
    "date_from": now - 30 * 86400,  # 30 days ago
    "date_to": now,
})
data = stats["data"]
print(f"Posts in period: {data['total_posts']} ({data['personal_posts']} original, {data['reposts']} reposts)")
```

---

## 5. Create a LinkedIn Lookup

Find someone's LinkedIn profile by name and company.

```python
# Single lookup
lookup = api.post("/linkedin-lookups", json={
    "fullName": "Jane Smith",
    "company": "Stripe",
    "listName": "Q1 Prospects",
})
lookup_id = lookup["data"]["id"]
print(f"Lookup created: {lookup_id} (status: {lookup['data']['status']})")

# Bulk lookup (up to 500)
bulk_result = api.post("/linkedin-lookups/bulk", json={
    "lookups": [
        {"fullName": "Jane Smith", "company": "Stripe"},
        {"fullName": "Alex Johnson", "company": "Notion"},
        {"fullName": "Sarah Lee"},
    ],
    "listName": "Q1 Prospects",
})
print(f"Created: {bulk_result['data']['created']}, Duplicates: {bulk_result['data']['duplicates']}")


# Poll for completion
def wait_for_lookup(lookup_id, max_wait=120):
    start = time.time()
    while time.time() - start < max_wait:
        result = api.get(f"/linkedin-lookups/{lookup_id}")
        status = result["data"]["status"]

        if status == "completed":
            print(f"Found: {result['data']['linkedinUrlFound']}")
            return result["data"]
        if status in ("failed", "no_results"):
            print(f"Lookup {status}: {result['data'].get('error', 'no results')}")
            return result["data"]

        print(f"Status: {status}, waiting...")
        time.sleep(5)

    raise TimeoutError("Lookup timed out")


# Get lookup stats
lookup_stats = api.get("/linkedin-lookups/stats")
s = lookup_stats["data"]
print(f"Total: {s['total']}, Completed: {s['completed']}, Pending: {s['pending']}")
```

---

## 6. Usage Stats

Monitor your API key activity and error rates.

```python
# Get usage for the last 7 days
usage = api.get("/usage", params={"period": "7d"})

summary = usage["data"]["summary"]
print("API Usage (7d):")
print(f"  Total requests: {summary['total_requests']}")
print(f"  Error rate: {summary['error_rate']}%")
print(f"  Avg response time: {summary['avg_response_time_ms']}ms")

print("\nTop endpoints:")
for ep in usage["data"]["by_endpoint"][:5]:
    print(f"  {ep['method']} {ep['endpoint']}: {ep['count']} requests")

# Check recent errors
errors = api.get("/usage/errors", params={"limit": 10})
if errors["data"]["total"] > 0:
    print(f"\nRecent errors ({errors['data']['total']} total):")
    for err in errors["data"]["errors"]:
        ts = time.strftime("%Y-%m-%d %H:%M", time.gmtime(err["timestamp"]))
        print(f"  {err['method']} {err['endpoint']} -> {err['status_code']} ({ts})")
```
