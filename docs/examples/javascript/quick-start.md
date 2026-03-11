# JavaScript Quick Start

These examples use the native `fetch` API with modern ES modules.
All requests require an `X-API-Key` header for authentication.

## Setup: Reusable API Helper

```javascript
const SIGNALS_API_KEY = "your-api-key-here";
const BASE_URL = "https://api.signals.actor/v1";

async function signalsApi(path, options = {}) {
  const { method = "GET", body, params } = options;

  let url = `${BASE_URL}${path}`;
  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    }
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const headers = {
    "X-API-Key": SIGNALS_API_KEY,
    ...(body ? { "Content-Type": "application/json" } : {}),
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      `API error ${response.status}: ${error.error || response.statusText}`
    );
  }

  return response.json();
}
```

---

## 1. List Creators

Search, filter, and sort your creator database.

```javascript
// Search for creators matching "marketing", sorted by engagement
const results = await signalsApi("/creators", {
  params: {
    search: "marketing",
    sort: "engagement",
    order: "desc",
    limit: 10,
  },
});

console.log(`Found ${results.meta.total} creators`);
for (const creator of results.data) {
  console.log(`${creator.name} - ${creator.headline}`);
  console.log(`  Followers: ${creator.total_followers}`);
  console.log(`  Engagement rate: ${creator.engagement_rate}%`);
}

// Filter by vertical and minimum followers
const saasCreators = await signalsApi("/creators", {
  params: {
    vertical: "SaaS",
    min_followers: 5000,
    sort: "followers",
    order: "desc",
  },
});

// Get a single creator
const creator = await signalsApi("/creators/550e8400-e29b-41d4-a716-446655440000");
console.log(creator.data);
```

---

## 2. Get Creator Posts

Fetch paginated posts for a specific creator.

```javascript
const creatorId = "550e8400-e29b-41d4-a716-446655440000";

// Get the latest 20 posts
const posts = await signalsApi(`/creators/${creatorId}/posts`, {
  params: { page: 1, limit: 20 },
});

console.log(`Total posts: ${posts.meta.total}`);
for (const post of posts.data) {
  console.log(`[${new Date(post.posted_at * 1000).toLocaleDateString()}]`);
  console.log(`  ${post.text_preview}`);
  console.log(`  Engagement: ${post.engagement} | Likes: ${post.likes} | Comments: ${post.comments}`);
}

// Paginate through all posts
async function getAllPosts(creatorId) {
  const allPosts = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const result = await signalsApi(`/creators/${creatorId}/posts`, {
      params: { page, limit: 100 },
    });
    allPosts.push(...result.data);
    totalPages = result.meta.totalPages;
    page++;
  }

  return allPosts;
}
```

---

## 3. Create a List and Import URLs

Create a list, add existing creators, and import new ones by LinkedIn URL.

```javascript
// Step 1: Create a new list
const newList = await signalsApi("/lists", {
  method: "POST",
  body: {
    name: "Top SaaS Creators",
    description: "High-engagement SaaS thought leaders",
  },
});

const listId = newList.data.id;
console.log(`Created list: ${listId}`);

// Step 2: Add existing creators by ID
const addResult = await signalsApi(`/lists/${listId}/members`, {
  method: "POST",
  body: {
    creator_ids: ["creator-uuid-1", "creator-uuid-2", "creator-uuid-3"],
  },
});
console.log(`Added ${addResult.data.added} creators (total: ${addResult.data.total})`);

// Step 3: Import creators by LinkedIn URL
// Unknown URLs will be automatically enriched
const importResult = await signalsApi(`/lists/${listId}/import`, {
  method: "POST",
  body: {
    linkedin_urls: [
      "https://www.linkedin.com/in/johndoe",
      "https://www.linkedin.com/in/janedoe",
      "https://www.linkedin.com/in/alexsmith",
    ],
  },
});

console.log(`Import results:`);
console.log(`  Added: ${importResult.data.added}`);
console.log(`  New creators: ${importResult.data.created}`);
console.log(`  Already existed: ${importResult.data.existing}`);
console.log(`  Skipped: ${importResult.data.skipped}`);

// Step 4: Check which URLs already exist (optional pre-check)
const checkResult = await signalsApi("/lists/check-urls", {
  method: "POST",
  body: {
    linkedin_urls: [
      "https://www.linkedin.com/in/johndoe",
      "https://www.linkedin.com/in/unknown-person",
    ],
  },
});

for (const entry of checkResult.data) {
  console.log(`${entry.url}: ${entry.exists ? "exists" : "not found"}`);
}
```

---

## 4. Search Posts

Search and filter posts across all creators.

```javascript
// Search post content
const posts = await signalsApi("/posts", {
  params: {
    search: "product launch",
    sort: "engagement",
    order: "desc",
    limit: 10,
  },
});

for (const post of posts.data) {
  console.log(`${post.creator_name} (${post.creator_company})`);
  console.log(`  ${post.text_preview}`);
  console.log(`  Engagement: ${post.engagement} | Likes: ${post.likes}`);
}

// Get posts filtered by list
const listPosts = await signalsApi("/posts", {
  params: {
    list_id: "your-list-id",
    sort: "posted_at",
    order: "desc",
    limit: 50,
  },
});

// Get top posts by engagement
const topPosts = await signalsApi("/posts/top/engagement", {
  params: { limit: 10 },
});

// Get post statistics for a date range
const stats = await signalsApi("/posts/stats/period", {
  params: {
    date_from: Math.floor(Date.now() / 1000) - 30 * 86400, // 30 days ago
    date_to: Math.floor(Date.now() / 1000),
  },
});
console.log(`Posts in period: ${stats.data.total_posts} (${stats.data.personal_posts} original, ${stats.data.reposts} reposts)`);
```

---

## 5. Create a LinkedIn Lookup

Find someone's LinkedIn profile by name and company.

```javascript
// Single lookup
const lookup = await signalsApi("/linkedin-lookups", {
  method: "POST",
  body: {
    fullName: "Jane Smith",
    company: "Stripe",
    listName: "Q1 Prospects",
  },
});

console.log(`Lookup created: ${lookup.data.id} (status: ${lookup.data.status})`);

// Bulk lookup (up to 500)
const bulkResult = await signalsApi("/linkedin-lookups/bulk", {
  method: "POST",
  body: {
    lookups: [
      { fullName: "Jane Smith", company: "Stripe" },
      { fullName: "Alex Johnson", company: "Notion" },
      { fullName: "Sarah Lee" },
    ],
    listName: "Q1 Prospects",
  },
});

console.log(`Created: ${bulkResult.data.created}, Duplicates: ${bulkResult.data.duplicates}`);

// Poll for completion
async function waitForLookup(lookupId, maxWaitMs = 120000) {
  const startTime = Date.now();
  while (Date.now() - startTime < maxWaitMs) {
    const result = await signalsApi(`/linkedin-lookups/${lookupId}`);
    const status = result.data.status;

    if (status === "completed") {
      console.log(`Found: ${result.data.linkedinUrlFound}`);
      return result.data;
    }
    if (status === "failed" || status === "no_results") {
      console.log(`Lookup ${status}: ${result.data.error || "no results"}`);
      return result.data;
    }

    console.log(`Status: ${status}, waiting...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  throw new Error("Lookup timed out");
}

// Get lookup stats
const lookupStats = await signalsApi("/linkedin-lookups/stats");
console.log(`Total: ${lookupStats.data.total}, Completed: ${lookupStats.data.completed}, Pending: ${lookupStats.data.pending}`);
```

---

## 6. Usage Stats

Monitor your API key activity and error rates.

```javascript
// Get usage for the last 7 days
const usage = await signalsApi("/usage", {
  params: { period: "7d" },
});

const summary = usage.data.summary;
console.log(`API Usage (7d):`);
console.log(`  Total requests: ${summary.total_requests}`);
console.log(`  Error rate: ${summary.error_rate}%`);
console.log(`  Avg response time: ${summary.avg_response_time_ms}ms`);

console.log(`\nTop endpoints:`);
for (const ep of usage.data.by_endpoint.slice(0, 5)) {
  console.log(`  ${ep.method} ${ep.endpoint}: ${ep.count} requests`);
}

// Check recent errors
const errors = await signalsApi("/usage/errors", {
  params: { limit: 10 },
});

if (errors.data.total > 0) {
  console.log(`\nRecent errors (${errors.data.total} total):`);
  for (const err of errors.data.errors) {
    console.log(`  ${err.method} ${err.endpoint} -> ${err.status_code} (${new Date(err.timestamp * 1000).toISOString()})`);
  }
}
```
