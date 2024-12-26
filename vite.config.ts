import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import mdx from '@mdx-js/rollup'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [mdx(),react(), tsconfigPaths()],
  optimizeDeps: {
    include: ['buffer', '@mdx-js/react']
  }, 
  server: {
    fs: {
      allow: ["src"], // Ensure the `src` directory is accessible
    },
  }
})
