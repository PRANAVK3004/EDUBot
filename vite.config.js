import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173', // Target your Flask server
        changeOrigin: true, // Enable CORS handling
        pathRewrite: { '^/api': '' }, // Remove "/api" from request path
      },
    },
  },
});