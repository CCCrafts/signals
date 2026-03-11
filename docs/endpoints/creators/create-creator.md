# Create Creator

Create a new creator and add them to a list. The creator is automatically assigned to the authenticated user's team.

## Endpoint

`POST /v1/creators`

## Authentication

Required. The creator is assigned to the authenticated user's team.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |
| `Content-Type` | string | Yes | `application/json` |

### Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Creator's display name |
| `list_id` | string (UUID) | Yes | ID of the list to add the creator to |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `headline` | string | No | Professional headline |
| `intro` | string | No | Bio or introduction |
| `location` | string | No | Full location string |
| `city` | string | No | City |
| `country` | string | No | Country |
| `region` | string | No | Geographic region |
| `linkedin_url` | string | No | LinkedIn profile URL |
| `linkedin_username` | string | No | LinkedIn username |
| `twitter_url` | string | No | Twitter/X profile URL |
| `instagram_url` | string | No | Instagram profile URL |
| `tiktok_url` | string | No | TikTok profile URL |
| `youtube_url` | string | No | YouTube channel URL |
| `newsletter_url` | string | No | Newsletter URL |
| `website` | string | No | Personal website URL |
| `profile_photo` | string | No | Profile photo URL |
| `banner_photo` | string | No | Banner photo URL |
| `company` | string | No | Company name |
| `company_url` | string | No | Company URL |
| `topics` | string | No | Comma-separated topics |
| `top_skills` | string | No | Comma-separated skills |
| `creator_hashtags` | string | No | Hashtags associated with creator |
| `experience_json` | string | No | JSON-encoded work experience |
| `education_json` | string | No | JSON-encoded education history |
| `email` | string | No | Contact email |
| `source_type` | string | No | Source type (e.g. `manual`, `linkedin`) |
| `price_min` | number | No | Minimum price |
| `price_max` | number | No | Maximum price |
| `price_tier` | string | No | Price tier label |

## Response

### Success (201)

```json
{
  "creator": {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "name": "Jane Smith",
    "first_name": "Jane",
    "last_name": "Smith",
    "headline": "VP Marketing at Acme Corp",
    "source_type": "manual",
    "created_at": "2026-03-10T12:00:00Z"
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | Missing required fields (`name`, `list_id`) |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | User does not belong to a team |
| 404 | Not Found | List with given `list_id` does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/creators" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "list_id": "c3d4e5f6-7890-12ab-cdef-345678901234",
    "first_name": "Jane",
    "last_name": "Smith",
    "headline": "VP Marketing at Acme Corp",
    "linkedin_url": "https://www.linkedin.com/in/janesmith",
    "company": "Acme Corp",
    "source_type": "manual"
  }'
```

## Notes

- The creator is automatically added to the specified list and assigned to the user's team via the `team_creators` junction table.
- Use `GET /v1/creators/fields` to see the full list of editable fields.
- To retrieve available lists, use the Lists endpoints.
