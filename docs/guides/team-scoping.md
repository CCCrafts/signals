# Team Scoping

The API enforces data isolation between teams automatically. You do not need to pass team identifiers in your requests.

## How It Works

1. Your API key is linked to a user, and that user belongs to a team.
2. Authentication middleware resolves the team from the key on every request.
3. All queries are filtered through the `team_creators` junction table, which maps creators to teams in a many-to-many relationship.

## Scoping by Role

### Admin Users

Admin users bypass team scoping entirely. They see all creators, posts, companies, and other resources across every team.

### Team Users

Non-admin users only see:

- **Creators** assigned to their team via `team_creators`
- **Posts** belonging to those creators
- **Companies** associated with those creators
- **LinkedIn lookups** queued by their team
- **Lists** they own or that are shared with their team
- **Tags** they own or that are shared with their team

### No Team

If a user has no team association, queries return empty results.

## Affected Endpoints

Team scoping applies to these resource endpoints:

- `GET /v1/creators` -- list, search, verticals, AI tags, companies
- `GET /v1/posts` -- filtered to team creators
- `GET /v1/companies` -- filtered to team creators
- `GET /v1/linkedin-lookups` -- filtered to team queued lookups
- `GET /v1/lists` -- owner + shared model

## Lists and Tags

Lists and tags use an **owner + shared** model:

- The creating user owns the list/tag.
- Lists/tags can be shared within the team.
- Team users see their own lists/tags plus any shared by teammates.
- Admins see all lists/tags.

## Managing Team Creators (Admin Only)

Admins can manage the creator-team mapping directly:

```bash
# List creators assigned to a team
curl -s https://api.signals.actor/v1/teams/TEAM_ID/creators \
  -H "X-API-Key: sk_ADMIN_KEY"

# Assign a creator to a team
curl -s -X POST https://api.signals.actor/v1/teams/TEAM_ID/creators \
  -H "X-API-Key: sk_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "creator_id": "CREATOR_ID" }'

# Remove a creator from a team
curl -s -X DELETE https://api.signals.actor/v1/teams/TEAM_ID/creators/CREATOR_ID \
  -H "X-API-Key: sk_ADMIN_KEY"
```
