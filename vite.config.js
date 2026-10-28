import { defineConfig } from 'vite';

export default defineConfig({
  // Three.js serves cleanly as native ES modules and remains split from the app bundle.
  optimizeDeps: { exclude: ['three'] },
  build: { rollupOptions: { output: { manualChunks: { three: ['three'] } } } }
});
