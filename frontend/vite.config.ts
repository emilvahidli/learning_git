import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base public path when served in production
  // Əgər subdirectory-də deploy edirsinizsə, məsələn: base: '/proep/'
  base: '/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Production-da false, development-da true
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Production-da console.log-ları silir
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React vendor chunk
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Motion vendor chunk
          if (id.includes('node_modules/motion')) {
            return 'motion-vendor';
          }
          // Other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // Server configuration (development)
  server: {
    port: 5174,
    host: true,
    strictPort: false,
  },
  
  // Preview configuration (build preview)
  preview: {
    port: 4173,
    host: true,
  },
})
