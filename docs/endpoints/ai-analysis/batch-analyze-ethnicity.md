# Batch Analyze Ethnicity

Analyze the likely ethnicity of multiple people based on their names in a single request. Automatically handles failures and refunds credits for failed analyses.

## Endpoint

`POST /v1/ai-analysis/ethnicity/batch`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field | Type  | Required | Description                          |
|-------|-------|----------|--------------------------------------|
| names | array | Yes      | Array of name objects (1-20 items)   |

Each name object:

| Field      | Type   | Required | Description                    |
|------------|--------|----------|--------------------------------|
| id         | string | Yes      | Caller-provided identifier     |
| first_name | string | Yes      | Person's first name            |
| last_name  | string | Yes      | Person's last name             |

```json
{
  "names": [
    { "id": "n1", "first_name": "Mikhail", "last_name": "Petrov" },
    { "id": "n2", "first_name": "Yuki", "last_name": "Tanaka" },
    { "id": "n3", "first_name": "Maria", "last_name": "Garcia" }
  ]
}
```

## Response

### Success

```json
{
  "results": [
    {
      "id": "n1",
      "first_name": "Mikhail",
      "last_name": "Petrov",
      "analysis": {
        "primary_ethnicity": "east_slavic",
        "secondary_ethnicity": null,
        "confidence": "high",
        "reasoning": "Both names are characteristic of East Slavic naming conventions.",
        "cultural_markers": ["Mikhail is a common Russian male name"]
      }
    },
    {
      "id": "n2",
      "first_name": "Yuki",
      "last_name": "Tanaka",
      "analysis": {
        "primary_ethnicity": "east_asian",
        "secondary_ethnicity": null,
        "confidence": "high",
        "reasoning": "Both names are characteristic of Japanese naming conventions.",
        "cultural_markers": ["Tanaka is one of the most common Japanese surnames"]
      }
    },
    {
      "id": "n3",
      "first_name": "Maria",
      "last_name": "Garcia",
      "analysis": {
        "primary_ethnicity": "hispanic_latino",
        "secondary_ethnicity": null,
        "confidence": "high",
        "reasoning": "Garcia is a very common Hispanic surname.",
        "cultural_markers": ["Garcia is the most common surname in Spain"]
      }
    }
  ],
  "total_analyzed": 3,
  "total_requested": 3,
  "failed_count": 0,
  "credits_refunded": 0,
  "usage": {
    "credits_deducted": 3
  }
}
```

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | names array is required (1-20 items)     |
| 400  | Each name must have id, first_name, and last_name |
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits (requires 1 per name) |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/ai-analysis/ethnicity/batch" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "names": [
      {"id": "n1", "first_name": "Mikhail", "last_name": "Petrov"},
      {"id": "n2", "first_name": "Yuki", "last_name": "Tanaka"}
    ]
  }'
```

## Notes

- Costs 1 credit per name (AI_ENRICHMENT).
- Maximum of 20 names per request.
- Credits are refunded for individual failures within the batch.
- Processing aborts after 3 consecutive failures to prevent excessive credit loss.
- The `id` field is echoed back in results for easy correlation with your input data.
- See the single ethnicity analysis endpoint for the full list of ethnicity and confidence values.
