import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/games/nhl-duo/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // CSS code splitting and minification
    cssCodeSplit: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // Keep all Firebase in one chunk to avoid initialization issues
            if (id.includes('firebase')) {
              return 'firebase';
            }
            // React vendor chunk
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit slightly since we're code splitting
    chunkSizeWarningLimit: 600,
    // Disable minification to prevent Firebase initialization issues
    minify: false,
    // Disable source maps for smaller builds
    sourcemap: false,
    // Report compressed size
    reportCompressedSize: true,
  },
});
