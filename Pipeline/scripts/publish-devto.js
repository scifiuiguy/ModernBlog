#!/usr/bin/env node
/**
 * Publish blog post to Dev.to via API
 */

import { processPost } from './process-post.js';
import { cleanMarkdown } from './transform-content.js';

const DEVTO_API_URL = 'https://dev.to/api/articles';

/**
 * Publish post to Dev.to
 * @param {string} filePath - Path to markdown file
 * @param {string} apiKey - Dev.to API key
 * @param {Object} options - Options (draft, canonicalUrl, etc.)
 * @returns {Promise<Object>} - Response with article ID and URL
 */
export async function publishToDevto(filePath, apiKey, options = {}) {
  const {
    draft = true,
    canonicalUrl = null,
    organizationId = null
  } = options;
  
  // Process the post
  const { frontmatter, content, errors } = processPost(filePath);
  
  if (errors.length > 0) {
    throw new Error(`Post validation failed: ${errors.join(', ')}`);
  }
  
  // Clean markdown for Dev.to
  const markdownContent = cleanMarkdown(content);
  
  // Prepare request body
  const requestBody = {
    article: {
      title: frontmatter.title,
      body_markdown: markdownContent,
      published: !draft,
      tags: frontmatter.tags || [],
    }
  };
  
  // Add canonical URL if provided
  if (canonicalUrl || frontmatter.canonical_url) {
    requestBody.article.canonical_url = canonicalUrl || frontmatter.canonical_url;
  }
  
  // Add description if available
  if (frontmatter.description) {
    requestBody.article.description = frontmatter.description;
  }
  
  // Add organization ID if posting to org
  if (organizationId) {
    requestBody.article.organization_id = organizationId;
  }
  
  // Publish to Dev.to
  const response = await fetch(DEVTO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Dev.to API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  
  return {
    id: data.id.toString(),
    url: data.url,
    status: data.published ? 'published' : 'draft',
  };
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  const apiKey = process.env.DEVTO_API_KEY || process.argv[3];
  
  if (!filePath || !apiKey) {
    console.error('Usage: node publish-devto.js <path-to-markdown> [api-key]');
    console.error('Or set DEVTO_API_KEY environment variable');
    process.exit(1);
  }
  
  try {
    const result = await publishToDevto(filePath, apiKey, { draft: true });
    console.log('Published to Dev.to:');
    console.log('  ID:', result.id);
    console.log('  URL:', result.url);
    console.log('  Status:', result.status);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

