/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  preview: {
    host: true,
    port: Number(import.meta.env.PORT) || 4173,
    allowedHosts: ['code-masters.onrender.com'],
  },
});
