import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportType: 'named',
      svgo: false,
    }),
  ],
  server: {
    headers: {
      "Content-Security-Policy": "frame-ancestors 'self'"
    }, 
    proxy: {
      '/api': {
        target: 'https://decisium-lex.great-site.net/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base:'/web-blog-decisium/',
});
