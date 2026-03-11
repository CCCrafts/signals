# Error Handling

All error responses use a consistent format and appropriate HTTP status codes.

## Error Response Format

```json
{
  "success": false,
  "error": "Description of the problem"
}
```

## HTTP Status Codes

### 400 -- Bad Request

Invalid input, missing required fields, or malformed parameters.

```bash
curl -s -X POST https://api.signals.actor/v1/lists \
  -H "X-API-Key: sk_YOUR_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{}'
```

```json
{
  "success": false,
  "error": "Name is required"
}
```

### 401 -- Unauthorized

Missing or invalid API key.

```json
{
  "success": false,
  "error": "Missing API key"
}
```

```json
{
  "success": false,
  "error": "Invalid API key"
}
```

### 402 -- Insufficient Credits

Your team does not have enough credits to perform the requested action.

```json
{
  "success": false,
  "error": "insufficient_credits",
  "balance": 3
}
```

See [Credits and Billing](credits-and-billing.md) for credit costs and how to check your balance.

### 403 -- Forbidden

The authenticated user does not have permission for this action (e.g., team user accessing an admin-only endpoint).

```json
{
  "success": false,
  "error": "Admin access required"
}
```

### 404 -- Not Found

The requested resource does not exist, or the authenticated user does not have access to it.

```json
{
  "success": false,
  "error": "Creator not found"
}
```

### 429 -- Too Many Requests

Rate limit exceeded. Retry after the delay indicated in the `Retry-After` header.

```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```

See [Rate Limits](rate-limits.md) for recommended retry strategies.

### 500 -- Internal Server Error

Unexpected server-side error.

```json
{
  "success": false,
  "error": "Internal server error"
}
```

### 502 -- Bad Gateway

An upstream service (LinkedIn scraper, Google lookup, etc.) failed to respond.

```json
{
  "success": false,
  "error": "Upstream service unavailable"
}
```

### 503 -- Service Not Configured

A required service or integration is not configured for your environment.

```json
{
  "success": false,
  "error": "Service not configured"
}
```

## Best Practices

1. **Always check `success`** -- parse the `success` boolean before accessing `data`.
2. **Handle 401 early** -- if you receive a 401, verify your API key before retrying.
3. **Retry on 429/502/503** -- use exponential backoff (see [Rate Limits](rate-limits.md)).
4. **Do not retry 400/403/404** -- these indicate client errors that will not resolve with retries.
5. **Log the `error` field** -- the error string provides actionable detail for debugging.
