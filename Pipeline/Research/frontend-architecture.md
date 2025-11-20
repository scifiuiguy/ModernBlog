# Frontend Architecture & MD-First Philosophy

## Core Principle: Markdown First

**Goal**: Keep the blog as simple as possible. Write content in Markdown, not HTML/JS/CSS.

## Architecture Strategy

### Content Layer (Primary)
- **Pure Markdown files** in `Posts/` directory
- No frontmatter complexity unless necessary
- Images in `Images/` directory, referenced via relative paths
- Markdown syntax for everything: headers, lists, links, images, code blocks

### Presentation Layer (Minimal)
- **Astro** handles Markdown → HTML conversion
- **Starlight theme** provides styling out of the box
- **React components** only when needed for:
  - Interactive elements (search, filters, etc.)
  - Dynamic content (if any)
  - Custom UI components that can't be done in pure Markdown

### What We Avoid
- ❌ Writing HTML directly in posts
- ❌ Custom CSS for content (use theme defaults)
- ❌ JavaScript in blog posts
- ❌ Complex frontmatter schemas
- ❌ Over-engineering the frontend

## React Usage Guidelines

### When to Use React
- ✅ Interactive search/filter functionality
- ✅ Custom navigation components
- ✅ Dynamic content that requires state
- ✅ Complex UI elements not possible in Markdown

### When NOT to Use React
- ❌ Basic blog post content (use Markdown)
- ❌ Simple layouts (use Markdown + theme)
- ✅ Static content (use Markdown)
- ❌ Styling (use theme CSS)

## File Structure

```
ModernBlog/
├── Posts/              # Pure .md files
├── Images/             # Image assets
├── src/
│   ├── components/     # React components (only if needed)
│   ├── layouts/        # Astro layouts (minimal)
│   └── content/        # Astro content config (auto-generated from Posts/)
└── Pipeline/           # Deployment automation
```

## Markdown Features We Use

- Headers (`#`, `##`, `###`)
- Lists (ordered, unordered)
- Links (`[text](url)`)
- Images (`![alt](path){width=100%}`)
- Code blocks (```language)
- Bold/italic (`**bold**`, `*italic*`)
- Blockquotes (`>`)
- Horizontal rules (`---`)

## Astro Configuration

- Minimal config - let Starlight handle defaults
- Markdown processing: native Astro markdown support
- React integration: available but minimal usage
- Build output: static HTML from Markdown

## Benefits of MD-First Approach

1. **Low Overhead**: No complex build processes for content
2. **Portable**: Markdown works everywhere (GitHub, Medium, Dev.to, etc.)
3. **Version Control Friendly**: Easy diffs, easy to read
4. **AI-Friendly**: Easy for AI to generate/edit
5. **Future-Proof**: Markdown is universal

## Pending Decisions
- [ ] Define exact React component needs (if any)
- [ ] Set up Astro with minimal React integration
- [ ] Configure Starlight theme
- [ ] Test Markdown → HTML conversion
- [ ] Verify image handling from Images/ directory

