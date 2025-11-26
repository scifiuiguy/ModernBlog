# Custom Domain Setup Guide

## Setting Up `blog.ajcampbell.info`

### Prerequisites
- Domain `ajcampbell.info` registered and managed in GoDaddy
- GitHub repository with GitHub Pages enabled

### Step 1: Configure DNS (GoDaddy)

1. Log in to GoDaddy account
2. Go to "My Products" → "Domains" → Find `ajcampbell.info` → Click "DNS"
3. Click "Add" to create a new record
4. Configure:
   - **Type:** `CNAME`
   - **Name:** `blog`
   - **Value:** `ajcampbell1333.github.io`
   - **TTL:** `1/2 hour` (30 minutes) or default
5. Click "Save"

**Note:** DNS propagation can take 30 minutes to 48 hours, but usually happens within a few hours.

### Step 2: Add GitHub Secret

1. Go to: `https://github.com/ajcampbell1333/ModernBlog/settings/secrets/actions`
2. Click "New repository secret"
3. Name: `BLOG_DOMAIN`
4. Value: `blog.ajcampbell.info`
5. Click "Add secret"

### Step 3: Trigger Deployment

**IMPORTANT:** After adding the `BLOG_DOMAIN` secret, you must trigger a deployment for the workflow to:
- Generate the CNAME file with your custom domain
- Build with the correct base path (`/` instead of `/ModernBlog/`)
- Deploy with custom domain configuration

**To trigger deployment:**
- Make a small change to any file (e.g., add a comment) and push to git
- Or wait for the next automatic deployment
- The workflow will detect the `BLOG_DOMAIN` secret and configure accordingly

**Example temporary change to trigger deployment:**
```bash
# Add a comment to any file, commit, and push
git add .
git commit -m "Trigger deployment for custom domain setup"
git push
```

### Step 4: Configure GitHub Pages Custom Domain

After deployment completes:

1. Go to: `https://github.com/ajcampbell1333/ModernBlog/settings/pages`
2. Under "Custom domain", enter: `blog.ajcampbell.info`
3. Check "Enforce HTTPS"
4. Click "Save"

GitHub will verify the domain (may take a few minutes to hours). You'll see a green checkmark when verified.

### Step 5: Verify

Once DNS propagates and GitHub verifies:
- Visit `https://blog.ajcampbell.info`
- Images should load correctly (base path is `/` for custom domain)
- HTTPS is enforced automatically

## How It Works

When `BLOG_DOMAIN` secret is set to `blog.ajcampbell.info`:
- ✅ Workflow generates `CNAME` file with `blog.ajcampbell.info`
- ✅ Sets `ASTRO_BASE_PATH="/"` (root path for subdomain)
- ✅ Image paths work correctly (remark plugin handles them)
- ✅ Builds with correct base path for custom domain

## Troubleshooting

**Domain not resolving:**
- Wait for DNS propagation (can take up to 48 hours)
- Verify CNAME record in GoDaddy DNS management
- Check DNS propagation: `dig blog.ajcampbell.info` or use online DNS checker

**GitHub Pages not verifying:**
- Ensure CNAME file exists in `public/CNAME` after deployment
- Check that DNS has propagated (GitHub can't verify if DNS isn't working)
- Wait a few hours and try again

**Images broken after custom domain:**
- Verify `BLOG_DOMAIN` secret is set correctly
- Check that workflow built with `ASTRO_BASE_PATH="/"` (check workflow logs)
- Ensure remark plugin is converting image paths correctly

