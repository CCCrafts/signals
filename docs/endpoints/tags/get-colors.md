# Get Tag Colors

Retrieve the list of predefined hex color strings available for tags.

## Endpoint

`GET /v1/tags/colors`

## Authentication

Required. `X-API-Key` header.

## Request

No parameters required.

## Response

### Success

```json
[
  "#FF5733",
  "#3498DB",
  "#2ECC71",
  "#E74C3C",
  "#9B59B6",
  "#F39C12",
  "#1ABC9C",
  "#E67E22",
  "#34495E",
  "#95A5A6"
]
```

### Errors

| Code | Error |
|------|-------|
| 401  | Unauthorized. Missing or invalid API key. |

## Example

```bash
curl https://api.signals.actor/v1/tags/colors \
  -H "X-API-Key: your-api-key"
```

## Notes

- Returns a fixed set of 10 predefined hex color strings.
- Use these values when creating or updating tags to ensure consistent styling.
