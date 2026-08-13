import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // High-quality/near-lossless settings — smaller files, visually identical output.
      jpg: { quality: 90 },
      jpeg: { quality: 90 },
      png: { quality: 90 },
      webp: { quality: 90 },
    }),
  ],
})
