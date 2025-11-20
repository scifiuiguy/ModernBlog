# Implementation Questions - Pre-Development Checklist

This document outlines all questions that need answers before we can start building the pipeline. Each question should be answered with a clear decision that will guide implementation.

## Workflow Architecture

### Q1: Workflow Structure
**Question**: What workflow structure should we use?
- [ ] Option 1: Single monolithic workflow
- [x ] Option 2: Modular workflows (recommended)
- [ ] Option 3: Reusable workflows

**Decision**: _________________

**Notes**: Option 2 is recommended for maintainability, but need confirmation.

---

### Q2: Workflow Triggers
**Question**: What should trigger the deployment workflow?
- [x ] Push to `Posts/` directory only
- [ ] Push to `Posts/` + manual dispatch
- [ ] Push to `Posts/` + PR to `Posts/` (for previews)
- [ ] All of the above

**Decision**: _________________

**Notes**: Need to decide if we want preview deployments for PRs.

---

### Q3: Change Detection Strategy
**Question**: How should we detect and process posts?
- [ ] Process only changed files (new + modified)
- [ ] Process all posts on every run (full rebuild)
- [x ] Process changed files, with option for full rebuild

**Decision**: _________________

**Notes**: Processing only changed files is more efficient, but need to handle edge cases.

---

## API Integration

### Q4: API Call Strategy
**Question**: How should we call the platform APIs?
- [x ] Sequential (one after another)
- [ ] Parallel (all at once)
- [ ] Parallel with dependency management

**Decision**: _________________

**Notes**: Parallel is faster, but need to handle rate limits and failures.

---

### Q5: Retry Strategy
**Question**: What retry logic should we implement?
- [x ] No retries (fail fast)
- [ ] Fixed retries (3 attempts, same delay)
- [ ] Exponential backoff (recommended)
- [ ] Platform-specific retry counts

**Decision**: _________________fail fast with error handling

**Notes**: Need to define retry counts per platform:
- Medium: __ retries
- Dev.to: __ retries (respect 10/30s rate limit)
- LinkedIn: __ retries

---

### Q6: Partial Failure Handling
**Question**: What happens if some APIs succeed and others fail?
- [ ] Fail entire workflow (all-or-nothing)
- [x ] Continue on partial failure, log errors
- [ ] Continue on failure, retry failed APIs separately

**Decision**: _________________

**Notes**: Recommendation is to continue on partial failure, but need confirmation.

---

### Q7: API Credentials Management
**Question**: How do we store and access API credentials?
- [x ] GitHub Secrets (recommended)
- [ ] External secret manager
- [ ] Encrypted files in repo (not recommended)

**Decision**: _________________ not familiar but sounds good - document this for me please

**Notes**: Need to document which secrets are required:
- `MEDIUM_TOKEN`
- `DEVTO_API_KEY`
- `LINKEDIN_ACCESS_TOKEN`
- `LINKEDIN_ORG_ID` (if posting to company page)
- Others?
that's good to start with
---

## Content Processing

### Q8: Markdown Parser
**Question**: What library should we use for parsing Markdown and frontmatter?
- [s ] `gray-matter` (Node.js, recommended)
- [ ] `front-matter` (Node.js)
- [ ] `python-frontmatter` (Python)
- [ ] Shell script + `yq`

**Decision**: _________________

**Notes**: Need to decide on Node.js vs Python for the workflow.
let's go Node
---

### Q9: Frontmatter Schema
**Question**: What fields are required vs optional in frontmatter?

**Required Fields**:
- [x ] `title` - Post title
- [ ] `date` - Publication date (format: YYYY-MM-DD?)
- [x ] `canonical_url` - Primary URL (auto-generated or manual?)

**Optional Fields**:
- [x ] `tags` - Array of tags
- [x ] `published` - Boolean (draft vs published)
- [x ] `description` - Meta description
- [ ] `image` - Featured image URL
- [ ] `medium_id` - Track Medium article ID
- [ ] `devto_id` - Track Dev.to article ID
- [ ] Others?

**Decision**: _________________ Is frontmatter for end user view or admin panel?

**Notes**: Need to define the exact schema and validation rules.

---

### Q10: Metadata Tracking
**Question**: How do we track which posts have been published where?
- [ ] Store IDs in frontmatter (update files after publish)
- [x ] External metadata file (`metadata.json` or `metadata.yaml`)
- [ ] Query platform APIs to find existing posts
- [ ] Combination approach

**Decision**: _________________let's keep this meta outside the repo in this workspace

**Notes**: External metadata file is recommended, but need to decide on format and location.

---

### Q11: Content Transformation
**Question**: How do we transform Markdown for different platforms?
- [x ] Markdown → HTML (for Medium): Use `pandoc` or `marked`?
- [x ] Markdown → Plain Text (for LinkedIn): Use `strip-markdown` or custom?
- [x ] Markdown → Markdown (for Dev.to): Minimal processing or full cleanup?

**Decision**: _________________ all of the above - give me your reco on pandoc v. marked

**Notes**: Need to choose specific tools and test transformations.

---

## Deployment

### Q12: Vercel Deployment Method
**Question**: How should we deploy to Vercel?
- [ ] Vercel GitHub Integration (automatic, separate from Actions)
- [x ] Vercel CLI in GitHub Actions (recommended)
- [ ] Vercel REST API

**Decision**: _________________

**Notes**: CLI in Actions gives more control and keeps everything in one workflow.

---

### Q13: Vercel Project Setup
**Question**: Do we have Vercel project credentials?
- [ ] Vercel account created?
- [ ] Project created?
- [ ] `VERCEL_TOKEN` obtained?
- [ ] `VERCEL_ORG_ID` obtained?
- [ ] `VERCEL_PROJECT_ID` obtained?

**Status**: _________________ none yet - first time hearing of Vercel - will research - let's log this as tasks for end-of-milestone

**Notes**: Need to set up Vercel project and get all required tokens/IDs.

---

### Q14: GitHub Pages Setup
**Question**: Is GitHub Pages configured?
- [ ] Repository settings configured?
- [ ] Source branch selected?
- [ ] Custom domain (if applicable)?

**Status**: _________________never used Pages before - repo not set up yet - pending on my task list - will provide URL when ready

**Notes**: Need to enable GitHub Pages in repo settings.

---

### Q15: Build Strategy
**Question**: How should we handle builds?
- [x ] Build once, deploy everywhere (recommended)
- [ ] Build per platform
- [ ] Build artifacts retention period: __ days

**Decision**: _________________

**Notes**: Build once is more efficient, but need to handle artifact storage.

---

## Static Site Generator

### Q16: Astro Project Structure
**Question**: Where should the Astro project live?
- [ ] Root of repo (alongside Posts/, Pipeline/)
- [ ] Separate `site/` or `blog/` directory
- [x ] Monorepo structure

**Decision**: _________________Is Astro in play to build for just the code for my portfolio site hosting or other things too? Put site/ inside Pipeline/

**Notes**: Need to decide on directory structure.

---

### Q17: Astro Configuration
**Question**: What Astro setup do we need?
- [ ] Astro + Starlight theme installed?
- [x ] React integration configured?
- [x ] Markdown processing configured?
- [x ] Image handling configured?
- [x ] Build output directory: `stage/` and `build/`

**Status**: _________________minimal front-end needed - no themese necessary

**Notes**: Need to set up Astro project with minimal config.

---

### Q18: Content Integration
**Question**: How do Posts/ integrate with Astro?
- [x ] Copy Posts/ to Astro content directory during build?
- [ ] Symlink Posts/ to Astro content directory?
- [ ] Astro reads directly from Posts/?

**Decision**: _________________

**Notes**: Need to decide on how Astro accesses the markdown files.

---

## Error Handling & Monitoring

### Q19: Error Notification
**Question**: How should we be notified of failures?
- [x ] GitHub Actions annotations only
- [ ] Email notifications
- [ ] Slack/Discord webhook
- [ ] GitHub Issues for persistent failures
- [ ] Combination of above

**Decision**: _________________

**Notes**: Need to set up notification channels if using external services.

---

### Q20: Rollback Strategy
**Question**: What happens if a bad deployment goes through?
- [ ] Manual revert (revert commit, push again)
- [x ] Automated rollback (detect errors, auto-revert)
- [ ] Preview deployments (deploy to preview URL first, then promote)

**Decision**: _________________Help me understand options here. If I revert w/ git, does it auto-revert Astro/Pages? I assumed I'd need to manually delete posts from LinkedIn/Medium.

**Notes**: Preview deployments are safest but add complexity.

---

### Q21: Logging & Monitoring
**Question**: What should we log and where?
- [x ] GitHub Actions logs only (90-day retention)
- [ ] External logging service (longer retention)
- [ ] Performance metrics tracking?

**Decision**: _________________even 90 days is a lot - are there limits? I think I'm on the lowest-cost pro tier of github - if it costs anything, cancel it

**Notes**: Need to decide if external logging is needed.

---

## Frontend Architecture

### Q22: React Component Needs
**Question**: What React components do we actually need?
- [ ] Search functionality?
- [ ] Filter/tag system?
- [ ] Custom navigation?
- [ ] Interactive elements?
- [x ] None (pure Markdown only)?

**Decision**: _________________May add more features in future - I want to showcase React skills in portfolio - this may be a future test bed for that

**Notes**: MD-first approach means minimal React, but need to identify actual needs.

---

### Q23: Image Handling
**Question**: How should images be handled?
- [x ] Images/ directory structure confirmed?
- [ ] Image optimization needed?
- [ ] CDN for images?
- [ ] Relative paths in Markdown sufficient?

**Decision**: _________________Does Astro have easy CDN capability for images a la Wordpress? I don't want to manually worry about it post-deployment. If a blog entry is good, leave it forever. If not, one-click revert. No edits necessary once its up. But if hosting is simplified by Astro CDN then use it. Whatever's simplest and quickest to implement.

**Notes**: Need to test image paths work correctly in built site.

---

## Testing & Validation

### Q24: Testing Strategy
**Question**: How do we test the pipeline?
- [x ] Test with draft posts first?
- [x ] Use test API endpoints?
- [ ] Manual testing workflow?
- [ ] Automated tests?

**Decision**: _________________We stage the 1st 2 blog posts. The stage endpoints will be for continuous integration tests. Every new post should by default publish to stage (Stage GitHub Page and Stage URL on my portfolio site), then I review stage. Stage GitHub Pages should be marked private if possible. If it's good, I approve. RE: Medium and Linkedin, test with drafts first. I will stand by to manually delete junk posts on both during tests. We'll do the draft post endpoing testing late at night so no one sees junk in their feeds. Also, if the drafts can use params in API calls can be marked private to prevent dissemination in feeds, we should do that until posts are confirmed working, then toggle them public.

**Notes**: Need a safe way to test without publishing to production.

---

### Q25: Validation
**Question**: What should we validate before publishing?
- [x ] Frontmatter schema validation?
- [ ] Markdown syntax validation?
- [ ] Image existence validation?
- [x ] Link validation?

**Decision**: _________________

**Notes**: Need to catch errors before they reach APIs.

---

## Documentation

### Q26: Documentation Needs
**Question**: What documentation do we need?
- [x ] Setup instructions (README)
- [x ] API credential setup guide
- [x ] Frontmatter schema documentation
- [x ] Troubleshooting guide
- [x ] Workflow explanation

**Status**: _________________* also need COMMAND LIST doc as my primary entry point when I come back to using this codebase after being away for a while, i.e. User gives command "Publish to Stage" ... document exact LLM instruction set * also need AGENTS.md alongside README.md to describe rules, guidelines, and table of contents for all docs for any agent accessing this repo * also need LOCAL_AGENT.md outside the repo. That's where we'll keep all details describing how to maintain separation between white-label code that goes on GitHub ready for anyone to use versus config metadata stored alongside LOCAL_AGENT which should contain variables the LOCAL AGENT can inject into appropriate classes/scripts prior to build, then build, then white-label the vars again

**Notes**: Some docs exist, but need to ensure completeness.

---

## Priority & Timeline

### Q27: MVP Scope
**Question**: What's the minimum viable pipeline?
- [ ] Which platforms are must-have vs nice-to-have? GitHub pages & Portfolio site are MVP
- [ ] What features can wait for v2? push to Medium and LinkedIn are v2
- [ ] What's the simplest working version? push to git - display as github page

**Decision**: _________________

**Notes**: Need to define MVP to get something working quickly.

---

### Q28: Implementation Order
**Question**: What order should we build things?
1. _________________
2. _________________
3. _________________
4. _________________

**Notes**: Suggested order:
i. set up AGENTS.md and LOCAL_AGENTS.md docs - codify white-labeling process
1. Astro site setup (local testing)
2. GitHub Actions workflow structure
3. Markdown processing
4. Single platform API (Dev.to - simplest)
5. Additional platforms
6. Deployment automation
7. Error handling & polish
this order is perfect w/ my quick 'i' addition above
---

## Next Steps

Once these questions are answered, we can:
1. Create detailed implementation plan
2. Set up development environment
3. Build components in priority order
4. Test incrementally
5. Deploy and iterate

**Status**: Ready to start implementation? [ x] Yes [ ] No - Need to answer questions above first

