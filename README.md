<p align="center">
  <img src="logo.webp" alt="signals.actor" width="120" />
</p>

<h1 align="center">signals.actor API Documentation</h1>

<p align="center">
  Creator intelligence platform — discover, track, and engage with LinkedIn creators at scale.
</p>

<p align="center">
  <a href="https://api.signals.actor/v1">Base URL</a> ·
  <a href="docs/getting-started.md">Quick Start</a> ·
  <a href="docs/authentication.md">Authentication</a> ·
  <a href="schema/openapi.yaml">OpenAPI Spec</a>
</p>

---

## Quick Start

### 1. List your creators

```bash
curl -H "X-API-Key: sk_your_key_here" \
  https://api.signals.actor/v1/creators?limit=5
```

### 2. Search posts by keyword

```bash
curl -H "X-API-Key: sk_your_key_here" \
  "https://api.signals.actor/v1/posts?search=AI&sort=engagement&order=desc"
```

### 3. Create a list and import creators

```bash
# Create a list
curl -X POST -H "X-API-Key: sk_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"name": "AI Influencers"}' \
  https://api.signals.actor/v1/lists

# Import by LinkedIn URLs
curl -X POST -H "X-API-Key: sk_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"linkedin_urls": ["https://www.linkedin.com/in/example"]}' \
  https://api.signals.actor/v1/lists/{list_id}/import
```

---

## API Endpoints

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| **Creators** | | | |
| | GET | [`/v1/creators`](docs/endpoints/creators/list-creators.md) | List creators with filters |
| | GET | [`/v1/creators/fields`](docs/endpoints/creators/get-fields.md) | Get available field definitions |
| | GET | [`/v1/creators/sources`](docs/endpoints/creators/get-sources.md) | Get source types with counts |
| | GET | [`/v1/creators/ai-tags`](docs/endpoints/creators/get-ai-tags.md) | Get AI tags with counts |
| | GET | [`/v1/creators/verticals`](docs/endpoints/creators/get-verticals.md) | Get verticals with counts |
| | GET | [`/v1/creators/:id`](docs/endpoints/creators/get-creator.md) | Get single creator |
| | GET | [`/v1/creators/:id/posts`](docs/endpoints/creators/get-creator-posts.md) | Get creator's posts |
| | POST | [`/v1/creators`](docs/endpoints/creators/create-creator.md) | Create a new creator |
| | PUT | [`/v1/creators/:id`](docs/endpoints/creators/update-creator.md) | Update a creator |
| | DELETE | [`/v1/creators/:id`](docs/endpoints/creators/delete-creator.md) | Delete a creator |
| **Companies** | | | |
| | GET | [`/v1/companies`](docs/endpoints/companies/list-companies.md) | List companies with filters |
| | GET | [`/v1/companies/fields`](docs/endpoints/companies/get-fields.md) | Get field definitions |
| | GET | [`/v1/companies/industries`](docs/endpoints/companies/get-industries.md) | Get industries with counts |
| | GET | [`/v1/companies/:id`](docs/endpoints/companies/get-company.md) | Get company with employees |
| | GET | [`/v1/companies/:id/creators`](docs/endpoints/companies/get-company-creators.md) | Get company's creators |
| | POST | [`/v1/companies`](docs/endpoints/companies/create-company.md) | Create a company |
| | PUT | [`/v1/companies/:id`](docs/endpoints/companies/update-company.md) | Update a company |
| | DELETE | [`/v1/companies/:id`](docs/endpoints/companies/delete-company.md) | Delete a company |
| **Posts** | | | |
| | GET | [`/v1/posts`](docs/endpoints/posts/list-posts.md) | List posts with filters |
| | GET | [`/v1/posts/:id`](docs/endpoints/posts/get-post.md) | Get single post |
| | GET | [`/v1/posts/stats/period`](docs/endpoints/posts/get-period-stats.md) | Post stats for date range |
| | GET | [`/v1/posts/virality/stats`](docs/endpoints/posts/get-virality-stats.md) | Virality tier breakdown |
| | GET | [`/v1/posts/companies/list`](docs/endpoints/posts/get-companies-list.md) | Companies with post counts |
| | GET | [`/v1/posts/bookmarks`](docs/endpoints/posts/get-bookmarks.md) | Get bookmarked post IDs |
| | GET | [`/v1/posts/top/engagement`](docs/endpoints/posts/get-top-engagement.md) | Top posts by engagement |
| | POST | [`/v1/posts/:id/bookmark`](docs/endpoints/posts/toggle-bookmark.md) | Toggle post bookmark |
| | DELETE | [`/v1/posts/:id`](docs/endpoints/posts/delete-post.md) | Delete post (admin) |
| **Leads** | | | |
| | GET | [`/v1/leads`](docs/endpoints/leads/list-leads.md) | List leads (admin) |
| | GET | [`/v1/leads/:id`](docs/endpoints/leads/get-lead.md) | Get single lead (admin) |
| | GET | [`/v1/leads/by-signal/:signalName`](docs/endpoints/leads/get-leads-by-signal.md) | Get leads by signal (admin) |
| | PUT | [`/v1/leads/:id`](docs/endpoints/leads/update-lead.md) | Update lead (admin) |
| | DELETE | [`/v1/leads/:id`](docs/endpoints/leads/delete-lead.md) | Delete lead (admin) |
| | POST | [`/v1/leads/export`](docs/endpoints/leads/export-leads.md) | Export leads as CSV (admin) |
| **Signals** | | | |
| | GET | [`/v1/signals`](docs/endpoints/signals/list-signals.md) | List all signals |
| | GET | [`/v1/signals/:id`](docs/endpoints/signals/get-signal.md) | Get single signal |
| | GET | [`/v1/signals/:id/leads`](docs/endpoints/signals/get-signal-leads.md) | Get signal's leads (admin) |
| | POST | [`/v1/signals`](docs/endpoints/signals/create-signal.md) | Create signal (admin) |
| | PUT | [`/v1/signals/:id`](docs/endpoints/signals/update-signal.md) | Update signal (admin) |
| | DELETE | [`/v1/signals/:id`](docs/endpoints/signals/delete-signal.md) | Delete signal (admin) |
| **Stats** | | | |
| | GET | [`/v1/stats`](docs/endpoints/stats/get-dashboard-stats.md) | Dashboard summary |
| | GET | [`/v1/stats/creators`](docs/endpoints/stats/get-creator-stats.md) | Creator analytics |
| | GET | [`/v1/stats/posts`](docs/endpoints/stats/get-post-stats.md) | Post analytics |
| | GET | [`/v1/stats/leads`](docs/endpoints/stats/get-lead-stats.md) | Lead analytics (admin) |
| **Lists** | | | |
| | GET | [`/v1/lists`](docs/endpoints/lists/list-lists.md) | Get all lists |
| | GET | [`/v1/lists/:id`](docs/endpoints/lists/get-list.md) | Get list with members |
| | POST | [`/v1/lists`](docs/endpoints/lists/create-list.md) | Create a list |
| | PUT | [`/v1/lists/:id`](docs/endpoints/lists/update-list.md) | Update a list |
| | DELETE | [`/v1/lists/:id`](docs/endpoints/lists/delete-list.md) | Delete a list |
| | POST | [`/v1/lists/:id/members`](docs/endpoints/lists/add-members.md) | Add creators to list |
| | DELETE | [`/v1/lists/:id/members`](docs/endpoints/lists/remove-members.md) | Remove creators from list |
| | POST | [`/v1/lists/:id/import`](docs/endpoints/lists/import-urls.md) | Import by LinkedIn URLs |
| | POST | [`/v1/lists/import-urls`](docs/endpoints/lists/import-urls-no-list.md) | Import URLs (no list) |
| | POST | [`/v1/lists/check-urls`](docs/endpoints/lists/check-urls.md) | Check existing URLs |
| | POST | [`/v1/lists/:id/share`](docs/endpoints/lists/share-list.md) | Share list |
| | DELETE | [`/v1/lists/:id/share`](docs/endpoints/lists/unshare-list.md) | Remove list share |
| | GET | [`/v1/lists/:id/share/users`](docs/endpoints/lists/get-share-users.md) | Get shareable users |
| **Tags** | | | |
| | GET | [`/v1/tags`](docs/endpoints/tags/list-tags.md) | Get all tags |
| | GET | [`/v1/tags/colors`](docs/endpoints/tags/get-colors.md) | Get predefined colors |
| | GET | [`/v1/tags/:id`](docs/endpoints/tags/get-tag.md) | Get single tag |
| | POST | [`/v1/tags`](docs/endpoints/tags/create-tag.md) | Create a tag |
| | PUT | [`/v1/tags/:id`](docs/endpoints/tags/update-tag.md) | Update a tag |
| | DELETE | [`/v1/tags/:id`](docs/endpoints/tags/delete-tag.md) | Delete a tag |
| | POST | [`/v1/tags/:id/creators`](docs/endpoints/tags/add-creators-to-tag.md) | Add creators to tag |
| | DELETE | [`/v1/tags/:id/creators`](docs/endpoints/tags/remove-creators-from-tag.md) | Remove creators from tag |
| | GET | [`/v1/tags/creators/:creatorId`](docs/endpoints/tags/get-creator-tags.md) | Get creator's tags |
| | POST | [`/v1/tags/creators/:creatorId`](docs/endpoints/tags/set-creator-tags.md) | Set creator's tags |
| | POST | [`/v1/tags/:id/share`](docs/endpoints/tags/share-tag.md) | Share tag |
| | DELETE | [`/v1/tags/:id/share`](docs/endpoints/tags/unshare-tag.md) | Unshare tag |
| **Usage** | | | |
| | GET | [`/v1/usage`](docs/endpoints/usage/get-usage-stats.md) | API key usage stats |
| | GET | [`/v1/usage/errors`](docs/endpoints/usage/get-usage-errors.md) | Recent API errors |
| **LinkedIn Lookups** | | | |
| | POST | [`/v1/linkedin-lookups`](docs/endpoints/linkedin-lookups/create-lookup.md) | Create single lookup |
| | POST | [`/v1/linkedin-lookups/bulk`](docs/endpoints/linkedin-lookups/bulk-create.md) | Bulk create lookups |
| | GET | [`/v1/linkedin-lookups`](docs/endpoints/linkedin-lookups/list-lookups.md) | List lookups |
| | GET | [`/v1/linkedin-lookups/:id`](docs/endpoints/linkedin-lookups/get-lookup.md) | Get single lookup |
| | GET | [`/v1/linkedin-lookups/stats`](docs/endpoints/linkedin-lookups/get-stats.md) | Lookup statistics |
| | DELETE | [`/v1/linkedin-lookups/:id`](docs/endpoints/linkedin-lookups/delete-lookup.md) | Delete lookup |
| | POST | [`/v1/linkedin-lookups/:id/retry`](docs/endpoints/linkedin-lookups/retry-lookup.md) | Retry failed lookup |
| | POST | [`/v1/linkedin-lookups/resume-paused`](docs/endpoints/linkedin-lookups/resume-paused.md) | Resume paused lookups |
| **Deep Scrape** | | | |
| | POST | [`/v1/deep-scrape-queue`](docs/endpoints/deep-scrape/queue-creator.md) | Queue creator for scrape |
| | GET | [`/v1/deep-scrape-queue`](docs/endpoints/deep-scrape/list-queue.md) | List queue entries |
| | GET | [`/v1/deep-scrape-queue/stats`](docs/endpoints/deep-scrape/get-stats.md) | Queue statistics |
| | POST | [`/v1/deep-scrape-queue/resume-paused`](docs/endpoints/deep-scrape/resume-paused.md) | Resume paused entries |
| **Insights** | | | |
| | GET | [`/v1/creators/:id/insights`](docs/endpoints/insights/get-insights.md) | Get creator insights |
| | PUT | [`/v1/creators/:id/insights`](docs/endpoints/insights/upsert-insights.md) | Upsert insight content |
| | DELETE | [`/v1/creators/:id/insights`](docs/endpoints/insights/delete-insights.md) | Delete insights |
| | GET | [`/v1/creators/:id/insights/history`](docs/endpoints/insights/get-history.md) | Get version history |
| | POST | [`/v1/creators/:id/insights/research`](docs/endpoints/insights/ai-research.md) | AI-powered research |
| | PUT | [`/v1/creators/:id/insights/share`](docs/endpoints/insights/toggle-sharing.md) | Toggle sharing |
| | POST | [`/v1/creators/:id/insights/entries`](docs/endpoints/insights/add-entry.md) | Add timeline entry |
| | PUT | [`/v1/creators/:id/insights/entries/:entryId`](docs/endpoints/insights/edit-entry.md) | Edit timeline entry |
| | DELETE | [`/v1/creators/:id/insights/entries/:entryId`](docs/endpoints/insights/delete-entry.md) | Delete timeline entry |
| **AI Analysis** | | | |
| | POST | [`/v1/ai-analysis/ethnicity`](docs/endpoints/ai-analysis/analyze-ethnicity.md) | Analyze name ethnicity |
| | POST | [`/v1/ai-analysis/ethnicity/batch`](docs/endpoints/ai-analysis/batch-analyze-ethnicity.md) | Batch analyze ethnicity |
| **Integrations** | | | |
| | GET | [`/v1/integrations/linkedin/status`](docs/endpoints/integrations/get-linkedin-status.md) | LinkedIn connection status |
| | POST | [`/v1/integrations/linkedin/react`](docs/endpoints/integrations/send-reaction.md) | Send LinkedIn reaction |
| | DELETE | [`/v1/integrations/linkedin/react`](docs/endpoints/integrations/remove-reaction.md) | Remove LinkedIn reaction |
| | POST | [`/v1/integrations/linkedin/comment`](docs/endpoints/integrations/send-comment.md) | Post LinkedIn comment |
| | POST | [`/v1/integrations/linkedin/select-account`](docs/endpoints/integrations/select-account.md) | Select LinkedIn account |
| | GET | [`/v1/integrations/linkedin/reactions`](docs/endpoints/integrations/get-reactions.md) | Get user's reactions |

---

## Authentication

All API requests require an `X-API-Key` header. See [Authentication Guide](docs/authentication.md).

```bash
curl -H "X-API-Key: sk_your_api_key_here" https://api.signals.actor/v1/creators
```

## Credits

Actions that consume external resources cost credits. See [Credits & Billing Guide](docs/guides/credits-and-billing.md).

| Action | Credits |
|---|---|
| Google Lookup (name search) | 10 |
| LinkedIn Profile (deep scrape) | 10 |
| Post Scraped | 1 |
| AI Enrichment | 1 |
| Media Processed | 1 |
| Daily Tracking Overage | 1/creator/month |

Enterprise teams have unlimited credits (balance = -1).

## Guides

- [Getting Started](docs/getting-started.md) — Your first API call
- [Authentication](docs/authentication.md) — API keys, roles, team scoping
- [Credits & Billing](docs/guides/credits-and-billing.md) — Credit costs and billing
- [Team Scoping](docs/guides/team-scoping.md) — How data access works
- [Pagination & Filtering](docs/guides/pagination-and-filtering.md) — Query patterns
- [Error Handling](docs/guides/error-handling.md) — Error codes and responses
- [Rate Limits](docs/guides/rate-limits.md) — Request limits

## Examples

- [cURL Quick Start](docs/examples/curl/quick-start.md)
- [JavaScript Quick Start](docs/examples/javascript/quick-start.md)
- [Python Quick Start](docs/examples/python/quick-start.md)

---

Copyright (c) 2026 Creative Content Crafts, Inc. — [MIT License](LICENSE)
