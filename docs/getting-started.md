# Getting Started

This guide walks you through making your first requests to the signals.actor API.

## Base URL

```
https://api.signals.actor/v1
```

## Step 1: Get Your API Key

Your team admin provides an API key. Keys use the format `sk_` followed by 32 hexadecimal characters:

```
sk_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
```

Pass it via the `X-API-Key` header on every request.

## Step 2: Make Your First Request

Verify your key works by listing creators:

```bash
curl -s https://api.signals.actor/v1/creators \
  -H "X-API-Key: sk_YOUR_KEY_HERE" | jq
```

## Response Envelope

All responses follow this structure:

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 142,
    "totalPages": 8
  }
}
```

On error, the response looks like:

```json
{
  "success": false,
  "error": "Description of the problem"
}
```

## Step 3: List Creators

Fetch paginated creators with optional filtering:

```bash
curl -s "https://api.signals.actor/v1/creators?page=1&limit=10" \
  -H "X-API-Key: sk_YOUR_KEY_HERE" | jq
```

## Step 4: Search Posts

Search across scraped posts:

```bash
curl -s "https://api.signals.actor/v1/posts?search=product%20launch&limit=5" \
  -H "X-API-Key: sk_YOUR_KEY_HERE" | jq
```

## Step 5: Create a List

Organize creators into a named list:

```bash
curl -s -X POST https://api.signals.actor/v1/lists \
  -H "X-API-Key: sk_YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Top Prospects",
    "description": "High-priority creator outreach list"
  }' | jq
```

Add a creator to the list:

```bash
curl -s -X POST https://api.signals.actor/v1/lists/LIST_ID/creators \
  -H "X-API-Key: sk_YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{ "creator_id": "CREATOR_ID" }' | jq
```

## Next Steps

- [Authentication](authentication.md) -- key format, roles, and error handling
- [Credits and Billing](guides/credits-and-billing.md) -- understand credit costs
- [Pagination and Filtering](guides/pagination-and-filtering.md) -- query parameters
- [Error Handling](guides/error-handling.md) -- error response format and codes
