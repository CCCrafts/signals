import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Signals',
  description: 'Creator intelligence platform API documentation',
  head: [['link', { rel: 'icon', href: '/logo.webp' }]],

  themeConfig: {
    logo: '/logo.webp',
    nav: [
      { text: 'Quick Start', link: '/getting-started' },
      { text: 'API Reference', link: '/endpoints/creators/list-creators' },
      { text: 'Guides', link: '/guides/pagination-and-filtering' },
      { text: 'Examples', link: '/examples/curl/quick-start' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Quick Start', link: '/getting-started' },
          { text: 'Authentication', link: '/authentication' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Pagination & Filtering', link: '/guides/pagination-and-filtering' },
          { text: 'Error Handling', link: '/guides/error-handling' },
          { text: 'Rate Limits', link: '/guides/rate-limits' },
          { text: 'Credits & Billing', link: '/guides/credits-and-billing' },
          { text: 'Team Scoping', link: '/guides/team-scoping' },
        ],
      },
      {
        text: 'Creators',
        collapsed: false,
        items: [
          { text: 'List Creators', link: '/endpoints/creators/list-creators' },
          { text: 'Get Creator', link: '/endpoints/creators/get-creator' },
          { text: 'Get Creator Posts', link: '/endpoints/creators/get-creator-posts' },
          { text: 'Get Fields', link: '/endpoints/creators/get-fields' },
          { text: 'Get Sources', link: '/endpoints/creators/get-sources' },
          { text: 'Get Verticals', link: '/endpoints/creators/get-verticals' },
          { text: 'Get AI Tags', link: '/endpoints/creators/get-ai-tags' },
        ],
      },
      {
        text: 'Posts',
        collapsed: true,
        items: [
          { text: 'List Posts', link: '/endpoints/posts/list-posts' },
          { text: 'Get Post', link: '/endpoints/posts/get-post' },
          { text: 'Delete Post', link: '/endpoints/posts/delete-post' },
          { text: 'Toggle Bookmark', link: '/endpoints/posts/toggle-bookmark' },
          { text: 'Get Bookmarks', link: '/endpoints/posts/get-bookmarks' },
          { text: 'Get Period Stats', link: '/endpoints/posts/get-period-stats' },
          { text: 'Get Virality Stats', link: '/endpoints/posts/get-virality-stats' },
          { text: 'Get Top Engagement', link: '/endpoints/posts/get-top-engagement' },
          { text: 'Get Companies List', link: '/endpoints/posts/get-companies-list' },
        ],
      },
      {
        text: 'Lists',
        collapsed: true,
        items: [
          { text: 'List Lists', link: '/endpoints/lists/list-lists' },
          { text: 'Get List', link: '/endpoints/lists/get-list' },
          { text: 'Create List', link: '/endpoints/lists/create-list' },
          { text: 'Update List', link: '/endpoints/lists/update-list' },
          { text: 'Delete List', link: '/endpoints/lists/delete-list' },
          { text: 'Add Members', link: '/endpoints/lists/add-members' },
          { text: 'Remove Members', link: '/endpoints/lists/remove-members' },
          { text: 'Import URLs', link: '/endpoints/lists/import-urls' },
          { text: 'Import URLs (No List)', link: '/endpoints/lists/import-urls-no-list' },
          { text: 'Check URLs', link: '/endpoints/lists/check-urls' },
          { text: 'Share List', link: '/endpoints/lists/share-list' },
          { text: 'Unshare List', link: '/endpoints/lists/unshare-list' },
          { text: 'Get Share Users', link: '/endpoints/lists/get-share-users' },
        ],
      },
      {
        text: 'Signals',
        collapsed: true,
        items: [
          { text: 'List Signals', link: '/endpoints/signals/list-signals' },
          { text: 'Get Signal', link: '/endpoints/signals/get-signal' },
          { text: 'Create Signal', link: '/endpoints/signals/create-signal' },
          { text: 'Update Signal', link: '/endpoints/signals/update-signal' },
          { text: 'Delete Signal', link: '/endpoints/signals/delete-signal' },
          { text: 'Get Signal Leads', link: '/endpoints/signals/get-signal-leads' },
        ],
      },
      {
        text: 'Leads',
        collapsed: true,
        items: [
          { text: 'List Leads', link: '/endpoints/leads/list-leads' },
          { text: 'Get Lead', link: '/endpoints/leads/get-lead' },
          { text: 'Update Lead', link: '/endpoints/leads/update-lead' },
          { text: 'Delete Lead', link: '/endpoints/leads/delete-lead' },
          { text: 'Get Leads by Signal', link: '/endpoints/leads/get-leads-by-signal' },
          { text: 'Export Leads', link: '/endpoints/leads/export-leads' },
        ],
      },
      {
        text: 'Companies',
        collapsed: true,
        items: [
          { text: 'List Companies', link: '/endpoints/companies/list-companies' },
          { text: 'Get Company', link: '/endpoints/companies/get-company' },
          { text: 'Create Company', link: '/endpoints/companies/create-company' },
          { text: 'Update Company', link: '/endpoints/companies/update-company' },
          { text: 'Delete Company', link: '/endpoints/companies/delete-company' },
          { text: 'Get Company Creators', link: '/endpoints/companies/get-company-creators' },
          { text: 'Get Fields', link: '/endpoints/companies/get-fields' },
          { text: 'Get Industries', link: '/endpoints/companies/get-industries' },
        ],
      },
      {
        text: 'Tags',
        collapsed: true,
        items: [
          { text: 'List Tags', link: '/endpoints/tags/list-tags' },
          { text: 'Get Tag', link: '/endpoints/tags/get-tag' },
          { text: 'Create Tag', link: '/endpoints/tags/create-tag' },
          { text: 'Update Tag', link: '/endpoints/tags/update-tag' },
          { text: 'Delete Tag', link: '/endpoints/tags/delete-tag' },
          { text: 'Get Creator Tags', link: '/endpoints/tags/get-creator-tags' },
          { text: 'Set Creator Tags', link: '/endpoints/tags/set-creator-tags' },
          { text: 'Add Creators to Tag', link: '/endpoints/tags/add-creators-to-tag' },
          { text: 'Remove Creators from Tag', link: '/endpoints/tags/remove-creators-from-tag' },
          { text: 'Share Tag', link: '/endpoints/tags/share-tag' },
          { text: 'Unshare Tag', link: '/endpoints/tags/unshare-tag' },
          { text: 'Get Colors', link: '/endpoints/tags/get-colors' },
        ],
      },
      {
        text: 'Insights',
        collapsed: true,
        items: [
          { text: 'Get Insights', link: '/endpoints/insights/get-insights' },
          { text: 'Upsert Insights', link: '/endpoints/insights/upsert-insights' },
          { text: 'Delete Insights', link: '/endpoints/insights/delete-insights' },
          { text: 'Add Entry', link: '/endpoints/insights/add-entry' },
          { text: 'Edit Entry', link: '/endpoints/insights/edit-entry' },
          { text: 'Delete Entry', link: '/endpoints/insights/delete-entry' },
          { text: 'Get History', link: '/endpoints/insights/get-history' },
          { text: 'AI Research', link: '/endpoints/insights/ai-research' },
          { text: 'Toggle Sharing', link: '/endpoints/insights/toggle-sharing' },
        ],
      },
      {
        text: 'LinkedIn Lookups',
        collapsed: true,
        items: [
          { text: 'List Lookups', link: '/endpoints/linkedin-lookups/list-lookups' },
          { text: 'Get Lookup', link: '/endpoints/linkedin-lookups/get-lookup' },
          { text: 'Create Lookup', link: '/endpoints/linkedin-lookups/create-lookup' },
          { text: 'Bulk Create', link: '/endpoints/linkedin-lookups/bulk-create' },
          { text: 'Delete Lookup', link: '/endpoints/linkedin-lookups/delete-lookup' },
          { text: 'Retry Lookup', link: '/endpoints/linkedin-lookups/retry-lookup' },
          { text: 'Resume Paused', link: '/endpoints/linkedin-lookups/resume-paused' },
          { text: 'Get Stats', link: '/endpoints/linkedin-lookups/get-stats' },
        ],
      },
      {
        text: 'Deep Scrape',
        collapsed: true,
        items: [
          { text: 'Queue Creator', link: '/endpoints/deep-scrape/queue-creator' },
          { text: 'List Queue', link: '/endpoints/deep-scrape/list-queue' },
          { text: 'Resume Paused', link: '/endpoints/deep-scrape/resume-paused' },
          { text: 'Get Stats', link: '/endpoints/deep-scrape/get-stats' },
        ],
      },
      {
        text: 'AI Analysis',
        collapsed: true,
        items: [
          { text: 'Analyze Ethnicity', link: '/endpoints/ai-analysis/analyze-ethnicity' },
          { text: 'Batch Analyze', link: '/endpoints/ai-analysis/batch-analyze-ethnicity' },
        ],
      },
      {
        text: 'Integrations',
        collapsed: true,
        items: [
          { text: 'Get LinkedIn Status', link: '/endpoints/integrations/get-linkedin-status' },
          { text: 'Select Account', link: '/endpoints/integrations/select-account' },
          { text: 'Send Reaction', link: '/endpoints/integrations/send-reaction' },
          { text: 'Remove Reaction', link: '/endpoints/integrations/remove-reaction' },
          { text: 'Get Reactions', link: '/endpoints/integrations/get-reactions' },
          { text: 'Send Comment', link: '/endpoints/integrations/send-comment' },
        ],
      },
      {
        text: 'Stats',
        collapsed: true,
        items: [
          { text: 'Dashboard Stats', link: '/endpoints/stats/get-dashboard-stats' },
          { text: 'Creator Stats', link: '/endpoints/stats/get-creator-stats' },
          { text: 'Post Stats', link: '/endpoints/stats/get-post-stats' },
          { text: 'Lead Stats', link: '/endpoints/stats/get-lead-stats' },
        ],
      },
      {
        text: 'Usage',
        collapsed: true,
        items: [
          { text: 'Get Usage Stats', link: '/endpoints/usage/get-usage-stats' },
          { text: 'Get Usage Errors', link: '/endpoints/usage/get-usage-errors' },
        ],
      },
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'cURL', link: '/examples/curl/quick-start' },
          { text: 'JavaScript', link: '/examples/javascript/quick-start' },
          { text: 'Python', link: '/examples/python/quick-start' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CCCrafts/signals' },
    ],
  },
})
