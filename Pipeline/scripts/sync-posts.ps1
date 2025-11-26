# Sync posts from Posts/ to Pipeline/site/src/content/blog/
# Run this before building locally to ensure your edits are included

$ErrorActionPreference = "Stop"

Write-Host "Syncing posts from Posts/ to Astro content directory..." -ForegroundColor Cyan

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)
$BlogDir = Join-Path $RepoRoot "Pipeline\site\src\content\blog"

Set-Location $RepoRoot

# Ensure blog directory exists
New-Item -ItemType Directory -Path $BlogDir -Force | Out-Null

# Copy posts (overwrite existing)
Write-Host "Copying posts..." -ForegroundColor Yellow
Copy-Item -Path "Posts\*.md" -Destination $BlogDir -ErrorAction SilentlyContinue

$copied = (Get-ChildItem "$BlogDir\*.md" -ErrorAction SilentlyContinue).Count
if ($copied -gt 0) {
    Write-Host "Synced $copied post(s) to Astro content directory" -ForegroundColor Green
} else {
    Write-Host "No posts found or Posts directory doesn't exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Tip: Run this script before npm run build or npm run preview to ensure your latest edits are included" -ForegroundColor Cyan
