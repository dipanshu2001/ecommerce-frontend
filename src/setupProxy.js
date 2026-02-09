const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://simple-e-commerce-production.up.railway.app',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    })
  );
};
