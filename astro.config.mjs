// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [react(), mdx()],

  adapter: node({
    mode: 'standalone'
  }),
  
  markdown: {
    syntaxHighlight: false
  }
});