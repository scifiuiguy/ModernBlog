# Setup Instructions

## Prerequisites

- Node.js 20+ installed
- GitHub account
- Git installed

## Initial Setup

### 1. Install Dependencies

```bash
# Install Astro site dependencies
cd Pipeline/site
npm install

# Install script dependencies
cd ../scripts
npm install
```

### 2. Configure GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "GitHub Actions"
4. Save

### 3. Set Up GitHub Secrets (for v2 - API integrations)

When ready to add Medium/Dev.to/LinkedIn integration:

1. Go to repository Settings → Secrets and variables → Actions
2. Add the following secrets:
   - `MEDIUM_TOKEN`
   - `DEVTO_API_KEY`
   - `LINKEDIN_ACCESS_TOKEN`
   - `LINKEDIN_ORG_ID` (if posting to company page)

### 4. Local Development

```bash
# Start Astro dev server
cd Pipeline/site
npm run dev

# Site will be available at http://localhost:4321
```

### 5. Test the Pipeline

1. Make a small change to a post in `Posts/`
2. Commit and push:
   ```bash
   git add Posts/
   git commit -m "Test deployment"
   git push origin main
   ```
3. Check GitHub Actions tab to see workflow run
4. Once complete, check your GitHub Pages URL

## Adding a New Post

1. Create a new `.md` file in `Posts/`
2. Add frontmatter at the top:
   ```yaml
   ---
   title: "Your Post Title"
   date: YYYY-MM-DD
   published: true
   tags: [tag1, tag2]
   ---
   ```
3. Write your content in Markdown
4. Commit and push - workflow will automatically deploy

## Troubleshooting

### Build Fails
- Check that all posts have valid frontmatter
- Ensure Node.js version is 20+
- Check GitHub Actions logs for specific errors

### Posts Not Showing
- Verify frontmatter has `title` field
- Check that `published: true` is set
- Ensure markdown files are in `Posts/` directory

### Images Not Loading
- Use relative paths: `../Images/filename.webp`
- Ensure images are in `Images/` directory
- Check that images are copied during build (see workflow)

## Next Steps (v2)

- Set up Vercel deployment
- Add Medium API integration
- Add Dev.to API integration
- Add LinkedIn API integration
- Set up staging workflow

