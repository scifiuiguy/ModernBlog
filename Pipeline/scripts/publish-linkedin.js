#!/usr/bin/env node
/**
 * Publish blog post link to LinkedIn via API
 * Note: LinkedIn API doesn't support full articles, only status updates with links
 */

import { processPost } from './process-post.js';
import { markdownToPlainText } from './transform-content.js';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';

/**
 * Publish post link to LinkedIn
 * @param {string} filePath - Path to markdown file
 * @param {string} token - LinkedIn access token
 * @param {Object} options - Options (orgId, canonicalUrl, etc.)
 * @returns {Promise<Object>} - Response with post ID
 */
export async function publishToLinkedIn(filePath, token, options = {}) {
  const {
    orgId = null,
    canonicalUrl = null,
    draft = false // LinkedIn doesn't have draft mode, but we can use visibility
  } = options;
  
  // Process the post
  const { frontmatter, content, errors } = processPost(filePath);
  
  if (errors.length > 0) {
    throw new Error(`Post validation failed: ${errors.join(', ')}`);
  }
  
  // Get canonical URL
  const postUrl = canonicalUrl || frontmatter.canonical_url;
  if (!postUrl) {
    throw new Error('Canonical URL required for LinkedIn posting');
  }
  
  // Create teaser text from markdown (first paragraph, max 300 chars)
  const teaser = markdownToPlainText(content, 300);
  
  // Prepare the share text
  const shareText = `${frontmatter.title}\n\n${teaser}\n\nRead more: ${postUrl}`;
  
  // Prepare UGC post
  const ugcPost = {
    author: orgId ? `urn:li:organization:${orgId}` : 'urn:li:person:me',
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: shareText
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            description: {
              text: frontmatter.description || teaser
            },
            originalUrl: postUrl,
            title: {
              text: frontmatter.title
            }
          }
        ]
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': draft ? 'CONNECTIONS' : 'PUBLIC'
    }
  };
  
  // Create UGC post
  const ugcResponse = await fetch(`${LINKEDIN_API_URL}/ugcPosts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(ugcPost),
  });
  
  if (!ugcResponse.ok) {
    const error = await ugcResponse.text();
    throw new Error(`LinkedIn API error: ${ugcResponse.status} - ${error}`);
  }
  
  const ugcData = await ugcResponse.json();
  
  return {
    id: ugcData.id,
    // LinkedIn doesn't return a direct URL, construct it
    url: `https://www.linkedin.com/feed/update/${ugcData.id}`,
    status: 'published',
  };
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2];
  const token = process.env.LINKEDIN_ACCESS_TOKEN || process.argv[3];
  const orgId = process.env.LINKEDIN_ORG_ID || process.argv[4] || null;
  
  if (!filePath || !token) {
    console.error('Usage: node publish-linkedin.js <path-to-markdown> [token] [org-id]');
    console.error('Or set LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORG_ID environment variables');
    process.exit(1);
  }
  
  try {
    const result = await publishToLinkedIn(filePath, token, { orgId });
    console.log('Published to LinkedIn:');
    console.log('  ID:', result.id);
    console.log('  URL:', result.url);
    console.log('  Status:', result.status);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

