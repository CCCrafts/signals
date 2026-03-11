# Rate Limits

The API runs on Cloudflare Workers, which provides built-in rate limiting and DDoS protection.

## Standard Limits

Standard rate limits apply to all authenticated requests. If you exceed the limit, the API returns a `429 Too Many Requests` response with a `Retry-After` header indicating how many seconds to wait.

```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```

## Bulk Endpoint Limits

Certain endpoints accept bulk operations with their own size constraints:

| Endpoint                    | Limit           | Description                        |
|-----------------------------|-----------------|------------------------------------|
| Bulk LinkedIn lookups       | 500 per request | Maximum URLs in a single batch     |
| List import (by URL)        | 100 per request | Maximum creator URLs per import    |

Exceeding these limits returns a `400 Bad Request` with a descriptive error message.

## Recommended Retry Strategy

Use **exponential backoff** when you receive a `429`, `502`, or `503` response:

```python
import time
import requests

def api_request(url, headers, max_retries=5):
    for attempt in range(max_retries):
        response = requests.get(url, headers=headers)

        if response.status_code == 429:
            retry_after = int(response.headers.get("Retry-After", 2 ** attempt))
            time.sleep(retry_after)
            continue

        if response.status_code in (502, 503):
            time.sleep(2 ** attempt)
            continue

        return response

    raise Exception("Max retries exceeded")
```

```bash
# Simple bash retry with backoff
attempt=0
max_retries=5

while [ $attempt -lt $max_retries ]; do
  response=$(curl -s -w "\n%{http_code}" https://api.signals.actor/v1/creators \
    -H "X-API-Key: sk_YOUR_KEY_HERE")

  http_code=$(echo "$response" | tail -1)

  if [ "$http_code" != "429" ] && [ "$http_code" != "502" ] && [ "$http_code" != "503" ]; then
    echo "$response" | head -n -1
    break
  fi

  sleep $((2 ** attempt))
  attempt=$((attempt + 1))
done
```

## Tips

- **Batch where possible** -- use bulk endpoints instead of making many individual requests.
- **Cache responses** -- creator and company data changes infrequently; cache it locally.
- **Parallelize carefully** -- keep concurrent requests reasonable (under 10 in parallel) to avoid triggering rate limits.
- **Monitor 429s** -- a spike in 429 responses indicates you need to slow down or optimize your request pattern.
