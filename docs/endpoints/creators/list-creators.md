# List Creators

Retrieve a paginated list of creators with filtering, searching, and sorting options.

## Endpoint

`GET /v1/creators`

## Authentication

Required. Team-scoped — results are filtered to creators assigned to the authenticated user's team.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number for pagination |
| `limit` | integer | `20` | Number of results per page (max 100) |
| `search` | string | — | Search by creator name, headline, or LinkedIn username |
| `source_type` | string | — | Filter by source type (e.g. `linkedin`, `manual`) |
| `vertical` | string | — | Filter by industry vertical |
| `ai_tag` | string | — | Filter by AI-generated tag |
| `min_followers` | integer | — | Minimum follower count |
| `sort` | string | `created_at` | Sort field. One of: `followers`, `engagement`, `created_at`, `name`, `post_count` |
| `order` | string | `desc` | Sort direction. One of: `asc`, `desc` |

## Response

### Success (200)

```json
{
  "creators": [
    {
      "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
      "name": "Jane Smith",
      "first_name": "Jane",
      "last_name": "Smith",
      "headline": "VP Marketing at Acme Corp",
      "linkedin_url": "https://www.linkedin.com/in/janesmith",
      "linkedin_username": "janesmith",
      "linkedin_followers": 15200,
      "profile_photo": "https://example.com/photo.jpg",
      "company": "Acme Corp",
      "source_type": "linkedin",
      "vertical": "Marketing",
      "post_count": 42,
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "total": 150,
  "page": 1,
  "limit": 20
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | User does not belong to a team |
| 422 | Unprocessable Entity | Invalid query parameters |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators?page=1&limit=10&search=marketing&sort=followers&order=desc" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Results include a computed `post_count` field representing the number of scraped posts for each creator.
- When `search` is combined with filters (`source_type`, `vertical`, `ai_tag`), all conditions are applied together (AND logic).
- Team scoping means users only see creators that have been assigned to their team via the `team_creators` junction table.
- Admin users bypass team filtering and can see all creators.
