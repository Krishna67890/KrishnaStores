import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Ensure public/important/KrishnaStores logo.png exists
const srcLogo = path.resolve(__dirname, 'assets/KrishnaStores logo.png');
const destDir = path.resolve(__dirname, 'public/important');
const destLogo = path.resolve(destDir, 'KrishnaStores logo.png');

if (fs.existsSync(srcLogo)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcLogo, destLogo);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
