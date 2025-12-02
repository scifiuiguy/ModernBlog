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

# Copy images to public/Images for local preview
$ImagesDir = Join-Path $RepoRoot "Pipeline\site\public\Images"
Write-Host "Copying images..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $ImagesDir -Force | Out-Null
if (Test-Path "Images") {
    Copy-Item -Path "Images\*" -Destination $ImagesDir -Recurse -ErrorAction SilentlyContinue
    $imageCount = (Get-ChildItem "$ImagesDir\*" -ErrorAction SilentlyContinue).Count
    if ($imageCount -gt 0) {
        Write-Host "Synced $imageCount image(s) to public/Images" -ForegroundColor Green
    }
} else {
    Write-Host "Images directory not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Tip: Run this script before npm run build or npm run preview to ensure your latest edits are included" -ForegroundColor Cyan
