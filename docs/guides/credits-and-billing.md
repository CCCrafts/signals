# Credits and Billing

Actions that consume external resources cost credits. Credits are deducted from your team's balance before the action is performed. If the action fails, credits are refunded.

## Credit Costs

| Action                  | Cost (credits) | Description                              |
|-------------------------|----------------|------------------------------------------|
| `GOOGLE_LOOKUP`         | 10             | Google search to find a LinkedIn profile  |
| `LINKEDIN_PROFILE`      | 10             | Scraping a LinkedIn profile               |
| `POST_SCRAPED`          | 1              | Scraping a single post                    |
| `AI_ENRICHMENT`         | 1              | AI-powered creator enrichment             |
| `MEDIA_PROCESSED`       | 1              | Processing a media attachment             |
| `DAILY_TRACKING_OVERAGE`| 1              | Per creator, per month, for daily tracking|

## Enterprise Plans

Teams on enterprise plans have a balance of `-1`, which represents unlimited credits. No deductions are made, and credit checks are bypassed entirely.

## Checking Your Balance

```bash
curl -s https://api.signals.actor/v1/usage \
  -H "X-API-Key: sk_YOUR_KEY_HERE" | jq
```

## Insufficient Credits

When your team's balance cannot cover the cost of an action, the API returns a `402` status:

```json
{
  "success": false,
  "error": "insufficient_credits",
  "balance": 3
}
```

When credits are exhausted, active lookups and scraping jobs are paused automatically. They can be resumed once credits are added:

- `POST /v1/linkedin-lookups/resume-paused`
- `POST /v1/deep-scrape-queue/resume-paused`

## Credit Lifecycle

1. **Check** -- the system verifies the team has enough credits.
2. **Deduct** -- credits are subtracted before the action runs.
3. **Execute** -- the action is performed (scrape, lookup, enrichment).
4. **Refund on failure** -- if the action fails, deducted credits are returned.

## Monthly Tracking Overage

On the first of each month, a cron job calculates tracking overage. Teams are charged 1 credit per creator per month for daily tracking beyond their plan's included amount.
