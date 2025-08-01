/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Получаем PORT только если он есть, чтобы не падало на build
const PORT = process.env.PORT ? Number(process.env.PORT) : 4173;

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    // preview используется только при vite preview
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
