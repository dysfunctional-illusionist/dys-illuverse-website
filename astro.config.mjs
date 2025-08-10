import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import "dotenv/config";
import viteConfig from "./vite.config.js";

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: viteConfig,
  // vite: {
  //   server: {
  //     middlewareMode: false,
  //   },
  //   resolve: {
  //     alias: {
  //       '@layouts': path.resolve('./src/layouts'),
  //       '@components': path.resolve('./src/components'),
  //       '@pages': path.resolve('./src/pages'),
  //       '@utility': path.resolve('./src/utility'),
  //       '@showcase': path.resolve('./src/showcase'),
  //     },
  //   },
  //   esbuild: {
  //     charset: 'utf8',
  //   },
  //   plugins: [
  //     {
  //       name: 'set-charset-header',
  //       configureServer(server) {
  //         console.log('Server middlewares:', !!server.middlewares);
  //         server.middlewares.use((req, res, next) => {
  //           if (req.url.endsWith('.html') || req.url === '/') {
  //             console.log(`Dev server charset for ${req.url}`);
  //             res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //           }
  //           next();
  //         });
  //       },
  //       configurePreviewServer(server) {
  //         server.middlewares.use((req, res, next) => {
  //           if (req.url.endsWith('.html') || req.url === '/') {
  //             console.log(`Preview server charset for ${req.url}`);
  //             res.setHeader('Content-Type', 'text/html; charset=utf-8');
  //           }
  //           next();
  //         });
  //       }
  //     }
  //   ],
  // },
});
