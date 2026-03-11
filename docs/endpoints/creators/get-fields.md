# Get Creator Fields

Retrieve the list of editable and read-only fields available on creator objects. Useful for building dynamic forms or understanding which fields can be updated via the API.

## Endpoint

`GET /v1/creators/fields`

## Authentication

Required.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

## Response

### Success (200)

```json
{
  "editable": [
    "name",
    "first_name",
    "last_name",
    "headline",
    "intro",
    "location",
    "city",
    "country",
    "region",
    "linkedin_url",
    "linkedin_username",
    "twitter_url",
    "instagram_url",
    "tiktok_url",
    "youtube_url",
    "newsletter_url",
    "website",
    "profile_photo",
    "banner_photo",
    "company",
    "company_url",
    "topics",
    "top_skills",
    "creator_hashtags",
    "experience_json",
    "education_json",
    "email",
    "source_type",
    "price_min",
    "price_max",
    "price_tier"
  ],
  "readonly": [
    "id",
    "linkedin_followers",
    "twitter_followers",
    "instagram_followers",
    "tiktok_followers",
    "youtube_subscribers",
    "newsletter_subscribers",
    "created_at",
    "updated_at"
  ]
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/fields" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Editable fields can be set when creating a creator (`POST /v1/creators`) or updating one (`PUT /v1/creators/:id`).
- Read-only fields are system-managed and cannot be modified through the API.
- `experience_json` and `education_json` accept JSON-encoded strings representing structured work history and education data.
- `price_min` and `price_max` are numeric values; `price_tier` is a string label (e.g. `"$$"`, `"$$$"`).
