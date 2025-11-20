import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  output: 'static',
  outDir: '../build', // Top-level outDir (relative to config file location)
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});

