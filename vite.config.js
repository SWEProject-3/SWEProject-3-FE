import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // build 오류 방지
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
