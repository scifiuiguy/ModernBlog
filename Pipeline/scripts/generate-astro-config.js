#!/usr/bin/env node
/**
 * Generate Astro config with correct base path
 * For GitHub Pages: /REPO_NAME/
 * For custom domain: /
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate Astro config with base path
 * @param {string} basePath - Base path (e.g., '/ModernBlog/' or '/')
 * @param {string} configPath - Path to astro.config.mjs
 */
export function generateAstroConfig(basePath, configPath) {
  const configTemplate = `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'static',
  base: '${basePath}', // Base path for GitHub Pages or custom domain
  outDir: '../build', // Top-level outDir (relative to config file location)
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
`;

  writeFileSync(configPath, configTemplate, 'utf-8');
  console.log(`Generated Astro config with base: ${basePath}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const basePath = process.argv[2] || '/';
  const configPath = process.argv[3] || join(__dirname, '../../site/astro.config.mjs');
  generateAstroConfig(basePath, configPath);
}

