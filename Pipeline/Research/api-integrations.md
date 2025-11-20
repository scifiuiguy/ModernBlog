# API Integration Strategies

## Problem
Integrate with Medium, Dev.to, and LinkedIn APIs to cross-post blog content automatically.

## Platform APIs

### Medium API
- **Endpoint**: `https://api.medium.com/v1/posts`
- **Auth**: OAuth 2.0 (requires access token)
- **Method**: POST
- **Content Format**: HTML or Markdown
- **Rate Limits**: Not well documented, but generally generous
- **Documentation**: https://github.com/Medium/medium-api-docs

**Implementation Notes**:
- Requires user access token (not application token for publishing)
- Can publish as draft or published
- Supports tags, canonical URL, content format selection

### Dev.to API
- **Endpoint**: `https://dev.to/api/articles`
- **Auth**: API key in header (`api-key`)
- **Method**: POST
- **Content Format**: Markdown (preferred)
- **Rate Limits**: 10 requests per 30 seconds
- **Documentation**: https://developers.forem.com/api

**Implementation Notes**:
- Simple API key authentication
- Supports tags, canonical URL, published status
- Can update existing articles if you track article IDs

### LinkedIn API
- **Endpoint**: `https://api.linkedin.com/v2/ugcPosts`
- **Auth**: OAuth 2.0 (requires specific permissions)
- **Method**: POST
- **Content Format**: Plain text with links (no full article support)
- **Rate Limits**: Varies by permission level
- **Documentation**: https://learn.microsoft.com/en-us/linkedin/

**Implementation Notes**:
- **Limitation**: Cannot post full articles, only status updates with links
- Requires `w_member_social` or `w_organization_social` permission
- Two-step process: create UGC post, then share it
- Best for: Sharing link to your blog post with a teaser

## Implementation Options

### Option 1: Sequential API Calls
- Call APIs one after another
- **Pros**: Simple, easy to debug
- **Cons**: Slow, if one fails others may not run
- **Best for**: Small scale, simple error handling

### Option 2: Parallel API Calls
- Call all APIs simultaneously using matrix strategy
- **Pros**: Fast, independent failures
- **Cons**: More complex, harder to track which succeeded
- **Best for**: Production, when speed matters

### Option 3: Queue-Based (Overkill for this)
- Use message queue (SQS, RabbitMQ, etc.)
- **Pros**: Reliable, retryable, scalable
- **Cons**: Complex setup, requires infrastructure
- **Best for**: High volume, enterprise systems

## Error Handling Strategy

### Retry Logic
- **Medium**: 3 retries with exponential backoff
- **Dev.to**: 3 retries (respect rate limits)
- **LinkedIn**: 2 retries (stricter rate limits)

### Failure Handling
- **Option A**: Fail workflow if any API fails
- **Option B**: Continue on partial failures, log errors
- **Option C**: Retry failed APIs in separate job

**Recommendation**: Option B - Continue on partial failures, but notify on any failure

## Content Transformation

### Markdown → HTML (for Medium)
- Use `pandoc` or `marked` library
- Preserve code blocks, links, formatting
- Handle frontmatter extraction

### Markdown → Plain Text (for LinkedIn)
- Extract title and first paragraph
- Generate teaser (max 300 chars)
- Include canonical URL

### Markdown → Markdown (for Dev.to)
- Minimal transformation needed
- Ensure frontmatter compatibility
- Handle Dev.to-specific features (liquid tags, etc.)

## Pending Decisions
- [ ] Choose parallel vs sequential API calls (parallel recommended)
- [ ] Define retry strategy per platform
- [ ] Set up GitHub Secrets for API keys/tokens
- [ ] Create content transformation functions
- [ ] Decide on canonical URL strategy (always point to Vercel?)

