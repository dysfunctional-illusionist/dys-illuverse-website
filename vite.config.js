export default {
  plugins: [
    {
      name: 'set-charset-header',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.endsWith('.html') || req.url === '/') {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
          }
          next();
        });
      }
    }
  ]
};
