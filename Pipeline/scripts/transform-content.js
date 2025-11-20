#!/usr/bin/env node
/**
 * Transform Markdown content for different platforms
 * - Markdown → HTML (for Medium)
 * - Markdown → Plain Text (for LinkedIn teaser)
 * - Markdown → Markdown (for Dev.to, cleaned)
 */

import { marked } from 'marked';
import { stripMarkdown } from 'strip-markdown';

/**
 * Convert Markdown to HTML
 * @param {string} markdown - Markdown content
 * @returns {string} - HTML content
 */
export function markdownToHtml(markdown) {
  // Configure marked options
  marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
  });
  
  return marked.parse(markdown);
}

/**
 * Convert Markdown to plain text (for LinkedIn teaser)
 * @param {string} markdown - Markdown content
 * @param {number} maxLength - Maximum length (default: 300)
 * @returns {string} - Plain text
 */
export function markdownToPlainText(markdown, maxLength = 300) {
  // Remove frontmatter if present
  let content = markdown;
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      content = content.substring(endIndex + 3).trim();
    }
  }
  
  // Strip markdown syntax
  let text = stripMarkdown(content);
  
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  // Truncate if needed
  if (text.length > maxLength) {
    text = text.substring(0, maxLength - 3) + '...';
  }
  
  return text;
}

/**
 * Clean Markdown for Dev.to (minimal processing)
 * @param {string} markdown - Markdown content
 * @returns {string} - Cleaned markdown
 */
export function cleanMarkdown(markdown) {
  // Remove frontmatter if present
  let content = markdown;
  if (content.startsWith('---')) {
    const endIndex = content.indexOf('---', 3);
    if (endIndex !== -1) {
      content = content.substring(endIndex + 3).trim();
    }
  }
  
  // Basic cleanup - remove any weird characters, normalize line endings
  content = content.replace(/\r\n/g, '\n');
  content = content.replace(/\r/g, '\n');
  
  return content.trim();
}

// CLI usage for testing
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  const filePath = process.argv[3];
  
  if (!command || !filePath) {
    console.error('Usage: node transform-content.js <html|text|clean> <path-to-markdown-file>');
    process.exit(1);
  }
  
  const fs = await import('fs');
  const markdown = fs.readFileSync(filePath, 'utf-8');
  
  switch (command) {
    case 'html':
      console.log(markdownToHtml(markdown));
      break;
    case 'text':
      console.log(markdownToPlainText(markdown));
      break;
    case 'clean':
      console.log(cleanMarkdown(markdown));
      break;
    default:
      console.error('Unknown command. Use: html, text, or clean');
      process.exit(1);
  }
}

