# Engagement Layer

Cached, on-demand LinkedIn engagement in **both directions** over one shared graph:

- **Inbound** — who engaged with a creator's posts (reactions + comments)
- **Outbound** — what a creator engaged with (their own reactions + comments)

Data is fetched once, cached, and refreshed **incrementally** — you only pay for new
items. Partner service-account keys are allowed (team-owned data, unlike `/v1/engagements`).

| Endpoint | Purpose |
| --- | --- |
| [`GET /v1/creators/:id/engagers`](./get-engagers) | Inbound: warmth-ranked engagers |
| [`GET /v1/creators/:id/engaged`](./get-engaged) | Outbound: engaged posts + authors + coverage |
| [`POST /v1/creators/:id/engagement/scan`](./request-scan) | On-demand scan (either direction) |
| [`GET /v1/engagement/scan/:job_id`](./poll-scan) | Poll a scan job |
| [`POST /v1/creators/:id/engagement/subscribe`](./subscribe) | Standing keep-fresh subscription |
| [`GET /v1/creators/:id/engagement/coverage`](./get-coverage) | Freshness/completeness rollup |

## Billing model

| Action | Cost | When |
| --- | --- | --- |
| Reading cached data | free | any GET |
| Inbound scan | `audience_scan` = 1 credit **per post**, billed factually as scans run | subscription cadence / on-demand |
| Outbound scan | `engagement_scan` = 1 credit flat per request | at request time |
| Engager profile enrichment | `linkedin_profile` = 10 credits per engager, once ever | only with `enrich_profiles: true` |

**"Scan = subscribe"**: an inbound scan request creates a *recurring* audience
subscription for your team — that subscription is also the read-gate for
`GET /engagers`. Cancelling (`DELETE …/engagement/subscribe?direction=inbound`) stops
the scanning **and closes the read-gate**; re-subscribe to regain access. Outbound
unsubscribe only clears the recurrence — collected data stays readable via team visibility.
