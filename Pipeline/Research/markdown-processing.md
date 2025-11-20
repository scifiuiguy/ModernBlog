# Markdown Processing & Frontmatter Extraction

## Problem
Parse markdown files, extract frontmatter/metadata, and transform content for different platforms.

## Frontmatter Format

### Standard YAML Frontmatter
```yaml
---
title: "My Blog Post"
date: 2025-11-20
tags: [tech, vr, ai]
canonical_url: https://mysite.com/posts/my-post
published: true
---
```

### Required Fields
- `title`: Post title
- `date`: Publication date (ISO format)
- `canonical_url`: Primary URL (for SEO)

### Optional Fields
- `tags`: Array of tags
- `published`: Boolean (draft vs published)
- `description`: Meta description
- `image`: Featured image URL
- `medium_id`: Track Medium article ID (for updates)
- `devto_id`: Track Dev.to article ID (for updates)

## Parsing Options

### Option 1: JavaScript/Node.js (Recommended)
- **Library**: `gray-matter` or `front-matter`
- **Pros**: Works in GitHub Actions (Node.js available), fast, well-maintained
- **Cons**: None significant
- **Best for**: JavaScript/TypeScript workflows

```javascript
const matter = require('gray-matter');
const fs = require('fs');

const file = fs.readFileSync('Posts/blog_post_1.md', 'utf8');
const { data, content } = matter(file);
// data = frontmatter object
// content = markdown without frontmatter
```

### Option 2: Python
- **Library**: `python-frontmatter` or `markdown` + `yaml`
- **Pros**: Great for data processing, many libraries
- **Cons**: Need to install Python in Actions
- **Best for**: Python-heavy workflows

### Option 3: Shell Script + `yq`
- **Library**: `yq` (YAML processor)
- **Pros**: Lightweight, no dependencies
- **Cons**: More complex parsing, less flexible
- **Best for**: Simple cases, minimal dependencies

## Content Transformation

### Markdown → HTML
- **Tool**: `pandoc` (universal) or `marked` (JavaScript)
- **Use Case**: Medium API (accepts HTML)
- **Preserve**: Code blocks, links, images, formatting

### Markdown → Plain Text
- **Tool**: `strip-markdown` or custom regex
- **Use Case**: LinkedIn (status update teaser)
- **Extract**: First paragraph, title, remove markdown syntax

### Markdown → Markdown (Cleaned)
- **Tool**: Custom processing
- **Use Case**: Dev.to (needs clean markdown)
- **Tasks**: Remove frontmatter, ensure compatibility

## File Detection Algorithm

### Detect New Posts
```javascript
// Get changed files in Posts/ directory
const changedFiles = await exec('git diff --name-only HEAD~1 HEAD');
const newPosts = changedFiles
  .filter(file => file.startsWith('Posts/') && file.endsWith('.md'))
  .filter(file => {
    // Check if file is new (didn't exist in previous commit)
    const existed = await exec(`git ls-tree HEAD~1 ${file}`);
    return !existed;
  });
```

### Detect Modified Posts
```javascript
const modifiedPosts = changedFiles
  .filter(file => file.startsWith('Posts/') && file.endsWith('.md'))
  .filter(file => {
    const existed = await exec(`git ls-tree HEAD~1 ${file}`);
    return existed; // File existed, so it's modified
  });
```

## Metadata Tracking

### Problem: Update vs Create
- Need to track if post already exists on platforms
- Store platform-specific IDs (Medium article ID, Dev.to article ID)

### Solution Options

**Option 1: Store IDs in Frontmatter**
- Add `medium_id`, `devto_id` to frontmatter after first publish
- Update frontmatter file in repo
- **Pros**: Simple, version controlled
- **Cons**: Manual frontmatter updates, merge conflicts possible

**Option 2: External Metadata File**
- `metadata.json` or `metadata.yaml` in repo
- Maps post filename → platform IDs
- **Pros**: Cleaner frontmatter, centralized tracking
- **Cons**: Extra file to manage

**Option 3: Platform API Lookup**
- Query platform APIs to find existing posts
- Match by title or canonical URL
- **Pros**: No local tracking needed
- **Cons**: API calls, rate limits, less reliable

**Recommendation**: Option 2 - External metadata file

## Pending Decisions
- [ ] Choose parsing library (gray-matter recommended)
- [ ] Define frontmatter schema (required vs optional fields)
- [ ] Implement file detection logic
- [ ] Set up metadata tracking system
- [ ] Create content transformation functions
- [ ] Handle edge cases (missing frontmatter, invalid YAML, etc.)

