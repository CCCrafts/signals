# signals.actor API — AI Assistant Capability

## Name
signals-api

## Description
REST API for signals.actor — a creator intelligence platform for discovering, tracking, and engaging with LinkedIn creators. Provides endpoints for managing creators, companies, posts, lists, tags, LinkedIn lookups, deep scrapes, insights, AI analysis, and integrations.

## Base URL
```
https://api.signals.actor/v1
```

## Authentication
All endpoints require an `X-API-Key` header with a valid API key.

```
X-API-Key: sk_your_api_key_here
```

API keys follow the format `sk_` + 32 hex characters. Keys are scoped to a user and team — non-admin keys only access data belonging to their team.

## Quick Reference

### Resources

| Resource | Endpoints | Base Path | Auth |
|---|---|---|---|
| Creators | 10 | `/v1/creators` | Team-scoped |
| Companies | 8 | `/v1/companies` | Team-scoped |
| Posts | 9 | `/v1/posts` | Team-scoped |
| Leads | 6 | `/v1/leads` | Admin only |
| Signals | 6 | `/v1/signals` | Read: all, Write: admin |
| Stats | 4 | `/v1/stats` | Team-scoped |
| Lists | 13 | `/v1/lists` | Owner + shared |
| Tags | 12 | `/v1/tags` | Owner + shared |
| Usage | 2 | `/v1/usage` | Own key only |
| LinkedIn Lookups | 8 | `/v1/linkedin-lookups` | Team-scoped |
| Deep Scrape | 4 | `/v1/deep-scrape-queue` | Team-scoped |
| Insights | 9 | `/v1/creators/:id/insights` | Team-scoped |
| AI Analysis | 2 | `/v1/ai-analysis` | Team-scoped |
| Integrations | 6 | `/v1/integrations` | Team-scoped |

### Credit Costs

| Action | Cost |
|---|---|
| Google Lookup | 10 credits |
| LinkedIn Profile (deep scrape) | 10 credits |
| Post Scraped | 1 credit |
| AI Enrichment | 1 credit |
| Media Processed | 1 credit |
| Daily Tracking Overage | 1 credit/creator/month |

### Response Envelope

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common Patterns

- **Pagination**: `?page=1&limit=20` (max 100)
- **Sorting**: `?sort=followers&order=desc`
- **Search**: `?search=keyword`
- **Filtering**: Resource-specific query params (e.g., `?vertical=tech&min_followers=10000`)
- **Timestamps**: Unix epoch seconds
- **IDs**: UUID v4
- **Booleans**: 0/1 integers
