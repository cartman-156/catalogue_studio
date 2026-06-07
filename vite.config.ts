import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base so assets resolve correctly on GitHub Pages regardless
  // of repository name casing or custom domain. Relative paths avoid
  // absolute-path mismatches that can cause MIME type errors when assets
  // return a 404 and the server responds with HTML.
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
