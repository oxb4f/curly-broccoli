import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  preview: {
    allowedHosts: ['frontend']
  },
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@user': fileURLToPath(new URL('./src/features/user', import.meta.url)),
      '@book': fileURLToPath(new URL('./src/features/book', import.meta.url)),
      '@auth': fileURLToPath(new URL('./src/features/auth', import.meta.url)),
      '@reading': fileURLToPath(new URL('./src/features/reading', import.meta.url)),
      '@following': fileURLToPath(new URL('./src/features/following', import.meta.url)),
      '@image-cropper': fileURLToPath(new URL('./src/features/image-cropper', import.meta.url)),
      '@settings': fileURLToPath(new URL('./src/features/settings', import.meta.url))
    }
  }
});
