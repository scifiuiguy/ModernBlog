#!/usr/bin/env node
/**
 * Metadata tracking system
 * Tracks which posts have been published to which platforms
 * Stores platform-specific IDs for updates
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Metadata file location (outside repo, in Local directory)
// From Remote/Pipeline/scripts/ to Local/.local/ = ../../../Local/.local/
const METADATA_FILE = process.env.METADATA_FILE || join(__dirname, '../../../Local/.local/metadata.json');

/**
 * Load metadata from file
 * @returns {Object} - Metadata object
 */
export function loadMetadata() {
  if (!existsSync(METADATA_FILE)) {
    return {};
  }
  
  try {
    const content = readFileSync(METADATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Failed to load metadata, starting fresh:', error.message);
    return {};
  }
}

/**
 * Save metadata to file
 * @param {Object} metadata - Metadata object
 */
export function saveMetadata(metadata) {
  // Ensure directory exists
  const dir = dirname(METADATA_FILE);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  
  writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2), 'utf-8');
}

/**
 * Get metadata for a post
 * @param {string} postPath - Path to post file
 * @returns {Object} - Post metadata
 */
export function getPostMetadata(postPath) {
  const metadata = loadMetadata();
  const key = postPath.replace(/\\/g, '/');
  return metadata[key] || {};
}

/**
 * Update metadata for a post
 * @param {string} postPath - Path to post file
 * @param {Object} updates - Metadata updates
 */
export function updatePostMetadata(postPath, updates) {
  const metadata = loadMetadata();
  const key = postPath.replace(/\\/g, '/');
  
  metadata[key] = {
    ...metadata[key],
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  
  saveMetadata(metadata);
}

/**
 * Record platform publish
 * @param {string} postPath - Path to post file
 * @param {string} platform - Platform name (medium, devto, linkedin)
 * @param {Object} result - Publish result (id, url, status)
 */
export function recordPublish(postPath, platform, result) {
  const updates = {
    [`${platform}_id`]: result.id,
    [`${platform}_url`]: result.url,
    [`${platform}_status`]: result.status,
    [`${platform}_published_at`]: new Date().toISOString(),
  };
  
  updatePostMetadata(postPath, updates);
}

/**
 * Check if post has been published to platform
 * @param {string} postPath - Path to post file
 * @param {string} platform - Platform name
 * @returns {boolean} - True if published
 */
export function isPublished(postPath, platform) {
  const meta = getPostMetadata(postPath);
  return !!meta[`${platform}_id`];
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2];
  const postPath = process.argv[3];
  
  if (command === 'get' && postPath) {
    const meta = getPostMetadata(postPath);
    console.log(JSON.stringify(meta, null, 2));
  } else if (command === 'list') {
    const metadata = loadMetadata();
    console.log(JSON.stringify(metadata, null, 2));
  } else {
    console.error('Usage:');
    console.error('  node metadata.js get <post-path>');
    console.error('  node metadata.js list');
  }
}

