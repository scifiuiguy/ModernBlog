#!/usr/bin/env node
/**
 * Publish a post to all platforms
 * Handles errors gracefully, continues on partial failures
 */

import { publishToMedium } from './publish-medium.js';
import { publishToDevto } from './publish-devto.js';
import { publishToLinkedIn } from './publish-linkedin.js';
import { recordPublish, getPostMetadata } from './metadata.js';
import { processPost } from './process-post.js';

/**
 * Publish post to all platforms
 * @param {string} filePath - Path to markdown file
 * @param {Object} credentials - API credentials
 * @param {Object} options - Options (draft, canonicalUrl, etc.)
 * @returns {Promise<Object>} - Results for each platform
 */
export async function publishToAll(filePath, credentials, options = {}) {
  const {
    draft = true,
    canonicalUrl = null,
    skipExisting = true
  } = options;
  
  const results = {
    medium: null,
    devto: null,
    linkedin: null,
    errors: []
  };
  
  // Process post to get frontmatter
  const { frontmatter } = processPost(filePath);
  const postUrl = canonicalUrl || frontmatter.canonical_url;
  
  // Check if already published (if skipExisting is true)
  const existing = getPostMetadata(filePath);
  
  // Publish to Medium
  if (credentials.mediumToken) {
    try {
      if (skipExisting && existing.medium_id) {
        console.log('Skipping Medium - already published');
        results.medium = { id: existing.medium_id, url: existing.medium_url, skipped: true };
      } else {
        const result = await publishToMedium(filePath, credentials.mediumToken, {
          draft,
          canonicalUrl: postUrl,
        });
        recordPublish(filePath, 'medium', result);
        results.medium = result;
        console.log('✓ Published to Medium');
      }
    } catch (error) {
      results.errors.push({ platform: 'medium', error: error.message });
      console.error('✗ Medium failed:', error.message);
    }
  }
  
  // Publish to Dev.to
  if (credentials.devtoApiKey) {
    try {
      if (skipExisting && existing.devto_id) {
        console.log('Skipping Dev.to - already published');
        results.devto = { id: existing.devto_id, url: existing.devto_url, skipped: true };
      } else {
        const result = await publishToDevto(filePath, credentials.devtoApiKey, {
          draft,
          canonicalUrl: postUrl,
        });
        recordPublish(filePath, 'devto', result);
        results.devto = result;
        console.log('✓ Published to Dev.to');
      }
    } catch (error) {
      results.errors.push({ platform: 'devto', error: error.message });
      console.error('✗ Dev.to failed:', error.message);
    }
  }
  
  // Publish to LinkedIn
  if (credentials.linkedinToken) {
    try {
      if (skipExisting && existing.linkedin_id) {
        console.log('Skipping LinkedIn - already published');
        results.linkedin = { id: existing.linkedin_id, url: existing.linkedin_url, skipped: true };
      } else {
        const result = await publishToLinkedIn(filePath, credentials.linkedinToken, {
          orgId: credentials.linkedinOrgId,
          canonicalUrl: postUrl,
          draft,
        });
        recordPublish(filePath, 'linkedin', result);
        results.linkedin = result;
        console.log('✓ Published to LinkedIn');
      }
    } catch (error) {
      results.errors.push({ platform: 'linkedin', error: error.message });
      console.error('✗ LinkedIn failed:', error.message);
    }
  }
  
  return results;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('Usage: node publish-all.js <path-to-markdown>');
    console.error('Requires environment variables:');
    console.error('  MEDIUM_TOKEN (optional)');
    console.error('  DEVTO_API_KEY (optional)');
    console.error('  LINKEDIN_ACCESS_TOKEN (optional)');
    console.error('  LINKEDIN_ORG_ID (optional)');
    process.exit(1);
  }
  
  const credentials = {
    mediumToken: process.env.MEDIUM_TOKEN,
    devtoApiKey: process.env.DEVTO_API_KEY,
    linkedinToken: process.env.LINKEDIN_ACCESS_TOKEN,
    linkedinOrgId: process.env.LINKEDIN_ORG_ID,
  };
  
  const draft = process.env.DRAFT_MODE !== 'false';
  
  try {
    const results = await publishToAll(filePath, credentials, { draft });
    
    console.log('\n=== Publish Results ===');
    if (results.medium) {
      console.log('Medium:', results.medium.skipped ? 'Skipped (already published)' : results.medium.url);
    }
    if (results.devto) {
      console.log('Dev.to:', results.devto.skipped ? 'Skipped (already published)' : results.devto.url);
    }
    if (results.linkedin) {
      console.log('LinkedIn:', results.linkedin.skipped ? 'Skipped (already published)' : results.linkedin.url);
    }
    
    if (results.errors.length > 0) {
      console.log('\nErrors:');
      results.errors.forEach(err => {
        console.log(`  ${err.platform}: ${err.error}`);
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error:', error.message);
    process.exit(1);
  }
}

