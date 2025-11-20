#!/usr/bin/env node
/**
 * Publish blog post to Medium via API
 */

import { readFileSync } from 'fs';
import { processPost } from './process-post.js';
import { markdownToHtml } from './transform-content.js';

const MEDIUM_API_URL = 'https://api.medium.com/v1';

/**
 * Publish post to Medium
 * @param {string} filePath - Path to markdown file
 * @param {string} token - Medium access token
 * @param {Object} options - Options (draft, userId, etc.)
 * @returns {Promise<Object>} - Response with article ID and URL
 */
export async function publishToMedium(filePath, token, options = {}) {
  const {
    draft = true,
    userId = null,
    tags = [],
    canonicalUrl = null
  } = options;
  
  // Process the post
  const { frontmatter, content, errors } = processPost(filePath);
  
  if (errors.length > 0) {
    throw new Error(`Post validation failed: ${errors.join(', ')}`);
  }
  
  // Get user ID if not provided
  let mediumUserId = userId;
  if (!mediumUserId) {
    mediumUserId = await getMediumUserId(token);
  }
  
  // Transform markdown to HTML
  const htmlContent = markdownToHtml(content);
  
  // Prepare request body
  const requestBody = {
    title: frontmatter.title,
    contentFormat: 'html',
    content: htmlContent,
    publishStatus: draft ? 'draft' : 'public',
    tags: frontmatter.tags || tags,
  };
  
  // Add canonical URL if provided
  if (canonicalUrl || frontmatter.canonical_url) {
    requestBody.canonicalUrl = canonicalUrl || frontmatter.canonical_url;
  }
  
  // Publish to Medium
  const response = await fetch(`${MEDIUM_API_URL}/users/${mediumUserId}/posts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Medium API error: ${response.status} - ${error}`);
  }
  
  const data = await response.json();
  
  return {
    id: data.data.id,
    url: data.data.url,
    status: data.data.publishStatus,
  };
}

/**
 * Get Medium user ID from token
 * @param {string} token - Medium access token
 * @returns {Promise<string>} - User ID
 */
async function getMediumUserId(token) {
  const response = await fetch(`${MEDIUM_API_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`Failed to get Medium user ID: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data.id;
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  const token = process.env.MEDIUM_TOKEN || process.argv[3];
  
  if (!filePath || !token) {
    console.error('Usage: node publish-medium.js <path-to-markdown> [token]');
    console.error('Or set MEDIUM_TOKEN environment variable');
    process.exit(1);
  }
  
  try {
    const result = await publishToMedium(filePath, token, { draft: true });
    console.log('Published to Medium:');
    console.log('  ID:', result.id);
    console.log('  URL:', result.url);
    console.log('  Status:', result.status);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

