import path from 'path';

export default {
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
  plugins: [
    {
      name: 'set-charset-header',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.html') || req.url === '/') {
            console.log(`Dev server charset for ${req.url}`);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
          }
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.html') || req.url === '/') {
            console.log(`Preview server charset for ${req.url}`);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
          }
          next();
        });
      },
    },
  ],
};
