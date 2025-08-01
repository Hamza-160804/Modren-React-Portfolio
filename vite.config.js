import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // ✅ Increase warning limit (optional if you optimize bundle)
    chunkSizeWarningLimit: 1000, // 1MB

    rollupOptions: {
      output: {
        // ✅ Vendor splitting to reduce main bundle size
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'aos'],
        },
      },
    },
  },
})
