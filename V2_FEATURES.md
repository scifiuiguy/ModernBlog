# v2 Features - Implementation Complete

## What's New in v2

### ✅ API Integrations

1. **Medium API** (`Pipeline/scripts/publish-medium.js`)
   - Publishes posts as HTML
   - Supports draft and published modes
   - Includes canonical URLs
   - Tracks article IDs for updates

2. **Dev.to API** (`Pipeline/scripts/publish-devto.js`)
   - Publishes clean Markdown
   - Supports draft and published modes
   - Includes canonical URLs and descriptions
   - Respects rate limits (10 requests/30s)

3. **LinkedIn API** (`Pipeline/scripts/publish-linkedin.js`)
   - Creates status updates with article links
   - Generates teaser text from post content
   - Supports personal and company pages
   - Note: LinkedIn doesn't support full articles, only link shares

### ✅ Content Transformation

- **Markdown → HTML** (for Medium) using `marked`
- **Markdown → Plain Text** (for LinkedIn teasers) using `strip-markdown`
- **Markdown → Clean Markdown** (for Dev.to) with minimal processing

### ✅ Staging Workflow

- **Default Mode**: All automatic pushes go to staging
- **Draft Mode**: Posts published as drafts to all platforms
- **Staging GitHub Pages**: Separate environment for staging
- **Production Promotion**: Manual workflow to promote posts

### ✅ Metadata Tracking

- Tracks which posts are published where
- Stores platform-specific IDs
- Prevents duplicate publishing
- Stored in `.local/metadata.json` (outside repo)

### ✅ Vercel Deployment

- Automatic deployment to Vercel on production mode
- Uses Vercel CLI in GitHub Actions
- Requires Vercel credentials in GitHub Secrets

## How to Use

### Staging (Default)

1. Push a post to `Posts/`
2. Workflow automatically:
   - Publishes as drafts to Medium/Dev.to/LinkedIn
   - Deploys to staging GitHub Pages
   - Skips Vercel (production only)

### Production

1. Review staging deployment
2. Run "Promote to Production" workflow manually:
   - Go to Actions → Promote to Production
   - Enter post path (e.g., `Posts/blog_post_1.md`)
   - Workflow publishes to production and deploys to Vercel

### Manual Deployment

You can also trigger the main workflow manually:
- Go to Actions → Deploy Blog → Run workflow
- Choose mode: `stage` or `production`

## Required GitHub Secrets

For v2 features to work, add these secrets in repository settings:

- `MEDIUM_TOKEN` - Medium API access token
- `DEVTO_API_KEY` - Dev.to API key
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn OAuth token
- `LINKEDIN_ORG_ID` - LinkedIn organization ID (if posting to company page)
- `VERCEL_TOKEN` - Vercel deployment token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

## Testing

### Test API Connections

```bash
cd Pipeline/scripts
npm install

# Test Medium
MEDIUM_TOKEN=your_token node publish-medium.js ../../Posts/blog_post_1.md

# Test Dev.to
DEVTO_API_KEY=your_key node publish-devto.js ../../Posts/blog_post_1.md

# Test LinkedIn
LINKEDIN_ACCESS_TOKEN=your_token node publish-linkedin.js ../../Posts/blog_post_1.md
```

### Test All Platforms

```bash
cd Pipeline/scripts
MEDIUM_TOKEN=... DEVTO_API_KEY=... LINKEDIN_ACCESS_TOKEN=... \
  node publish-all.js ../../Posts/blog_post_1.md
```

## Workflow Details

### Main Workflow (`deploy-blog.yml`)

1. **Detect Changes** - Finds new/modified posts
2. **Process Posts** - Validates frontmatter
3. **Publish to Platforms** - Posts to Medium/Dev.to/LinkedIn (continues on errors)
4. **Build Site** - Builds Astro static site
5. **Deploy GitHub Pages** - Deploys to staging or production
6. **Deploy Vercel** - Deploys to Vercel (production only)

### Promote Workflow (`promote-to-production.yml`)

- Manual workflow to promote specific posts
- Re-publishes to all platforms in production mode
- Updates metadata tracking

## Error Handling

- **Partial Failures**: Workflow continues if one platform fails
- **Error Logging**: All errors logged in GitHub Actions
- **Metadata**: Tracks successful publishes, skips duplicates
- **Retry**: Manual re-run available for failed jobs

## Next Steps

1. Set up GitHub Secrets with your API credentials
2. Test with a draft post first
3. Review staging deployment
4. Promote to production when ready

## Notes

- **LinkedIn Limitations**: Can only post links, not full articles
- **Rate Limits**: Dev.to has 10 requests per 30 seconds
- **Draft Mode**: All staging posts are published as drafts
- **Metadata**: Stored locally, not in repo (white-label friendly)

