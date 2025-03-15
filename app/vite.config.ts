import { defineConfig } from 'vite';

export default defineConfig(async () => {
  const { default: sitemap } = await import('vite-plugin-sitemap');

  return {
    root: '.vitepress/dist/',
    plugins: [
      sitemap({
        hostname: 'https://jasenc.dev',
        outDir: '.vitepress/dist/', // Fix path issue
        exclude: ['/404.html'],
        readable: true,
      })
    ]
  };
});