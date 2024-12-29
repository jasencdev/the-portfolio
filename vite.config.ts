import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/assets', // Source folder (relative to the project root)
          dest: '',    // Destination folder in the `dist` directory
        },
      ],
    }),
  ],
  optimizeDeps: {
    include: ['buffer'],
  },
  server: {
    fs: {
      allow: ['src'], // Ensure the `src` directory is accessible
    },
  },
});