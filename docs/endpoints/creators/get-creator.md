# Get Creator

Retrieve a single creator by ID with the full creator object.

## Endpoint

`GET /v1/creators/:id`

## Authentication

Required. Team-scoped — the creator must be assigned to the authenticated user's team.

## Request

### Headers

| Header | Type | Required | Description |
|--------|------|----------|-------------|
| `X-API-Key` | string | Yes | API key for authentication |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string (UUID) | Yes | Creator ID |

## Response

### Success (200)

```json
{
  "creator": {
    "id": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "name": "Jane Smith",
    "first_name": "Jane",
    "last_name": "Smith",
    "headline": "VP Marketing at Acme Corp",
    "intro": "Passionate about B2B marketing and growth strategies.",
    "location": "San Francisco, CA",
    "city": "San Francisco",
    "country": "United States",
    "region": "North America",
    "linkedin_url": "https://www.linkedin.com/in/janesmith",
    "linkedin_username": "janesmith",
    "linkedin_followers": 15200,
    "twitter_url": "https://twitter.com/janesmith",
    "twitter_followers": 5400,
    "instagram_url": null,
    "instagram_followers": null,
    "tiktok_url": null,
    "tiktok_followers": null,
    "youtube_url": null,
    "youtube_subscribers": null,
    "newsletter_url": null,
    "newsletter_subscribers": null,
    "website": "https://janesmith.com",
    "profile_photo": "https://example.com/photo.jpg",
    "banner_photo": "https://example.com/banner.jpg",
    "company": "Acme Corp",
    "company_url": "https://acmecorp.com",
    "topics": "marketing, growth, B2B",
    "top_skills": "Content Strategy, SEO, Analytics",
    "creator_hashtags": "#marketing #growth",
    "experience_json": "[{\"title\":\"VP Marketing\",\"company\":\"Acme Corp\",\"start\":\"2024-01\"}]",
    "education_json": "[{\"school\":\"Stanford University\",\"degree\":\"MBA\"}]",
    "email": "jane@acmecorp.com",
    "source_type": "linkedin",
    "vertical": "Marketing",
    "price_min": 500,
    "price_max": 2000,
    "price_tier": "$$$",
    "created_at": "2026-01-15T10:30:00Z",
    "updated_at": "2026-02-20T14:00:00Z"
  }
}
```

### Errors

| Code | Error | Description |
|------|-------|-------------|
| 401 | Unauthorized | Missing or invalid API key |
| 403 | Forbidden | Creator does not belong to user's team |
| 404 | Not Found | Creator with given ID does not exist |
| 500 | Internal Server Error | Server error |

## Example

```bash
curl -X GET "https://api.signals.actor/v1/creators/a1b2c3d4-5678-90ab-cdef-1234567890ab" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Admin users bypass team scoping and can access any creator.
- Related endpoints: `GET /v1/creators/:id/posts` to retrieve the creator's posts.
