# ModernBlog

A modern, automated blog publishing pipeline that takes Markdown files and deploys them everywhere with a single git push.

## What This Is

ModernBlog is a zero-friction blogging system that:
- ✅ Accepts plain Markdown files in the `Posts/` directory
- ✅ Automatically builds a static site with Astro
- ✅ Deploys to GitHub Pages automatically
- 🚧 Coming in v2:
  - Vercel deployment
  - Medium API integration
  - Dev.to API integration
  - LinkedIn API integration
- ✅ All automated via GitHub Actions
- ✅ One push → GitHub Pages in <90 seconds

## The Stack

- **Astro 4.15 + React** - Static site generator with React support (minimal theme, MD-first)
- **Plain `.md` files** - Write in Markdown, no WYSIWYG editors
- **GitHub Pages** - Free hosting with CDN (MVP)
- **GitHub Actions** - Automation pipeline
- **gray-matter** - Markdown frontmatter parsing
- 🚧 **Vercel** - Coming in v2
- 🚧 **Multiple Platform APIs** - Coming in v2

## How It Works

1. Write a blog post in Markdown (add frontmatter with title, date, tags)
2. Save it to `Posts/`
3. Push to GitHub
4. GitHub Actions automatically:
   - Detects changed posts
   - Validates frontmatter
   - Builds the Astro static site
   - Deploys to GitHub Pages

That's it. No manual copy-pasting. No rich-text editors. Just Markdown and git.

## Project Structure

```
ModernBlog/
├── Posts/              # Your blog posts (Markdown files)
├── Images/             # Image assets
├── Pipeline/           # Deployment automation
│   ├── site/          # Astro static site generator
│   ├── scripts/       # Build and processing scripts
│   └── Research/     # Implementation research & decisions
├── .github/workflows/ # GitHub Actions workflows
├── AGENTS.md          # Agent guidelines and rules
├── COMMAND_LIST.md    # Quick command reference
├── SETUP.md           # Setup instructions
└── README.md          # This file
```

## Getting Started

See [SETUP.md](SETUP.md) for detailed setup instructions.

Quick start:
1. Clone this repo
2. Install dependencies: `cd Pipeline/site && npm install`
3. Enable GitHub Pages in repository settings (Source: GitHub Actions)
4. Write your first post in `Posts/` with frontmatter
5. Push to `main` branch - workflow runs automatically

For v2 features (Medium, Dev.to, LinkedIn), see [SETUP.md](SETUP.md) for API credential configuration.

## Philosophy

**Down with pure "vibe coding."**

This project is built by someone who believes in:
- Learning the fundamentals before relying on AI
- Understanding your tools, not just using them
- Building automation that actually works
- Zero gatekeeping—everything is open source

AI is an incredible tool, but it's most powerful when you know what you're doing. This blog (and its pipeline) is a testament to that.

## Status

✅ **MVP Complete** - GitHub Pages deployment is working!
- ✅ Astro site setup
- ✅ GitHub Actions workflow
- ✅ Markdown processing
- ✅ Frontmatter validation
- ✅ Automatic deployment

🚧 **v2 In Progress** - Platform API integrations coming soon
- 🚧 Vercel deployment
- 🚧 Medium API
- 🚧 Dev.to API
- 🚧 LinkedIn API
- 🚧 Staging workflow

## License

MIT - Do whatever you want with it. Zero gatekeeping—2025 rules.

---

**P.S.** Want the exact GitHub Action YAML + Astro config? It's all here. Fork it, modify it, make it yours.

