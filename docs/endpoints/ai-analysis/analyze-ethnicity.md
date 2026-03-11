# Analyze Ethnicity

Analyze the likely ethnicity of a person based on their name using AI. Returns a primary and optional secondary ethnicity with confidence level and reasoning.

## Endpoint

`POST /v1/ai-analysis/ethnicity`

## Authentication

Required. Team-scoped.

## Request

### Body

| Field      | Type   | Required | Description          |
|------------|--------|----------|----------------------|
| first_name | string | Yes      | Person's first name  |
| last_name  | string | Yes      | Person's last name   |

```json
{
  "first_name": "Mikhail",
  "last_name": "Petrov"
}
```

## Response

### Success

```json
{
  "analysis": {
    "primary_ethnicity": "east_slavic",
    "secondary_ethnicity": null,
    "confidence": "high",
    "reasoning": "Both first and last names are characteristic of East Slavic (Russian/Ukrainian/Belarusian) naming conventions.",
    "cultural_markers": [
      "Mikhail is a common Russian male name",
      "Petrov is a patronymic-derived Russian surname"
    ]
  },
  "usage": {
    "credits_deducted": 1
  }
}
```

### Ethnicity Values

`east_slavic`, `hispanic_latino`, `italian`, `east_asian`, `south_asian`, `arabic_middle_eastern`, `jewish`, `african`, `germanic`, `nordic`, `anglo_saxon`, `french`, `greek`, `other_european`, `other`

### Confidence Values

`low`, `medium`, `high`

### Errors

| Code | Error                                    |
|------|------------------------------------------|
| 400  | first_name and last_name are required    |
| 401  | Missing or invalid API key               |
| 402  | Insufficient credits (requires 1 credit) |
| 500  | AI analysis failed                       |

## Example

```bash
curl -X POST "https://api.signals.actor/v1/ai-analysis/ethnicity" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"first_name": "Mikhail", "last_name": "Petrov"}'
```

## Notes

- Costs 1 credit (AI_ENRICHMENT).
- Credits are refunded if the analysis fails.
- The `secondary_ethnicity` is null when the name strongly indicates a single ethnicity.
- Results are probabilistic estimates based on name patterns, not definitive identifiers.
