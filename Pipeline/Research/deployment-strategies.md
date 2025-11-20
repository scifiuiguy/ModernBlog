# Deployment Strategies

## Problem
Deploy built static site to multiple platforms (GitHub Pages, Vercel) automatically.

## Platform Options

### GitHub Pages
- **Method**: Push to `gh-pages` branch or use `actions/deploy-pages`
- **Build**: Jekyll (native) or static files via Actions
- **CDN**: GitHub's CDN (good, not great)
- **Custom Domain**: Supported
- **HTTPS**: Automatic
- **Cost**: Free
- **Speed**: Good (global CDN)

**Implementation**:
- Use `peaceiris/actions-gh-pages` action (popular, reliable)
- Or use official `actions/deploy-pages` (newer, recommended)
- Deploy from `dist/` or `build/` directory

### Vercel
- **Method**: Vercel CLI or REST API
- **Build**: Automatic (detects framework) or custom build command
- **CDN**: Excellent (Edge Network, very fast)
- **Custom Domain**: Supported
- **HTTPS**: Automatic
- **Cost**: Free tier generous
- **Speed**: Excellent (better than GitHub Pages)

**Implementation Options**:
1. **Vercel GitHub Integration** (easiest)
   - Connect repo in Vercel dashboard
   - Auto-deploys on push
   - **Pros**: Zero config, automatic
   - **Cons**: Less control, separate from Actions workflow

2. **Vercel CLI in Actions** (recommended)
   - Install Vercel CLI
   - Run `vercel --prod --token $VERCEL_TOKEN`
   - **Pros**: Full control, part of unified workflow
   - **Cons**: Requires Vercel token in secrets

3. **Vercel REST API**
   - Direct API calls
   - **Pros**: Most flexible
   - **Cons**: More complex, need to handle deployments manually

## Build Strategy

### Option 1: Build Once, Deploy Everywhere
- Build static site in one job
- Upload as artifact
- Download in deployment jobs
- **Pros**: Consistent builds, faster (build once)
- **Cons**: Artifact storage overhead
- **Best for**: Multiple deployments

### Option 2: Build Per Platform
- Build separately for each platform
- Platform-specific optimizations possible
- **Pros**: Platform-specific tweaks
- **Cons**: Slower, more complex
- **Best for**: Different build requirements

**Recommendation**: Option 1 - Build once, deploy everywhere

## Static Site Generator Options

### Astro (Recommended for React)
- **Build Command**: `npm run build`
- **Output**: `dist/` directory
- **Pros**: Fast, modern, great DX, **native React support**, can use React components
- **Cons**: Need to set up project structure
- **React Support**: ✅ Native - just `npm install @astrojs/react` and use React components
- **Philosophy**: **MD-first approach** - Keep content as pure Markdown files. Use React only for front-end interactive components when needed. Minimize HTML/JS/CSS package overhead. Most content should be `.md` files that Astro renders directly.

### Next.js Static Export
- **Build Command**: `next build && next export` (or `next build` with `output: 'export'`)
- **Output**: `out/` directory
- **Pros**: Full React framework, great ecosystem, excellent React support
- **Cons**: Larger bundle sizes, more complex than needed for simple blog
- **React Support**: ✅ Full React framework

### Jekyll (GitHub Pages native)
- **Build Command**: Automatic on GitHub Pages
- **Output**: `_site/` directory
- **Pros**: Native GitHub Pages support, no build step needed
- **Cons**: Ruby dependency, slower builds, **NOT React-friendly** (requires complex Webpack/Babel setup)
- **React Support**: ❌ Not recommended - uses Liquid templating, React integration is hacky

**Recommendation**: **Astro with React** - Best balance of React support, simplicity, and performance

## Deployment Workflow

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
  
  deploy-github-pages:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - uses: actions/deploy-pages@v3
        with:
          path: dist/
  
  deploy-vercel:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

## Pending Decisions
- [ ] Choose deployment method for Vercel (CLI recommended)
- [ ] Set up Vercel project and get tokens
- [ ] Configure GitHub Pages (enable in repo settings)
- [ ] Decide on build artifact retention period
- [ ] Set up custom domain (if applicable)

