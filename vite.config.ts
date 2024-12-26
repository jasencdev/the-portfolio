import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['buffer']
  }, 
  server: {
    fs: {
      allow: ["src"], // Ensure the `src` directory is accessible
    },
  }
})
