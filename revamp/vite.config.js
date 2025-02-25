import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "@svgr/rollup";
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    historyApiFallback: true, // Ensures routing works correctly
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.fbx'], // Ensure .fbx files are treated as assets
});
