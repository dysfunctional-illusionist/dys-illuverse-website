import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import "dotenv/config";

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@layouts': path.resolve('./src/layouts'),
        '@components': path.resolve('./src/components'),
        '@pages': path.resolve('./src/pages'),
        '@utility': path.resolve('./src/utility'),
        '@showcase': path.resolve('./src/showcase'),
      },
    },
    esbuild: {
      charset: 'utf8',
    },
    // server: {
    //   headers: {
    //     "Content-Type": "application/javascript; charset=utf-8",
    //   },
  },
});
