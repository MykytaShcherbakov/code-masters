/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4173;

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    ...(command === 'serve' || command === 'preview'
      ? {
          preview: {
            host: true,
            port: PORT,
            allowedHosts: ['code-masters.onrender.com'],
          },
        }
      : {}),
  };
});
