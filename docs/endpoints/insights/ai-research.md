# AI Research

Run AI-powered research on a creator using Perplexity Sonar Pro. Generates a structured research report and saves it as an insight entry.

## Endpoint

`POST /v1/creators/:id/insights/research`

## Authentication

Required. Team-scoped.

## Request

### Path Parameters

| Parameter | Type   | Required | Description     |
|-----------|--------|----------|-----------------|
| id        | string | Yes      | The creator ID  |

No request body required.

## Response

### Success

```json
{
  "entry": {
    "id": "ent_333",
    "content": "{\"bio\": \"...\", \"interesting_facts\": [...], ...}",
    "entry_type": "ai_research",
    "created_at": "2026-03-10T14:00:00Z"
  },
  "research": {
    "bio": "Jane Smith is a technology executive with 15 years of experience...",
    "interesting_facts": [
      "Founded a nonprofit for women in tech in 2020",
      "Holds 3 patents in distributed systems"
    ],
    "interests": [
      "Distributed computing",
      "Mentorship",
      "Open source"
    ],
    "projects": [
      "Project Aurora - large-scale data migration platform",
      "TechBridge mentorship program"
    ],
    "achievements": [
      "Forbes 30 Under 30 in 2018",
      "Led team that scaled platform to 10M users"
    ]
  },
  "sources": [
    "https://example.com/article-about-jane",
    "https://techcrunch.com/jane-smith-interview"
  ]
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits (requires 1 credit) |
| 404  | Creator not found                        |
| 500  | AI research failed                       |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/creators/cr_def456/insights/research" \
  -H "X-API-Key: your-api-key"
```

## Notes

- Costs 1 credit (AI_ENRICHMENT).
- Credits are refunded if the research fails.
- The research result is automatically saved as an insight entry with `entry_type: "ai_research"`.
- If no parent insight exists for this creator, one is auto-created.
- Uses Perplexity Sonar Pro for web-based research.
