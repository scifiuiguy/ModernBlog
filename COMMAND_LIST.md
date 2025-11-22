# COMMAND LIST - Quick Reference

This is your primary entry point when returning to this codebase after time away. Quick commands and LLM instruction sets.

## Publishing Commands

### Publish to Stage
**LLM Instruction Set:**
```
1. Detect new/modified files in Posts/ directory
2. Process markdown files (extract frontmatter, validate)
3. Build Astro site with posts
4. Deploy to staging GitHub Pages
5. Deploy to staging portfolio URL
6. Mark all API posts as drafts (Medium, Dev.to, LinkedIn)
7. Post to staging endpoints only
8. Report status and staging URLs
```

**Manual Command:**
```bash
# Trigger staging workflow manually
gh workflow run deploy-blog.yml --ref main
```

### Publish to Production
**LLM Instruction Set:**
```
1. User has reviewed staging and approved
2. Promote staging posts to production
3. Update Medium/Dev.to posts from draft to published
4. Update LinkedIn posts (if applicable)
5. Deploy to production GitHub Pages
6. Deploy to production portfolio URL
7. Update canonical URLs
8. Report production URLs
```

**Manual Command:**
```bash
# After reviewing staging, approve for production
gh workflow run promote-to-production.yml --ref main
```

## Development Commands

### Local Development
```bash
# Navigate to Astro site
cd Pipeline/site

# Install dependencies
npm install

# Run dev server
npm run dev

# Build locally
npm run build

# Preview build
npm run preview
```

### Test Markdown Processing
```bash
# Process a single post
node Pipeline/scripts/process-post.js Posts/blog_post_1.md

# Validate all posts
node Pipeline/scripts/validate-posts.js
```

## Git Commands

### Standard Workflow
```bash
# Add new post
git add Posts/blog_post_1.md
git commit -m "Add blog post: Why I'm Starting a Blog"
git push origin main
```

### Revert a Post
```bash
# Revert the commit
git revert <commit-hash>
git push origin main

# Note: GitHub Pages will auto-rebuild
# Medium/LinkedIn posts must be manually deleted
```

## GitHub Actions

### View Workflow Runs
```bash
gh run list --workflow=deploy-blog.yml
```

### View Latest Run Logs
```bash
gh run view --log
```

### Rerun Failed Workflow
```bash
gh run rerun <run-id>
```

## Testing Commands

### Test API Connections
```bash
# Test Medium API
node Pipeline/scripts/test-medium.js

# Test Dev.to API
node Pipeline/scripts/test-devto.js

# Test LinkedIn API
node Pipeline/scripts/test-linkedin.js
```

### Validate Frontmatter
```bash
node Pipeline/scripts/validate-frontmatter.js Posts/
```

## Common Tasks

### Prep New Post
**LLM Instruction Set:**
```
When user says "Please prep a new post":
1. Find the highest numbered blog post in Remote/Posts/ (e.g., blog_post_4.md)
2. Extract the number and increment it (e.g., 4 → 5)
3. Create new file: Remote/Posts/blog_post_X.md (where X is the new number)
4. Read Local/tag-meta.json to get cumulative tag list
5. Scan the last 5 posts in Remote/Posts/ for any new tags not in tag-meta.json
6. Add any new tags found to tag-meta.json and update lastUpdated date
7. Generate frontmatter with:
   - title: "YOUR TITLE HERE"
   - urlSlug: "your-title-here"
   - date: [current date in YYYY-MM-DD format]
   - published: false
   - tags: [complete cumulative list from tag-meta.json, comma-separated, alphabetical]
8. Add empty content section below frontmatter
9. Report the new post number and remind user they can delete unwanted tags
```

**Example Output:**
```markdown
---
title: "YOUR TITLE HERE"
urlSlug: "your-title-here"
date: 2025-01-22
published: false
tags: [ai, blogging, coding, embeddedsystems, jlcpcb, philosophy, pcb-design, pcbway, productivity, robotics, tech, vr]
---

[Your content here]
```

### Add New Post
1. Create `.md` file in `Posts/`
2. Add frontmatter (optional for MVP)
3. `git add Posts/new_post.md`
4. `git commit -m "Add post: Title"`
5. `git push`
6. Workflow runs automatically

### Update Existing Post
1. Edit `.md` file in `Posts/`
2. `git add Posts/updated_post.md`
3. `git commit -m "Update post: Title"`
4. `git push`
5. Workflow detects change and updates

### Delete Post
1. `git rm Posts/post_to_delete.md`
2. `git commit -m "Remove post: Title"`
3. `git push`
4. Note: Must manually delete from Medium/LinkedIn

## Troubleshooting

### Workflow Not Triggering
```bash
# Check if file is in Posts/ directory
# Check GitHub Actions is enabled
# Check workflow file syntax
gh workflow view deploy-blog.yml
```

### Build Failing
```bash
# Check Astro build locally
cd Pipeline/site
npm run build

# Check for errors in logs
gh run view --log | grep -i error
```

### API Posting Failing
```bash
# Verify secrets are set
gh secret list

# Test API connection
node Pipeline/scripts/test-apis.js
```

## Quick Reference

| Task | Command | Notes |
|------|---------|-------|
| Add post | `git add Posts/*.md && git commit && git push` | Auto-triggers workflow |
| Local dev | `cd Pipeline/site && npm run dev` | Port 4321 |
| Build locally | `cd Pipeline/site && npm run build` | Test before push |
| View logs | `gh run view --log` | Latest workflow run |
| Test APIs | `node Pipeline/scripts/test-apis.js` | Verify credentials |

## LLM Instruction Templates

### "Please prep a new post"
1. Find highest numbered blog post in Remote/Posts/
2. Create blog_post_X.md with incremented number
3. Read Local/tag-meta.json for cumulative tags
4. Scan last 5 posts for new tags, update tag-meta.json if needed
5. Generate frontmatter with placeholder title, current date, published: false, and full cumulative tag list
6. User will delete unwanted tags (subtractive workflow)

### "Publish to Stage"
Use the staging workflow with draft mode enabled for all platforms.

### "Validate Posts"
Run frontmatter validation and markdown syntax checks on all files in Posts/.

### "Test Deployment"
Run full pipeline in test mode (draft posts, staging URLs, no production changes).

### "Update Post Metadata"
Update metadata.json with new platform IDs after successful publish.

