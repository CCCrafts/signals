# Update Creator

Update an existing creator's editable fields. Only the user who originally added the creator can perform updates.

## Endpoint

`PUT /v1/creators/:id`

## Authentication

Required. Team-scoped — only the creator's original adder can update.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |
| `Content-Type` | string | Yes | `application/json` |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Creator ID |

### Body

Any combination of editable fields. Only provided fields are updated; omitted fields remain unchanged.

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Creator's display name |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `headline` | string | Professional headline |
| `intro` | string | Bio or introduction |
| `location` | string | Full location string |
| `city` | string | City |
| `country` | string | Country |
| `region` | string | Geographic region |
| `linkedin_url` | string | LinkedIn profile URL |
| `linkedin_username` | string | LinkedIn username |
| `twitter_url` | string | Twitter/X profile URL |
| `instagram_url` | string | Instagram profile URL |
| `tiktok_url` | string | TikTok profile URL |
| `youtube_url` | string | YouTube channel URL |
| `newsletter_url` | string | Newsletter URL |
| `website` | string | Personal website URL |
| `profile_photo` | string | Profile photo URL |
| `banner_photo` | string | Banner photo URL |
| `company` | string | Company name |
| `company_url` | string | Company URL |
| `topics` | string | Comma-separated topics |
| `top_skills` | string | Comma-separated skills |
| `creator_hashtags` | string | Hashtags associated with creator |
| `experience_json` | string | JSON-encoded work experience |
| `education_json` | string | JSON-encoded education history |
| `email` | string | Contact email |
| `source_type` | string | Source type |
| `price_min` | number | Minimum price |
| `price_max` | number | Maximum price |
| `price_tier` | string | Price tier label |

## Response

### Success (200)

```json
{
  "creator": {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "name": "Jane Smith",
    "headline": "Chief Marketing Officer at Acme Corp",
    "updated_at": "2026-03-10T14:30:00Z"
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 400 | Bad Request | No valid fields provided or invalid field values |
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | User is not the original adder of this creator |
| 404 | Not Found | Creator with given ID does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X PUT "https://api.signals.actor/v1/creators/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "headline": "Chief Marketing Officer at Acme Corp",
    "company": "Acme Corp",
    "price_tier": "$$$$"
  }'
```

## Notes

- Only the user who originally added the creator can update it. Other team members will receive a `403 Forbidden` response.
- Use `GET /v1/creators/fields` to see the full list of editable vs. read-only fields.
- Read-only fields (e.g. `id`, `linkedin_followers`, `created_at`) are silently ignored if included in the request body.
